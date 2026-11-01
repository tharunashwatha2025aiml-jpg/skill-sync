package com.skillsync.model.enums;

/**
 * Lifecycle states of a peer learning session.
 */
public enum SessionStatus {
    PENDING,
    ACCEPTED,
    REJECTED,
    CANCELLED,
    COMPLETED;

    public static SessionStatus fromString(String value) {
        if (value == null) return null;
        return SessionStatus.valueOf(value.trim().toUpperCase());
    }
}
