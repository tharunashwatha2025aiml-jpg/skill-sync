package com.skillsync.service;

import com.skillsync.dto.SessionRequestDto;
import com.skillsync.exception.BadRequestException;
import com.skillsync.model.Session;
import com.skillsync.model.Student;
import com.skillsync.repository.SessionRepository;
import com.skillsync.repository.StudentRepository;
import com.skillsync.repository.StudentSkillRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

import static org.mockito.Mockito.*;

public class SessionServiceTest {

    @Mock
    private SessionRepository sessionRepository;

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private StudentSkillRepository studentSkillRepository;

    @InjectMocks
    private SessionService sessionService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSelfBookingPreventionThrowsException() {
        SessionRequestDto req = new SessionRequestDto();
        req.setTeacherId(1);
        req.setSkillId(2);
        req.setSessionDate(LocalDate.now().plusDays(2));
        req.setStartTime(LocalTime.of(14, 0));
        req.setLearningObjective("Learn Java");

        BadRequestException ex = assertThrows(BadRequestException.class, () -> {
            sessionService.createSessionRequest(1, req);
        });

        assertTrue(ex.getMessage().contains("cannot book a peer learning session with yourself"));
    }

    @Test
    public void testTeacherSkillMismatchThrowsException() {
        SessionRequestDto req = new SessionRequestDto();
        req.setTeacherId(2);
        req.setSkillId(5);
        req.setSessionDate(LocalDate.now().plusDays(2));
        req.setStartTime(LocalTime.of(14, 0));
        req.setLearningObjective("Learn React");

        when(studentRepository.findById(2)).thenReturn(Optional.of(new Student()));
        when(studentSkillRepository.studentOffersSkill(2, 5)).thenReturn(false);

        BadRequestException ex = assertThrows(BadRequestException.class, () -> {
            sessionService.createSessionRequest(1, req);
        });

        assertTrue(ex.getMessage().contains("does not offer instruction for this skill"));
    }

    @Test
    public void testOverlappingBookingThrowsException() {
        SessionRequestDto req = new SessionRequestDto();
        req.setTeacherId(2);
        req.setSkillId(1);
        req.setSessionDate(LocalDate.now().plusDays(1));
        req.setStartTime(LocalTime.of(14, 0));
        req.setDurationMinutes(60);
        req.setLearningObjective("Learn Java");

        when(studentRepository.findById(2)).thenReturn(Optional.of(new Student()));
        when(studentSkillRepository.studentOffersSkill(2, 1)).thenReturn(true);
        when(sessionRepository.hasOverlappingAcceptedSession(eq(2), any(), any(), eq(60))).thenReturn(true);

        BadRequestException ex = assertThrows(BadRequestException.class, () -> {
            sessionService.createSessionRequest(1, req);
        });

        assertTrue(ex.getMessage().contains("already has an accepted session"));
    }
}
