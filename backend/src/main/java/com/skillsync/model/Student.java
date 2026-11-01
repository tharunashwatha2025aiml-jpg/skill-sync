package com.skillsync.model;

import java.time.LocalDateTime;

public class Student {
    private Integer studentId;
    private String fullName;
    private String email;
    private String registrationNumber;
    private String department;
    private String academicYear;
    private String bio;
    private String avatarUrl;
    private String passwordHash;
    private String role; // STUDENT, ADMIN
    private String accountStatus; // ACTIVE, INACTIVE
    private Integer creditBalance;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Student() {}

    public Student(Integer studentId, String fullName, String email, String registrationNumber,
                   String department, String academicYear, String bio, String avatarUrl,
                   String passwordHash, String role, String accountStatus, Integer creditBalance) {
        this.studentId = studentId;
        this.fullName = fullName;
        this.email = email;
        this.registrationNumber = registrationNumber;
        this.department = department;
        this.academicYear = academicYear;
        this.bio = bio;
        this.avatarUrl = avatarUrl;
        this.passwordHash = passwordHash;
        this.role = role;
        this.accountStatus = accountStatus;
        this.creditBalance = creditBalance;
    }

    public Integer getStudentId() { return studentId; }
    public void setStudentId(Integer studentId) { this.studentId = studentId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRegistrationNumber() { return registrationNumber; }
    public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getAccountStatus() { return accountStatus; }
    public void setAccountStatus(String accountStatus) { this.accountStatus = accountStatus; }

    public Integer getCreditBalance() { return creditBalance; }
    public void setCreditBalance(Integer creditBalance) { this.creditBalance = creditBalance; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
