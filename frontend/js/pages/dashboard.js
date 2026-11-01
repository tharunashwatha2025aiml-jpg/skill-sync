/* ====================================================================
   SkillSync — Personal Student Dashboard Module
   ==================================================================== */

const DashboardPage = {
    async render() {
        if (!Auth.requireAuth()) return '';

        const user = Auth.getCurrentUser();
        const profile = await App.getStudentProfile(user.studentId);
        const matches = await App.getMatchesForStudent(user.studentId);
        const upcomingSessions = await App.getUpcomingSessions(user.studentId);
        const incomingRequests = await App.getIncomingRequests(user.studentId);

        const teachSkills = profile.teachSkills || [];
        const learnSkills = profile.learnSkills || [];

        // Calculate profile completion percentage
        let completionScore = 40; // Base score for account setup
        if (profile.bio) completionScore += 15;
        if (teachSkills.length > 0) completionScore += 25;
        if (learnSkills.length > 0) completionScore += 20;

        return `
            <div class="py-10 bg-slate-50 min-h-screen">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    <!-- Welcome Header Banner -->
                    <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div class="flex items-center gap-4">
                            <img src="${profile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" class="w-16 h-16 rounded-full object-cover border-2 border-indigo-200 shadow-sm">
                            <div>
                                <h1 class="text-2xl font-extrabold text-slate-900">Welcome back, ${profile.fullName}! 👋</h1>
                                <p class="text-sm text-slate-500 font-medium">${profile.department} • ${profile.academicYear} | Reg: ${profile.registrationNumber}</p>
                            </div>
                        </div>

                        <!-- Quick Actions -->
                        <div class="flex flex-wrap items-center gap-3">
                            <a href="#explore" class="btn btn-primary btn-sm">
                                <i class="fa-solid fa-compass"></i> Explore Skills
                            </a>
                            <a href="#sessions" class="btn btn-secondary btn-sm">
                                <i class="fa-solid fa-calendar-days"></i> Manage Sessions (${incomingRequests.length} Pending)
                            </a>
                            <a href="#profile?id=${profile.studentId}" class="btn btn-secondary btn-sm">
                                <i class="fa-solid fa-pen-to-square"></i> Edit Profile
                            </a>
                        </div>
                    </div>

                    <!-- Metrics Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div class="card p-5">
                            <div class="flex items-center justify-between">
                                <div>
                                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Skills Offered</span>
                                    <h3 class="text-2xl font-extrabold text-slate-900 mt-1">${teachSkills.length}</h3>
                                </div>
                                <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg font-bold">
                                    <i class="fa-solid fa-chalkboard-user"></i>
                                </div>
                            </div>
                        </div>

                        <div class="card p-5">
                            <div class="flex items-center justify-between">
                                <div>
                                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Skills Wanted</span>
                                    <h3 class="text-2xl font-extrabold text-slate-900 mt-1">${learnSkills.length}</h3>
                                </div>
                                <div class="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center text-lg font-bold">
                                    <i class="fa-solid fa-book-open"></i>
                                </div>
                            </div>
                        </div>

                        <div class="card p-5">
                            <div class="flex items-center justify-between">
                                <div>
                                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Upcoming Sessions</span>
                                    <h3 class="text-2xl font-extrabold text-slate-900 mt-1">${upcomingSessions.length}</h3>
                                </div>
                                <div class="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-lg font-bold">
                                    <i class="fa-solid fa-clock"></i>
                                </div>
                            </div>
                        </div>

                        <div class="card p-5">
                            <div class="flex items-center justify-between">
                                <div>
                                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Rating</span>
                                    <h3 class="text-2xl font-extrabold text-amber-600 mt-1">${profile.averageRating > 0 ? profile.averageRating + ' ★' : 'N/A'}</h3>
                                </div>
                                <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg font-bold">
                                    <i class="fa-solid fa-star"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Profile Completion Progress Bar -->
                    <div class="bg-white rounded-xl p-5 border border-slate-200">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm font-bold text-slate-800">Profile Completion Status</span>
                            <span class="text-sm font-extrabold text-indigo-600">${completionScore}%</span>
                        </div>
                        <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                            <div class="bg-gradient-to-r from-indigo-500 to-cyan-400 h-2.5 rounded-full transition-all duration-500" style="width: ${completionScore}%"></div>
                        </div>
                        ${completionScore < 100 ? `
                            <p class="text-xs text-slate-500 mt-2">Complete your onboarding or add skills you want to learn to get better peer matches.</p>
                        ` : ''}
                    </div>

                    <!-- Recommended Peer Mentors Section -->
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <h2 class="text-xl font-extrabold text-slate-900">Recommended Peer Matches for You</h2>
                            <a href="#explore" class="text-xs font-bold text-indigo-600 hover:text-indigo-800">View All Marketplace</a>
                        </div>

                        ${matches.length > 0 ? `
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                ${matches.map(m => `
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="flex items-start gap-3 mb-3">
                                                <img src="${m.teacherProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" class="w-12 h-12 rounded-full object-cover">
                                                <div>
                                                    <h4 class="font-bold text-slate-900 text-sm">${m.teacherProfile.fullName}</h4>
                                                    <p class="text-xs text-slate-500">${m.teacherProfile.department}</p>
                                                </div>
                                            </div>

                                            <div class="space-y-1 mb-4">
                                                ${m.matchReasons.map(r => `
                                                    <div class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 flex items-center gap-1.5">
                                                        <i class="fa-solid fa-circle-check text-[10px]"></i> ${r}
                                                    </div>
                                                `).join('')}
                                            </div>

                                            <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                                                <a href="#profile?id=${m.teacherProfile.studentId}" class="text-xs font-bold text-slate-600 hover:text-indigo-600">View Profile</a>
                                                <button onclick="App.openRequestSessionModal(${m.teacherProfile.studentId})" class="btn btn-primary btn-sm">Request Session</button>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        ` : Components.renderEmptyState('fa-user-group', 'No personalized matches yet', 'Add skills you want to learn in your profile to discover recommendations.', 'Add Skills to Profile', `window.location.hash="#profile?id=${user.studentId}"`)}
                    </div>
                </div>
            </div>
        `;
    }
};
