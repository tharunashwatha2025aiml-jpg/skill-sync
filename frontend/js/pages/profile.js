/* ====================================================================
   SkillSync — Student Profile & Settings Page Module
   ==================================================================== */

const ProfilePage = {
    async render(params = {}) {
        const currentUser = Auth.getCurrentUser();
        const profileId = params.id ? parseInt(params.id) : (currentUser ? currentUser.studentId : 1);

        const profile = await App.getStudentProfile(profileId);
        const feedbackList = await App.getTeacherFeedback(profileId);
        const isSelf = currentUser && currentUser.studentId === profileId;

        const teachSkills = profile.teachSkills || [];
        const learnSkills = profile.learnSkills || [];
        const availabilitySlots = profile.availabilitySlots || [];

        return `
            <div class="py-10 bg-slate-50 min-h-screen">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    <!-- Profile Header Card -->
                    <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div class="flex items-start gap-6">
                            <img src="${profile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" class="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 shadow-md">
                            <div class="space-y-1">
                                <div class="flex items-center gap-3">
                                    <h1 class="text-2xl font-extrabold text-slate-900">${profile.fullName}</h1>
                                    ${profile.averageRating > 0 ? `
                                        <span class="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                                            <i class="fa-solid fa-star text-amber-400"></i> ${profile.averageRating} (${profile.totalReviews} reviews)
                                        </span>
                                    ` : ''}
                                </div>
                                <p class="text-sm font-semibold text-indigo-600">${profile.department} • ${profile.academicYear}</p>
                                <p class="text-xs text-slate-500">Student Reg No: ${profile.registrationNumber}</p>
                                <p class="text-sm text-slate-600 pt-2 leading-relaxed max-w-2xl">${profile.bio || 'No biography added yet.'}</p>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div>
                            ${isSelf ? `
                                <button onclick="ProfilePage.openEditModal()" class="btn btn-secondary">
                                    <i class="fa-solid fa-user-pen"></i> Edit Profile & Skills
                                </button>
                            ` : `
                                <button onclick="App.openRequestSessionModal(${profile.studentId})" class="btn btn-primary btn-lg shadow-lg shadow-indigo-600/20">
                                    <i class="fa-solid fa-calendar-plus"></i> Request Learning Session
                                </button>
                            `}
                        </div>
                    </div>

                    <!-- Main Grid: Skills offered/wanted & Availability -->
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        <!-- Left Column: Skills Offered & Wanted -->
                        <div class="lg:col-span-2 space-y-6">
                            <!-- Skills Offered -->
                            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                                <div class="flex items-center justify-between border-b pb-3 border-slate-100">
                                    <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <i class="fa-solid fa-chalkboard-user text-indigo-600"></i> Skills Can Teach
                                    </h2>
                                    <span class="badge badge-indigo">${teachSkills.length} Offered</span>
                                </div>

                                ${teachSkills.length > 0 ? `
                                    <div class="space-y-3">
                                        ${teachSkills.map(sk => `
                                            <div class="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between">
                                                <div>
                                                    <div class="flex items-center gap-2 mb-1">
                                                        <h4 class="font-bold text-slate-900 text-sm">${sk.skillName}</h4>
                                                        <span class="badge badge-indigo text-[10px]">${sk.proficiencyLevel}</span>
                                                    </div>
                                                    <p class="text-xs text-slate-600">${sk.description || 'No detailed teaching description provided.'}</p>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : '<p class="text-xs text-slate-400 italic">No teaching skills listed yet.</p>'}
                            </div>

                            <!-- Skills Wanted -->
                            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                                <div class="flex items-center justify-between border-b pb-3 border-slate-100">
                                    <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <i class="fa-solid fa-book-open text-violet-600"></i> Skills Want to Learn
                                    </h2>
                                    <span class="badge badge-violet">${learnSkills.length} Desired</span>
                                </div>

                                ${learnSkills.length > 0 ? `
                                    <div class="space-y-3">
                                        ${learnSkills.map(sk => `
                                            <div class="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between">
                                                <div>
                                                    <h4 class="font-bold text-slate-900 text-sm mb-1">${sk.skillName}</h4>
                                                    <p class="text-xs text-slate-600">${sk.description || 'Interested in learning from a student tutor.'}</p>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : '<p class="text-xs text-slate-400 italic">No learning skills listed yet.</p>'}
                            </div>

                            <!-- Student Feedback & Reviews -->
                            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                                <div class="flex items-center justify-between border-b pb-3 border-slate-100">
                                    <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <i class="fa-solid fa-star text-amber-500"></i> Peer Feedback & Reviews
                                    </h2>
                                    <span class="text-xs text-slate-500 font-bold">${feedbackList.length} Verified Reviews</span>
                                </div>

                                ${feedbackList.length > 0 ? `
                                    <div class="space-y-4">
                                        ${feedbackList.map(fb => `
                                            <div class="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                                                <div class="flex items-center justify-between">
                                                    <span class="font-bold text-xs text-slate-900">${fb.reviewerName || 'Student Learner'}</span>
                                                    <span class="text-xs text-amber-600 font-extrabold flex items-center gap-1">
                                                        <i class="fa-solid fa-star text-amber-400"></i> ${fb.rating}/5
                                                    </span>
                                                </div>
                                                <p class="text-xs text-slate-700 italic">"${fb.comment}"</p>
                                                ${fb.outcomeSummary ? `<div class="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Outcome: ${fb.outcomeSummary}</div>` : ''}
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : '<p class="text-xs text-slate-400 italic">No session reviews submitted yet.</p>'}
                            </div>
                        </div>

                        <!-- Right Column: Availability & Stats -->
                        <div class="space-y-6">
                            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                                <h3 class="font-bold text-slate-900 text-base border-b pb-2">Session Availability</h3>
                                ${availabilitySlots.length > 0 ? `
                                    <ul class="space-y-2 text-xs">
                                        ${availabilitySlots.map(slot => `
                                            <li class="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 font-semibold text-slate-700">
                                                <span><i class="fa-regular fa-calendar-check text-indigo-600 mr-1.5"></i> ${slot.dayOfWeek}</span>
                                                <span class="badge badge-indigo">${slot.startTime} - ${slot.endTime}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                ` : '<p class="text-xs text-slate-400 italic">No availability times set.</p>'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async openEditModal() {
        const user = Auth.getCurrentUser();
        const skills = await App.getSkills();

        Components.openModal(
            'Edit Student Profile',
            `
                <form id="edit-profile-form" class="space-y-4">
                    <div class="form-group">
                        <label class="form-label">Full Name</label>
                        <input type="text" id="edit-fullname" value="${user.fullName}" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Biography / Short Summary</label>
                        <textarea id="edit-bio" rows="3" class="form-textarea">${user.bio || ''}</textarea>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div class="form-group">
                            <label class="form-label">Department</label>
                            <input type="text" id="edit-dept" value="${user.department}" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Academic Year</label>
                            <input type="text" id="edit-year" value="${user.academicYear}" class="form-input" required>
                        </div>
                    </div>
                </form>
            `,
            `
                <button onclick="Components.closeModal()" class="btn btn-secondary btn-sm">Cancel</button>
                <button onclick="ProfilePage.saveProfile()" class="btn btn-primary btn-sm">Save Changes</button>
            `
        );
    },

    async saveProfile() {
        const user = Auth.getCurrentUser();
        const fullName = document.getElementById('edit-fullname').value;
        const bio = document.getElementById('edit-bio').value;
        const department = document.getElementById('edit-dept').value;
        const academicYear = document.getElementById('edit-year').value;

        const updated = await App.updateProfile(user.studentId, { fullName, bio, department, academicYear });
        Auth.setCurrentUser({ ...user, ...updated });
        Components.closeModal();
        Components.showToast('Profile updated successfully!', 'success');
        App.navigate(window.location.hash);
    }
};
