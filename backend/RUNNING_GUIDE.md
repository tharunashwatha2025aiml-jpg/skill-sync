# SkillSync — macOS Execution & Demonstration Guide

## Quick Start (1-Minute Launch)

1. Open Terminal and navigate to the project directory:
   ```bash
   cd "/Users/tharunashwath/Downloads/Activty Search Agent/skillsync"
   ```

2. Start the local SkillSync demonstration server:
   ```bash
   python3 server.py
   ```

3. Open your web browser and navigate to:
   ```
   http://localhost:8080
   ```

---

## Demonstration Workflow Scenarios

### Scenario 1: Explore & Discover Skills
- Visit the homepage at `http://localhost:8080/#home`.
- Click **"Find Your Learning Partner"** or navigate to `#explore`.
- Use the category chips (e.g. *Programming & Software*, *Graphic Design & UI/UX*) or type a keyword in the search bar.
- Inspect the student teacher cards displaying name, department, offered skill, proficiency, rating, and availability.

### Scenario 2: Register a New Student & Complete Onboarding
- Click **"Get Started"** or navigate to `#register`.
- Fill in student details:
  - Name: `Jane Doe`
  - Email: `jane.doe@skillsync.edu`
  - Registration Number: `REG2026100`
  - Department: `Computer Science`
  - Academic Year: `3rd Year`
  - Password: `Password@123`
- Submit registration and proceed through the 4-step Onboarding Wizard:
  1. Profile Bio & Department confirmation.
  2. Select skill to teach (e.g., *Java Programming* - Advanced).
  3. Select skill to learn (e.g., *Figma & UI/UX Design*).
  4. Set session availability slots.
- View your personalized dashboard and completion meter.

### Scenario 3: Request & Complete a Peer Session Lifecycle
1. Log in as **Alex Chen** (`alex.chen@skillsync.edu` / `Password@123`).
2. Go to **Explore Skills**, find **Priya Sharma**, and click **"Request Session"**.
3. Fill in: Date (Tomorrow), Start Time (`14:00`), Skill (*Figma & UI/UX Design*), Learning Objective: *"Learn Figma auto-layout for mobile UI"*.
4. Log out and log in as **Priya Sharma** (`priya.sharma@skillsync.edu` / `Password@123`).
5. Navigate to **Sessions** -> **Incoming Requests**. Click **"Accept Request"**.
6. Switch to **Upcoming Sessions** tab and click **"Mark as Completed"**.
7. Log in back as **Alex Chen**, navigate to **Sessions** -> **Completed & Reviews**, click **"Submit Rating & Feedback"**, give a 5-star rating and written review.
8. Check Priya Sharma's public profile to verify her updated average rating and new review entry!

### Scenario 4: Admin Control Panel
- Log in as `admin@skillsync.edu` / `Password@123`.
- Click the **"Admin"** button in the navigation header.
- View platform usage metrics, search student directory, toggle account statuses, or add new skills to the catalogue.
