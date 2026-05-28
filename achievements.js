// MathPeak Dynamic Achievement & Confetti Particle Module
// Manages locking, unlocking, and animated trophy displays with canvas particle physics.

const ACHIEVEMENTS_POOL = [
  { id: "first_eq", name: "First Equation 🌱", desc: "Unlock your very first math lesson.", icon: "🌱", condition: s => s.completedLessons.length >= 1 },
  { id: "frac_warrior", name: "Fraction Warrior 🍰", desc: "Study the fractions lesson sheet.", icon: "🍰", condition: s => s.completedLessons.includes("fractions") },
  { id: "alg_explorer", name: "Algebra Explorer 📘", desc: "Solve algebra quadratic equations.", icon: "📘", condition: s => s.completedLessons.includes("equations") || s.completedLessons.includes("quadratics") },
  { id: "geo_genius", name: "Geometry Genius 📐", desc: "Uncover shape vector logic.", icon: "📐", condition: s => s.completedLessons.includes("vectors") },
  { id: "trig_tamer", name: "Trigonometry Tamer 🧭", desc: "Complete the unit circle rotation.", icon: "🧭", condition: s => s.completedLessons.includes("trigonometry") },
  { id: "matrix_master", name: "Matrix Master ♟️", desc: "Master strategic games and linear matrices.", icon: "♟️", condition: s => s.completedLessons.includes("gametheory") || s.completedLessons.includes("pure_maths") },
  { id: "calc_survivor", name: "Calculus Survivor 😭", desc: "Survive limits and integration slices.", icon: "😭", condition: s => s.completedLessons.includes("integration") && s.completedLessons.includes("limits") },
  { id: "tensor_tamer", name: "Tensor Tamer 🌌", desc: "Unlock advanced topological multidimensional tensors.", icon: "🌌", condition: s => s.completedLessons.includes("tensors") || s.completedLessons.includes("topology") },
  { id: "streak_10", name: "Persistent Climber 🔥", desc: "Maintain a study streak of over 10 days.", icon: "🔥", condition: s => s.currentStreak >= 10 },
  { id: "streak_30", name: "30 Day Mastery Streak 👑", desc: "Establish a massive 30-day streak monument.", icon: "👑", condition: s => s.currentStreak >= 30 },
  { id: "xp_explorer", name: "XP Pioneer 🏔️", desc: "Acass a wealth of 300+ total XP.", icon: "🏔️", condition: s => s.totalXp >= 300 },
  { id: "xp_master", name: "Peak Conqueror 🏔️👑", desc: "Reach 1,000+ XP in advanced mathematical peaks.", icon: "👑", condition: s => s.totalXp >= 1000 }
];

class AchievementManager {
  constructor() {
    this.confettiActive = false;
    this.confettiParticles = [];
    this.canvas = document.getElementById("confetti-canvas");
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    
    this.bindEvents();
    // Hook up dynamic evaluations on state upgrades
    window.addEventListener("progressUpdated", () => this.evaluateAchievements());
  }

  bindEvents() {
    const btn = document.getElementById("achievement-btn");
    const drawer = document.getElementById("achievements-drawer-panel");
    const closeBtn = document.getElementById("close-achievements-drawer-btn");
    
    if (btn && drawer) {
      btn.addEventListener("click", () => {
        this.renderDrawerList();
        drawer.classList.remove("hidden");
        // Hide badge dot once opened
        const dot = document.getElementById("achievement-badge-dot");
        if (dot) dot.classList.add("hidden");
      });
    }

    if (closeBtn && drawer) {
      closeBtn.addEventListener("click", () => {
        drawer.classList.add("hidden");
      });
    }

    const closeUnlockModal = document.getElementById("close-achievement-modal-btn");
    const unlockModal = document.getElementById("achievement-unlocked-modal");
    if (closeUnlockModal && unlockModal) {
      closeUnlockModal.addEventListener("click", () => {
        unlockModal.classList.add("hidden");
        this.confettiActive = false;
      });
    }

    // Handle canvas sizing
    if (this.canvas) {
      this.canvas.width = 400;
      this.canvas.height = 400;
    }
  }

  evaluateAchievements() {
    const state = window.ProgressManager.state;
    let unlockedNew = false;

    ACHIEVEMENTS_POOL.forEach(ach => {
      // If condition matches and not already unlocked
      if (ach.condition(state) && !state.unlockedAchievements.includes(ach.id)) {
        state.unlockedAchievements.push(ach.id);
        unlockedNew = true;

        // Trigger dynamic celebration popup!
        this.showAchievementUnlockedPopup(ach);
      }
    });

    if (unlockedNew) {
      window.ProgressManager.saveState();
      // Show glow dot on header
      const dot = document.getElementById("achievement-badge-dot");
      if (dot) dot.classList.remove("hidden");
    }
  }

  showAchievementUnlockedPopup(ach) {
    const modal = document.getElementById("achievement-unlocked-modal");
    const nameEl = document.getElementById("achievement-unlocked-name");
    const descEl = document.getElementById("achievement-unlocked-desc");

    if (!modal || !nameEl || !descEl) return;

    nameEl.textContent = ach.name;
    descEl.textContent = ach.desc;
    
    // Set custom icon bubble
    const medalEl = modal.querySelector(".achievement-medal-large");
    if (medalEl) medalEl.textContent = ach.icon;

    modal.classList.remove("hidden");

    // Synthesize achievement fanfare chime sound!
    if (window.SoundSynth && window.ProgressManager.state.preferences.sound) {
      window.SoundSynth.playChimeTone();
    }

    // Launch custom interactive Confetti celebration
    this.launchConfetti();
  }

  renderDrawerList() {
    const container = document.getElementById("achievements-drawer-list");
    if (!container) return;
    container.innerHTML = "";

    const state = window.ProgressManager.state;

    ACHIEVEMENTS_POOL.forEach(ach => {
      const isUnlocked = state.unlockedAchievements.includes(ach.id);
      
      const item = document.createElement("div");
      item.className = `achievement-drawer-item ${isUnlocked ? "unlocked" : "locked"}`;
      
      item.innerHTML = `
        <span class="achievement-drawer-medal">${ach.icon}</span>
        <div class="achievement-drawer-meta">
          <span class="achievement-drawer-name">${ach.name}</span>
          <span class="achievement-drawer-desc">${ach.desc}</span>
        </div>
      `;
      
      container.appendChild(item);
    });
  }

  launchConfetti() {
    if (!this.canvas || !this.ctx) return;
    this.confettiActive = true;
    this.confettiParticles = [];

    // Create 80 random colored particles
    const colors = ["#59D5E0", "#4656A1", "#FF9800", "#4CAF50", "#E91E63"];
    for (let i = 0; i < 80; i++) {
      this.confettiParticles.push({
        x: 200, // Center coordinate of modal card
        y: 120,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.7) * 8 - 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 5 + 4,
        alpha: 1,
        spin: Math.random() * 0.2
      });
    }

    const loop = () => {
      if (!this.confettiActive) return;
      this.ctx.clearRect(0, 0, 400, 400);

      this.confettiParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // Gravity pull
        p.alpha = Math.max(0, p.alpha - 0.015);

        this.ctx.save();
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.alpha;
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.spin);
        this.ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        this.ctx.restore();
      });

      requestAnimationFrame(loop);
    };
    loop();
  }

  // Quick fallback check triggers for specific criteria
  checkStreakAchievements(val) {
    this.evaluateAchievements();
  }

  checkXpAchievements(val) {
    this.evaluateAchievements();
  }
}

window.AchievementManager = new AchievementManager();
