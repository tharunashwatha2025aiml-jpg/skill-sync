-- ====================================================================
-- SkillSync Initial Seed Data (MySQL 8)
-- Project: SkillSync - Student Skill Matching & Peer Learning Platform
-- ====================================================================

USE skillsync;

-- 1. Insert Initial Skill Catalogue
INSERT INTO skills (skill_id, skill_name, category, description, active_status) VALUES
(1, 'Java Programming', 'Programming and Software Development', 'Core Java, Object-Oriented Programming, Spring Framework, and Maven.', TRUE),
(2, 'Python Development', 'Programming and Software Development', 'Python syntax, scripting, automation, and basic data structures.', TRUE),
(3, 'Data Structures & Algorithms', 'Programming and Software Development', 'Arrays, Linked Lists, Trees, Dynamic Programming, and algorithm optimization.', TRUE),
(4, 'Figma & UI/UX Design', 'Graphic Design and UI/UX', 'User interface design, wireframing, interactive prototyping, and design systems.', TRUE),
(5, 'React.js Frontend', 'Web Development', 'Modern component-based UI development using React, hooks, and state management.', TRUE),
(6, 'Machine Learning Fundamentals', 'Data Science and Artificial Intelligence', 'Supervised/unsupervised learning, scikit-learn, regression, and model evaluation.', TRUE),
(7, 'Technical Presentation & Pitching', 'Communication and Public Speaking', 'Structuring slides, confident speech delivery, Q&A handling, and storytelling.', TRUE),
(8, 'Data Analytics & SQL', 'Data Science and Artificial Intelligence', 'Relational database queries, joins, aggregations, and data visualization.', TRUE),
(9, 'Linear Algebra & Calculus', 'Mathematics and Academic Subjects', 'Matrices, vector spaces, derivatives, integrals, and applications in engineering.', TRUE),
(10, 'Adobe Illustrator', 'Graphic Design and UI/UX', 'Vector graphic creation, branding logos, icons, and digital illustrations.', TRUE),
(11, 'Startup Strategy & Pitch Deck', 'Business and Entrepreneurship', 'Business model canvas, market research, financial projections, and investor decks.', TRUE),
(12, 'Video Editing with Premiere', 'Video Editing and Content Creation', 'Timeline editing, audio sync, color grading, and social media video export.', TRUE);

-- 2. Insert Initial Students (BCrypt hashed password for 'Password@123' -> $2a$10$7R0wUqf/Jk8g4C8c5gUjIeO9F7q8/b4T5V6W7X8Y9Z0a1b2c3d4e)
INSERT INTO students (student_id, full_name, email, registration_number, department, academic_year, bio, avatar_url, password_hash, role, account_status, credit_balance) VALUES
(1, 'Alex Chen', 'alex.chen@skillsync.edu', 'REG2024001', 'Computer Science', '3rd Year', 'Passionate about Java Spring Boot, system architecture, and algorithms. Love helping peers conquer tricky programming concepts!', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', '$2a$10$7R0wUqf/Jk8g4C8c5gUjIeO9F7q8/b4T5V6W7X8Y9Z0a1b2c3d4e', 'STUDENT', 'ACTIVE', 6),
(2, 'Priya Sharma', 'priya.sharma@skillsync.edu', 'REG2024002', 'Design & Media', '2rd Year', 'UI/UX designer with 2 years of campus design lead experience. Looking to learn Python to automate data workflows.', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', '$2a$10$7R0wUqf/Jk8g4C8c5gUjIeO9F7q8/b4T5V6W7X8Y9Z0a1b2c3d4e', 'STUDENT', 'ACTIVE', 4),
(3, 'Rahul Verma', 'rahul.verma@skillsync.edu', 'REG2024003', 'Data Science', '4th Year', 'Machine Learning researcher and competitive programmer. Happy to teach Python & ML fundamentals to enthusiastic learners.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', '$2a$10$7R0wUqf/Jk8g4C8c5gUjIeO9F7q8/b4T5V6W7X8Y9Z0a1b2c3d4e', 'STUDENT', 'ACTIVE', 7),
(4, 'Ananya Patel', 'ananya.patel@skillsync.edu', 'REG2024004', 'Electronics Engineering', '3rd Year', 'Web development hobbyist building IoT dashboards. Excited to teach React.js and learn advanced Data Structures.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', '$2a$10$7R0wUqf/Jk8g4C8c5gUjIeO9F7q8/b4T5V6W7X8Y9Z0a1b2c3d4e', 'STUDENT', 'ACTIVE', 5),
(5, 'Marcus Vance', 'marcus.vance@skillsync.edu', 'REG2024005', 'Business Administration', '4th Year', 'Campus debate club president and startup incubator mentor. Eager to help peers polish public speaking and pitch decks.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', '$2a$10$7R0wUqf/Jk8g4C8c5gUjIeO9F7q8/b4T5V6W7X8Y9Z0a1b2c3d4e', 'STUDENT', 'ACTIVE', 5),
(6, 'Platform Admin', 'admin@skillsync.edu', 'ADMIN001', 'Administration', 'Faculty', 'SkillSync Administrator Account', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', '$2a$10$7R0wUqf/Jk8g4C8c5gUjIeO9F7q8/b4T5V6W7X8Y9Z0a1b2c3d4e', 'ADMIN', 'ACTIVE', 10);

-- 3. Student Skills Mapping (TEACH & LEARN)
INSERT INTO student_skills (student_id, skill_id, skill_type, proficiency_level, description) VALUES
-- Alex Chen (Student 1)
(1, 1, 'TEACH', 'Advanced', '2+ years of Java development, built multiple REST APIs and backend projects.'),
(1, 3, 'TEACH', 'Intermediate', 'Solved 300+ LeetCode problems; great at explaining recursion, trees, and dynamic programming.'),
(1, 4, 'LEARN', 'Beginner', 'Want to design clean UI mockups for my mobile and web apps.'),
(1, 6, 'LEARN', 'Beginner', 'Interested in learning basic machine learning concepts for my senior thesis.'),

-- Priya Sharma (Student 2)
(2, 4, 'TEACH', 'Advanced', 'Lead designer for campus fest app. Can teach Figma design systems and autolayouts.'),
(2, 10, 'TEACH', 'Intermediate', 'Experienced in vector graphics, icon sets, and vector logo design.'),
(2, 2, 'LEARN', 'Beginner', 'Want to write Python scripts to automate design asset processing.'),
(2, 5, 'LEARN', 'Intermediate', 'Looking to turn Figma designs into real React code.'),

-- Rahul Verma (Student 3)
(3, 2, 'TEACH', 'Advanced', 'Proficient in Python data science stack: NumPy, Pandas, Scikit-Learn.'),
(3, 6, 'TEACH', 'Advanced', 'Published student researcher in applied machine learning.'),
(3, 7, 'LEARN', 'Intermediate', 'Want to improve presentation confidence for research conference talks.'),
(3, 11, 'LEARN', 'Beginner', 'Interested in building a pitch deck for an AI tech startup concept.'),

-- Ananya Patel (Student 4)
(4, 5, 'TEACH', 'Intermediate', 'Built 4+ React Web apps with Tailwind CSS and REST APIs.'),
(4, 9, 'TEACH', 'Advanced', 'Scored A+ in Linear Algebra and Multivariable Calculus; can tutor problem solving.'),
(4, 3, 'LEARN', 'Intermediate', 'Struggling with graph algorithms and dynamic programming in tech interviews.'),

-- Marcus Vance (Student 5)
(5, 7, 'TEACH', 'Advanced', 'Awarded Best Speaker at 3 Inter-College Debates. Can coach voice modulation and slide design.'),
(5, 11, 'TEACH', 'Advanced', 'Guided 5 campus startups through incubator pitch presentations.'),
(5, 1, 'LEARN', 'Beginner', 'Want to understand basic Java programming for technical product management.');

-- 4. Availability Records
INSERT INTO availability (student_id, day_of_week, start_time, end_time, timezone) VALUES
(1, 'Monday', '14:00:00', '17:00:00', 'IST'),
(1, 'Wednesday', '16:00:00', '19:00:00', 'IST'),
(1, 'Saturday', '10:00:00', '13:00:00', 'IST'),

(2, 'Tuesday', '15:00:00', '18:00:00', 'IST'),
(2, 'Thursday', '14:00:00', '17:00:00', 'IST'),
(2, 'Sunday', '11:00:00', '14:00:00', 'IST'),

(3, 'Monday', '10:00:00', '13:00:00', 'IST'),
(3, 'Friday', '14:00:00', '18:00:00', 'IST'),
(3, 'Saturday', '14:00:00', '17:00:00', 'IST'),

(4, 'Wednesday', '14:00:00', '17:00:00', 'IST'),
(4, 'Friday', '15:00:00', '18:00:00', 'IST'),

(5, 'Thursday', '16:00:00', '19:00:00', 'IST'),
(5, 'Saturday', '11:00:00', '14:00:00', 'IST');

-- 5. Seed Sessions
INSERT INTO sessions (session_id, learner_id, teacher_id, skill_id, session_date, start_time, duration_minutes, format, learning_objective, status) VALUES
(1, 2, 1, 1, '2026-10-01', '14:00:00', 60, 'ONLINE', 'Understand OOP principles and basic Java classes.', 'COMPLETED'),
(2, 1, 2, 4, '2026-10-03', '15:00:00', 60, 'ONLINE', 'Learn Figma auto-layout and prototyping basics for mobile screens.', 'COMPLETED'),
(3, 4, 3, 2, '2026-10-06', '10:00:00', 90, 'IN_PERSON', 'Python list comprehensions and NumPy matrix operations.', 'COMPLETED'),
(4, 3, 5, 7, '2026-10-12', '16:00:00', 60, 'ONLINE', 'Prepare presentation slides and body language for conference keynote.', 'ACCEPTED'),
(5, 5, 1, 1, '2026-10-15', '14:00:00', 60, 'ONLINE', 'Introduction to Java variables, loops, and methods for business majors.', 'PENDING');

-- 6. Seed Feedback & Ratings
INSERT INTO feedback (feedback_id, session_id, reviewer_id, teacher_id, rating, comment, outcome_summary) VALUES
(1, 1, 2, 1, 5, 'Alex is an exceptional tutor! He explained OOP concepts like inheritance and interfaces using super relatable real-world examples.', 'Mastered Java Class inheritance and encapsulation.'),
(2, 2, 1, 2, 5, 'Priya was so patient and guided me step-by-step through Figma auto-layouts. Created my first mobile UI prototype!', 'Built interactive 3-screen prototype in Figma.'),
(3, 3, 4, 3, 4, 'Rahul knows Python inside out! Super helpful session on NumPy arrays and data structures.', 'Learned efficient data manipulation with NumPy.');

-- 7. Seed Credit Transactions
INSERT INTO credit_transactions (student_id, session_id, amount, transaction_type, description) VALUES
(1, 1, 1, 'EARNED', 'Completed teaching session for Java Programming'),
(2, 1, -1, 'SPENT', 'Booked learning session for Java Programming'),
(2, 2, 1, 'EARNED', 'Completed teaching session for Figma & UI/UX Design'),
(1, 2, -1, 'SPENT', 'Booked learning session for Figma & UI/UX Design');
