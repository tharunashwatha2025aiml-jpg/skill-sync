# SkillSwap — Student-to-Student Skill Exchange Platform

> **Learn Together. Teach What You Love. Grow Together.**  
> A modern, responsive, full-stack peer learning platform built with **Java 21**, **Spring Boot 3.x**, pure **Spring JDBC (`JdbcTemplate`)**, and **MySQL**.

---

## 1. Project Overview & Vision

**SkillSwap** is a student skill-exchange and peer learning platform designed for college campuses. It enables students to trade knowledge without financial transactions:
- **Student A** (Computer Science) excels at **Java & Data Structures** but wants to learn **Figma UI/UX Design**.
- **Student B** (Design & Media) is an expert in **Figma & Typography** but wants to learn **Java Programming**.
- **SkillSwap's Smart Matching Engine** identifies this **100% Mutual Match**, enabling both students to discover each other, propose structured skill-exchange sessions, coordinate schedules, and submit verified 5-star peer reviews.

---

## 2. Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Backend Framework** | Spring Boot 3.2.4 | Spring MVC, Spring Security 6, Jakarta Validation |
| **Language & Runtime** | Java 21 (LTS) | Modern Java records, text blocks, pattern matching, streams |
| **Persistence / Data Access** | Spring JDBC (`JdbcTemplate`) | Pure parameterized SQL, `RowMapper`, `GeneratedKeyHolder` |
| **Relational Database** | MySQL 8.0+ / 9.x | 3NF Normalized relational schema with strict foreign keys & constraints |
| **Testing / Fallback DB** | H2 In-Memory Database | Automated unit & integration testing with zero external dependencies |
| **Security & Auth** | Spring Security 6 & BCrypt | BCrypt cost 12 hashing, stateful session handling, unauthorized guards |
| **Frontend** | HTML5, Modern CSS3, JavaScript | Responsive CSS grid/flexbox, glassmorphic styling, SPA routing, toasts |
| **Build & Tooling** | Apache Maven 3.x | Standard Maven multi-phase lifecycle (`compile`, `test`, `package`) |
| **Target IDE** | Eclipse IDE / IntelliJ IDEA | Standard Maven project structure importable via `pom.xml` |

---

## 3. System Architecture & OOP Design

The platform adheres to clean **Separation of Concerns (SoC)** and demonstrates core **Object-Oriented Programming (OOP)** principles:

```
[ Frontend: HTML5 / CSS3 / Vanilla JS SPA ]
                    │
                    ▼  JSON / REST API & Session Cookies
[ Spring MVC Controller Layer ] (AuthController, UserController, SkillController, ExchangeRequestController, MatchController, ReviewController)
                    │
                    ▼  DTO Validation & Request Mapping
[ Service Layer: Interfaces & Implementations ] (UserService, SkillService, ExchangeRequestService, MatchingService, ReviewService, DashboardService)
                    │
                    ▼  Domain Entities & Business Rules
[ Repository Layer: Pure Spring JdbcTemplate ] (JdbcUserRepository, JdbcSkillRepository, JdbcUserSkillRepository, JdbcExchangeRequestRepository, JdbcReviewRepository)
                    │
                    ▼  Parameterized SQL PreparedStatements
[ MySQL Database: skillswap ] (users, skills, user_skills, exchange_requests, reviews)
```

### OOP Principles Demonstrated:
1. **Encapsulation**: Private entity fields with verified getters/setters, domain data invariants, and isolated DTO transformations.
2. **Abstraction**: Loose coupling through service interfaces (`UserService`, `SkillService`, `MatchingService`) and repository interfaces (`UserRepository`, `ExchangeRequestRepository`).
3. **Inheritance**: `BaseEntity` encapsulates common temporal and identification attributes (`id`, `createdAt`, `updatedAt`) inherited by `User`, `Skill`, `UserSkill`, `ExchangeRequest`, and `Review`.
4. **Polymorphism**:
   - `RowMapper<T>` implementations dynamically mapping relational SQL result sets to polymorphic entities.
   - Algorithmic score matching strategies (`MUTUAL` 100% vs. `CAN_TEACH_YOU` 80% vs. `WANTS_YOUR_SKILL` 70%).

---

## 4. Database Schema (`skillswap`)

The schema is in **Third Normal Form (3NF)** with explicit primary keys, cascading foreign keys, unique composite indexes, and check constraints:

```
┌─────────────────────────┐         ┌─────────────────────────┐
│          users          │         │         skills          │
├─────────────────────────┤         ├─────────────────────────┤
│ id (PK)                 │         │ id (PK)                 │
│ email (UQ)              │         │ name (UQ)               │
│ password (BCrypt)       │         │ category                │
│ full_name               │         │ description             │
│ department              │         └────────────┬────────────┘
│ year_of_study (1-5)     │                      │
│ bio, phone, avatar_url  │                      │
└────────────┬────────────┘                      │
             │                                   │
             │ 1:N                               │ 1:N
             ▼                                   ▼
┌─────────────────────────────────────────────────────────────┐
│                         user_skills                         │
├─────────────────────────────────────────────────────────────┤
│ id (PK)                                                     │
│ user_id (FK -> users.id ON DELETE CASCADE)                  │
│ skill_id (FK -> skills.id ON DELETE CASCADE)                │
│ skill_type ENUM('TEACH', 'LEARN')                           │
│ proficiency_level ENUM('BEGINNER','INTERMEDIATE',...)       │
│ notes VARCHAR(255)                                          │
│ UNIQUE KEY (user_id, skill_id, skill_type)                  │
└─────────────────────────────────────────────────────────────┘

             │                                   ▲
             │ 1:N (sender / receiver)           │ 1:N (offered / requested)
             ▼                                   │
┌─────────────────────────────────────────────────────────────┐
│                      exchange_requests                      │
├─────────────────────────────────────────────────────────────┤
│ id (PK)                                                     │
│ sender_id (FK -> users.id)                                  │
│ receiver_id (FK -> users.id)                                │
│ offered_skill_id (FK -> skills.id)                          │
│ requested_skill_id (FK -> skills.id)                        │
│ status ENUM('PENDING','ACCEPTED','REJECTED','COMPLETED',...) │
│ message TEXT, preferred_schedule, response_note             │
│ CHECK (sender_id != receiver_id)                            │
└────────────┬────────────────────────────────────────────────┘
             │
             │ 1:N
             ▼
┌─────────────────────────────────────────────────────────────┐
│                           reviews                           │
├─────────────────────────────────────────────────────────────┤
│ id (PK)                                                     │
│ exchange_request_id (FK -> exchange_requests.id)            │
│ reviewer_id (FK -> users.id)                                │
│ reviewee_id (FK -> users.id)                                │
│ rating INT CHECK (rating BETWEEN 1 AND 5)                   │
│ comment TEXT                                                │
│ UNIQUE KEY (exchange_request_id, reviewer_id)               │
│ CHECK (reviewer_id != reviewee_id)                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. macOS Setup Instructions (Step-by-Step)

Follow these exact terminal commands on macOS (Apple Silicon or Intel):

### Step 5.1: Install Prerequisites via Homebrew
If Homebrew is not installed, install it from https://brew.sh. Then install Java 21, Maven, and MySQL:

```bash
# 1. Install OpenJDK 21
brew install openjdk@21

# Symlink Java for macOS system wrapper
sudo ln -sfn /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-21.jdk

# 2. Install Apache Maven
brew install maven

# 3. Install MySQL Server
brew install mysql
```

Verify your installations:
```bash
java -version
mvn -version
mysql --version
```

---

### Step 5.2: Configure and Start MySQL
Start the MySQL background service:
```bash
brew services start mysql
```

Log in to MySQL (default root password on fresh Homebrew install is empty):
```bash
mysql -u root
```

Inside MySQL prompt, create the database and import `schema.sql` and `data.sql`:
```sql
CREATE DATABASE IF NOT EXISTS skillswap CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

Run the schema and seed scripts from your terminal in the project directory:
```bash
# Navigate to the project root
cd "/path/to/SkillSwap"

# Import schema and sample seed data
mysql -u root skillswap < schema.sql
mysql -u root skillswap < data.sql
```

---

### Step 5.3: Configure Database Credentials
Open `src/main/resources/application.properties` to verify or customize your MySQL password:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/skillswap?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD_HERE
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```
*(If your MySQL root user has no password, simply leave `spring.datasource.password=` empty).*

---

## 6. How to Build & Run

### Option A: From Terminal (Maven CLI)
```bash
# 1. Clean, compile, and run all 17 automated tests
mvn clean test

# 2. Package into an executable JAR
mvn clean package

# 3. Launch the Spring Boot Web Application
java -jar target/skillswap-1.0.0.jar
```

Or run directly with the Spring Boot Maven plugin:
```bash
mvn spring-boot:run
```

Once started, open your web browser at:
👉 **`http://localhost:8080`**

---

### Option B: In Eclipse IDE
1. Open **Eclipse IDE for Enterprise Java and Web Developers**.
2. Select **File** → **Import...**
3. Choose **Maven** → **Existing Maven Projects** and click **Next**.
4. Browse to the project folder (`SkillSwap`) where `pom.xml` is located.
5. Click **Finish**. Eclipse will automatically resolve all dependencies.
6. Verify Eclipse JRE:
   - Right-click project → **Properties** → **Java Build Path** → **Libraries** tab.
   - Ensure **JRE System Library** is set to **Java 21**.
7. Run the Application:
   - Navigate to `src/main/java/com/skillswap/SkillSwapApplication.java`.
   - Right-click `SkillSwapApplication.java` → **Run As** → **Java Application** (or **Spring Boot App** if Spring Tools plugin is installed).
8. Open `http://localhost:8080` in your web browser.

---

## 7. Pre-Seeded Demo Student Accounts

All sample student accounts share the same password for demonstration:  
**Password:** `Password@123`

| Student Name | Email | Department | Year | Teaches | Wants to Learn |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Aravind Swaminathan** | `aravind.cs@college.edu` | Computer Science | 3 | Java, Data Structures | Figma, React |
| **Priya Ramanathan** | `priya.design@college.edu` | Design & Media | 2 | Figma, Illustrator | Java, Python |
| **Rohan Mehta** | `rohan.data@college.edu` | Information Tech | 4 | Machine Learning, SQL | Public Speaking |
| **Ananya Sharma** | `ananya.biz@college.edu` | Management Studies | 3 | Public Speaking, Finance | Python, Machine Learning |
| **Karthik Nair** | `karthik.mech@college.edu` | Mechanical Engg | 2 | Calculus, Linear Algebra | React Frontend |
| **Sneha Kulkarni** | `sneha.media@college.edu` | Electronic Media | 3 | Video Production | Conversational Spanish |

💡 *Notice the **Perfect Mutual Matches**:*
- **Aravind ⇄ Priya**: Aravind teaches Java and wants Figma; Priya teaches Figma and wants Java!
- **Rohan ⇄ Ananya**: Rohan teaches ML and wants Public Speaking; Ananya coaches Public Speaking and wants ML!

---

## 8. End-to-End User Journey Walkthrough

1. **Landing Page**: View platform statistics, 3-step guide, and 1-click demo login buttons.
2. **Registration / Login**: Register a new student or log in as Aravind.
3. **Student Profile**:
   - View your academic info and current peer rating.
   - Click **"+ Add Teach Skill"** to add a new skill to teach.
   - Click **"+ Add Learn Skill"** to add a skill you want to learn.
4. **Smart Matches**:
   - Navigate to **Smart Matches**. Notice **Priya Ramanathan** highlighted with the **★ 100% MUTUAL SWAP** badge.
   - Click **"Propose Swap"** to open the pre-populated proposal modal.
5. **Explore & Directory**:
   - Search peers by skill keyword (e.g. `Python` or `Figma`) or filter by department.
6. **Exchange Proposals**:
   - Switch to Priya's account (`priya.design@college.edu`).
   - Open **Proposals** → View incoming request from Aravind.
   - Click **"✓ Accept Proposal"**.
   - After learning sessions, click **"🎓 Mark Exchange Completed"**.
7. **Ratings & Reviews**:
   - Click **"⭐ Write Peer Review"**.
   - Select 5 stars and write a testimonial.
   - Review is saved to MySQL and immediately recalculates the peer's average rating!

---

## 9. Key REST API Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new student account |
| `POST` | `/api/auth/login` | Public | Authenticate student & start session |
| `GET` | `/api/auth/me` | Authenticated | Get current authenticated student |
| `POST` | `/api/auth/logout` | Authenticated | Invalidate session & logout |
| `GET` | `/api/users/profile` | Authenticated | Retrieve student's full profile & skills |
| `PUT` | `/api/users/profile` | Authenticated | Update student profile details |
| `GET` | `/api/users/search` | Public/Auth | Filter students by skill and department |
| `GET` | `/api/skills` | Public | Retrieve all skills with teacher/learner counts |
| `POST` | `/api/skills/my` | Authenticated | Add a skill (TEACH/LEARN) to profile |
| `DELETE`| `/api/skills/my/{id}` | Authenticated | Remove skill from profile |
| `GET` | `/api/matches` | Authenticated | Algorithmic mutual match recommendations |
| `POST` | `/api/requests` | Authenticated | Submit skill exchange proposal |
| `PATCH`| `/api/requests/{id}/status` | Authenticated | Accept, reject, complete, or cancel proposal |
| `GET` | `/api/requests` | Authenticated | List all exchange proposals for user |
| `POST` | `/api/reviews` | Authenticated | Submit 1-5 star review for completed session |
| `GET` | `/api/reviews/my` | Authenticated | Get all reviews received by student |
| `GET` | `/api/dashboard` | Authenticated | Aggregated metrics, top matches, & recent activity |

---

## 10. Viva & Examination Questions & Answers

### Q1: Why did you choose Spring JDBC (`JdbcTemplate`) over Spring Data JPA / Hibernate?
> **Answer:** Spring JDBC (`JdbcTemplate`) provides direct, transparent control over raw SQL execution without the hidden overhead, N+1 query surprises, or complex caching behavior of ORM frameworks. For a student skill-exchange platform with complex queries (like the multi-table 2-way mutual matching join and supply-demand aggregations), `JdbcTemplate` allows writing high-performance, parameterized SQL while demonstrating core relational database engineering.

### Q2: How does the Smart Matching Algorithm work?
> **Answer:** The algorithm computes two-way intersections between student skill inventories:
> 1. It gathers the skills Student A teaches and wants to learn.
> 2. For each peer B, it verifies whether B teaches any skill A wants to learn ($B_{teach} \cap A_{learn} \neq \emptyset$), and whether B wants to learn any skill A teaches ($A_{teach} \cap B_{learn} \neq \emptyset$).
> 3. If both intersections exist, it classifies the match as **100% Mutual Swap**.
> 4. If only one direction matches, it scores it at 80% (`CAN_TEACH_YOU`) or 70% (`WANTS_YOUR_SKILL`).

### Q3: How is security handled for passwords and private data?
> **Answer:**
> - Passwords are encrypted using **BCrypt** with a work factor of 12 before being persisted. Plaintext passwords are never stored or logged.
> - Private REST endpoints are protected by **Spring Security 6** filters.
> - Authorization logic guarantees that only the recipient can accept/reject a proposal, only participants can complete an exchange or submit a review, and students can only edit their own profiles.
> - All SQL queries use parameterized placeholders (`?`), preventing SQL injection attacks.

---

## 11. License & Academic Integrity
Developed as a demonstration full-stack Java/DBMS application. Free for educational and college project demonstration purposes.
