package com.skillsync.repository;

import com.skillsync.model.Student;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public class StudentRepository {

    private final JdbcTemplate jdbcTemplate;

    public StudentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Student> studentRowMapper = (rs, rowNum) -> {
        Student s = new Student();
        s.setStudentId(rs.getInt("student_id"));
        s.setFullName(rs.getString("full_name"));
        s.setEmail(rs.getString("email"));
        s.setRegistrationNumber(rs.getString("registration_number"));
        s.setDepartment(rs.getString("department"));
        s.setAcademicYear(rs.getString("academic_year"));
        s.setBio(rs.getString("bio"));
        s.setAvatarUrl(rs.getString("avatar_url"));
        s.setPasswordHash(rs.getString("password_hash"));
        s.setRole(rs.getString("role"));
        s.setAccountStatus(rs.getString("account_status"));
        s.setCreditBalance(rs.getInt("credit_balance"));
        Timestamp ca = rs.getTimestamp("created_at");
        if (ca != null) s.setCreatedAt(ca.toLocalDateTime());
        Timestamp ua = rs.getTimestamp("updated_at");
        if (ua != null) s.setUpdatedAt(ua.toLocalDateTime());
        return s;
    };

    public Optional<Student> findById(Integer id) {
        String sql = "SELECT * FROM students WHERE student_id = ?";
        List<Student> results = jdbcTemplate.query(sql, studentRowMapper, id);
        return results.stream().findFirst();
    }

    public Optional<Student> findByEmail(String email) {
        String sql = "SELECT * FROM students WHERE email = ?";
        List<Student> results = jdbcTemplate.query(sql, studentRowMapper, email);
        return results.stream().findFirst();
    }

    public Optional<Student> findByRegistrationNumber(String regNo) {
        String sql = "SELECT * FROM students WHERE registration_number = ?";
        List<Student> results = jdbcTemplate.query(sql, studentRowMapper, regNo);
        return results.stream().findFirst();
    }

    public Student save(Student student) {
        if (student.getStudentId() == null) {
            String sql = "INSERT INTO students (full_name, email, registration_number, department, academic_year, bio, avatar_url, password_hash, role, account_status, credit_balance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, student.getFullName());
                ps.setString(2, student.getEmail());
                ps.setString(3, student.getRegistrationNumber());
                ps.setString(4, student.getDepartment());
                ps.setString(5, student.getAcademicYear());
                ps.setString(6, student.getBio());
                ps.setString(7, student.getAvatarUrl() != null ? student.getAvatarUrl() : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150");
                ps.setString(8, student.getPasswordHash());
                ps.setString(9, student.getRole() != null ? student.getRole() : "STUDENT");
                ps.setString(10, student.getAccountStatus() != null ? student.getAccountStatus() : "ACTIVE");
                ps.setInt(11, student.getCreditBalance() != null ? student.getCreditBalance() : 5);
                return ps;
            }, keyHolder);

            if (keyHolder.getKey() != null) {
                student.setStudentId(keyHolder.getKey().intValue());
            }
            return student;
        } else {
            String sql = "UPDATE students SET full_name = ?, department = ?, academic_year = ?, bio = ?, avatar_url = ?, account_status = ?, credit_balance = ? WHERE student_id = ?";
            jdbcTemplate.update(sql,
                student.getFullName(),
                student.getDepartment(),
                student.getAcademicYear(),
                student.getBio(),
                student.getAvatarUrl(),
                student.getAccountStatus(),
                student.getCreditBalance(),
                student.getStudentId()
            );
            return student;
        }
    }

    public void updatePassword(Integer studentId, String passwordHash) {
        String sql = "UPDATE students SET password_hash = ? WHERE student_id = ?";
        jdbcTemplate.update(sql, passwordHash, studentId);
    }

    public List<Student> findAll() {
        return jdbcTemplate.query("SELECT * FROM students ORDER BY student_id DESC", studentRowMapper);
    }

    public List<Student> searchByNameOrDept(String query) {
        String sql = "SELECT * FROM students WHERE LOWER(full_name) LIKE ? OR LOWER(department) LIKE ? ORDER BY full_name ASC";
        String pattern = "%" + query.toLowerCase() + "%";
        return jdbcTemplate.query(sql, studentRowMapper, pattern, pattern);
    }
}
