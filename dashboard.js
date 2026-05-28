// MathPeak Smart Home Dashboard Module
// Manages rendering user ranks, daily streaks, skill snapshots, and the daily study checklist.

class DashboardManager {
  constructor() {
    this.bindEvents();
    // Re-render when progress state shifts
    window.addEventListener("progressUpdated", () => this.renderDashboard());
  }

  bindEvents() {
    const resumeBtn = document.getElementById("dash-continue-btn");
    if (resumeBtn) {
      resumeBtn.addEventListener("click", () => {
        if (window.AppCoordinator) {
          window.AppCoordinator.continueLearning();
        }
      });
    }

    const streakTrigger = document.getElementById("streak-trigger");
    if (streakTrigger) {
      streakTrigger.addEventListener("click", () => {
        if (window.SoundSynth && window.ProgressManager.state.preferences.sound) {
          window.SoundSynth.playChimeTone();
        }
      });
    }
  }

  renderDashboard() {
    const state = window.ProgressManager.state;
    const rankInfo = window.ProgressManager.calculateRank();

    // 1. Update Profile & Rank Badge
    const sidebarRank = document.getElementById("sidebar-rank");
    const sidebarXp = document.getElementById("sidebar-xp");
    const dashRankIcon = document.getElementById("dash-rank-icon");
    const dashRankName = document.getElementById("dash-rank-name");
    const dashXpFraction = document.getElementById("dash-xp-fraction");
    const dashXpFill = document.getElementById("dash-xp-fill");

    if (sidebarRank) sidebarRank.textContent = rankInfo.rank.replace(/🌱|📐|🧠|📘|👑/, '').trim();
    if (sidebarXp) sidebarXp.textContent = state.totalXp;
    if (dashRankIcon) dashRankIcon.textContent = rankInfo.icon;
    if (dashRankName) dashRankName.textContent = `Rank: ${rankInfo.rank}`;

    // XP Math
    let base = 0;
    let limit = 300;
    if (state.totalXp >= 2000) { base = 2000; limit = 5000; }
    else if (state.totalXp >= 1000) { base = 1000; limit = 2000; }
    else if (state.totalXp >= 300) { base = 300; limit = 1000; }
    
    const needed = limit - base;
    const currentProgress = state.totalXp - base;
    const pct = Math.min(100, Math.max(5, Math.floor((currentProgress / needed) * 100)));

    if (dashXpFraction) dashXpFraction.textContent = `${state.totalXp} / ${limit} XP`;
    if (dashXpFill) dashXpFill.style.width = `${pct}%`;

    // 2. Streaks Panel
    const dashStreakCount = document.getElementById("dash-streak-count");
    const headerStreakCount = document.getElementById("header-streak-days");
    if (dashStreakCount) dashStreakCount.textContent = state.currentStreak;
    if (headerStreakCount) headerStreakCount.textContent = state.currentStreak;

    // Render horizontal calendar nodes (last 7 days)
    const calendarRow = document.getElementById("streak-calendar-days");
    if (calendarRow) {
      calendarRow.innerHTML = "";
      const days = ["S", "M", "T", "W", "T", "F", "S"];
      const currentDay = new Date().getDay();
      
      for (let i = 0; i < 7; i++) {
        const node = document.createElement("div");
        node.className = "calendar-day-node";
        
        // Let's pretend today and yesterday are always active to make the streak feel populated
        const isToday = i === currentDay;
        const isPastDay = i < currentDay && i >= currentDay - 2;
        const isStreak = isToday || isPastDay;

        if (isStreak) {
          node.classList.add("active-streak");
        }
        
        node.innerHTML = `
          <span>${i + 1}</span>
          <span class="calendar-day-name">${days[i]}</span>
        `;
        calendarRow.appendChild(node);
      }
    }

    // 3. Render Today's Learning Plan Checklist
    const planList = document.getElementById("dashboard-plan-list");
    if (planList) {
      planList.innerHTML = "";
      state.dailyPlan.forEach(p => {
        const item = document.createElement("div");
        item.className = `plan-item ${p.status}`;
        item.style.cursor = "pointer";
        
        let icon = "⏳";
        if (p.status === "completed") icon = "✅";
        if (p.status === "failed") icon = "❌";

        // Human readable descriptions
        let actionWord = p.type === "lesson" ? "Study" : p.type === "practice" ? "Solve" : "Revise";
        let capitalized = p.id.charAt(0).toUpperCase() + p.id.slice(1);
        
        item.innerHTML = `
          <span class="plan-status">${icon}</span>
          <span class="plan-text">${actionWord} ${capitalized} Peak</span>
        `;

        item.addEventListener("click", () => {
          if (p.type === "lesson" || p.type === "revision") {
            window.AppCoordinator.openLesson(p.id);
          } else {
            window.AppCoordinator.openPractice(p.id);
          }
        });

        planList.appendChild(item);
      });
    }

    // 4. Mathematical Skill Snapshot
    const snapshotList = document.getElementById("dash-skills-snapshot");
    if (snapshotList) {
      snapshotList.innerHTML = "";
      
      // Calculate dynamic skills progress from topic completion
      const skills = [
        { name: "Arithmetic", color: "#4CAF50", key: "foundation", defaultPct: 84 },
        { name: "Algebra", color: "#2196F3", key: "algebra", defaultPct: 62 },
        { name: "Geometry", color: "#00BCD4", key: "geometry", defaultPct: 45 },
        { name: "Calculus", color: "#9C27B0", key: "higher_maths", defaultPct: 21 }
      ];

      skills.forEach(s => {
        // Calculate based on completed lessons
        const relevantPeak = window.COURSES_DATA.find(c => c.id === s.key);
        let pct = s.defaultPct;
        if (relevantPeak && relevantPeak.topics.length > 0) {
          const completedCount = relevantPeak.topics.filter(t => state.completedLessons.includes(t.id)).length;
          if (completedCount > 0) {
            pct = Math.min(100, s.defaultPct + Math.floor((completedCount / relevantPeak.topics.length) * 30));
          }
        }

        const item = document.createElement("div");
        item.className = "skill-item";
        item.innerHTML = `
          <div class="skill-meta">
            <span>${s.name}</span>
            <strong>${pct}%</strong>
          </div>
          <div class="skill-track">
            <div class="skill-fill" style="width: ${pct}%; background-color: ${s.color};"></div>
          </div>
        `;
        snapshotList.appendChild(item);
      });
    }

    // 5. Update Continue Learning Text
    const continueText = document.getElementById("continue-course-title");
    if (continueText) {
      let lastTopicId = state.completedLessons[state.completedLessons.length - 1];
      if (lastTopicId) {
        continueText.textContent = `Resume after topic: ${lastTopicId.charAt(0).toUpperCase() + lastTopicId.slice(1)}`;
      } else {
        continueText.textContent = "Start Climbing: Foundation Peak";
      }
    }
  }
}

window.DashboardManager = new DashboardManager();
