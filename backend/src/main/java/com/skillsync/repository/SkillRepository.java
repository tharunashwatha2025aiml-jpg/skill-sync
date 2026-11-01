package com.skillsync.repository;

import com.skillsync.model.Skill;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Repository
public class SkillRepository {

    private final JdbcTemplate jdbcTemplate;

    public SkillRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Skill> skillRowMapper = (rs, rowNum) -> {
        Skill s = new Skill();
        s.setSkillId(rs.getInt("skill_id"));
        s.setSkillName(rs.getString("skill_name"));
        s.setCategory(rs.getString("category"));
        s.setDescription(rs.getString("description"));
        s.setActiveStatus(rs.getBoolean("active_status"));
        return s;
    };

    public List<Skill> findAllActive() {
        return jdbcTemplate.query("SELECT * FROM skills WHERE active_status = TRUE ORDER BY skill_name ASC", skillRowMapper);
    }

    public List<Skill> findAll() {
        return jdbcTemplate.query("SELECT * FROM skills ORDER BY skill_id DESC", skillRowMapper);
    }

    public Optional<Skill> findById(Integer skillId) {
        List<Skill> results = jdbcTemplate.query("SELECT * FROM skills WHERE skill_id = ?", skillRowMapper, skillId);
        return results.stream().findFirst();
    }

    public Optional<Skill> findByName(String name) {
        List<Skill> results = jdbcTemplate.query("SELECT * FROM skills WHERE LOWER(skill_name) = LOWER(?)", skillRowMapper, name);
        return results.stream().findFirst();
    }

    public List<String> findAllCategories() {
        return jdbcTemplate.queryForList("SELECT DISTINCT category FROM skills WHERE active_status = TRUE ORDER BY category ASC", String.class);
    }

    public Skill save(Skill skill) {
        if (skill.getSkillId() == null) {
            String sql = "INSERT INTO skills (skill_name, category, description, active_status) VALUES (?, ?, ?, ?)";
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, skill.getSkillName());
                ps.setString(2, skill.getCategory());
                ps.setString(3, skill.getDescription());
                ps.setBoolean(4, skill.getActiveStatus() != null ? skill.getActiveStatus() : true);
                return ps;
            }, keyHolder);

            if (keyHolder.getKey() != null) {
                skill.setSkillId(keyHolder.getKey().intValue());
            }
            return skill;
        } else {
            String sql = "UPDATE skills SET skill_name = ?, category = ?, description = ?, active_status = ? WHERE skill_id = ?";
            jdbcTemplate.update(sql, skill.getSkillName(), skill.getCategory(), skill.getDescription(), skill.getActiveStatus(), skill.getSkillId());
            return skill;
        }
    }

    public void updateActiveStatus(Integer skillId, boolean status) {
        jdbcTemplate.update("UPDATE skills SET active_status = ? WHERE skill_id = ?", status, skillId);
    }
}
