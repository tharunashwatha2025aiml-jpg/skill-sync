package com.skillsync.dto;

import jakarta.validation.constraints.NotBlank;

public class SkillDto {
    private Integer skillId;

    @NotBlank(message = "Skill name is required")
    private String skillName;

    @NotBlank(message = "Category is required")
    private String category;

    private String description;
    private Boolean activeStatus = true;

    public SkillDto() {}

    public Integer getSkillId() { return skillId; }
    public void setSkillId(Integer skillId) { this.skillId = skillId; }

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getActiveStatus() { return activeStatus; }
    public void setActiveStatus(Boolean activeStatus) { this.activeStatus = activeStatus; }
}
