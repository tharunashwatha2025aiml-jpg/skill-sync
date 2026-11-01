package com.skillsync.service;

import com.skillsync.dto.StudentProfileDto;
import com.skillsync.model.Availability;
import com.skillsync.model.Student;
import com.skillsync.model.StudentSkill;
import com.skillsync.repository.AvailabilityRepository;
import com.skillsync.repository.FeedbackRepository;
import com.skillsync.repository.StudentRepository;
import com.skillsync.repository.StudentSkillRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MatchingService {

    private final StudentRepository studentRepository;
    private final StudentSkillRepository studentSkillRepository;
    private final AvailabilityRepository availabilityRepository;
    private final FeedbackRepository feedbackRepository;

    public MatchingService(StudentRepository studentRepository,
                           StudentSkillRepository studentSkillRepository,
                           AvailabilityRepository availabilityRepository,
                           FeedbackRepository feedbackRepository) {
        this.studentRepository = studentRepository;
        this.studentSkillRepository = studentSkillRepository;
        this.availabilityRepository = availabilityRepository;
        this.feedbackRepository = feedbackRepository;
    }

    public static class RecommendationResult {
        private StudentProfileDto teacherProfile;
        private List<String> matchReasons;
        private double score;

        public RecommendationResult(StudentProfileDto teacherProfile, List<String> matchReasons, double score) {
            this.teacherProfile = teacherProfile;
            this.matchReasons = matchReasons;
            this.score = score;
        }

        public StudentProfileDto getTeacherProfile() { return teacherProfile; }
        public List<String> getMatchReasons() { return matchReasons; }
        public double getScore() { return score; }
    }

    public List<RecommendationResult> findMatchesForLearner(Integer learnerId) {
        List<StudentSkill> learnSkills = studentSkillRepository.findByStudentIdAndType(learnerId, "LEARN");
        List<Availability> learnerAvailability = availabilityRepository.findByStudentId(learnerId);

        List<Student> allStudents = studentRepository.findAll();
        List<RecommendationResult> recommendations = new ArrayList<>();

        for (Student student : allStudents) {
            // Rule: Exclude the learner themselves
            if (student.getStudentId().equals(learnerId)) continue;
            if (!"ACTIVE".equalsIgnoreCase(student.getAccountStatus())) continue;

            List<StudentSkill> teacherTeachSkills = studentSkillRepository.findByStudentIdAndType(student.getStudentId(), "TEACH");
            List<Availability> teacherAvailability = availabilityRepository.findByStudentId(student.getStudentId());
            Double avgRating = feedbackRepository.getAverageRatingForTeacher(student.getStudentId());

            List<String> matchReasons = new ArrayList<>();
            double score = 0.0;

            // Check skill match
            for (StudentSkill learnSkill : learnSkills) {
                for (StudentSkill teachSkill : teacherTeachSkills) {
                    if (learnSkill.getSkillId().equals(teachSkill.getSkillId())) {
                        matchReasons.add("Offers " + teachSkill.getSkillName() + " (" + teachSkill.getProficiencyLevel() + ")");
                        score += 50.0;
                        if ("Advanced".equalsIgnoreCase(teachSkill.getProficiencyLevel())) {
                            score += 15.0;
                        }
                    }
                }
            }

            // Check availability overlap
            for (Availability la : learnerAvailability) {
                for (Availability ta : teacherAvailability) {
                    if (la.getDayOfWeek().equalsIgnoreCase(ta.getDayOfWeek())) {
                        matchReasons.add("Available on " + ta.getDayOfWeek() + " (" + ta.getStartTime() + "-" + ta.getEndTime() + ")");
                        score += 20.0;
                        break;
                    }
                }
            }

            // Rating bonus
            if (avgRating > 0) {
                matchReasons.add("Teacher rating: " + avgRating + " ★");
                score += avgRating * 5.0;
            }

            if (!matchReasons.isEmpty()) {
                StudentProfileDto profileDto = new StudentProfileDto();
                profileDto.setStudentId(student.getStudentId());
                profileDto.setFullName(student.getFullName());
                profileDto.setEmail(student.getEmail());
                profileDto.setDepartment(student.getDepartment());
                profileDto.setAcademicYear(student.getAcademicYear());
                profileDto.setBio(student.getBio());
                profileDto.setAvatarUrl(student.getAvatarUrl());
                profileDto.setTeachSkills(teacherTeachSkills);
                profileDto.setAverageRating(avgRating);
                profileDto.setTotalReviews(feedbackRepository.getReviewCountForTeacher(student.getStudentId()));

                recommendations.add(new RecommendationResult(profileDto, matchReasons, score));
            }
        }

        recommendations.sort((a, b) -> Double.compare(b.getScore(), a.getScore()));
        return recommendations;
    }
}
