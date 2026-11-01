# SkillSync: A Student Skill Matching and Peer Learning Platform

> **Tagline:** Learn Together. Grow Together.  
> **Official Title:** SkillSync: A Student Skill Matching and Peer Learning Platform  
> **Course Domain:** Full-Stack Object-Oriented Programming (OOPs) & Database Management Systems (DBMS) College Project

---

## 1. Project Vision & Overview

**SkillSync** is a modern, responsive, full-stack peer learning marketplace designed specifically for college communities. It connects students who possess specific skills with peers who wish to learn those skills.

For example:
- **Student A** (Computer Science 3rd Year) teaches **Java & Algorithms** but wants to learn **Figma UI/UX Design**.
- **Student B** (Design & Media 2nd Year) teaches **Figma & UI/UX Design** but wants to learn **Python & Java**.
- **SkillSync** matches Student A and Student B, enabling them to discover each other, request 1-on-1 learning sessions, schedule times, track session progress, and submit peer feedback.

---

## 2. Technology Stack & System Architecture

The application is structured into clean, decoupled layers:

| Layer | Technology Used | Description |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+ Modular SPA) | Premium SaaS design system featuring Deep Navy (`#0F172A`), Indigo (`#4F46E5`), Violet (`#7C3AED`), and Cyan (`#06B6D4`). Includes client routing, real-time validation, and interactive modals. |
| **Backend Framework** | Java 17+, Spring Boot 3.2+ | RESTful Web API controllers, business logic service beans, and exception handlers. |
| **Database** | MySQL 8 | Relational database (`skillsync`) with normalized 3NF schema, foreign keys, unique constraints, and indexes. |
| **Data Persistence** | Spring Data JDBC / `JdbcTemplate` | Parameterized SQL queries preventing SQL injection, prepared statements, and transactional safety. |
| **Security** | Spring Security & BCrypt | Password hashing (`BCryptPasswordEncoder`), role-based access control (`STUDENT`, `ADMIN`), and route guards. |
| **Build Tool** | Apache Maven | Modular dependency management and lifecycle plugins. |
| **Portable Execution** | Python 3 Runner (`server.py`) | Direct executable backend runner for instant demonstration on macOS without requiring JDK/MySQL daemons. |

---

## 3. Database Design & Relational Schema (MySQL 8)

The MySQL 8 database is named `skillsync`. The schema design follows 3rd Normal Form (3NF) principles:

```
                                +-------------------+
                                |     STUDENTS      |
                                +-------------------+
                                | PK  student_id    |
                                |     email (UQ)    |
                                |     reg_no (UQ)   |
                                |     password_hash |
                                +---------+---------+
                                          |
          +-------------------------------+-------------------------------+
          | 1                             | 1                             | 1
          | N                             | N                             | N
+---------v---------+           +---------v---------+           +---------v---------+
|  STUDENT_SKILLS   |           |   AVAILABILITY    |           |     SESSIONS      |
+-------------------+           +-------------------+           +-------------------+
| PK  id            |           | PK  id            |           | PK  session_id    |
| FK  student_id    |           | FK  student_id    |           | FK  learner_id    |
| FK  skill_id      |           |     day_of_week   |           | FK  teacher_id    |
|     skill_type    |           |     start_time    |           | FK  skill_id      |
|     proficiency   |           |     end_time      |           |     status        |
+---------+---------+           +-------------------+           +---------+---------+
          |                                                               |
          v N                                                             v 1
+-------------------+                                           +-------------------+
|      SKILLS       |                                           |     FEEDBACK      |
+-------------------+                                           +-------------------+
| PK  skill_id      |                                           | PK  feedback_id   |
| UQ  skill_name    |                                           | FK  session_id(UQ)|
|     category      |                                           |     rating (1-5)  |
+-------------------+                                           +-------------------+
```

### Key Database Tables:
1. `students`: Stores student credentials, department, academic year, hashed passwords, role, and status.
2. `skills`: Catalogue of active academic, programming, design, and business skills.
3. `student_skills`: Junction table binding students to skills with `skill_type` (`TEACH` or `LEARN`) and `proficiency_level`. Enforces UNIQUE `(student_id, skill_id, skill_type)`.
4. `availability`: Day-of-week and time slot ranges (`14:00-17:00`) for peer sessions.
5. `sessions`: Tracks session booking lifecycle (`PENDING` -> `ACCEPTED` / `REJECTED` / `CANCELLED` -> `COMPLETED`).
6. `feedback`: Enforces 1 verified review per learner per completed session, storing ratings (1-5 stars) and comments.
7. `credit_transactions`: Optional time-credit ledger tracking earned/spent teaching credits.

---

## 4. Object-Oriented & DBMS Software Design Principles

- **Encapsulation:** Model domain fields (e.g., `Student`, `Session`) are private with type-safe getter/setter accessors.
- **Abstraction:** Controllers communicate with business services via clean interface boundaries without exposing raw SQL or persistence mechanisms.
- **Polymorphism:** Exception handling uses `@RestControllerAdvice` polymorphism to convert custom runtime exceptions (`ResourceNotFoundException`, `BadRequestException`) into standard HTTP error responses.
- **Separation of Concerns:** Distinct separation between REST Controller endpoints, Service business logic, Repository DAOs, DTO contracts, and static UI components.
- **Parametric SQL & Security:** All database operations use `JdbcTemplate` parameterized placeholders (`?`) preventing SQL injection. Passwords are securely hashed with BCrypt.

---

## 5. Quick Start & Setup Guide for macOS

### Option A: Instant macOS Demonstration (Using Bundled Python Runner)

1. Open Terminal and navigate to the project directory:
   ```bash
   cd skillsync
   ```

2. Start the SkillSync server:
   ```bash
   python3 server.py
   ```

3. Open your browser and visit:
   ```
   http://localhost:8080
   ```

---

### Option B: Full Java Spring Boot & MySQL 8 Production Setup

1. **Start MySQL 8 Server and create database:**
   ```bash
   mysql -u root -p < schema.sql
   mysql -u root -p < data.sql
   ```

2. **Configure Database Credentials:**
   Edit `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/skillsync?useSSL=false
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password
   ```

3. **Build and Run with Maven:**
   ```bash
   mvn clean package
   mvn spring-boot:run
   ```

4. **Access Application:**
   Open browser at `http://localhost:8080`.

---

## 6. Pre-seeded Demonstration Credentials

| Role | Email | Password | Details |
| :--- | :--- | :--- | :--- |
| **Student 1** | `alex.chen@skillsync.edu` | `Password@123` | CS 3rd Year (Teaches Java & Algorithms) |
| **Student 2** | `priya.sharma@skillsync.edu` | `Password@123` | Design 2nd Year (Teaches Figma & Illustrator) |
| **Student 3** | `rahul.verma@skillsync.edu` | `Password@123` | Data Science 4th Year (Teaches Python & ML) |
| **Administrator** | `admin@skillsync.edu` | `Password@123` | Platform Admin Account |

---

## 7. Business Rules & Verification Checklist

- [x] **Self-Booking Prevention:** A student cannot book a learning session with themselves.
- [x] **Teacher Skill Verification:** A session request can only be submitted if the teacher actually offers the selected skill.
- [x] **Conflict Detection:** Prevents teachers from accepting overlapping booking requests for the same date and time.
- [x] **Status Transition Enforcement:** Sessions transition logically (`PENDING` -> `ACCEPTED` -> `COMPLETED`).
- [x] **Single-Review Restriction:** Learners can submit feedback only once per completed session.
- [x] **Role-Based Access Control:** Admin panel routes are guarded and restricted to administrator accounts.
