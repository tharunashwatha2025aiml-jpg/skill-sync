/* ====================================================================
   SkillSync — Initial Client State & Seed Fallback Data
   ==================================================================== */

window.SKILLSYNC_DATA = {
    skills: [
        { skillId: 1, skillName: 'Java Programming', category: 'Programming and Software Development', description: 'Core Java, OOPs, Spring Boot', activeStatus: true },
        { skillId: 2, skillName: 'Python Development', category: 'Programming and Software Development', description: 'Scripting, Automation, Data Structures', activeStatus: true },
        { skillId: 3, skillName: 'Data Structures & Algorithms', category: 'Programming and Software Development', description: 'LeetCode, Trees, DP, Sorting', activeStatus: true },
        { skillId: 4, skillName: 'Figma & UI/UX Design', category: 'Graphic Design and UI/UX', description: 'Wireframing, Auto-layout, Design Systems', activeStatus: true },
        { skillId: 5, skillName: 'React.js Frontend', category: 'Web Development', description: 'Components, Hooks, REST integration', activeStatus: true },
        { skillId: 6, skillName: 'Machine Learning Fundamentals', category: 'Data Science and Artificial Intelligence', description: 'Scikit-learn, Regression, Neural Nets', activeStatus: true },
        { skillId: 7, skillName: 'Technical Presentation & Pitching', category: 'Communication and Public Speaking', description: 'Slide design, Public speaking, Pitching', activeStatus: true },
        { skillId: 8, skillName: 'Data Analytics & SQL', category: 'Data Science and Artificial Intelligence', description: 'SQL Joins, Aggregations, MySQL', activeStatus: true },
        { skillId: 9, skillName: 'Linear Algebra & Calculus', category: 'Mathematics and Academic Subjects', description: 'Matrices, Vector spaces, Calculus', activeStatus: true },
        { skillId: 10, skillName: 'Adobe Illustrator', category: 'Graphic Design and UI/UX', description: 'Vector logos, branding, illustrations', activeStatus: true },
        { skillId: 11, skillName: 'Startup Strategy & Pitch Deck', category: 'Business and Entrepreneurship', description: 'Business canvas, pitch decks', activeStatus: true },
        { skillId: 12, skillName: 'Video Editing with Premiere', category: 'Video Editing and Content Creation', description: 'Timeline cuts, audio sync, export', activeStatus: true }
    ],

    students: [
        {
            studentId: 1,
            fullName: 'Alex Chen',
            email: 'alex.chen@skillsync.edu',
            registrationNumber: 'REG2024001',
            department: 'Computer Science',
            academicYear: '3rd Year',
            bio: 'Passionate about Java Spring Boot and algorithms. Love helping peers master coding concepts!',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            role: 'STUDENT',
            accountStatus: 'ACTIVE',
            creditBalance: 6,
            averageRating: 5.0,
            totalReviews: 2,
            completedSessionsCount: 2,
            teachSkills: [
                { studentSkillId: 101, skillId: 1, skillName: 'Java Programming', category: 'Programming and Software Development', proficiencyLevel: 'Advanced', description: '2+ years building Spring Boot REST APIs.' },
                { studentSkillId: 102, skillId: 3, skillName: 'Data Structures & Algorithms', category: 'Programming and Software Development', proficiencyLevel: 'Intermediate', description: 'Solved 300+ LeetCode problems.' }
            ],
            learnSkills: [
                { studentSkillId: 103, skillId: 4, skillName: 'Figma & UI/UX Design', category: 'Graphic Design and UI/UX', proficiencyLevel: 'Beginner', description: 'Want to design UI mockups.' },
                { studentSkillId: 104, skillId: 6, skillName: 'Machine Learning Fundamentals', category: 'Data Science and Artificial Intelligence', proficiencyLevel: 'Beginner', description: 'Exploring ML for senior project.' }
            ],
            availabilitySlots: [
                { availabilityId: 1, dayOfWeek: 'Monday', startTime: '14:00', endTime: '17:00' },
                { availabilityId: 2, dayOfWeek: 'Wednesday', startTime: '16:00', endTime: '19:00' }
            ]
        },
        {
            studentId: 2,
            fullName: 'Priya Sharma',
            email: 'priya.sharma@skillsync.edu',
            registrationNumber: 'REG2024002',
            department: 'Design & Media',
            academicYear: '2nd Year',
            bio: 'UI/UX designer with 2 years of campus design experience. Looking to learn Python.',
            avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
            role: 'STUDENT',
            accountStatus: 'ACTIVE',
            creditBalance: 4,
            averageRating: 5.0,
            totalReviews: 1,
            completedSessionsCount: 2,
            teachSkills: [
                { studentSkillId: 201, skillId: 4, skillName: 'Figma & UI/UX Design', category: 'Graphic Design and UI/UX', proficiencyLevel: 'Advanced', description: 'Lead designer for campus fest app.' },
                { studentSkillId: 202, skillId: 10, skillName: 'Adobe Illustrator', category: 'Graphic Design and UI/UX', proficiencyLevel: 'Intermediate', description: 'Vector logos & graphics.' }
            ],
            learnSkills: [
                { studentSkillId: 203, skillId: 2, skillName: 'Python Development', category: 'Programming and Software Development', proficiencyLevel: 'Beginner', description: 'Automate design asset export.' }
            ],
            availabilitySlots: [
                { availabilityId: 3, dayOfWeek: 'Tuesday', startTime: '15:00', endTime: '18:00' },
                { availabilityId: 4, dayOfWeek: 'Thursday', startTime: '14:00', endTime: '17:00' }
            ]
        },
        {
            studentId: 3,
            fullName: 'Rahul Verma',
            email: 'rahul.verma@skillsync.edu',
            registrationNumber: 'REG2024003',
            department: 'Data Science',
            academicYear: '4th Year',
            bio: 'Machine Learning researcher and Python developer.',
            avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
            role: 'STUDENT',
            accountStatus: 'ACTIVE',
            creditBalance: 7,
            averageRating: 4.8,
            totalReviews: 1,
            completedSessionsCount: 1,
            teachSkills: [
                { studentSkillId: 301, skillId: 2, skillName: 'Python Development', category: 'Programming and Software Development', proficiencyLevel: 'Advanced', description: 'NumPy, Pandas, Scikit-learn.' },
                { studentSkillId: 302, skillId: 6, skillName: 'Machine Learning Fundamentals', category: 'Data Science and Artificial Intelligence', proficiencyLevel: 'Advanced', description: 'Applied ML research.' }
            ],
            learnSkills: [
                { studentSkillId: 303, skillId: 7, skillName: 'Technical Presentation & Pitching', category: 'Communication and Public Speaking', proficiencyLevel: 'Intermediate', description: 'Public speaking for tech conferences.' }
            ],
            availabilitySlots: [
                { availabilityId: 5, dayOfWeek: 'Monday', startTime: '10:00', endTime: '13:00' },
                { availabilityId: 6, dayOfWeek: 'Friday', startTime: '14:00', endTime: '18:00' }
            ]
        }
    ],

    sessions: [
        {
            sessionId: 1,
            learnerId: 2,
            teacherId: 1,
            skillId: 1,
            learnerName: 'Priya Sharma',
            teacherName: 'Alex Chen',
            skillName: 'Java Programming',
            sessionDate: '2026-10-01',
            startTime: '14:00',
            durationMinutes: 60,
            format: 'ONLINE',
            learningObjective: 'Understand OOP principles and basic Java classes.',
            status: 'COMPLETED'
        },
        {
            sessionId: 2,
            learnerId: 1,
            teacherId: 2,
            skillId: 4,
            learnerName: 'Alex Chen',
            teacherName: 'Priya Sharma',
            skillName: 'Figma & UI/UX Design',
            sessionDate: '2026-10-03',
            startTime: '15:00',
            durationMinutes: 60,
            format: 'ONLINE',
            learningObjective: 'Learn Figma auto-layout and prototyping basics.',
            status: 'COMPLETED'
        }
    ],

    feedback: [
        {
            feedbackId: 1,
            sessionId: 1,
            reviewerId: 2,
            teacherId: 1,
            reviewerName: 'Priya Sharma',
            rating: 5,
            comment: 'Alex is an exceptional tutor! He explained OOP concepts like inheritance using real-world examples.',
            outcomeSummary: 'Mastered Java Class inheritance and encapsulation.'
        },
        {
            feedbackId: 2,
            sessionId: 2,
            reviewerId: 1,
            teacherId: 2,
            reviewerName: 'Alex Chen',
            rating: 5,
            comment: 'Priya guided me step-by-step through Figma auto-layouts. Built my first mobile prototype!',
            outcomeSummary: 'Built interactive 3-screen prototype in Figma.'
        }
    ]
};
