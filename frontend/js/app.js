/* ====================================================================
   SkillSync — Main SPA Router, API Client & State Controller
   ==================================================================== */

const API_BASE = '/api';

const App = {
    init() {
        window.addEventListener('hashchange', () => this.navigate());
        Auth.updateNavUI();
        this.navigate();
    },

    async navigate() {
        const hash = window.location.hash || '#home';
        const [routePath, queryString] = hash.split('?');
        const params = new URLSearchParams(queryString || '');
        const paramObj = Object.fromEntries(params.entries());

        const appView = document.getElementById('app-view');
        if (!appView) return;

        // Update active nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === routePath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Hide mobile drawer on navigation
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) mobileMenu.classList.add('hidden');

        window.scrollTo({ top: 0, behavior: 'smooth' });

        try {
            if (routePath === '#home') {
                appView.innerHTML = await LandingPage.render();
            } else if (routePath === '#explore') {
                appView.innerHTML = await ExplorePage.render(paramObj);
            } else if (routePath === '#dashboard') {
                appView.innerHTML = await DashboardPage.render();
            } else if (routePath === '#onboarding') {
                appView.innerHTML = await OnboardingPage.render();
            } else if (routePath === '#profile') {
                appView.innerHTML = await ProfilePage.render(paramObj);
            } else if (routePath === '#sessions') {
                appView.innerHTML = await SessionsPage.render(paramObj);
            } else if (routePath === '#admin') {
                appView.innerHTML = await AdminPage.render();
            } else if (routePath === '#login') {
                appView.innerHTML = this.renderLoginForm();
            } else if (routePath === '#register') {
                appView.innerHTML = this.renderRegisterForm();
            } else if (routePath === '#how-it-works' || routePath === '#about') {
                window.location.hash = '#home';
            } else {
                appView.innerHTML = await LandingPage.render();
            }
        } catch (error) {
            console.error('Navigation error:', error);
            Components.showToast('Error loading page: ' + error.message, 'error');
        }
    },

    // API Client with Mock Data Fallback
    async fetchApi(endpoint, options = {}) {
        try {
            const res = await fetch(`${API_BASE}${endpoint}`, {
                headers: { 'Content-Type': 'application/json', ...options.headers },
                ...options
            });
            if (res.ok) {
                if (res.status === 204) return null;
                const contentType = res.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return await res.json();
                }
            }
        } catch (err) {
            // Fallback to local memory state
        }
        return this.getFallbackData(endpoint, options);
    },

    getFallbackData(endpoint, options = {}) {
        const method = options.method || 'GET';
        const data = window.SKILLSYNC_DATA;

        if (endpoint.startsWith('/skills/categories')) return ['Programming and Software Development', 'Graphic Design and UI/UX', 'Data Science and Artificial Intelligence', 'Web Development', 'Communication and Public Speaking', 'Business and Entrepreneurship'];
        if (endpoint.startsWith('/skills')) return data.skills;

        if (endpoint.startsWith('/students/search') || endpoint === '/students') return data.students;
        if (endpoint.startsWith('/students/') && endpoint.endsWith('/matches')) {
            const id = parseInt(endpoint.split('/')[2]);
            return [
                { teacherProfile: data.students[1], matchReasons: ['Offers Figma & UI/UX Design (Advanced)', 'Availability matches on Tuesday'], score: 75.0 },
                { teacherProfile: data.students[2], matchReasons: ['Offers Python Development (Advanced)', 'Teacher rating: 4.8 ★'], score: 70.0 }
            ];
        }
        if (endpoint.startsWith('/students/')) {
            const id = parseInt(endpoint.split('/')[2]);
            return data.students.find(s => s.studentId === id) || data.students[0];
        }

        if (endpoint.startsWith('/sessions/incoming')) return data.sessions.filter(s => s.status === 'PENDING');
        if (endpoint.startsWith('/sessions/outgoing')) return [];
        if (endpoint.startsWith('/sessions/upcoming')) return data.sessions.filter(s => s.status === 'ACCEPTED');
        if (endpoint.startsWith('/sessions/completed')) return data.sessions.filter(s => s.status === 'COMPLETED');
        if (endpoint.startsWith('/sessions/request') && method === 'POST') {
            const req = JSON.parse(options.body);
            const teacher = data.students.find(s => s.studentId === req.teacherId) || data.students[0];
            const newSession = {
                sessionId: data.sessions.length + 10,
                learnerId: 1,
                teacherId: req.teacherId,
                skillId: req.skillId,
                learnerName: 'Alex Chen',
                teacherName: teacher.fullName,
                skillName: 'Requested Skill',
                sessionDate: req.sessionDate,
                startTime: req.startTime,
                durationMinutes: req.durationMinutes || 60,
                format: req.format || 'ONLINE',
                learningObjective: req.learningObjective,
                status: 'PENDING'
            };
            data.sessions.push(newSession);
            return newSession;
        }

        if (endpoint.startsWith('/feedback/student/')) return data.feedback;
        if (endpoint.startsWith('/feedback/submit') && method === 'POST') {
            const req = JSON.parse(options.body);
            const newFb = { feedbackId: data.feedback.length + 1, sessionId: req.sessionId, reviewerId: 1, teacherId: 2, rating: req.rating, comment: req.comment, outcomeSummary: req.outcomeSummary, reviewerName: 'Alex Chen' };
            data.feedback.push(newFb);
            return newFb;
        }

        if (endpoint.startsWith('/admin/stats')) return { totalStudents: data.students.length, activeStudents: data.students.length, totalSkills: data.skills.length, totalSessions: data.sessions.length };
        if (endpoint.startsWith('/admin/students')) return data.students;

        return {};
    },

    // Auth & Page Handlers
    renderLoginForm() {
        return `
            <div class="py-16 bg-slate-50 min-h-[80vh] flex items-center justify-center">
                <div class="max-w-md w-full mx-4 card p-8 shadow-xl">
                    <div class="text-center mb-6">
                        <div class="w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-3">
                            <i class="fa-solid fa-graduation-cap"></i>
                        </div>
                        <h2 class="text-2xl font-extrabold text-slate-900">Log In to SkillSync</h2>
                        <p class="text-xs text-slate-500 mt-1">Access your peer learning dashboard & sessions</p>
                    </div>

                    <form onsubmit="App.handleLogin(event)" class="space-y-4">
                        <div class="form-group">
                            <label class="form-label">College Email</label>
                            <input type="email" id="login-email" class="form-input" placeholder="alex.chen@skillsync.edu" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Password</label>
                            <div class="relative">
                                <input type="password" id="login-password" class="form-input pr-10" required>
                                <button type="button" onclick="App.togglePassword('login-password')" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <i class="fa-solid fa-eye"></i>
                                </button>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary w-full py-3">Log In</button>
                    </form>

                    <div class="text-center pt-6 mt-6 border-t border-slate-100 text-xs text-slate-500">
                        Don't have an account? <a href="#register" class="font-bold text-indigo-600 hover:underline">Register here</a>
                    </div>
                </div>
            </div>
        `;
    },

    renderRegisterForm() {
        return `
            <div class="py-16 bg-slate-50 min-h-[85vh] flex items-center justify-center">
                <div class="max-w-lg w-full mx-4 card p-8 shadow-xl">
                    <div class="text-center mb-6">
                        <div class="w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-3">
                            <i class="fa-solid fa-user-plus"></i>
                        </div>
                        <h2 class="text-2xl font-extrabold text-slate-900">Student Registration</h2>
                        <p class="text-xs text-slate-500 mt-1">Join your campus peer learning community</p>
                    </div>

                    <form onsubmit="App.handleRegister(event)" class="space-y-4">
                        <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input type="text" id="reg-fullname" class="form-input" placeholder="e.g. John Doe" required>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="form-group">
                                <label class="form-label">College Email</label>
                                <input type="email" id="reg-email" class="form-input" placeholder="john@college.edu" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Reg Number</label>
                                <input type="text" id="reg-no" class="form-input" placeholder="REG2026099" required>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="form-group">
                                <label class="form-label">Department</label>
                                <input type="text" id="reg-dept" class="form-input" placeholder="Computer Science" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Academic Year</label>
                                <select id="reg-year" class="form-select">
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year" selected>3rd Year</option>
                                    <option value="4th Year">4th Year</option>
                                </select>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="form-group">
                                <label class="form-label">Password</label>
                                <input type="password" id="reg-password" class="form-input" required minlength="6">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Confirm Password</label>
                                <input type="password" id="reg-confirm" class="form-input" required minlength="6">
                            </div>
                        </div>
                        <div class="flex items-center gap-2 text-xs text-slate-600">
                            <input type="checkbox" id="reg-terms" required class="rounded">
                            <label for="reg-terms">I agree to SkillSync honor code & peer learning guidelines.</label>
                        </div>
                        <button type="submit" class="btn btn-primary w-full py-3">Create Student Account</button>
                    </form>
                </div>
            </div>
        `;
    },

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        let res = await this.fetchApi('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        if (!res || !res.student) {
            const mock = window.SKILLSYNC_DATA.students.find(s => s.email.toLowerCase() === email.toLowerCase()) || window.SKILLSYNC_DATA.students[0];
            res = { student: mock };
        }

        Auth.setCurrentUser(res.student);
        Components.showToast(`Welcome back, ${res.student.fullName}!`, 'success');
        window.location.hash = '#dashboard';
    },

    async handleRegister(e) {
        e.preventDefault();
        const fullName = document.getElementById('reg-fullname').value;
        const email = document.getElementById('reg-email').value;
        const registrationNumber = document.getElementById('reg-no').value;
        const department = document.getElementById('reg-dept').value;
        const academicYear = document.getElementById('reg-year').value;
        const password = document.getElementById('reg-password').value;
        const confirm = document.getElementById('reg-confirm').value;

        if (password !== confirm) {
            Components.showToast('Passwords do not match.', 'error');
            return;
        }

        const payload = { fullName, email, registrationNumber, department, academicYear, password };
        let res = await this.fetchApi('/auth/register', {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        const newStudent = {
            studentId: Date.now(),
            fullName, email, registrationNumber, department, academicYear,
            bio: 'New student on SkillSync platform.',
            role: 'STUDENT', accountStatus: 'ACTIVE', creditBalance: 5,
            teachSkills: [], learnSkills: [], availabilitySlots: []
        };

        Auth.setCurrentUser(newStudent);
        Components.showToast('Registration successful! Redirecting to setup wizard...', 'success');
        window.location.hash = '#onboarding';
    },

    togglePassword(id) {
        const input = document.getElementById(id);
        if (input) input.type = input.type === 'password' ? 'text' : 'password';
    },

    // Session Modal Control
    async openRequestSessionModal(teacherId) {
        if (!Auth.requireAuth()) return;

        const user = Auth.getCurrentUser();
        if (user.studentId === teacherId) {
            Components.showToast('You cannot request a session with yourself.', 'error');
            return;
        }

        const teacher = await this.getStudentProfile(teacherId);
        const teachSkills = teacher.teachSkills || [];

        Components.openModal(
            `Request Session with ${teacher.fullName}`,
            `
                <form id="session-request-form" class="space-y-4">
                    <div class="form-group">
                        <label class="form-label">Select Skill to Learn</label>
                        <select id="request-skill" class="form-select">
                            ${teachSkills.map(s => `<option value="${s.skillId}">${s.skillName} (${s.proficiencyLevel})</option>`).join('')}
                        </select>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div class="form-group">
                            <label class="form-label">Session Date</label>
                            <input type="date" id="request-date" value="${new Date(Date.now() + 86400000).toISOString().split('T')[0]}" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Start Time</label>
                            <input type="time" id="request-time" value="14:00" class="form-input" required>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div class="form-group">
                            <label class="form-label">Duration (Minutes)</label>
                            <select id="request-duration" class="form-select">
                                <option value="45">45 Minutes</option>
                                <option value="60" selected>60 Minutes (1 Hour)</option>
                                <option value="90">90 Minutes</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Preferred Format</label>
                            <select id="request-format" class="form-select">
                                <option value="ONLINE">Online Video Call</option>
                                <option value="IN_PERSON">In-Person (Campus Library)</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Learning Objective / Message to Teacher</label>
                        <textarea id="request-objective" rows="3" class="form-textarea" placeholder="Describe what specific topic or assignment you need help with..." required></textarea>
                    </div>
                </form>
            `,
            `
                <button onclick="Components.closeModal()" class="btn btn-secondary btn-sm">Cancel</button>
                <button onclick="App.submitSessionRequest(${teacherId})" class="btn btn-primary btn-sm">Send Request</button>
            `
        );
    },

    async submitSessionRequest(teacherId) {
        const user = Auth.getCurrentUser();
        const skillId = parseInt(document.getElementById('request-skill').value);
        const sessionDate = document.getElementById('request-date').value;
        const startTime = document.getElementById('request-time').value;
        const durationMinutes = parseInt(document.getElementById('request-duration').value);
        const format = document.getElementById('request-format').value;
        const learningObjective = document.getElementById('request-objective').value;

        if (!learningObjective.trim()) {
            Components.showToast('Please state your learning objective.', 'error');
            return;
        }

        const payload = { teacherId, skillId, sessionDate, startTime, durationMinutes, format, learningObjective };
        await this.fetchApi(`/sessions/request?learnerId=${user.studentId}`, {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        Components.closeModal();
        Components.showToast('Session request sent to teacher!', 'success');
        window.location.hash = '#sessions';
    },

    // Delegated API Calls
    getSkills() { return this.fetchApi('/skills'); },
    getCategories() { return this.fetchApi('/skills/categories'); },
    getStudents() { return this.fetchApi('/students'); },
    getStudentProfile(id) { return this.fetchApi(`/students/${id}`); },
    getMatchesForStudent(id) { return this.fetchApi(`/students/${id}/matches`); },
    updateProfile(id, data) { return this.fetchApi(`/students/${id}`, { method: 'PUT', body: JSON.stringify(data) }); },
    addStudentSkill(id, data) { return this.fetchApi(`/students/${id}/skills`, { method: 'POST', body: JSON.stringify(data) }); },
    updateAvailability(id, slots) { return this.fetchApi(`/students/${id}/availability`, { method: 'PUT', body: JSON.stringify(slots) }); },
    getIncomingRequests(id) { return this.fetchApi(`/sessions/incoming?teacherId=${id}`); },
    getOutgoingRequests(id) { return this.fetchApi(`/sessions/outgoing?learnerId=${id}`); },
    getUpcomingSessions(id) { return this.fetchApi(`/sessions/upcoming?studentId=${id}`); },
    getCompletedSessions(id) { return this.fetchApi(`/sessions/completed?studentId=${id}`); },
    updateSessionStatus(sessionId, studentId, status) { return this.fetchApi(`/sessions/${sessionId}/status?studentId=${studentId}&status=${status}`, { method: 'PATCH' }); },
    submitFeedback(reviewerId, dto) { return this.fetchApi(`/feedback/submit?reviewerId=${reviewerId}`, { method: 'POST', body: JSON.stringify(dto) }); },
    getTeacherFeedback(id) { return this.fetchApi(`/feedback/student/${id}`); },
    getPlatformStats() { return this.fetchApi('/admin/stats'); },
    getAdminStudents() { return this.fetchApi('/admin/students'); },
    updateStudentStatus(id, status) { return this.fetchApi(`/admin/students/${id}/status?status=${status}`, { method: 'PATCH' }); },
    createSkill(dto) { return this.fetchApi('/admin/skills', { method: 'POST', body: JSON.stringify(dto) }); }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();

    // Mobile menu toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.onclick = () => menu.classList.toggle('hidden');
    }
});
