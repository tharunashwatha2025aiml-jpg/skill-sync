package com.skillsync.model.enums;

/**
 * Represents student proficiency for a skill.
 */
public enum ProficiencyLevel {
    BEGINNER,
    INTERMEDIATE,
    ADVANCED;

    public static ProficiencyLevel fromString(String value) {
        if (value == null) return null;
        return ProficiencyLevel.valueOf(value.trim().toUpperCase());
    }
}
