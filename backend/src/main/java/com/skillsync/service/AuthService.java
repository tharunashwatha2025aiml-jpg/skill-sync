package com.skillsync.service;

import com.skillsync.dto.AuthResponse;
import com.skillsync.dto.LoginRequest;
import com.skillsync.dto.RegisterRequest;
import com.skillsync.exception.BadRequestException;
import com.skillsync.exception.ResourceNotFoundException;
import com.skillsync.model.Student;
import com.skillsync.repository.StudentRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(StudentRepository studentRepository, PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(RegisterRequest req) {
        // Validate duplicate email
        if (studentRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new BadRequestException("An account with email " + req.getEmail() + " already exists.");
        }

        // Validate duplicate registration number
        if (studentRepository.findByRegistrationNumber(req.getRegistrationNumber()).isPresent()) {
            throw new BadRequestException("Registration number " + req.getRegistrationNumber() + " is already registered.");
        }

        Student student = new Student();
        student.setFullName(req.getFullName());
        student.setEmail(req.getEmail());
        student.setRegistrationNumber(req.getRegistrationNumber());
        student.setDepartment(req.getDepartment());
        student.setAcademicYear(req.getAcademicYear());
        student.setPasswordHash(passwordEncoder.encode(req.getPassword()));
        student.setRole("STUDENT");
        student.setAccountStatus("ACTIVE");
        student.setCreditBalance(5);

        Student saved = studentRepository.save(student);
        String dummyToken = UUID.randomUUID().toString();
        return new AuthResponse(dummyToken, "Registration successful!", saved);
    }

    public AuthResponse login(LoginRequest req) {
        Student student = studentRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("No account found with email: " + req.getEmail()));

        if (!passwordEncoder.matches(req.getPassword(), student.getPasswordHash())) {
            throw new BadRequestException("Invalid credentials. Please check your password.");
        }

        if ("INACTIVE".equalsIgnoreCase(student.getAccountStatus())) {
            throw new BadRequestException("Your account has been deactivated. Please contact an administrator.");
        }

        String dummyToken = UUID.randomUUID().toString();
        return new AuthResponse(dummyToken, "Login successful!", student);
    }
}
