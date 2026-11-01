-- ====================================================================
-- SkillSync: Sample Seed Data for Demonstration & Testing
-- ====================================================================

USE skillsync;

-- Clean existing data
DELETE FROM reviews;
DELETE FROM sessions;
DELETE FROM student_skills;
DELETE FROM skills;
DELETE FROM students;

-- 1. Insert Skills Catalog
INSERT INTO skills (skill_id, skill_name, category, description) VALUES
(1, 'Java Programming', 'Programming', 'Core Java, OOP principles, Collections, Streams, and Spring Boot basics.'),
(2, 'Python Development', 'Programming', 'Python scripting, object-oriented concepts, and automation basics.'),
(3, 'Data Structures & Algorithms', 'Programming', 'Arrays, Linked Lists, Trees, Graphs, Sorting, and Dynamic Programming.'),
(4, 'UI/UX Design & Figma', 'Design', 'Wireframing, high-fidelity mockups, user journey mapping, and prototyping with Figma.'),
(5, 'Web Development (HTML/CSS/JS)', 'Web Development', 'Modern semantic HTML5, CSS responsive flexbox/grid, and modern JavaScript ES6+.'),
(6, 'Database Management & SQL', 'Database Management', 'Relational database modeling, normalization, indexing, joins, and SQL query tuning.'),
(7, 'Machine Learning Basics', 'Artificial Intelligence and Machine Learning', 'Supervised vs unsupervised learning, scikit-learn, regression, and model metrics.'),
(8, 'Data Analysis with Pandas', 'Data Science', 'Data cleaning, feature transformation, tabular data analysis, and Matplotlib visualizations.'),
(9, 'Public Speaking & Presentation', 'Communication', 'Voice projection, speech structure, persuasive delivery, and slide preparation.'),
(10, 'Discrete Mathematics & Calculus', 'Mathematics', 'Logic, set theory, graph theory, limits, differentiation, and matrices.'),
(11, 'Startup Pitching & Business Strategy', 'Business', 'Value propositions, customer discovery, pitch decks, and financial modeling.'),
(12, 'Version Control with Git & GitHub', 'Programming', 'Branches, pull requests, merge conflict resolution, and collaborative workflows.');

-- 2. Insert Students
-- Default demo password is: Password@123 (BCrypt hash below)
INSERT INTO students (student_id, full_name, email, password_hash, department, academic_year, bio, enabled) VALUES
(1, 'Alex Chen', 'alex.chen@skillsync.edu', '$2a$10$7R0wUqf/Jk8g4C8c5gUjIeO9F7q8/b4T5V6W7X8Y9Z0a1b2c3d4e', 'Computer Science', '3rd Year', 'Passionate Java and Spring Boot developer. Love teaching OOP concepts and eager to learn UI/UX design!', TRUE),
(2, 'Priya Sharma', 'priya.sharma@skillsync.edu', '$2a$10$7R0wUqf/Jk8g4C8c5gUjIeO9F7q8/b4T5V6W7X8Y9Z0a1b2c3d4e', 'Design & Media', '2nd Year', 'Campus UI/UX design lead. Proficient in Figma design systems and eager to master Java programming.', TRUE),
(3, 'Rahul Verma', 'rahul.verma@skillsync.edu', '$2a$10$7R0wUqf/Jk8g4C8c5gUjIeO9F7q8/b4T5V6W7X8Y9Z0a1b2c3d4e', 'Data Science', '4th Year', 'Python enthusiast and ML practitioner. Excited to teach Pandas/ML and learn public speaking.', TRUE),
(4, 'Ananya Patel', 'ananya.patel@skillsync.edu', '$2a$10$7R0wUqf/Jk8g4C8c5gUjIeO9F7q8/b4T5V6W7X8Y9Z0a1b2c3d4e', 'Information Technology', '3rd Year', 'Full-stack web developer experienced with modern JS. Looking for help with Data Structures.', TRUE),
(5, 'Marcus Vance', 'marcus.vance@skillsync.edu', '$2a$10$7R0wUqf/Jk8g4C8c5gUjIeO9F7q8/b4T5V6W7X8Y9Z0a1b2c3d4e', 'Business Administration', '4th Year', 'Debate society captain and pitch mentor. Happy to coach public speaking; want to learn SQL.', TRUE);

-- 3. Insert Student Skills (TEACH & LEARN)
-- Demonstrating Mutual Exchange:
-- Alex Chen: TEACH Java (1), LEARN UI/UX Figma (4)
-- Priya Sharma: TEACH UI/UX Figma (4), LEARN Java (1) -> PERFECT MUTUAL EXCHANGE!
INSERT INTO student_skills (student_id, skill_id, skill_type, proficiency, description) VALUES
-- Alex Chen (Student 1)
(1, 1, 'TEACH', 'ADVANCED', '2+ years of Java development, solid understanding of OOP and Spring Boot REST APIs.'),
(1, 3, 'TEACH', 'INTERMEDIATE', 'Solved 300+ LeetCode problems, comfortable explaining trees, graphs, and dynamic programming.'),
(1, 4, 'LEARN', 'BEGINNER', 'Want to learn how to design clean UI mockups in Figma for my personal portfolio apps.'),
(1, 9, 'LEARN', 'INTERMEDIATE', 'Looking to polish my presentation style for technical demo days.'),

-- Priya Sharma (Student 2)
(2, 4, 'TEACH', 'ADVANCED', '2 years campus design lead; expert in Figma auto-layout, wireframes, and design tokens.'),
(2, 5, 'TEACH', 'INTERMEDIATE', 'Comfortable building clean responsive CSS and landing page templates.'),
(2, 1, 'LEARN', 'BEGINNER', 'Eager to understand Java and backend development to become a full-stack engineer.'),
(2, 2, 'LEARN', 'BEGINNER', 'Looking to learn Python for scripting and design automation.'),

-- Rahul Verma (Student 3)
(3, 2, 'TEACH', 'ADVANCED', 'Experienced Python developer proficient with object-oriented scripting and algorithms.'),
(3, 8, 'TEACH', 'ADVANCED', 'Data wrangling with Pandas and SQL queries for scientific data analysis.'),
(3, 9, 'LEARN', 'INTERMEDIATE', 'Want to overcome stage fright and deliver confident conference presentations.'),
(3, 11, 'LEARN', 'BEGINNER', 'Interested in learning startup business modeling and valuation.'),

-- Ananya Patel (Student 4)
(4, 5, 'TEACH', 'ADVANCED', 'Built 5+ responsive production websites using HTML5, modern CSS, and JavaScript.'),
(4, 12, 'TEACH', 'INTERMEDIATE', 'Comfortable explaining Git branch workflows, pull requests, and merge conflict resolution.'),
(4, 3, 'LEARN', 'INTERMEDIATE', 'Struggling with graph traversals (BFS/DFS) and dynamic programming algorithms.'),
(4, 6, 'LEARN', 'BEGINNER', 'Looking for a peer to explain database normalization and SQL join optimization.'),

-- Marcus Vance (Student 5)
(5, 9, 'TEACH', 'ADVANCED', 'Awarded Best Speaker at 3 Inter-College Debates. Can coach vocal variety and slide decks.'),
(5, 11, 'TEACH', 'ADVANCED', 'Guided 5 student venture teams through incubator pitch deck presentations.'),
(5, 6, 'LEARN', 'BEGINNER', 'Need to learn SQL to analyze marketing metrics and product databases.'),
(5, 1, 'LEARN', 'BEGINNER', 'Curious about Java fundamentals for technical product management.');

-- 4. Insert Sample Learning Sessions
INSERT INTO sessions (session_id, requester_id, recipient_id, skill_id, proposed_at, message, status, created_at, updated_at, completed_at) VALUES
-- Completed session: Alex Chen (Learner) learned Figma from Priya Sharma (Teacher)
(1, 1, 2, 4, '2026-10-01 15:00:00', 'Hey Priya, would love to learn Figma components and auto-layout basics!', 'COMPLETED', '2026-09-28 10:00:00', '2026-10-01 16:30:00', '2026-10-01 16:30:00'),

-- Accepted session: Priya Sharma (Learner) learning Java from Alex Chen (Teacher)
(2, 2, 1, 1, '2026-10-15 17:00:00', 'Hi Alex, can we cover Java classes, objects, and inheritance next Tuesday?', 'ACCEPTED', '2026-10-08 11:20:00', '2026-10-08 14:00:00', NULL),

-- Pending incoming session for Alex: Marcus Vance wants to learn Java
(3, 5, 1, 1, '2026-10-20 18:00:00', 'Hello! I need help setting up JDK and writing basic Java loops and methods.', 'PENDING', '2026-10-09 09:15:00', '2026-10-09 09:15:00', NULL),

-- Outgoing pending session from Alex to Marcus: Alex wants to learn Public Speaking
(4, 1, 5, 9, '2026-10-22 16:00:00', 'Hi Marcus, I have a college project presentation coming up and need coaching on vocal delivery.', 'PENDING', '2026-10-09 10:30:00', '2026-10-09 10:30:00', NULL);

-- 5. Insert Sample Reviews
INSERT INTO reviews (review_id, session_id, reviewer_id, reviewed_student_id, rating, comment, created_at) VALUES
-- Alex reviewing Priya after Session 1
(1, 1, 1, 2, 5, 'Priya is a phenomenal mentor! She explained Figma autolayout and components so clearly in just one hour.', '2026-10-01 17:00:00'),
-- Priya reviewing Alex after Session 1
(2, 1, 2, 1, 5, 'Alex was super prepared and engaged. Great collaborative learning session!', '2026-10-01 17:15:00');
