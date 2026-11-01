package com.skillsync.model;

import java.time.LocalDateTime;

public class StudentSkill {
    private Integer studentSkillId;
    private Integer studentId;
    private Integer skillId;
    private String skillType; // TEACH, LEARN
    private String proficiencyLevel; // Beginner, Intermediate, Advanced
    private String description;
    private LocalDateTime createdAt;

    // Joined fields for convenience
    private String skillName;
    private String category;

    public StudentSkill() {}

    public Integer getStudentSkillId() { return studentSkillId; }
    public void setStudentSkillId(Integer studentSkillId) { this.studentSkillId = studentSkillId; }

    public Integer getStudentId() { return studentId; }
    public void setStudentId(Integer studentId) { this.studentId = studentId; }

    public Integer getSkillId() { return skillId; }
    public void setSkillId(Integer skillId) { this.skillId = skillId; }

    public String getSkillType() { return skillType; }
    public void setSkillType(String skillType) { this.skillType = skillType; }

    public String getProficiencyLevel() { return proficiencyLevel; }
    public void setProficiencyLevel(String proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
