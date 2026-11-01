package com.skillsync.controller;

import com.skillsync.dto.FeedbackDto;
import com.skillsync.model.Feedback;
import com.skillsync.service.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping("/submit")
    public ResponseEntity<Feedback> submitFeedback(@RequestParam("reviewerId") Integer reviewerId,
                                                   @Valid @RequestBody FeedbackDto dto) {
        Feedback created = feedbackService.submitFeedback(reviewerId, dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<List<Feedback>> getTeacherFeedback(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(feedbackService.getFeedbackForTeacher(id));
    }
}
