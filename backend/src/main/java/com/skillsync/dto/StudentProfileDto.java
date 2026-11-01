package com.skillsync.dto;

import com.skillsync.model.Availability;
import com.skillsync.model.StudentSkill;
import java.util.List;

public class StudentProfileDto {
    private Integer studentId;
    private String fullName;
    private String email;
    private String registrationNumber;
    private String department;
    private String academicYear;
    private String bio;
    private String avatarUrl;
    private String role;
    private String accountStatus;
    private Integer creditBalance;
    private Double averageRating;
    private Integer totalReviews;
    private Integer completedSessionsCount;
    private List<StudentSkill> teachSkills;
    private List<StudentSkill> learnSkills;
    private List<Availability> availabilitySlots;

    public StudentProfileDto() {}

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

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getAccountStatus() { return accountStatus; }
    public void setAccountStatus(String accountStatus) { this.accountStatus = accountStatus; }

    public Integer getCreditBalance() { return creditBalance; }
    public void setCreditBalance(Integer creditBalance) { this.creditBalance = creditBalance; }

    public Double getAverageRating() { return averageRating; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }

    public Integer getTotalReviews() { return totalReviews; }
    public void setTotalReviews(Integer totalReviews) { this.totalReviews = totalReviews; }

    public Integer getCompletedSessionsCount() { return completedSessionsCount; }
    public void setCompletedSessionsCount(Integer completedSessionsCount) { this.completedSessionsCount = completedSessionsCount; }

    public List<StudentSkill> getTeachSkills() { return teachSkills; }
    public void setTeachSkills(List<StudentSkill> teachSkills) { this.teachSkills = teachSkills; }

    public List<StudentSkill> getLearnSkills() { return learnSkills; }
    public void setLearnSkills(List<StudentSkill> learnSkills) { this.learnSkills = learnSkills; }

    public List<Availability> getAvailabilitySlots() { return availabilitySlots; }
    public void setAvailabilitySlots(List<Availability> availabilitySlots) { this.availabilitySlots = availabilitySlots; }
}
