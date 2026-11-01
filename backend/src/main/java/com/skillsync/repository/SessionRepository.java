package com.skillsync.repository;

import com.skillsync.model.Session;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public class SessionRepository {

    private final JdbcTemplate jdbcTemplate;

    public SessionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Session> sessionRowMapper = (rs, rowNum) -> {
        Session s = new Session();
        s.setSessionId(rs.getInt("session_id"));
        s.setLearnerId(rs.getInt("learner_id"));
        s.setTeacherId(rs.getInt("teacher_id"));
        s.setSkillId(rs.getInt("skill_id"));
        Date sd = rs.getDate("session_date");
        if (sd != null) s.setSessionDate(sd.toLocalDate());
        Time st = rs.getTime("start_time");
        if (st != null) s.setStartTime(st.toLocalTime());
        s.setDurationMinutes(rs.getInt("duration_minutes"));
        s.setFormat(rs.getString("format"));
        s.setLearningObjective(rs.getString("learning_objective"));
        s.setStatus(rs.getString("status"));
        Timestamp ca = rs.getTimestamp("created_at");
        if (ca != null) s.setCreatedAt(ca.toLocalDateTime());
        Timestamp ua = rs.getTimestamp("updated_at");
        if (ua != null) s.setUpdatedAt(ua.toLocalDateTime());

        try {
            s.setLearnerName(rs.getString("learner_name"));
            s.setTeacherName(rs.getString("teacher_name"));
            s.setSkillName(rs.getString("skill_name"));
        } catch (Exception ignored) {}

        return s;
    };

    private final String BASE_SELECT_SQL =
        "SELECT s.*, l.full_name AS learner_name, t.full_name AS teacher_name, sk.skill_name " +
        "FROM sessions s " +
        "JOIN students l ON s.learner_id = l.student_id " +
        "JOIN students t ON s.teacher_id = t.student_id " +
        "JOIN skills sk ON s.skill_id = sk.skill_id ";

    public Optional<Session> findById(Integer sessionId) {
        String sql = BASE_SELECT_SQL + "WHERE s.session_id = ?";
        List<Session> list = jdbcTemplate.query(sql, sessionRowMapper, sessionId);
        return list.stream().findFirst();
    }

    public List<Session> findIncomingByTeacherId(Integer teacherId) {
        String sql = BASE_SELECT_SQL + "WHERE s.teacher_id = ? AND s.status = 'PENDING' ORDER BY s.session_date ASC, s.start_time ASC";
        return jdbcTemplate.query(sql, sessionRowMapper, teacherId);
    }

    public List<Session> findOutgoingByLearnerId(Integer learnerId) {
        String sql = BASE_SELECT_SQL + "WHERE s.learner_id = ? AND s.status = 'PENDING' ORDER BY s.session_date ASC, s.start_time ASC";
        return jdbcTemplate.query(sql, sessionRowMapper, learnerId);
    }

    public List<Session> findUpcomingByStudentId(Integer studentId) {
        String sql = BASE_SELECT_SQL + "WHERE (s.learner_id = ? OR s.teacher_id = ?) AND s.status = 'ACCEPTED' ORDER BY s.session_date ASC, s.start_time ASC";
        return jdbcTemplate.query(sql, sessionRowMapper, studentId, studentId);
    }

    public List<Session> findCompletedByStudentId(Integer studentId) {
        String sql = BASE_SELECT_SQL + "WHERE (s.learner_id = ? OR s.teacher_id = ?) AND s.status = 'COMPLETED' ORDER BY s.session_date DESC";
        return jdbcTemplate.query(sql, sessionRowMapper, studentId, studentId);
    }

    public List<Session> findHistoryByStudentId(Integer studentId) {
        String sql = BASE_SELECT_SQL + "WHERE (s.learner_id = ? OR s.teacher_id = ?) ORDER BY s.session_date DESC, s.start_time DESC";
        return jdbcTemplate.query(sql, sessionRowMapper, studentId, studentId);
    }

    public boolean hasOverlappingAcceptedSession(Integer teacherId, LocalDate date, LocalTime startTime, Integer durationMinutes) {
        LocalTime endTime = startTime.plusMinutes(durationMinutes);
        String sql = "SELECT COUNT(*) FROM sessions WHERE teacher_id = ? AND session_date = ? AND status = 'ACCEPTED' " +
                     "AND ((start_time <= ? AND ADDTIME(start_time, SECONDS_TO_TIME(duration_minutes * 60)) > ?) " +
                     "OR (start_time < ? AND ADDTIME(start_time, SECONDS_TO_TIME(duration_minutes * 60)) >= ?))";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class,
            teacherId, Date.valueOf(date), Time.valueOf(startTime), Time.valueOf(startTime), Time.valueOf(endTime), Time.valueOf(endTime));
        return count != null && count > 0;
    }

    public Session save(Session s) {
        if (s.getSessionId() == null) {
            String sql = "INSERT INTO sessions (learner_id, teacher_id, skill_id, session_date, start_time, duration_minutes, format, learning_objective, status) " +
                         "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setInt(1, s.getLearnerId());
                ps.setInt(2, s.getTeacherId());
                ps.setInt(3, s.getSkillId());
                ps.setDate(4, Date.valueOf(s.getSessionDate()));
                ps.setTime(5, Time.valueOf(s.getStartTime()));
                ps.setInt(6, s.getDurationMinutes());
                ps.setString(7, s.getFormat());
                ps.setString(8, s.getLearningObjective());
                ps.setString(9, s.getStatus() != null ? s.getStatus() : "PENDING");
                return ps;
            }, keyHolder);

            if (keyHolder.getKey() != null) {
                s.setSessionId(keyHolder.getKey().intValue());
            }
            return s;
        } else {
            String sql = "UPDATE sessions SET status = ? WHERE session_id = ?";
            jdbcTemplate.update(sql, s.getStatus(), s.getSessionId());
            return s;
        }
    }

    public void updateStatus(Integer sessionId, String status) {
        jdbcTemplate.update("UPDATE sessions SET status = ? WHERE session_id = ?", status, sessionId);
    }

    public Integer countCompletedByStudentId(Integer studentId) {
        String sql = "SELECT COUNT(*) FROM sessions WHERE (learner_id = ? OR teacher_id = ?) AND status = 'COMPLETED'";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, studentId, studentId);
        return count != null ? count : 0;
    }

    public Integer countTotalSessions() {
        Integer count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM sessions", Integer.class);
        return count != null ? count : 0;
    }
}
