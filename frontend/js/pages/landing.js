/* ====================================================================
   SkillSync — Public Landing Page Module
   ==================================================================== */

const LandingPage = {
    async render() {
        const stats = await App.getPlatformStats();
        const featuredStudents = window.SKILLSYNC_DATA.students || [];

        return `
            <!-- Hero Section -->
            <section class="bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white py-20 relative overflow-hidden">
                <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]"></div>

                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div class="lg:col-span-7 space-y-6">
                            <div class="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-400/20 rounded-full px-3.5 py-1 text-xs font-bold text-cyan-300">
                                <i class="fa-solid fa-sparkles"></i> College Peer-to-Peer Education
                            </div>
                            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                                Your Skills Can Take Someone <span class="bg-gradient-to-r from-cyan-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">Further.</span>
                            </h1>
                            <p class="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl">
                                Discover talented peers, share what you know, and learn the skills you've always wanted to master right within your campus community.
                            </p>

                            <div class="flex flex-wrap items-center gap-4 pt-2">
                                <a href="#explore" class="btn btn-primary btn-lg shadow-lg shadow-indigo-600/30">
                                    <i class="fa-solid fa-magnifying-glass"></i> Find Your Learning Partner
                                </a>
                                <a href="#register" class="btn btn-secondary btn-lg bg-slate-800/80 text-white border-slate-700 hover:bg-slate-800">
                                    <i class="fa-solid fa-chalkboard-user"></i> Start Teaching
                                </a>
                            </div>

                            <!-- Platform Quick Metrics Banner -->
                            <div class="pt-8 grid grid-cols-3 gap-6 border-t border-slate-800/80 max-w-xl">
                                <div>
                                    <span class="block text-2xl sm:text-3xl font-extrabold text-cyan-400">${stats.totalStudents || 6}</span>
                                    <span class="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Students</span>
                                </div>
                                <div>
                                    <span class="block text-2xl sm:text-3xl font-extrabold text-indigo-300">${stats.totalSkills || 12}</span>
                                    <span class="text-xs text-slate-400 font-semibold uppercase tracking-wider">Skills Offered</span>
                                </div>
                                <div>
                                    <span class="block text-2xl sm:text-3xl font-extrabold text-violet-400">${stats.totalSessions || 5}+</span>
                                    <span class="text-xs text-slate-400 font-semibold uppercase tracking-wider">Sessions Held</span>
                                </div>
                            </div>
                        </div>

                        <!-- Hero Graphic Card Illustration -->
                        <div class="lg:col-span-5 relative">
                            <div class="relative rounded-2xl bg-slate-800/60 border border-slate-700/60 p-6 backdrop-blur-xl shadow-2xl space-y-4">
                                <div class="flex items-center justify-between pb-3 border-b border-slate-700/60">
                                    <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest">Live Skill Match</span>
                                    <span class="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                </div>

                                <div class="flex items-center gap-4 bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/40">
                                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" class="w-12 h-12 rounded-full border border-indigo-400/50">
                                    <div>
                                        <h4 class="font-bold text-sm text-white">Alex Chen <span class="text-xs font-normal text-slate-400">(CS 3rd Yr)</span></h4>
                                        <p class="text-xs text-indigo-300 font-semibold">Teaches: Java & Algorithms</p>
                                        <p class="text-[11px] text-slate-400">Wants to learn: UI/UX & Figma</p>
                                    </div>
                                </div>

                                <div class="flex justify-center text-indigo-400 my-1">
                                    <i class="fa-solid fa-arrow-down-up text-xl animate-bounce"></i>
                                </div>

                                <div class="flex items-center gap-4 bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/40">
                                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150" class="w-12 h-12 rounded-full border border-cyan-400/50">
                                    <div>
                                        <h4 class="font-bold text-sm text-white">Priya Sharma <span class="text-xs font-normal text-slate-400">(Design 2nd Yr)</span></h4>
                                        <p class="text-xs text-cyan-300 font-semibold">Teaches: Figma & UI/UX</p>
                                        <p class="text-[11px] text-slate-400">Wants to learn: Java & Python</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Popular Skill Categories -->
            <section class="py-16 bg-white border-b border-slate-100">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center max-w-2xl mx-auto mb-12">
                        <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Explore Popular Categories</h2>
                        <p class="text-slate-600 text-base">Browse through student-led topics across engineering, design, data, business, and humanities.</p>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        ${[
                            { icon: 'fa-code', title: 'Programming & Software', count: '4 Skills' },
                            { icon: 'fa-palette', title: 'Graphic Design & UI/UX', count: '2 Skills' },
                            { icon: 'fa-brain', title: 'Data Science & AI', count: '3 Skills' },
                            { icon: 'fa-laptop-code', title: 'Web Development', count: '2 Skills' },
                            { icon: 'fa-comments', title: 'Communication & Speaking', count: '2 Skills' },
                            { icon: 'fa-calculator', title: 'Mathematics & Academics', count: '1 Skill' },
                            { icon: 'fa-chart-line', title: 'Business & Pitching', count: '1 Skill' },
                            { icon: 'fa-film', title: 'Video Editing', count: '1 Skill' },
                            { icon: 'fa-language', title: 'Languages', count: '1 Skill' },
                            { icon: 'fa-icons', title: 'Other Skills', count: '1 Skill' }
                        ].map(cat => `
                            <a href="#explore?category=${encodeURIComponent(cat.title)}" class="card p-4 text-center group hover:border-indigo-400 hover:shadow-md transition-all text-decoration-none">
                                <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl mx-auto mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <i class="fa-solid ${cat.icon}"></i>
                                </div>
                                <h3 class="font-bold text-sm text-slate-900 mb-1 group-hover:text-indigo-600">${cat.title}</h3>
                                <span class="text-xs text-slate-400 font-medium">${cat.count}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </section>

            <!-- How SkillSync Works (3 Steps) -->
            <section id="how-it-works" class="py-20 bg-slate-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center max-w-2xl mx-auto mb-16">
                        <span class="badge badge-indigo mb-2">Simple 3-Step Process</span>
                        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">How SkillSync Works</h2>
                        <p class="text-slate-600 mt-3 text-base">Exchange knowledge with peers seamlessly through structured session requests.</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="card p-8 text-center relative">
                            <div class="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20">1</div>
                            <h3 class="font-bold text-xl text-slate-900 mb-3">Build Your Skill Profile</h3>
                            <p class="text-slate-600 text-sm leading-relaxed">
                                Sign up with your college email, select skills you can teach with your proficiency, and add skills you want to master.
                            </p>
                        </div>

                        <div class="card p-8 text-center relative">
                            <div class="w-14 h-14 rounded-2xl bg-violet-600 text-white font-extrabold text-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/20">2</div>
                            <h3 class="font-bold text-xl text-slate-900 mb-3">Discover & Request Sessions</h3>
                            <p class="text-slate-600 text-sm leading-relaxed">
                                Browse the peer marketplace, match with available student tutors, and request 1-on-1 learning sessions at flexible times.
                            </p>
                        </div>

                        <div class="card p-8 text-center relative">
                            <div class="w-14 h-14 rounded-2xl bg-cyan-600 text-white font-extrabold text-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20">3</div>
                            <h3 class="font-bold text-xl text-slate-900 mb-3">Learn & Review</h3>
                            <p class="text-slate-600 text-sm leading-relaxed">
                                Meet online or in-person for your session, complete the learning objectives, and leave verified ratings for your peer teacher.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Featured Student Peer Cards -->
            <section class="py-20 bg-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between mb-12">
                        <div>
                            <span class="badge badge-cyan mb-1">Top Peer Mentors</span>
                            <h2 class="text-3xl font-extrabold text-slate-900">Featured Student Tutors</h2>
                        </div>
                        <a href="#explore" class="btn btn-outline-indigo btn-sm">View All Tutors <i class="fa-solid fa-arrow-right text-xs"></i></a>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        ${featuredStudents.slice(0, 3).map(st => Components.renderTeacherCard(st)).join('')}
                    </div>
                </div>
            </section>

            <!-- Final Call to Action -->
            <section class="py-16 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-800 text-white">
                <div class="max-w-5xl mx-auto px-4 text-center space-y-6">
                    <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to Start Peer Learning on Campus?</h2>
                    <p class="text-indigo-100 text-lg max-w-2xl mx-auto">Join hundreds of students sharing skills, boosting resumes, and growing together.</p>
                    <div class="pt-2">
                        <a href="#register" class="btn btn-secondary btn-lg bg-white text-indigo-600 font-extrabold hover:bg-slate-100 shadow-xl">
                            Create Your Free Account
                        </a>
                    </div>
                </div>
            </section>
        `;
    }
};
