// MathPeak Settings & Theme Preferences Module
// Manages system settings, dark/light modes, animations toggle, sound preferences, and user resets.

class SettingsController {
  constructor() {
    this.bindEvents();
    // Render initial settings values matching stored state
    window.addEventListener("progressUpdated", () => this.syncSettingsUI());
  }

  bindEvents() {
    const darkToggle = document.getElementById("settings-dark-mode-toggle");
    if (darkToggle) {
      darkToggle.addEventListener("change", (e) => {
        const isDark = e.target.checked;
        this.setThemeMode(isDark);
      });
    }

    const animToggle = document.getElementById("settings-animations-toggle");
    if (animToggle) {
      animToggle.addEventListener("change", (e) => {
        window.ProgressManager.state.preferences.animations = e.target.checked;
        window.ProgressManager.saveState();
      });
    }

    const eliToggle = document.getElementById("settings-eli10-toggle");
    if (eliToggle) {
      eliToggle.addEventListener("change", (e) => {
        window.ProgressManager.state.preferences.eli10Mode = e.target.checked;
        window.ProgressManager.saveState();
      });
    }

    const soundToggle = document.getElementById("settings-sound-toggle");
    if (soundToggle) {
      soundToggle.addEventListener("change", (e) => {
        window.ProgressManager.state.preferences.sound = e.target.checked;
        window.ProgressManager.saveState();
      });
    }

    // Reset button
    const resetBtn = document.getElementById("settings-reset-data-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        const conf = confirm("Are you absolutely sure you want to wipe your mathematics climb progress? This resets all XP, streaks, weaknesses, and unlocked achievements.");
        if (conf) {
          window.ProgressManager.resetProgress();
        }
      });
    }

    // Difficulty pill buttons
    const diffGroup = document.getElementById("settings-difficulty-group");
    if (diffGroup) {
      diffGroup.addEventListener("click", (e) => {
        const btn = e.target.closest(".pill-btn");
        if (!btn) return;

        diffGroup.querySelectorAll(".pill-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const selectedLevel = btn.dataset.level;
        window.ProgressManager.state.activeDifficulty = selectedLevel;
        window.ProgressManager.saveState();
      });
    }
  }

  setThemeMode(isDark) {
    window.ProgressManager.state.preferences.darkMode = isDark;
    window.ProgressManager.saveState();

    if (isDark) {
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    }
  }

  syncSettingsUI() {
    const prefs = window.ProgressManager.state.preferences;
    const activeDiff = window.ProgressManager.state.activeDifficulty;

    const darkToggle = document.getElementById("settings-dark-mode-toggle");
    const animToggle = document.getElementById("settings-animations-toggle");
    const eliToggle = document.getElementById("settings-eli10-toggle");
    const soundToggle = document.getElementById("settings-sound-toggle");
    const diffGroup = document.getElementById("settings-difficulty-group");

    if (darkToggle) darkToggle.checked = prefs.darkMode;
    if (animToggle) animToggle.checked = prefs.animations;
    if (eliToggle) eliToggle.checked = prefs.eli10Mode;
    if (soundToggle) soundToggle.checked = prefs.sound;

    // Apply color theme directly on sync
    if (prefs.darkMode) {
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    }

    // Set difficulty pills
    if (diffGroup) {
      diffGroup.querySelectorAll(".pill-btn").forEach(btn => {
        if (btn.dataset.level === activeDiff) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    }
  }
}

window.SettingsController = new SettingsController();
