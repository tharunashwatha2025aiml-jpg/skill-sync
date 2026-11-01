package com.skillsync.repository;

import com.skillsync.model.StudentSkill;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.List;

@Repository
public class StudentSkillRepository {

    private final JdbcTemplate jdbcTemplate;

    public StudentSkillRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<StudentSkill> studentSkillRowMapper = (rs, rowNum) -> {
        StudentSkill ss = new StudentSkill();
        ss.setStudentSkillId(rs.getInt("student_skill_id"));
        ss.setStudentId(rs.getInt("student_id"));
        ss.setSkillId(rs.getInt("skill_id"));
        ss.setSkillType(rs.getString("skill_type"));
        ss.setProficiencyLevel(rs.getString("proficiency_level"));
        ss.setDescription(rs.getString("description"));
        Timestamp ca = rs.getTimestamp("created_at");
        if (ca != null) ss.setCreatedAt(ca.toLocalDateTime());

        // Joined columns
        try {
            ss.setSkillName(rs.getString("skill_name"));
            ss.setCategory(rs.getString("category"));
        } catch (Exception ignored) {}

        return ss;
    };

    public List<StudentSkill> findByStudentIdAndType(Integer studentId, String skillType) {
        String sql = "SELECT ss.*, s.skill_name, s.category FROM student_skills ss " +
                     "JOIN skills s ON ss.skill_id = s.skill_id " +
                     "WHERE ss.student_id = ? AND ss.skill_type = ? " +
                     "ORDER BY s.skill_name ASC";
        return jdbcTemplate.query(sql, studentSkillRowMapper, studentId, skillType);
    }

    public List<StudentSkill> findByStudentId(Integer studentId) {
        String sql = "SELECT ss.*, s.skill_name, s.category FROM student_skills ss " +
                     "JOIN skills s ON ss.skill_id = s.skill_id " +
                     "WHERE ss.student_id = ? " +
                     "ORDER BY ss.skill_type DESC, s.skill_name ASC";
        return jdbcTemplate.query(sql, studentSkillRowMapper, studentId);
    }

    public StudentSkill addSkill(StudentSkill ss) {
        String sql = "INSERT INTO student_skills (student_id, skill_id, skill_type, proficiency_level, description) VALUES (?, ?, ?, ?, ?) " +
                     "ON DUPLICATE KEY UPDATE proficiency_level = VALUES(proficiency_level), description = VALUES(description)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, ss.getStudentId());
            ps.setInt(2, ss.getSkillId());
            ps.setString(3, ss.getSkillType());
            ps.setString(4, ss.getProficiencyLevel());
            ps.setString(5, ss.getDescription());
            return ps;
        }, keyHolder);

        if (keyHolder.getKey() != null) {
            ss.setStudentSkillId(keyHolder.getKey().intValue());
        }
        return ss;
    }

    public void removeSkill(Integer studentId, Integer skillId, String skillType) {
        String sql = "DELETE FROM student_skills WHERE student_id = ? AND skill_id = ? AND skill_type = ?";
        jdbcTemplate.update(sql, studentId, skillId, skillType);
    }

    public boolean studentOffersSkill(Integer studentId, Integer skillId) {
        String sql = "SELECT COUNT(*) FROM student_skills WHERE student_id = ? AND skill_id = ? AND skill_type = 'TEACH'";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, studentId, skillId);
        return count != null && count > 0;
    }
}
