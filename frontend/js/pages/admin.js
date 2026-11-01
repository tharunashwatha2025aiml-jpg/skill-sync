/* ====================================================================
   SkillSync — Admin Dashboard & Control Panel Module
   ==================================================================== */

const AdminPage = {
    async render() {
        if (!Auth.requireAuth()) return '';
        if (!Auth.isAdmin()) {
            Components.showToast('Access denied. Administrator privileges required.', 'error');
            window.location.hash = '#dashboard';
            return '';
        }

        const stats = await App.getPlatformStats();
        const students = await App.getAdminStudents();
        const skills = await App.getSkills();

        return `
            <div class="py-10 bg-slate-50 min-h-screen">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    <!-- Admin Header -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
                        <div>
                            <span class="badge badge-violet text-lavender mb-2">Role-Based Control Panel</span>
                            <h1 class="text-3xl font-extrabold tracking-tight">Platform Administration</h1>
                            <p class="text-slate-300 text-sm mt-1">Manage registered student accounts, skill catalogue entries, and monitor platform health.</p>
                        </div>
                        <button onclick="AdminPage.openAddSkillModal()" class="btn btn-primary btn-sm bg-violet-600 hover:bg-violet-700">
                            <i class="fa-solid fa-plus"></i> Add Catalogue Skill
                        </button>
                    </div>

                    <!-- Usage Metrics Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div class="card p-5">
                            <span class="text-xs font-bold text-slate-400 uppercase">Registered Students</span>
                            <h3 class="text-3xl font-extrabold text-slate-900 mt-1">${stats.totalStudents || students.length}</h3>
                        </div>
                        <div class="card p-5">
                            <span class="text-xs font-bold text-slate-400 uppercase">Active Accounts</span>
                            <h3 class="text-3xl font-extrabold text-emerald-600 mt-1">${stats.activeStudents || students.filter(s => s.accountStatus === 'ACTIVE').length}</h3>
                        </div>
                        <div class="card p-5">
                            <span class="text-xs font-bold text-slate-400 uppercase">Skill Catalogue</span>
                            <h3 class="text-3xl font-extrabold text-indigo-600 mt-1">${stats.totalSkills || skills.length}</h3>
                        </div>
                        <div class="card p-5">
                            <span class="text-xs font-bold text-slate-400 uppercase">Total Sessions Held</span>
                            <h3 class="text-3xl font-extrabold text-violet-600 mt-1">${stats.totalSessions || 5}</h3>
                        </div>
                    </div>

                    <!-- Students Management Table -->
                    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div class="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h3 class="font-bold text-slate-900 text-base">Registered Students Directory</h3>
                            <span class="text-xs font-semibold text-slate-500">${students.length} Accounts</span>
                        </div>

                        <div class="overflow-x-auto">
                            <table class="w-full text-left text-sm">
                                <thead class="bg-slate-50 border-b border-slate-100 text-xs uppercase font-extrabold text-slate-500">
                                    <tr>
                                        <th class="px-6 py-3.5">Student</th>
                                        <th class="px-6 py-3.5">Department</th>
                                        <th class="px-6 py-3.5">Registration No</th>
                                        <th class="px-6 py-3.5">Role</th>
                                        <th class="px-6 py-3.5">Status</th>
                                        <th class="px-6 py-3.5 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100">
                                    ${students.map(s => `
                                        <tr class="hover:bg-slate-50/80">
                                            <td class="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                                                <img src="${s.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" class="w-8 h-8 rounded-full object-cover">
                                                <div>
                                                    <div>${s.fullName}</div>
                                                    <div class="text-xs font-normal text-slate-400">${s.email}</div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 text-slate-600">${s.department}</td>
                                            <td class="px-6 py-4 font-mono text-xs text-slate-500">${s.registrationNumber}</td>
                                            <td class="px-6 py-4">
                                                <span class="badge ${s.role === 'ADMIN' ? 'badge-violet' : 'badge-indigo'}">${s.role}</span>
                                            </td>
                                            <td class="px-6 py-4">
                                                <span class="badge ${s.accountStatus === 'ACTIVE' ? 'badge-success' : 'badge-danger'}">${s.accountStatus}</span>
                                            </td>
                                            <td class="px-6 py-4 text-right">
                                                <button onclick="AdminPage.toggleStudentStatus(${s.studentId}, '${s.accountStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'}')" class="btn btn-secondary btn-sm text-xs">
                                                    ${s.accountStatus === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async toggleStudentStatus(studentId, newStatus) {
        await App.updateStudentStatus(studentId, newStatus);
        Components.showToast(`Student account updated to ${newStatus}.`, 'success');
        App.navigate(window.location.hash);
    },

    openAddSkillModal() {
        Components.openModal(
            'Add New Skill to Catalogue',
            `
                <form id="add-skill-form" class="space-y-4">
                    <div class="form-group">
                        <label class="form-label">Skill Name</label>
                        <input type="text" id="admin-skill-name" class="form-input" placeholder="e.g. Kotlin Android Dev" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Category</label>
                        <select id="admin-skill-category" class="form-select">
                            <option value="Programming and Software Development">Programming & Software</option>
                            <option value="Graphic Design and UI/UX">Graphic Design & UI/UX</option>
                            <option value="Data Science and Artificial Intelligence">Data Science & AI</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Communication and Public Speaking">Communication & Speaking</option>
                            <option value="Business and Entrepreneurship">Business & Entrepreneurship</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Description</label>
                        <input type="text" id="admin-skill-desc" class="form-input" placeholder="Brief summary of topics covered...">
                    </div>
                </form>
            `,
            `
                <button onclick="Components.closeModal()" class="btn btn-secondary btn-sm">Cancel</button>
                <button onclick="AdminPage.saveNewSkill()" class="btn btn-primary btn-sm">Save Skill</button>
            `
        );
    },

    async saveNewSkill() {
        const skillName = document.getElementById('admin-skill-name').value;
        const category = document.getElementById('admin-skill-category').value;
        const description = document.getElementById('admin-skill-desc').value;

        if (!skillName.trim()) {
            Components.showToast('Please enter a valid skill name.', 'error');
            return;
        }

        await App.createSkill({ skillName, category, description, activeStatus: true });
        Components.closeModal();
        Components.showToast(`Skill '${skillName}' added to catalogue!`, 'success');
        App.navigate(window.location.hash);
    }
};
