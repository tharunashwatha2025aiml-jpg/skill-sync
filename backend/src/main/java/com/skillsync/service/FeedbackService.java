package com.skillsync.service;

import com.skillsync.dto.FeedbackDto;
import com.skillsync.exception.BadRequestException;
import com.skillsync.exception.ResourceNotFoundException;
import com.skillsync.model.Feedback;
import com.skillsync.model.Session;
import com.skillsync.repository.FeedbackRepository;
import com.skillsync.repository.SessionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final SessionRepository sessionRepository;

    public FeedbackService(FeedbackRepository feedbackRepository, SessionRepository sessionRepository) {
        this.feedbackRepository = feedbackRepository;
        this.sessionRepository = sessionRepository;
    }

    public Feedback submitFeedback(Integer reviewerId, FeedbackDto dto) {
        Session session = sessionRepository.findById(dto.getSessionId())
                .orElseThrow(() -> new ResourceNotFoundException("Session not found with ID: " + dto.getSessionId()));

        // Business Rule 1: Only completed sessions can receive feedback
        if (!"COMPLETED".equalsIgnoreCase(session.getStatus())) {
            throw new BadRequestException("Feedback can only be submitted for completed learning sessions.");
        }

        // Business Rule 2: Reviewer must be the learner in the session
        if (!reviewerId.equals(session.getLearnerId())) {
            throw new BadRequestException("Only the learner who participated in the session can submit feedback.");
        }

        // Business Rule 3: Cannot rate oneself
        if (reviewerId.equals(session.getTeacherId())) {
            throw new BadRequestException("Students cannot rate or submit feedback for themselves.");
        }

        // Business Rule 4: Prevent duplicate feedback submissions per session
        if (feedbackRepository.findBySessionId(dto.getSessionId()).isPresent()) {
            throw new BadRequestException("Feedback has already been submitted for this session.");
        }

        Feedback feedback = new Feedback();
        feedback.setSessionId(dto.getSessionId());
        feedback.setReviewerId(reviewerId);
        feedback.setTeacherId(session.getTeacherId());
        feedback.setRating(dto.getRating());
        feedback.setComment(dto.getComment());
        feedback.setOutcomeSummary(dto.getOutcomeSummary());

        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getFeedbackForTeacher(Integer teacherId) {
        return feedbackRepository.findByTeacherId(teacherId);
    }
}
