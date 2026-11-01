package com.skillsync.service;

import com.skillsync.dto.StudentProfileDto;
import com.skillsync.exception.ResourceNotFoundException;
import com.skillsync.model.Availability;
import com.skillsync.model.Student;
import com.skillsync.model.StudentSkill;
import com.skillsync.repository.AvailabilityRepository;
import com.skillsync.repository.FeedbackRepository;
import com.skillsync.repository.SessionRepository;
import com.skillsync.repository.StudentRepository;
import com.skillsync.repository.StudentSkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final StudentSkillRepository studentSkillRepository;
    private final AvailabilityRepository availabilityRepository;
    private final FeedbackRepository feedbackRepository;
    private final SessionRepository sessionRepository;

    public StudentService(StudentRepository studentRepository,
                          StudentSkillRepository studentSkillRepository,
                          AvailabilityRepository availabilityRepository,
                          FeedbackRepository feedbackRepository,
                          SessionRepository sessionRepository) {
        this.studentRepository = studentRepository;
        this.studentSkillRepository = studentSkillRepository;
        this.availabilityRepository = availabilityRepository;
        this.feedbackRepository = feedbackRepository;
        this.sessionRepository = sessionRepository;
    }

    public StudentProfileDto getProfile(Integer studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + studentId));

        StudentProfileDto dto = new StudentProfileDto();
        dto.setStudentId(student.getStudentId());
        dto.setFullName(student.getFullName());
        dto.setEmail(student.getEmail());
        dto.setRegistrationNumber(student.getRegistrationNumber());
        dto.setDepartment(student.getDepartment());
        dto.setAcademicYear(student.getAcademicYear());
        dto.setBio(student.getBio());
        dto.setAvatarUrl(student.getAvatarUrl());
        dto.setRole(student.getRole());
        dto.setAccountStatus(student.getAccountStatus());
        dto.setCreditBalance(student.getCreditBalance());

        dto.setTeachSkills(studentSkillRepository.findByStudentIdAndType(studentId, "TEACH"));
        dto.setLearnSkills(studentSkillRepository.findByStudentIdAndType(studentId, "LEARN"));
        dto.setAvailabilitySlots(availabilityRepository.findByStudentId(studentId));

        dto.setAverageRating(feedbackRepository.getAverageRatingForTeacher(studentId));
        dto.setTotalReviews(feedbackRepository.getReviewCountForTeacher(studentId));
        dto.setCompletedSessionsCount(sessionRepository.countCompletedByStudentId(studentId));

        return dto;
    }

    public Student updateProfile(Integer studentId, Student updatedData) {
        Student existing = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + studentId));

        existing.setFullName(updatedData.getFullName());
        existing.setDepartment(updatedData.getDepartment());
        existing.setAcademicYear(updatedData.getAcademicYear());
        existing.setBio(updatedData.getBio());
        if (updatedData.getAvatarUrl() != null && !updatedData.getAvatarUrl().isBlank()) {
            existing.setAvatarUrl(updatedData.getAvatarUrl());
        }

        return studentRepository.save(existing);
    }

    public StudentSkill addOrUpdateSkill(Integer studentId, StudentSkill skillData) {
        skillData.setStudentId(studentId);
        return studentSkillRepository.addSkill(skillData);
    }

    public void removeSkill(Integer studentId, Integer skillId, String skillType) {
        studentSkillRepository.removeSkill(studentId, skillId, skillType);
    }

    public void updateAvailability(Integer studentId, List<Availability> slots) {
        availabilityRepository.replaceStudentAvailability(studentId, slots);
    }

    public List<Student> searchStudents(String query) {
        if (query == null || query.trim().isEmpty()) {
            return studentRepository.findAll();
        }
        return studentRepository.searchByNameOrDept(query.trim());
    }
}
