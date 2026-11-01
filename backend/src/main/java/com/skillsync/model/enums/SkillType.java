package com.skillsync.model.enums;

/**
 * Represents the intention for a student-skill mapping.
 * TEACH: The student can teach or mentor peers in this skill.
 * LEARN: The student wants to learn or improve this skill.
 */
public enum SkillType {
    TEACH,
    LEARN;

    public static SkillType fromString(String value) {
        if (value == null) return null;
        return SkillType.valueOf(value.trim().toUpperCase());
    }
}
