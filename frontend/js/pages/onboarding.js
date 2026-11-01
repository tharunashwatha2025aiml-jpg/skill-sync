/* ====================================================================
   SkillSync — Student Onboarding Wizard Module (4 Steps)
   ==================================================================== */

const OnboardingPage = {
    currentStep: 1,

    async render() {
        if (!Auth.requireAuth()) return '';

        const user = Auth.getCurrentUser();
        const skills = await App.getSkills();

        return `
            <div class="py-12 bg-slate-50 min-h-screen">
                <div class="max-w-3xl mx-auto px-4 sm:px-6">
                    <!-- Onboarding Header & Stepper -->
                    <div class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
                        <div class="text-center max-w-md mx-auto space-y-2">
                            <span class="badge badge-indigo">Student Setup Wizard</span>
                            <h1 class="text-2xl font-extrabold text-slate-900">Welcome to SkillSync!</h1>
                            <p class="text-sm text-slate-500">Let's set up your skills and availability to connect with learning partners.</p>
                        </div>

                        <!-- Stepper Indicator -->
                        <div class="flex items-center justify-between border-y border-slate-100 py-4">
                            <div class="step-item ${this.currentStep === 1 ? 'active' : (this.currentStep > 1 ? 'completed' : '')}">
                                <div class="step-number">1</div>
                                <span class="hidden sm:inline">Profile</span>
                            </div>
                            <div class="h-0.5 bg-slate-200 flex-grow mx-2"></div>
                            <div class="step-item ${this.currentStep === 2 ? 'active' : (this.currentStep > 2 ? 'completed' : '')}">
                                <div class="step-number">2</div>
                                <span class="hidden sm:inline">Teaching Skills</span>
                            </div>
                            <div class="h-0.5 bg-slate-200 flex-grow mx-2"></div>
                            <div class="step-item ${this.currentStep === 3 ? 'active' : (this.currentStep > 3 ? 'completed' : '')}">
                                <div class="step-number">3</div>
                                <span class="hidden sm:inline">Learning Skills</span>
                            </div>
                            <div class="h-0.5 bg-slate-200 flex-grow mx-2"></div>
                            <div class="step-item ${this.currentStep === 4 ? 'active' : ''}">
                                <div class="step-number">4</div>
                                <span class="hidden sm:inline">Availability</span>
                            </div>
                        </div>

                        <!-- Step Forms Container -->
                        <div id="onboarding-step-content">
                            ${this.renderStepContent(skills, user)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderStepContent(skills, user) {
        if (this.currentStep === 1) {
            return `
                <form onsubmit="OnboardingPage.handleStep1(event)" class="space-y-4">
                    <h3 class="font-bold text-slate-900 text-base border-b pb-2">Step 1: Basic Profile Details</h3>
                    <div class="form-group">
                        <label class="form-label">Profile Bio / Short Summary</label>
                        <textarea id="onboard-bio" rows="3" class="form-textarea" placeholder="Tell your peers about your interests, academic focus, and passions...">${user.bio || ''}</textarea>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="form-group">
                            <label class="form-label">Department</label>
                            <input type="text" id="onboard-dept" value="${user.department || 'Computer Science'}" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Academic Year</label>
                            <select id="onboard-year" class="form-select">
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year" selected>3rd Year</option>
                                <option value="4th Year">4th Year</option>
                                <option value="Postgraduate">Postgraduate</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex justify-end pt-4">
                        <button type="submit" class="btn btn-primary">Next: Teaching Skills <i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </form>
            `;
        } else if (this.currentStep === 2) {
            return `
                <form onsubmit="OnboardingPage.handleStep2(event)" class="space-y-4">
                    <h3 class="font-bold text-slate-900 text-base border-b pb-2">Step 2: Skills You Can Teach</h3>
                    <div class="form-group">
                        <label class="form-label">Select Skill to Teach</label>
                        <select id="onboard-teach-skill" class="form-select">
                            ${skills.map(s => `<option value="${s.skillId}">${s.skillName} (${s.category})</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Proficiency Level</label>
                        <select id="onboard-teach-prof" class="form-select">
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate" selected>Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Teaching Experience / Overview</label>
                        <input type="text" id="onboard-teach-desc" class="form-input" placeholder="e.g. 2 years of Java development, built REST APIs...">
                    </div>
                    <div class="flex justify-between pt-4">
                        <button type="button" onclick="OnboardingPage.prevStep()" class="btn btn-secondary">Back</button>
                        <button type="submit" class="btn btn-primary">Next: Skills to Learn <i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </form>
            `;
        } else if (this.currentStep === 3) {
            return `
                <form onsubmit="OnboardingPage.handleStep3(event)" class="space-y-4">
                    <h3 class="font-bold text-slate-900 text-base border-b pb-2">Step 3: Skills You Want to Learn</h3>
                    <div class="form-group">
                        <label class="form-label">Select Skill to Learn</label>
                        <select id="onboard-learn-skill" class="form-select">
                            ${skills.map(s => `<option value="${s.skillId}">${s.skillName} (${s.category})</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Learning Goal / Note</label>
                        <input type="text" id="onboard-learn-desc" class="form-input" placeholder="e.g. Want to learn Figma auto-layouts for mobile app design...">
                    </div>
                    <div class="flex justify-between pt-4">
                        <button type="button" onclick="OnboardingPage.prevStep()" class="btn btn-secondary">Back</button>
                        <button type="submit" class="btn btn-primary">Next: Availability <i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </form>
            `;
        } else {
            return `
                <form onsubmit="OnboardingPage.handleFinish(event)" class="space-y-4">
                    <h3 class="font-bold text-slate-900 text-base border-b pb-2">Step 4: Preferred Session Availability</h3>
                    <div class="grid grid-cols-3 gap-3">
                        <div class="form-group">
                            <label class="form-label">Day of Week</label>
                            <select id="onboard-day" class="form-select">
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Start Time</label>
                            <input type="time" id="onboard-start-time" value="14:00" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">End Time</label>
                            <input type="time" id="onboard-end-time" value="17:00" class="form-input" required>
                        </div>
                    </div>
                    <div class="flex justify-between pt-4">
                        <button type="button" onclick="OnboardingPage.prevStep()" class="btn btn-secondary">Back</button>
                        <button type="submit" class="btn btn-primary bg-emerald-600 hover:bg-emerald-700">Complete Onboarding <i class="fa-solid fa-circle-check"></i></button>
                    </div>
                </form>
            `;
        }
    },

    async handleStep1(e) {
        e.preventDefault();
        const user = Auth.getCurrentUser();
        const bio = document.getElementById('onboard-bio').value;
        const dept = document.getElementById('onboard-dept').value;
        const year = document.getElementById('onboard-year').value;

        await App.updateProfile(user.studentId, { bio, department: dept, academicYear: year });
        this.currentStep = 2;
        App.navigate(window.location.hash);
    },

    async handleStep2(e) {
        e.preventDefault();
        const user = Auth.getCurrentUser();
        const skillId = parseInt(document.getElementById('onboard-teach-skill').value);
        const proficiencyLevel = document.getElementById('onboard-teach-prof').value;
        const description = document.getElementById('onboard-teach-desc').value;

        await App.addStudentSkill(user.studentId, { skillId, skillType: 'TEACH', proficiencyLevel, description });
        this.currentStep = 3;
        App.navigate(window.location.hash);
    },

    async handleStep3(e) {
        e.preventDefault();
        const user = Auth.getCurrentUser();
        const skillId = parseInt(document.getElementById('onboard-learn-skill').value);
        const description = document.getElementById('onboard-learn-desc').value;

        await App.addStudentSkill(user.studentId, { skillId, skillType: 'LEARN', proficiencyLevel: 'Beginner', description });
        this.currentStep = 4;
        App.navigate(window.location.hash);
    },

    async handleFinish(e) {
        e.preventDefault();
        const user = Auth.getCurrentUser();
        const dayOfWeek = document.getElementById('onboard-day').value;
        const startTime = document.getElementById('onboard-start-time').value;
        const endTime = document.getElementById('onboard-end-time').value;

        await App.updateAvailability(user.studentId, [{ dayOfWeek, startTime, endTime, timezone: 'IST' }]);
        Components.showToast('Onboarding complete! Your profile is ready.', 'success');
        window.location.hash = '#dashboard';
    },

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            App.navigate(window.location.hash);
        }
    }
};
