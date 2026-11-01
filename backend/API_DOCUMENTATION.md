# SkillSync — REST API Specification Document

All API endpoints exchange JSON payloads over HTTP under the `/api` prefix.

---

## 1. Authentication Endpoints

### Register Student Account
- **Endpoint:** `POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "fullName": "John Doe",
    "email": "john.doe@skillsync.edu",
    "registrationNumber": "REG2026099",
    "department": "Computer Science",
    "academicYear": "3rd Year",
    "password": "Password@123"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "token": "d7a4b0c2-...",
    "message": "Registration successful!",
    "student": { "studentId": 7, "email": "john.doe@skillsync.edu", "role": "STUDENT" }
  }
  ```

### Student Login
- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "alex.chen@skillsync.edu",
    "password": "Password@123"
  }
  ```
- **Response (200 OK):** AuthResponse object with token and student profile.

---

## 2. Student & Skill Discovery Endpoints

### Search Students / Teachers
- **Endpoint:** `GET /api/students/search?q={query}`
- **Response (200 OK):** List of matching student objects.

### Get Student Detailed Profile
- **Endpoint:** `GET /api/students/{id}`
- **Response (200 OK):** Includes profile details, teachSkills array, learnSkills array, availabilitySlots array, averageRating, totalReviews, and completedSessionsCount.

### Get Peer Recommendations / Matches
- **Endpoint:** `GET /api/students/{id}/matches`
- **Response (200 OK):** List of recommended teachers with transparent match reasons ("Offers Java", "Availability matches").

### Update Student Profile
- **Endpoint:** `PUT /api/students/{id}`
- **Request Body:** `{ "fullName": "...", "bio": "...", "department": "...", "academicYear": "..." }`

---

## 3. Session Management Endpoints

### Create Session Request
- **Endpoint:** `POST /api/sessions/request?learnerId={learnerId}`
- **Request Body:**
  ```json
  {
    "teacherId": 2,
    "skillId": 4,
    "sessionDate": "2026-10-15",
    "startTime": "14:00",
    "durationMinutes": 60,
    "format": "ONLINE",
    "learningObjective": "Learn Figma auto-layouts and prototyping."
  }
  ```
- **Response (201 Created):** Session object with status `"PENDING"`.

### Update Session Status
- **Endpoint:** `PATCH /api/sessions/{id}/status?studentId={studentId}&status={status}`
- **Valid status values:** `ACCEPTED`, `REJECTED`, `CANCELLED`, `COMPLETED`
- **Response (200 OK):** Updated session object.

### Query Sessions by Tab
- `GET /api/sessions/incoming?teacherId={id}` (Pending requests for teacher)
- `GET /api/sessions/outgoing?learnerId={id}` (Pending requests sent by learner)
- `GET /api/sessions/upcoming?studentId={id}` (Accepted sessions)
- `GET /api/sessions/completed?studentId={id}` (Completed sessions)

---

## 4. Feedback & Rating Endpoints

### Submit Session Review & Feedback
- **Endpoint:** `POST /api/feedback/submit?reviewerId={reviewerId}`
- **Request Body:**
  ```json
  {
    "sessionId": 1,
    "rating": 5,
    "comment": "Exceptional tutor! Explained OOP concepts clearly.",
    "outcomeSummary": "Mastered Java Class inheritance."
  }
  ```
- **Response (201 Created):** Feedback object. Updates teacher's aggregate average rating.

### Get Reviews for Teacher
- **Endpoint:** `GET /api/feedback/student/{teacherId}`

---

## 5. Administration Endpoints

- `GET /api/admin/stats`: Get platform summary metrics.
- `GET /api/admin/students`: Get all student accounts directory.
- `PATCH /api/admin/students/{id}/status?status=INACTIVE`: Activate or deactivate account.
- `POST /api/admin/skills`: Create new catalogue skill.
