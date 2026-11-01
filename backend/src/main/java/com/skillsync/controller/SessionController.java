package com.skillsync.controller;

import com.skillsync.dto.SessionRequestDto;
import com.skillsync.model.Session;
import com.skillsync.service.SessionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("/request")
    public ResponseEntity<Session> createRequest(@RequestParam("learnerId") Integer learnerId,
                                                 @Valid @RequestBody SessionRequestDto req) {
        Session session = sessionService.createSessionRequest(learnerId, req);
        return new ResponseEntity<>(session, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Session> updateStatus(@PathVariable("id") Integer sessionId,
                                                @RequestParam("studentId") Integer studentId,
                                                @RequestParam("status") String status) {
        Session updated = sessionService.updateStatus(sessionId, studentId, status);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/incoming")
    public ResponseEntity<List<Session>> getIncomingRequests(@RequestParam("teacherId") Integer teacherId) {
        return ResponseEntity.ok(sessionService.getIncomingRequests(teacherId));
    }

    @GetMapping("/outgoing")
    public ResponseEntity<List<Session>> getOutgoingRequests(@RequestParam("learnerId") Integer learnerId) {
        return ResponseEntity.ok(sessionService.getOutgoingRequests(learnerId));
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<Session>> getUpcomingSessions(@RequestParam("studentId") Integer studentId) {
        return ResponseEntity.ok(sessionService.getUpcomingSessions(studentId));
    }

    @GetMapping("/completed")
    public ResponseEntity<List<Session>> getCompletedSessions(@RequestParam("studentId") Integer studentId) {
        return ResponseEntity.ok(sessionService.getCompletedSessions(studentId));
    }

    @GetMapping("/history")
    public ResponseEntity<List<Session>> getSessionHistory(@RequestParam("studentId") Integer studentId) {
        return ResponseEntity.ok(sessionService.getSessionHistory(studentId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Session> getSessionById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(sessionService.getSessionById(id));
    }
}
