package com.skillsync.service;

import com.skillsync.dto.SessionRequestDto;
import com.skillsync.exception.BadRequestException;
import com.skillsync.exception.ResourceNotFoundException;
import com.skillsync.model.Session;
import com.skillsync.repository.SessionRepository;
import com.skillsync.repository.StudentRepository;
import com.skillsync.repository.StudentSkillRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final StudentRepository studentRepository;
    private final StudentSkillRepository studentSkillRepository;

    public SessionService(SessionRepository sessionRepository,
                          StudentRepository studentRepository,
                          StudentSkillRepository studentSkillRepository) {
        this.sessionRepository = sessionRepository;
        this.studentRepository = studentRepository;
        this.studentSkillRepository = studentSkillRepository;
    }

    public Session createSessionRequest(Integer learnerId, SessionRequestDto req) {
        // Business Rule 1: A student cannot book a session with themselves
        if (learnerId.equals(req.getTeacherId())) {
            throw new BadRequestException("You cannot book a peer learning session with yourself.");
        }

        // Validate teacher exists
        studentRepository.findById(req.getTeacherId())
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with ID: " + req.getTeacherId()));

        // Business Rule 2: Teacher must actually offer the selected skill
        if (!studentSkillRepository.studentOffersSkill(req.getTeacherId(), req.getSkillId())) {
            throw new BadRequestException("The selected teacher does not offer instruction for this skill.");
        }

        // Business Rule 3: Session date must be valid and in the future/today
        if (req.getSessionDate() == null || req.getSessionDate().isBefore(LocalDate.now())) {
            throw new BadRequestException("Session date must be today or a future date.");
        }

        // Business Rule 4: Prevent overlapping accepted bookings for the teacher
        if (sessionRepository.hasOverlappingAcceptedSession(req.getTeacherId(), req.getSessionDate(), req.getStartTime(), req.getDurationMinutes())) {
            throw new BadRequestException("The teacher already has an accepted session during this requested time slot.");
        }

        Session session = new Session();
        session.setLearnerId(learnerId);
        session.setTeacherId(req.getTeacherId());
        session.setSkillId(req.getSkillId());
        session.setSessionDate(req.getSessionDate());
        session.setStartTime(req.getStartTime());
        session.setDurationMinutes(req.getDurationMinutes() != null ? req.getDurationMinutes() : 60);
        session.setFormat(req.getFormat() != null ? req.getFormat() : "ONLINE");
        session.setLearningObjective(req.getLearningObjective());
        session.setStatus("PENDING");

        return sessionRepository.save(session);
    }

    public Session updateStatus(Integer sessionId, Integer studentId, String newStatus) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found with ID: " + sessionId));

        // Access control check: user must be learner or teacher
        if (!studentId.equals(session.getLearnerId()) && !studentId.equals(session.getTeacherId())) {
            throw new BadRequestException("You are not authorized to update this session request.");
        }

        String targetStatus = newStatus.toUpperCase();

        // Status transition rules
        if ("ACCEPTED".equals(targetStatus) || "REJECTED".equals(targetStatus)) {
            // Only teacher can accept or reject
            if (!studentId.equals(session.getTeacherId())) {
                throw new BadRequestException("Only the teacher can accept or reject an incoming session request.");
            }
        }

        if ("CANCELLED".equals(targetStatus)) {
            if ("COMPLETED".equals(session.getStatus())) {
                throw new BadRequestException("Cannot cancel a session that is already marked as completed.");
            }
        }

        if ("COMPLETED".equals(targetStatus)) {
            if (!"ACCEPTED".equals(session.getStatus())) {
                throw new BadRequestException("Only accepted sessions can be marked as completed.");
            }
        }

        sessionRepository.updateStatus(sessionId, targetStatus);
        session.setStatus(targetStatus);
        return session;
    }

    public List<Session> getIncomingRequests(Integer teacherId) {
        return sessionRepository.findIncomingByTeacherId(teacherId);
    }

    public List<Session> getOutgoingRequests(Integer learnerId) {
        return sessionRepository.findOutgoingByLearnerId(learnerId);
    }

    public List<Session> getUpcomingSessions(Integer studentId) {
        return sessionRepository.findUpcomingByStudentId(studentId);
    }

    public List<Session> getCompletedSessions(Integer studentId) {
        return sessionRepository.findCompletedByStudentId(studentId);
    }

    public List<Session> getSessionHistory(Integer studentId) {
        return sessionRepository.findHistoryByStudentId(studentId);
    }

    public Session getSessionById(Integer sessionId) {
        return sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found with ID: " + sessionId));
    }
}
