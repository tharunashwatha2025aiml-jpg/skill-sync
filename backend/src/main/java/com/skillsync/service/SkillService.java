package com.skillsync.service;

import com.skillsync.dto.SkillDto;
import com.skillsync.exception.BadRequestException;
import com.skillsync.exception.ResourceNotFoundException;
import com.skillsync.model.Skill;
import com.skillsync.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<Skill> getAllActiveSkills() {
        return skillRepository.findAllActive();
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public List<String> getCategories() {
        return skillRepository.findAllCategories();
    }

    public Skill getSkillById(Integer skillId) {
        return skillRepository.findById(skillId)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with ID: " + skillId));
    }

    public Skill createSkill(SkillDto dto) {
        if (skillRepository.findByName(dto.getSkillName()).isPresent()) {
            throw new BadRequestException("Skill with name '" + dto.getSkillName() + "' already exists.");
        }
        Skill skill = new Skill();
        skill.setSkillName(dto.getSkillName());
        skill.setCategory(dto.getCategory());
        skill.setDescription(dto.getDescription());
        skill.setActiveStatus(dto.getActiveStatus() != null ? dto.getActiveStatus() : true);
        return skillRepository.save(skill);
    }

    public Skill updateSkill(Integer skillId, SkillDto dto) {
        Skill existing = getSkillById(skillId);
        existing.setSkillName(dto.getSkillName());
        existing.setCategory(dto.getCategory());
        existing.setDescription(dto.getDescription());
        if (dto.getActiveStatus() != null) {
            existing.setActiveStatus(dto.getActiveStatus());
        }
        return skillRepository.save(existing);
    }

    public void toggleActiveStatus(Integer skillId, boolean status) {
        skillRepository.updateActiveStatus(skillId, status);
    }
}
