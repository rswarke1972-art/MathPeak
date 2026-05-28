// MathPeak Progress & State Synchronization Module
// Manages localStorage syncing, autosaves, XP systems, and streak rules.

const PROGRESS_KEY = "mathpeak_user_climb_state";

const DEFAULT_STATE = {
  totalXp: 0,
  currentStreak: 37, // default fun value requested
  lastActiveDate: null,
  completedLessons: [],
  bookmarkedLessons: [],
  topicAccuracy: {},
  weaknessLog: {},
  unlockedAchievements: [],
  activeDifficulty: "medium",
  preferences: {
    darkMode: true,
    animations: true,
    eli10Mode: false,
    sound: true
  },
  dailyPlan: [
    { id: "arithmetic", type: "practice", status: "completed" },
    { id: "trigonometry", type: "lesson", status: "pending" },
    { id: "limits", type: "revision", status: "pending" }
  ],
  climbHistory: [] // tracks { date, xpEarned } for analytics graphs
};

class ProgressManager {
  constructor() {
    this.state = this.loadState();
    this.checkDailyStreak();
  }

  loadState() {
    try {
      const data = localStorage.getItem(PROGRESS_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        // Deep merge with default state to prevent errors if structure is updated
        return { ...DEFAULT_STATE, ...parsed, preferences: { ...DEFAULT_STATE.preferences, ...parsed.preferences } };
      }
    } catch (e) {
      console.warn("localStorage not available, running in-memory mode.", e);
    }
    return { ...DEFAULT_STATE };
  }

  saveState() {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error("Failed to save progress to localStorage:", e);
    }
    // Dispatch custom event to notify other modules of update
    window.dispatchEvent(new CustomEvent("progressUpdated", { detail: this.state }));
  }

  checkDailyStreak() {
    const todayStr = new Date().toDateString();
    if (!this.state.lastActiveDate) {
      this.state.lastActiveDate = todayStr;
      this.saveState();
      return;
    }

    if (this.state.lastActiveDate !== todayStr) {
      const lastDate = new Date(this.state.lastActiveDate);
      const today = new Date(todayStr);
      const diffTime = Math.abs(today - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        this.state.currentStreak += 1;
        this.logXpHistory(10); // Award 10 XP for daily streak trigger
        if (window.AchievementManager) {
          window.AchievementManager.checkStreakAchievements(this.state.currentStreak);
        }
      } else if (diffDays > 1) {
        // Lost streak - reset to 1
        this.state.currentStreak = 1;
      }
      this.state.lastActiveDate = todayStr;
      this.saveState();
    }
  }

  awardXp(amount, reason = "Practice completed") {
    this.state.totalXp += amount;
    this.logXpHistory(amount);
    this.saveState();
    
    // Play rewarding sound
    if (window.SoundSynth && this.state.preferences.sound) {
      window.SoundSynth.playSuccessTone();
    }

    // Dynamic UI notification
    this.showXpToast(amount, reason);

    // Evaluate XP-based rank / achievements
    if (window.AchievementManager) {
      window.AchievementManager.checkXpAchievements(this.state.totalXp);
    }
  }

  logXpHistory(amount) {
    const todayStr = new Date().toISOString().split('T')[0];
    let record = this.state.climbHistory.find(h => h.date === todayStr);
    if (record) {
      record.xpEarned += amount;
    } else {
      this.state.climbHistory.push({ date: todayStr, xpEarned: amount });
    }
    // Limit log length to last 30 days
    if (this.state.climbHistory.length > 30) {
      this.state.climbHistory.shift();
    }
  }

  showXpToast(amount, reason) {
    const toast = document.createElement("div");
    toast.className = "xp-toast card-gradient";
    toast.style.position = "fixed";
    toast.style.bottom = "24px";
    toast.style.right = "24px";
    toast.style.zIndex = "250";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.gap = "12px";
    toast.style.padding = "12px 20px";
    toast.style.borderRadius = "30px";
    toast.style.boxShadow = "0 8px 24px rgba(89,213,224,0.3)";
    toast.style.border = "1px solid var(--accent-cyan)";
    toast.style.animation = "modal-enter 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards";
    toast.innerHTML = `
      <span style="font-size:18px;">✨</span>
      <div>
        <strong style="color:var(--accent-cyan);">+${amount} XP</strong>
        <div style="font-size:10px; color:var(--text-muted); text-transform:uppercase;">${reason}</div>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = "drawer-slide-in 0.3s reverse forwards";
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  calculateRank() {
    const xp = this.state.totalXp;
    if (xp >= 5000) return { rank: "Math Master 👑", icon: "👑" };
    if (xp >= 2000) return { rank: "Proof Seeker 📘", icon: "📘" };
    if (xp >= 1000) return { rank: "Logic Builder 🧠", icon: "🧠" };
    if (xp >= 300) return { rank: "Equation Explorer 📐", icon: "📐" };
    return { rank: "Math Beginner 🌱", icon: "🌱" };
  }

  completeLesson(topicId) {
    if (!this.state.completedLessons.includes(topicId)) {
      this.state.completedLessons.push(topicId);
      this.awardXp(30, "Lesson Completed 🏔️");
      
      // Update today's plan if relevant
      const planItem = this.state.dailyPlan.find(p => p.id === topicId && p.type === "lesson");
      if (planItem) {
        planItem.status = "completed";
      }
      this.saveState();
    }
  }

  toggleBookmark(topicId) {
    const index = this.state.bookmarkedLessons.indexOf(topicId);
    if (index === -1) {
      this.state.bookmarkedLessons.push(topicId);
    } else {
      this.state.bookmarkedLessons.splice(index, 1);
    }
    this.saveState();
    return index === -1; // returns true if bookmarked, false if unbookmarked
  }

  logPracticeResult(topicId, isCorrect) {
    // 1. Log overall accuracy details
    if (!this.state.topicAccuracy[topicId]) {
      this.state.topicAccuracy[topicId] = { correct: 0, total: 0 };
    }
    this.state.topicAccuracy[topicId].total += 1;
    if (isCorrect) {
      this.state.topicAccuracy[topicId].correct += 1;
      this.awardXp(20, "Correct Quiz Answer 🧩");
      
      // Update plan if matches practice task
      const planItem = this.state.dailyPlan.find(p => p.id === topicId && p.type === "practice");
      if (planItem) {
        planItem.status = "completed";
      }

      // If correct, check if weakness needs easing
      if (this.state.weaknessLog[topicId]) {
        this.state.weaknessLog[topicId].count = Math.max(0, this.state.weaknessLog[topicId].count - 1);
        if (this.state.weaknessLog[topicId].count === 0) {
          delete this.state.weaknessLog[topicId];
        }
      }
    } else {
      // 2. Log in weakness list if failed
      if (!this.state.weaknessLog[topicId]) {
        this.state.weaknessLog[topicId] = { count: 0, lastTested: null };
      }
      this.state.weaknessLog[topicId].count += 1;
      this.state.weaknessLog[topicId].lastTested = new Date().toISOString();
      
      // Play soft failure buzz
      if (window.SoundSynth && this.state.preferences.sound) {
        window.SoundSynth.playFailureTone();
      }
    }
    this.saveState();
  }

  resetProgress() {
    this.state = { ...DEFAULT_STATE, climbHistory: [], topicAccuracy: {}, weaknessLog: {}, bookmarkedLessons: [], completedLessons: [] };
    this.saveState();
    window.location.reload();
  }
}

// Global Sound Synthesizer via Web Audio API (tactile and rewarding feedback, zero file dependencies)
class Synthesizer {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playSuccessTone() {
    try {
      this.init();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      
      const now = this.ctx.currentTime;
      // High-pitched sweet double chime
      this.playNote(523.25, 'triangle', now, 0.1); // C5
      this.playNote(659.25, 'triangle', now + 0.08, 0.15); // E5
      this.playNote(783.99, 'triangle', now + 0.16, 0.25); // G5
    } catch (e) {
      console.warn("Audio Context failed", e);
    }
  }

  playFailureTone() {
    try {
      this.init();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      
      const now = this.ctx.currentTime;
      // Soft minor slide buzz
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.3);
      
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.3);
      
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      console.warn("Audio Context failed", e);
    }
  }

  playChimeTone() {
    try {
      this.init();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      
      const now = this.ctx.currentTime;
      // Beautiful harmonic chime
      this.playNote(440.00, 'sine', now, 0.15); // A4
      this.playNote(554.37, 'sine', now + 0.1, 0.15); // C#5
      this.playNote(659.25, 'sine', now + 0.2, 0.3); // E5
      this.playNote(880.00, 'sine', now + 0.3, 0.45); // A5
    } catch (e) {
      console.warn("Audio Context failed", e);
    }
  }

  playNote(freq, type, startTime, duration) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    
    gain.gain.setValueAtTime(0.06, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }
}

window.ProgressManager = new ProgressManager();
window.SoundSynth = new Synthesizer();
