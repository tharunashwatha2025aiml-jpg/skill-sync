/* ====================================================================
   SkillSync — Session Management View Module (Incoming/Outgoing/Upcoming/Completed)
   ==================================================================== */

const SessionsPage = {
    activeTab: 'incoming',

    async render(params = {}) {
        if (!Auth.requireAuth()) return '';

        const user = Auth.getCurrentUser();
        const incoming = await App.getIncomingRequests(user.studentId);
        const outgoing = await App.getOutgoingRequests(user.studentId);
        const upcoming = await App.getUpcomingSessions(user.studentId);
        const completed = await App.getCompletedSessions(user.studentId);

        return `
            <div class="py-10 bg-slate-50 min-h-screen">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <span class="badge badge-indigo mb-1">Session Dashboard</span>
                            <h1 class="text-3xl font-extrabold text-slate-900">Manage Learning Sessions</h1>
                        </div>
                        <a href="#explore" class="btn btn-primary btn-sm">
                            <i class="fa-solid fa-plus"></i> Request New Session
                        </a>
                    </div>

                    <!-- Navigation Tabs -->
                    <div class="flex items-center gap-2 border-b border-slate-200 overflow-x-auto">
                        <button onclick="SessionsPage.switchTab('incoming')" class="px-4 py-3 font-bold text-sm border-b-2 transition-colors ${this.activeTab === 'incoming' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}">
                            Incoming Requests <span class="ml-1 px-2 py-0.5 rounded-full text-xs bg-indigo-50 text-indigo-700">${incoming.length}</span>
                        </button>
                        <button onclick="SessionsPage.switchTab('outgoing')" class="px-4 py-3 font-bold text-sm border-b-2 transition-colors ${this.activeTab === 'outgoing' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}">
                            Outgoing Requests <span class="ml-1 px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700">${outgoing.length}</span>
                        </button>
                        <button onclick="SessionsPage.switchTab('upcoming')" class="px-4 py-3 font-bold text-sm border-b-2 transition-colors ${this.activeTab === 'upcoming' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}">
                            Upcoming Sessions <span class="ml-1 px-2 py-0.5 rounded-full text-xs bg-cyan-50 text-cyan-700">${upcoming.length}</span>
                        </button>
                        <button onclick="SessionsPage.switchTab('completed')" class="px-4 py-3 font-bold text-sm border-b-2 transition-colors ${this.activeTab === 'completed' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}">
                            Completed & Reviews <span class="ml-1 px-2 py-0.5 rounded-full text-xs bg-emerald-50 text-emerald-700">${completed.length}</span>
                        </button>
                    </div>

                    <!-- Tab Contents -->
                    <div id="sessions-tab-content">
                        ${this.renderTabContent(user, incoming, outgoing, upcoming, completed)}
                    </div>
                </div>
            </div>
        `;
    },

    renderTabContent(user, incoming, outgoing, upcoming, completed) {
        if (this.activeTab === 'incoming') {
            if (incoming.length === 0) return Components.renderEmptyState('fa-inbox', 'No pending incoming requests', 'When other students request learning sessions for your offered skills, they will appear here.');
            return `
                <div class="space-y-4">
                    ${incoming.map(s => `
                        <div class="card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div class="space-y-1">
                                <div class="flex items-center gap-2">
                                    <span class="badge status-pending">Pending Approval</span>
                                    <span class="text-xs font-semibold text-slate-500">${s.format || 'ONLINE'}</span>
                                </div>
                                <h3 class="font-bold text-slate-900 text-base">Learner: ${s.learnerName}</h3>
                                <p class="text-xs font-semibold text-indigo-600">Requested Skill: ${s.skillName}</p>
                                <p class="text-xs text-slate-500">Date: <strong>${s.sessionDate}</strong> at <strong>${s.startTime}</strong> (${s.durationMinutes} mins)</p>
                                <p class="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">" ${s.learningObjective} "</p>
                            </div>
                            <div class="flex items-center gap-2 w-full md:w-auto">
                                <button onclick="SessionsPage.updateStatus(${s.sessionId}, 'ACCEPTED')" class="btn btn-primary btn-sm bg-emerald-600 hover:bg-emerald-700 flex-1 md:flex-initial">
                                    <i class="fa-solid fa-check"></i> Accept Request
                                </button>
                                <button onclick="SessionsPage.updateStatus(${s.sessionId}, 'REJECTED')" class="btn btn-danger btn-sm flex-1 md:flex-initial">
                                    <i class="fa-solid fa-xmark"></i> Reject
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (this.activeTab === 'outgoing') {
            if (outgoing.length === 0) return Components.renderEmptyState('fa-paper-plane', 'No outgoing pending requests', 'You currently have no outgoing session requests waiting for peer acceptance.');
            return `
                <div class="space-y-4">
                    ${outgoing.map(s => `
                        <div class="card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div class="space-y-1">
                                <div class="flex items-center gap-2">
                                    <span class="badge status-pending">Awaiting Teacher Response</span>
                                </div>
                                <h3 class="font-bold text-slate-900 text-base">Teacher: ${s.teacherName}</h3>
                                <p class="text-xs font-semibold text-indigo-600">Skill: ${s.skillName}</p>
                                <p class="text-xs text-slate-500">Date: ${s.sessionDate} at ${s.startTime}</p>
                            </div>
                            <button onclick="SessionsPage.updateStatus(${s.sessionId}, 'CANCELLED')" class="btn btn-secondary btn-sm text-red-600">
                                Cancel Request
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (this.activeTab === 'upcoming') {
            if (upcoming.length === 0) return Components.renderEmptyState('fa-calendar-day', 'No upcoming accepted sessions', 'Once a teacher accepts your request, your scheduled session will appear here.');
            return `
                <div class="space-y-4">
                    ${upcoming.map(s => `
                        <div class="card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-l-indigo-600">
                            <div class="space-y-1">
                                <span class="badge status-accepted">Confirmed & Scheduled</span>
                                <h3 class="font-bold text-slate-900 text-base">${s.skillName} Session</h3>
                                <p class="text-xs text-slate-600">Teacher: <strong>${s.teacherName}</strong> | Learner: <strong>${s.learnerName}</strong></p>
                                <p class="text-xs font-bold text-indigo-700"><i class="fa-regular fa-clock mr-1"></i> ${s.sessionDate} @ ${s.startTime} (${s.durationMinutes} mins)</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <button onclick="SessionsPage.updateStatus(${s.sessionId}, 'COMPLETED')" class="btn btn-primary btn-sm bg-indigo-600">
                                    <i class="fa-solid fa-circle-check"></i> Mark as Completed
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            if (completed.length === 0) return Components.renderEmptyState('fa-circle-check', 'No completed sessions yet', 'Completed peer learning sessions will be listed here along with review status.');
            return `
                <div class="space-y-4">
                    ${completed.map(s => `
                        <div class="card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div class="space-y-1">
                                <span class="badge status-completed">Completed</span>
                                <h3 class="font-bold text-slate-900 text-base">${s.skillName}</h3>
                                <p class="text-xs text-slate-600">Teacher: ${s.teacherName} • Learner: ${s.learnerName}</p>
                                <p class="text-xs text-slate-400">Date: ${s.sessionDate}</p>
                            </div>
                            <div>
                                ${user.studentId === s.learnerId ? `
                                    <button onclick="SessionsPage.openFeedbackModal(${s.sessionId})" class="btn btn-primary btn-sm">
                                        <i class="fa-solid fa-star"></i> Submit Rating & Feedback
                                    </button>
                                ` : '<span class="text-xs font-bold text-emerald-600">Session Completed</span>'}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    },

    switchTab(tab) {
        this.activeTab = tab;
        App.navigate(window.location.hash);
    },

    async updateStatus(sessionId, status) {
        const user = Auth.getCurrentUser();
        await App.updateSessionStatus(sessionId, user.studentId, status);
        Components.showToast(`Session updated to ${status}.`, 'success');
        App.navigate(window.location.hash);
    },

    openFeedbackModal(sessionId) {
        Components.openModal(
            'Submit Session Rating & Feedback',
            `
                <form id="feedback-form" class="space-y-4">
                    <div class="form-group">
                        <label class="form-label">Rating (1 to 5 Stars)</label>
                        <div class="star-picker" id="star-rating-picker">
                            <i class="fa-solid fa-star active" data-rating="1" onclick="SessionsPage.setStar(1)"></i>
                            <i class="fa-solid fa-star active" data-rating="2" onclick="SessionsPage.setStar(2)"></i>
                            <i class="fa-solid fa-star active" data-rating="3" onclick="SessionsPage.setStar(3)"></i>
                            <i class="fa-solid fa-star active" data-rating="4" onclick="SessionsPage.setStar(4)"></i>
                            <i class="fa-solid fa-star active" data-rating="5" onclick="SessionsPage.setStar(5)"></i>
                        </div>
                        <input type="hidden" id="selected-rating" value="5">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Written Feedback / Review</label>
                        <textarea id="feedback-comment" rows="3" class="form-textarea" placeholder="How was the session? Did your teacher explain concepts clearly?" required></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Learning Outcome Summary (Optional)</label>
                        <input type="text" id="feedback-outcome" class="form-input" placeholder="e.g. Mastered Java OOP inheritance and class structures...">
                    </div>
                </form>
            `,
            `
                <button onclick="Components.closeModal()" class="btn btn-secondary btn-sm">Cancel</button>
                <button onclick="SessionsPage.submitFeedback(${sessionId})" class="btn btn-primary btn-sm">Submit Review</button>
            `
        );
    },

    setStar(rating) {
        document.getElementById('selected-rating').value = rating;
        const stars = document.querySelectorAll('#star-rating-picker .fa-star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    },

    async submitFeedback(sessionId) {
        const user = Auth.getCurrentUser();
        const rating = parseInt(document.getElementById('selected-rating').value);
        const comment = document.getElementById('feedback-comment').value;
        const outcomeSummary = document.getElementById('feedback-outcome').value;

        if (!comment.trim()) {
            Components.showToast('Please provide written feedback comment.', 'error');
            return;
        }

        await App.submitFeedback(user.studentId, { sessionId, rating, comment, outcomeSummary });
        Components.closeModal();
        Components.showToast('Feedback submitted successfully! Thank you for reviewing your peer.', 'success');
        App.navigate(window.location.hash);
    }
};
