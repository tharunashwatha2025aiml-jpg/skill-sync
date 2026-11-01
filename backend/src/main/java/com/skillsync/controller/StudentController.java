package com.skillsync.controller;

import com.skillsync.dto.StudentProfileDto;
import com.skillsync.model.Availability;
import com.skillsync.model.Student;
import com.skillsync.model.StudentSkill;
import com.skillsync.service.MatchingService;
import com.skillsync.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;
    private final MatchingService matchingService;

    public StudentController(StudentService studentService, MatchingService matchingService) {
        this.studentService = studentService;
        this.matchingService = matchingService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Student>> searchStudents(@RequestParam(value = "q", required = false) String query) {
        return ResponseEntity.ok(studentService.searchStudents(query));
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentProfileDto> getStudentProfile(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(studentService.getProfile(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateProfile(@PathVariable("id") Integer id, @RequestBody Student studentData) {
        return ResponseEntity.ok(studentService.updateProfile(id, studentData));
    }

    @PostMapping("/{id}/skills")
    public ResponseEntity<StudentSkill> addSkill(@PathVariable("id") Integer id, @RequestBody StudentSkill skillData) {
        return ResponseEntity.ok(studentService.addOrUpdateSkill(id, skillData));
    }

    @DeleteMapping("/{id}/skills/{skillId}")
    public ResponseEntity<Void> removeSkill(@PathVariable("id") Integer id,
                                            @PathVariable("skillId") Integer skillId,
                                            @RequestParam("skillType") String skillType) {
        studentService.removeSkill(id, skillId, skillType);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/availability")
    public ResponseEntity<Void> updateAvailability(@PathVariable("id") Integer id, @RequestBody List<Availability> slots) {
        studentService.updateAvailability(id, slots);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/matches")
    public ResponseEntity<List<MatchingService.RecommendationResult>> getMatches(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(matchingService.findMatchesForLearner(id));
    }
}
