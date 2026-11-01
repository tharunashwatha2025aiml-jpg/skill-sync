-- ====================================================================
-- SkillSync: Student Skill Matching and Peer Learning Platform
-- Relational Database Schema (MySQL 8.x / InnoDB)
-- ====================================================================

CREATE DATABASE IF NOT EXISTS skillsync;
USE skillsync;

-- Drop existing tables in reverse dependency order
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS student_skills;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS students;

-- 1. Students Table
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    academic_year VARCHAR(30) NOT NULL,
    bio VARCHAR(500),
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_students_email (email),
    INDEX idx_students_dept (department)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Skills Catalog Table
CREATE TABLE skills (
    skill_id INT AUTO_INCREMENT PRIMARY KEY,
    skill_name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    INDEX idx_skills_category (category),
    INDEX idx_skills_name (skill_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Student Skills Mapping Table (Junction Table)
CREATE TABLE student_skills (
    student_skill_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    skill_id INT NOT NULL,
    skill_type ENUM('TEACH', 'LEARN') NOT NULL,
    proficiency ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED'),
    description VARCHAR(300),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_student_skill_type UNIQUE (student_id, skill_id, skill_type),
    CONSTRAINT fk_student_skills_student FOREIGN KEY (student_id) REFERENCES students (student_id) ON DELETE CASCADE,
    CONSTRAINT fk_student_skills_skill FOREIGN KEY (skill_id) REFERENCES skills (skill_id) ON DELETE CASCADE,
    INDEX idx_student_skills_lookup (student_id, skill_type),
    INDEX idx_student_skills_skill_type (skill_id, skill_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Learning Sessions Table
CREATE TABLE sessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    requester_id INT NOT NULL,
    recipient_id INT NOT NULL,
    skill_id INT NOT NULL,
    proposed_at DATETIME NOT NULL,
    message VARCHAR(500),
    status ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completed_at DATETIME NULL,
    CONSTRAINT fk_sessions_requester FOREIGN KEY (requester_id) REFERENCES students (student_id) ON DELETE RESTRICT,
    CONSTRAINT fk_sessions_recipient FOREIGN KEY (recipient_id) REFERENCES students (student_id) ON DELETE RESTRICT,
    CONSTRAINT fk_sessions_skill FOREIGN KEY (skill_id) REFERENCES skills (skill_id) ON DELETE RESTRICT,
    CONSTRAINT chk_different_participants CHECK (requester_id <> recipient_id),
    INDEX idx_sessions_requester (requester_id),
    INDEX idx_sessions_recipient (recipient_id),
    INDEX idx_sessions_status (status),
    INDEX idx_sessions_proposed_at (proposed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Reviews and Ratings Table
CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT NOT NULL,
    reviewer_id INT NOT NULL,
    reviewed_student_id INT NOT NULL,
    rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_review_session_reviewer UNIQUE (session_id, reviewer_id),
    CONSTRAINT fk_reviews_session FOREIGN KEY (session_id) REFERENCES sessions (session_id) ON DELETE CASCADE,
    CONSTRAINT fk_reviews_reviewer FOREIGN KEY (reviewer_id) REFERENCES students (student_id) ON DELETE CASCADE,
    CONSTRAINT fk_reviews_reviewed FOREIGN KEY (reviewed_student_id) REFERENCES students (student_id) ON DELETE CASCADE,
    CONSTRAINT chk_no_self_review CHECK (reviewer_id <> reviewed_student_id),
    INDEX idx_reviews_reviewed_student (reviewed_student_id),
    INDEX idx_reviews_session (session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
