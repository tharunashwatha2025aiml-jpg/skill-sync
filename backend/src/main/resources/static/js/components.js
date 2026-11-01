/* ====================================================================
   SkillSync — Reusable UI Components & Helpers
   ==================================================================== */

const Components = {
    // Show Toast Notification
    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        const iconClass = type === 'success' ? 'fa-circle-check text-green-400' : 'fa-triangle-exclamation text-red-400';

        toast.innerHTML = `
            <i class="fa-solid ${iconClass} text-lg"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(1rem)';
            toast.style.transition = 'all 0.25s ease';
            setTimeout(() => toast.remove(), 250);
        }, 3500);
    },

    // Modal Control
    openModal(title, bodyHtml, footerHtml = '') {
        const container = document.getElementById('modal-container');
        if (!container) return;

        container.innerHTML = `
            <div class="modal-overlay" id="active-modal-overlay">
                <div class="modal-content">
                    <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                        <h3 class="font-bold text-lg text-slate-900">${title}</h3>
                        <button onclick="Components.closeModal()" class="text-slate-400 hover:text-slate-600 text-xl font-bold p-1">
                            &times;
                        </button>
                    </div>
                    <div class="p-6 overflow-y-auto max-h-[75vh]">
                        ${bodyHtml}
                    </div>
                    ${footerHtml ? `<div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">${footerHtml}</div>` : ''}
                </div>
            </div>
        `;
    },

    closeModal() {
        const container = document.getElementById('modal-container');
        if (container) container.innerHTML = '';
    },

    // Confirm Action Dialog
    confirm(title, message, onConfirm) {
        this.openModal(
            title,
            `<p class="text-slate-600 text-sm leading-relaxed">${message}</p>`,
            `
                <button onclick="Components.closeModal()" class="btn btn-secondary btn-sm">Cancel</button>
                <button id="confirm-action-btn" class="btn btn-danger btn-sm">Confirm</button>
            `
        );
        document.getElementById('confirm-action-btn').onclick = () => {
            Components.closeModal();
            onConfirm();
        };
    },

    // Render Student Card for Explore Marketplace
    renderTeacherCard(student, skills) {
        const teachSkills = student.teachSkills || [];
        const firstSkill = teachSkills[0] || { skillName: 'General Peer Tutoring', proficiencyLevel: 'Intermediate', description: 'Available for student peer learning.' };
        const rating = student.averageRating || 5.0;
        const totalReviews = student.totalReviews || 0;

        return `
            <div class="card group hover:border-indigo-300">
                <div class="card-body flex flex-col justify-between h-full">
                    <div>
                        <!-- Header Student Info -->
                        <div class="flex items-start gap-3.5 mb-4">
                            <img src="${student.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" alt="${student.fullName}" class="w-13 h-13 rounded-full object-cover border-2 border-indigo-100 shadow-sm">
                            <div class="flex-grow">
                                <div class="flex items-center justify-between">
                                    <h3 class="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">${student.fullName}</h3>
                                    <span class="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                        <i class="fa-solid fa-star text-amber-400"></i> ${rating} <span class="text-slate-400 font-normal">(${totalReviews})</span>
                                    </span>
                                </div>
                                <p class="text-xs text-slate-500 font-medium">${student.department} • ${student.academicYear}</p>
                            </div>
                        </div>

                        <!-- Offered Skill Highlight -->
                        <div class="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4">
                            <div class="flex items-center justify-between mb-1">
                                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Teaches</span>
                                <span class="badge badge-indigo">${firstSkill.proficiencyLevel || 'Intermediate'}</span>
                            </div>
                            <h4 class="font-bold text-slate-900 text-sm mb-1">${firstSkill.skillName}</h4>
                            <p class="text-xs text-slate-600 line-clamp-2">${firstSkill.description || 'Experienced in guiding peers through concepts and assignments.'}</p>
                        </div>

                        <p class="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">${student.bio || 'Motivated student eager to share knowledge and learn together.'}</p>
                    </div>

                    <!-- Card Actions -->
                    <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <a href="#profile?id=${student.studentId}" class="text-xs font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-1">
                            View Profile <i class="fa-solid fa-chevron-right text-[10px]"></i>
                        </a>
                        <button onclick="App.openRequestSessionModal(${student.studentId})" class="btn btn-primary btn-sm">
                            <i class="fa-solid fa-calendar-plus text-xs"></i> Request Session
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    // Render Empty State Placeholder
    renderEmptyState(icon, title, description, buttonLabel = null, buttonAction = null) {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">
                    <i class="fa-solid ${icon}"></i>
                </div>
                <h3 class="font-bold text-slate-900 text-lg mb-1">${title}</h3>
                <p class="text-slate-500 text-sm max-w-sm mx-auto mb-4">${description}</p>
                ${buttonLabel ? `<button onclick="${buttonAction}" class="btn btn-primary btn-sm">${buttonLabel}</button>` : ''}
            </div>
        `;
    }
};
