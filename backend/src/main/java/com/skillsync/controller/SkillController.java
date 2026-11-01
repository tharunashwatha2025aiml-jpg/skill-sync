package com.skillsync.controller;

import com.skillsync.dto.SkillDto;
import com.skillsync.model.Skill;
import com.skillsync.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<List<Skill>> getAllActiveSkills() {
        return ResponseEntity.ok(skillService.getAllActiveSkills());
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(skillService.getCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(skillService.getSkillById(id));
    }

    @PostMapping
    public ResponseEntity<Skill> createSkill(@Valid @RequestBody SkillDto dto) {
        Skill created = skillService.createSkill(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable("id") Integer id, @Valid @RequestBody SkillDto dto) {
        return ResponseEntity.ok(skillService.updateSkill(id, dto));
    }
}
