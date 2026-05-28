// MathPeak Topic Lesson Module
// Renders the conceptual sheet, handles normal vs ELI10 mode, bookmarked states, and links to visual sandboxes.

class TopicsManager {
  constructor() {
    this.activeTopic = null;
    this.eli10Mode = false;
    this.bindEvents();
  }

  bindEvents() {
    const elSwitch = document.getElementById("eli10-mode-switch");
    if (elSwitch) {
      elSwitch.addEventListener("change", (e) => {
        this.eli10Mode = e.target.checked;
        
        // Sync setting with progress
        window.ProgressManager.state.preferences.eli10Mode = this.eli10Mode;
        window.ProgressManager.saveState();

        this.renderActiveExplanation();
      });
    }

    const bookmarkBtn = document.getElementById("bookmark-lesson-btn");
    if (bookmarkBtn) {
      bookmarkBtn.addEventListener("click", () => {
        if (!this.activeTopic) return;
        const isBookmarked = window.ProgressManager.toggleBookmark(this.activeTopic.id);
        
        // Tactile sound
        if (window.SoundSynth && window.ProgressManager.state.preferences.sound) {
          window.SoundSynth.playChimeTone();
        }

        this.updateBookmarkButton(isBookmarked);
      });
    }

    const visualBtn = document.getElementById("lesson-to-visuals-btn");
    if (visualBtn) {
      visualBtn.addEventListener("click", () => {
        if (!this.activeTopic) return;
        
        // Match activeTopic to sandbox simulation keys
        let simKey = "quadratic";
        if (this.activeTopic.id === "trigonometry") simKey = "trigonometry";
        else if (this.activeTopic.id === "vectors") simKey = "vectors";
        else if (this.activeTopic.id === "pure_maths") simKey = "matrices";
        else if (this.activeTopic.id === "derivatives") simKey = "derivatives";
        else if (this.activeTopic.id === "integration") simKey = "integration";
        else if (this.activeTopic.id === "bayes") simKey = "probability";
        else if (this.activeTopic.id === "gametheory") simKey = "probability";
        else if (this.activeTopic.id === "finance") simKey = "quadratic";

        if (window.AppCoordinator) {
          window.AppCoordinator.openSandbox(simKey);
        }
      });
    }

    const practiceBtn = document.getElementById("lesson-to-practice-btn");
    if (practiceBtn) {
      practiceBtn.addEventListener("click", () => {
        if (!this.activeTopic) return;
        if (window.AppCoordinator) {
          window.AppCoordinator.openPractice(this.activeTopic.id);
        }
      });
    }

    const backBtn = document.getElementById("lesson-back-btn");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        if (window.AppCoordinator) {
          window.AppCoordinator.switchView("peaks");
        }
      });
    }
  }

  loadTopic(topicId) {
    // Find topic in course data
    let foundTopic = null;
    let foundPeak = null;
    for (const peak of COURSES_DATA) {
      const topic = peak.topics.find(t => t.id === topicId);
      if (topic) {
        foundTopic = topic;
        foundPeak = peak;
        break;
      }
    }

    if (!foundTopic) return;
    this.activeTopic = foundTopic;

    // Load user ELI10 preference
    this.eli10Mode = window.ProgressManager.state.preferences.eli10Mode;
    const elSwitch = document.getElementById("eli10-mode-switch");
    if (elSwitch) {
      elSwitch.checked = this.eli10Mode;
    }

    // Set header details
    const peakPill = document.getElementById("lesson-peak-pill");
    const topicTitle = document.getElementById("lesson-topic-title");
    
    if (peakPill) {
      peakPill.textContent = foundPeak.title;
      peakPill.style.color = foundPeak.color;
    }
    if (topicTitle) topicTitle.textContent = foundTopic.title;

    // Render Bookmark ribbon
    const isBookmarked = window.ProgressManager.state.bookmarkedLessons.includes(topicId);
    this.updateBookmarkButton(isBookmarked);

    // Render primary text
    this.renderActiveExplanation();

    // Render formulas & dynamic KaTeX
    this.renderFormulas(foundTopic.formulas);

    // Mark as completed in progress state (awards XP first time)
    window.ProgressManager.completeLesson(topicId);
  }

  renderActiveExplanation() {
    const pane = document.getElementById("lesson-explanation-pane");
    if (!pane || !this.activeTopic) return;

    // Highlight active card
    if (this.eli10Mode) {
      pane.innerHTML = this.activeTopic.eli10Explanation;
      pane.style.borderLeft = "4px solid var(--accent-cyan)";
    } else {
      pane.innerHTML = this.activeTopic.normalExplanation;
      pane.style.borderLeft = "1px solid var(--border-gray)";
    }

    // Dynamic KaTeX typesetting on rendered HTML content
    if (window.renderMathInElement) {
      window.renderMathInElement(pane, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ]
      });
    }
  }

  renderFormulas(formulas) {
    const container = document.getElementById("lesson-formulas-container");
    if (!container) return;
    container.innerHTML = "";

    if (!formulas || formulas.length === 0) {
      container.innerHTML = `<p class="empty-state-text">No formula sheet for this topic.</p>`;
      return;
    }

    formulas.forEach(f => {
      const box = document.createElement("div");
      box.className = "equation-box";
      
      box.innerHTML = `
        <span class="equation-name">${f.name}</span>
        <div class="math-wrap">
          $${f.tex}$
        </div>
        <span class="equation-desc">${f.desc}</span>
      `;
      container.appendChild(box);
    });

    // Typeset container formulas
    if (window.renderMathInElement) {
      window.renderMathInElement(container, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ]
      });
    }
  }

  updateBookmarkButton(isBookmarked) {
    const btn = document.getElementById("bookmark-lesson-btn");
    if (!btn) return;
    
    if (isBookmarked) {
      btn.style.color = "var(--accent-cyan)";
      btn.style.borderColor = "var(--accent-cyan)";
      btn.style.backgroundColor = "rgba(89, 213, 224, 0.1)";
    } else {
      btn.style.color = "var(--text-white)";
      btn.style.borderColor = "var(--border-gray)";
      btn.style.backgroundColor = "rgba(16, 32, 63, 0.5)";
    }
  }
}

window.TopicsManager = new TopicsManager();
