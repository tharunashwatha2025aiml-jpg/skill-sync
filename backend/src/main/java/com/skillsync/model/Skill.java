package com.skillsync.model;

public class Skill {
    private Integer skillId;
    private String skillName;
    private String category;
    private String description;
    private Boolean activeStatus;

    public Skill() {}

    public Skill(Integer skillId, String skillName, String category, String description, Boolean activeStatus) {
        this.skillId = skillId;
        this.skillName = skillName;
        this.category = category;
        this.description = description;
        this.activeStatus = activeStatus;
    }

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
