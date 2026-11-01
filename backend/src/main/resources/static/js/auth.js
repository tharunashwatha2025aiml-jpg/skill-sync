/* ====================================================================
   SkillSync — Client Authentication & Session Management
   ==================================================================== */

const Auth = {
    getCurrentUser() {
        const stored = localStorage.getItem('skillsync_user');
        if (!stored) return null;
        try {
            return JSON.parse(stored);
        } catch (e) {
            return null;
        }
    },

    setCurrentUser(user) {
        if (user) {
            localStorage.setItem('skillsync_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('skillsync_user');
        }
        this.updateNavUI();
    },

    isLoggedIn() {
        return this.getCurrentUser() !== null;
    },

    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'ADMIN';
    },

    logout() {
        localStorage.removeItem('skillsync_user');
        Components.showToast('Successfully logged out.', 'success');
        this.updateNavUI();
        window.location.hash = '#home';
    },

    updateNavUI() {
        const navActions = document.getElementById('nav-actions');
        const mobileNavActions = document.getElementById('mobile-nav-actions');
        const user = this.getCurrentUser();

        if (user) {
            const userHtml = `
                <div class="flex items-center gap-3">
                    ${user.role === 'ADMIN' ? '<span class="badge badge-violet">Admin</span>' : ''}
                    <a href="#dashboard" class="flex items-center gap-2 text-decoration-none group">
                        <img src="${user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" alt="${user.fullName}" class="w-9 h-9 rounded-full object-cover border border-indigo-200 shadow-sm group-hover:border-indigo-500">
                        <span class="font-bold text-sm text-slate-800 group-hover:text-indigo-600 hidden sm:inline">${user.fullName}</span>
                    </a>
                    <a href="#sessions" class="btn btn-secondary btn-sm" title="My Sessions">
                        <i class="fa-solid fa-calendar-check"></i> <span class="hidden sm:inline">Sessions</span>
                    </a>
                    ${user.role === 'ADMIN' ? '<a href="#admin" class="btn btn-secondary btn-sm"><i class="fa-solid fa-user-shield"></i> Admin</a>' : ''}
                    <button onclick="Auth.logout()" class="btn btn-secondary btn-sm text-slate-500 hover:text-red-600" title="Logout">
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </button>
                </div>
            `;
            if (navActions) navActions.innerHTML = userHtml;
            if (mobileNavActions) {
                mobileNavActions.innerHTML = `
                    <div class="px-2 py-1 text-xs font-bold text-slate-400 uppercase">Logged in as ${user.fullName}</div>
                    <a href="#dashboard" class="mobile-nav-link"><i class="fa-solid fa-table-columns mr-2"></i> Dashboard</a>
                    <a href="#sessions" class="mobile-nav-link"><i class="fa-solid fa-calendar-check mr-2"></i> My Sessions</a>
                    <a href="#profile?id=${user.studentId}" class="mobile-nav-link"><i class="fa-solid fa-id-card mr-2"></i> My Profile</a>
                    ${user.role === 'ADMIN' ? '<a href="#admin" class="mobile-nav-link text-violet-600"><i class="fa-solid fa-user-shield mr-2"></i> Admin Panel</a>' : ''}
                    <button onclick="Auth.logout()" class="mobile-nav-link text-red-600 text-left w-full"><i class="fa-solid fa-right-from-bracket mr-2"></i> Log Out</button>
                `;
            }
        } else {
            const guestHtml = `
                <a href="#login" class="btn btn-secondary btn-sm">Log In</a>
                <a href="#register" class="btn btn-primary btn-sm">
                    <i class="fa-solid fa-user-plus"></i> Get Started
                </a>
            `;
            if (navActions) navActions.innerHTML = guestHtml;
            if (mobileNavActions) {
                mobileNavActions.innerHTML = `
                    <a href="#login" class="btn btn-secondary w-full">Log In</a>
                    <a href="#register" class="btn btn-primary w-full">Get Started</a>
                `;
            }
        }
    },

    requireAuth() {
        if (!this.isLoggedIn()) {
            Components.showToast('Please log in to access this page.', 'error');
            window.location.hash = '#login';
            return false;
        }
        return true;
    }
};
