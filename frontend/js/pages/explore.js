/* ====================================================================
   SkillSync — Explore Skills Marketplace View Module
   ==================================================================== */

const ExplorePage = {
    async render(params = {}) {
        const skills = await App.getSkills();
        const categories = await App.getCategories();
        let students = await App.getStudents();

        const selectedCategory = params.category || 'All';
        const searchQuery = params.q || '';
        const selectedProficiency = params.proficiency || 'All';

        // Filter students by search and category
        let filteredStudents = students.filter(student => {
            const teachSkills = student.teachSkills || [];

            // Category filter
            if (selectedCategory !== 'All') {
                const matchesCategory = teachSkills.some(s =>
                    s.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                    s.skillName.toLowerCase().includes(selectedCategory.toLowerCase())
                );
                if (!matchesCategory) return false;
            }

            // Search query filter
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                const nameMatch = student.fullName.toLowerCase().includes(q);
                const deptMatch = student.department.toLowerCase().includes(q);
                const skillMatch = teachSkills.some(s => s.skillName.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
                if (!nameMatch && !deptMatch && !skillMatch) return false;
            }

            // Proficiency filter
            if (selectedProficiency !== 'All') {
                const matchesProf = teachSkills.some(s => s.proficiencyLevel === selectedProficiency);
                if (!matchesProf) return false;
            }

            return true;
        });

        return `
            <div class="py-10 bg-slate-50 min-h-screen">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    <!-- Header Search Banner -->
                    <div class="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-8 text-white shadow-xl">
                        <div class="max-w-3xl space-y-4">
                            <span class="badge badge-indigo text-cyan-300">Skill Discovery Marketplace</span>
                            <h1 class="text-3xl font-extrabold tracking-tight">Find Your Peer Mentor</h1>
                            <p class="text-slate-300 text-sm">Discover students offering 1-on-1 tutoring across engineering, design, AI, and business.</p>

                            <!-- Search Input Controls -->
                            <div class="flex flex-col sm:flex-row gap-3 pt-2">
                                <div class="relative flex-grow">
                                    <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                    <input type="text" id="search-input" value="${searchQuery}" placeholder="Search by skill (e.g. Java, Figma, Python) or student name..." class="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none">
                                </div>
                                <button onclick="ExplorePage.triggerSearch()" class="btn btn-primary btn-lg shadow-md">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Category Pills Navigation -->
                    <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                        <button onclick="ExplorePage.filterCategory('All')" class="btn btn-sm ${selectedCategory === 'All' ? 'btn-primary' : 'btn-secondary'} rounded-full whitespace-nowrap">
                            All Categories
                        </button>
                        ${categories.map(cat => `
                            <button onclick="ExplorePage.filterCategory('${cat}')" class="btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'} rounded-full whitespace-nowrap">
                                ${cat}
                            </button>
                        `).join('')}
                    </div>

                    <!-- Filter Bar & Result Count -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
                        <div class="text-sm font-semibold text-slate-700">
                            Showing <span class="font-extrabold text-indigo-600">${filteredStudents.length}</span> peer tutors
                        </div>

                        <div class="flex items-center gap-3">
                            <label class="text-xs font-bold text-slate-500 uppercase">Proficiency:</label>
                            <select id="proficiency-filter" onchange="ExplorePage.triggerSearch()" class="form-select text-xs py-1.5 px-3 rounded-lg border-slate-300">
                                <option value="All" ${selectedProficiency === 'All' ? 'selected' : ''}>All Levels</option>
                                <option value="Beginner" ${selectedProficiency === 'Beginner' ? 'selected' : ''}>Beginner</option>
                                <option value="Intermediate" ${selectedProficiency === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
                                <option value="Advanced" ${selectedProficiency === 'Advanced' ? 'selected' : ''}>Advanced</option>
                            </select>
                        </div>
                    </div>

                    <!-- Result Grid -->
                    ${filteredStudents.length > 0 ? `
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            ${filteredStudents.map(student => Components.renderTeacherCard(student)).join('')}
                        </div>
                    ` : Components.renderEmptyState('fa-user-slash', 'No matching peer tutors found', 'Try adjusting your search keyword or selected category filter to discover available tutors.', 'Reset Filters', 'window.location.hash="#explore"')}
                </div>
            </div>
        `;
    },

    triggerSearch() {
        const query = document.getElementById('search-input')?.value || '';
        const prof = document.getElementById('proficiency-filter')?.value || 'All';
        window.location.hash = `#explore?q=${encodeURIComponent(query)}&proficiency=${prof}`;
    },

    filterCategory(category) {
        window.location.hash = `#explore?category=${encodeURIComponent(category)}`;
    }
};
