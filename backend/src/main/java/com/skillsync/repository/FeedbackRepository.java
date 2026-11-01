package com.skillsync.repository;

import com.skillsync.model.Feedback;
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
public class FeedbackRepository {

    private final JdbcTemplate jdbcTemplate;

    public FeedbackRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Feedback> feedbackRowMapper = (rs, rowNum) -> {
        Feedback f = new Feedback();
        f.setFeedbackId(rs.getInt("feedback_id"));
        f.setSessionId(rs.getInt("session_id"));
        f.setReviewerId(rs.getInt("reviewer_id"));
        f.setTeacherId(rs.getInt("teacher_id"));
        f.setRating(rs.getInt("rating"));
        f.setComment(rs.getString("comment"));
        f.setOutcomeSummary(rs.getString("outcome_summary"));
        Timestamp ca = rs.getTimestamp("created_at");
        if (ca != null) f.setCreatedAt(ca.toLocalDateTime());

        try {
            f.setReviewerName(rs.getString("reviewer_name"));
        } catch (Exception ignored) {}

        return f;
    };

    public Optional<Feedback> findBySessionId(Integer sessionId) {
        String sql = "SELECT f.*, r.full_name AS reviewer_name FROM feedback f JOIN students r ON f.reviewer_id = r.student_id WHERE f.session_id = ?";
        List<Feedback> list = jdbcTemplate.query(sql, feedbackRowMapper, sessionId);
        return list.stream().findFirst();
    }

    public List<Feedback> findByTeacherId(Integer teacherId) {
        String sql = "SELECT f.*, r.full_name AS reviewer_name FROM feedback f JOIN students r ON f.reviewer_id = r.student_id WHERE f.teacher_id = ? ORDER BY f.created_at DESC";
        return jdbcTemplate.query(sql, feedbackRowMapper, teacherId);
    }

    public Double getAverageRatingForTeacher(Integer teacherId) {
        String sql = "SELECT AVG(rating) FROM feedback WHERE teacher_id = ?";
        Double avg = jdbcTemplate.queryForObject(sql, Double.class, teacherId);
        return avg != null ? Math.round(avg * 10.0) / 10.0 : 0.0;
    }

    public Integer getReviewCountForTeacher(Integer teacherId) {
        String sql = "SELECT COUNT(*) FROM feedback WHERE teacher_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, teacherId);
        return count != null ? count : 0;
    }

    public Feedback save(Feedback f) {
        String sql = "INSERT INTO feedback (session_id, reviewer_id, teacher_id, rating, comment, outcome_summary) VALUES (?, ?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, f.getSessionId());
            ps.setInt(2, f.getReviewerId());
            ps.setInt(3, f.getTeacherId());
            ps.setInt(4, f.getRating());
            ps.setString(5, f.getComment());
            ps.setString(6, f.getOutcomeSummary());
            return ps;
        }, keyHolder);

        if (keyHolder.getKey() != null) {
            f.setFeedbackId(keyHolder.getKey().intValue());
        }
        return f;
    }
}
