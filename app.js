// MathPeak Main App Shell Coordinator Module
// Manages core bootstrap routines, view transitions, page navigations, and SVG analytics charts.

class AppCoordinator {
  constructor() {
    this.currentView = "dashboard";
    this.bindEvents();
    this.bootstrapApp();
  }

  bindEvents() {
    // 1. Navigation Event Bindings (Desktop Sidebar & Mobile Bottom Navigation)
    const navItems = document.querySelectorAll(".nav-item, .mobile-nav-item");
    navItems.forEach(item => {
      item.addEventListener("click", () => {
        const viewKey = item.dataset.view;
        this.switchView(viewKey);
        
        // Play click sound
        if (window.SoundSynth && window.ProgressManager.state.preferences.sound) {
          window.SoundSynth.playNote(587.33, "triangle", window.SoundSynth.ctx.currentTime, 0.05); // D5 click tone
        }
      });
    });

    // 2. Action buttons triggers
    const headerContinue = document.getElementById("continue-learning-header");
    if (headerContinue) {
      headerContinue.addEventListener("click", () => this.continueLearning());
    }

    // Dynamic triggers on view state changes
    window.addEventListener("progressUpdated", () => this.syncGlobalElements());
  }

  bootstrapApp() {
    // Trigger initial progress state evaluations
    window.ProgressManager.saveState();

    // Render Analytics graph
    this.renderAnalyticsGraph();

    // Synchronize bookmarks list
    this.syncBookmarkedList();

    // Default simulation load
    if (window.VisualsManager) {
      window.VisualsManager.loadSimulation("quadratic");
    }
  }

  switchView(viewKey) {
    if (this.currentView === viewKey && viewKey !== "lesson") return;

    const currentPanel = document.getElementById(`${this.currentView}-view`);
    const nextPanel = document.getElementById(`${viewKey}-view`);

    if (!nextPanel) return;

    // Apply elegant transition animations (Fade & Translate)
    if (currentPanel) {
      currentPanel.style.opacity = 0;
      currentPanel.style.transform = "translateY(10px)";
      setTimeout(() => {
        currentPanel.classList.remove("active");
        
        this.currentView = viewKey;
        nextPanel.classList.add("active");
        
        // Trigger specific view renders on switch
        if (viewKey === "progress") {
          this.renderAnalyticsGraph();
          this.syncBookmarkedList();
        } else if (viewKey === "peaks" && window.CoursesManager) {
          window.CoursesManager.renderPeaks();
        } else if (viewKey === "formulas" && window.FormulasLibrary) {
          window.FormulasLibrary.renderLibrary();
        }

        setTimeout(() => {
          nextPanel.style.opacity = 1;
          nextPanel.style.transform = "translateY(0)";
        }, 50);
      }, 200);
    } else {
      this.currentView = viewKey;
      nextPanel.classList.add("active");
      nextPanel.style.opacity = 1;
      nextPanel.style.transform = "translateY(0)";
    }

    // Sync active classes on Nav selectors (Both desktop sidebar and mobile bottom)
    const navItems = document.querySelectorAll(".nav-item, .mobile-nav-item");
    navItems.forEach(item => {
      if (item.dataset.view === viewKey) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Close mobile drawers if active
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) sidebar.classList.remove("mobile-open");
  }

  openLesson(topicId) {
    if (window.TopicsManager) {
      window.TopicsManager.loadTopic(topicId);
      this.switchView("lesson");
    }
  }

  openPractice(topicId) {
    if (window.PracticeManager) {
      window.PracticeManager.loadTopic(topicId); // sync active topic
      this.switchView("practice");
    }
  }

  openSandbox(simKey) {
    if (window.VisualsManager) {
      window.VisualsManager.loadSimulation(simKey);
      this.switchView("visuals");
    }
  }

  continueLearning() {
    const state = window.ProgressManager.state;
    // Find last unlocked topic or default to arithmetic
    let nextId = "arithmetic";
    if (state.completedLessons.length > 0) {
      // Find next topic in sequence across curriculum
      let foundActive = false;
      for (const peak of COURSES_DATA) {
        for (const topic of peak.topics) {
          if (!state.completedLessons.includes(topic.id)) {
            nextId = topic.id;
            foundActive = true;
            break;
          }
        }
        if (foundActive) break;
      }
    }
    this.openLesson(nextId);
  }

  syncGlobalElements() {
    // Sync bookmarked items inside progress
    this.syncBookmarkedList();
  }

  syncBookmarkedList() {
    const container = document.getElementById("analytics-fav-lessons");
    if (!container) return;
    container.innerHTML = "";

    const state = window.ProgressManager.state;
    const bookmarks = state.bookmarkedLessons;

    if (bookmarks.length === 0) {
      container.innerHTML = `<p class="empty-state-text">No bookmarked lessons yet. Click the bookmark ribbon inside a topic to save!</p>`;
      return;
    }

    bookmarks.forEach(tid => {
      let title = tid.charAt(0).toUpperCase() + tid.slice(1);
      // Retrieve formal topic title
      for (const peak of COURSES_DATA) {
        const top = peak.topics.find(t => t.id === tid);
        if (top) title = top.title;
      }

      const item = document.createElement("div");
      item.className = "fav-lesson-item";
      item.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:600; font-size:14px;">${title}</span>
          <i data-lucide="arrow-right" style="width:16px; height:16px; color:var(--accent-cyan);"></i>
        </div>
      `;
      
      item.addEventListener("click", () => {
        this.openLesson(tid);
      });

      container.appendChild(item);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderAnalyticsGraph() {
    const svg = document.getElementById("analytics-svg-bar-graph");
    if (!svg) return;
    svg.innerHTML = "";

    const state = window.ProgressManager.state;
    const history = state.climbHistory;

    // Static placeholder performance logs if history is empty to make it look premium
    let data = [...history];
    if (data.length === 0) {
      data = [
        { date: "Mon", xpEarned: 40 },
        { date: "Tue", xpEarned: 85 },
        { date: "Wed", xpEarned: 50 },
        { date: "Thu", xpEarned: 120 },
        { date: "Fri", xpEarned: 95 },
        { date: "Sat", xpEarned: 180 },
        { date: "Sun", xpEarned: state.totalXp > 0 ? state.totalXp : 60 }
      ];
    }

    // Overall metrics counters
    const totalXpEl = document.getElementById("stats-total-xp");
    const streakEl = document.getElementById("stats-streak");
    const lessonsEl = document.getElementById("stats-lessons-count");
    
    if (totalXpEl) totalXpEl.textContent = `${state.totalXp} XP`;
    if (streakEl) streakEl.textContent = `${state.currentStreak} Days`;
    if (lessonsEl) lessonsEl.textContent = state.completedLessons.length;

    const w = svg.clientWidth || 350;
    const h = 200;
    
    const barWidth = (w - 60) / data.length;
    const maxVal = Math.max(1, ...data.map(d => d.xpEarned));
    const maxBarHeight = h - 60;

    data.forEach((item, index) => {
      const bHeight = (item.xpEarned / maxVal) * maxBarHeight;
      const bx = 40 + index * barWidth;
      const by = h - 40 - bHeight;

      // Draw SVG rectangle bar with rounded top corners
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", bx + 4);
      rect.setAttribute("y", by);
      rect.setAttribute("width", barWidth - 8);
      rect.setAttribute("height", bHeight);
      rect.setAttribute("rx", 4);
      rect.setAttribute("fill", "url(#bar-gradient)");
      rect.setAttribute("style", "transition: all 0.5s ease;");
      svg.appendChild(rect);

      // Label text
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", bx + barWidth/2);
      text.setAttribute("y", h - 16);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", "#A5B4CD");
      text.setAttribute("font-size", "10px");
      text.setAttribute("font-family", "Inter, sans-serif");
      // Format date to show short day names
      let label = item.date;
      if (label.includes("-")) {
        const parts = label.split("-");
        label = parts[parts.length - 1]; // take day number
      }
      text.textContent = label;
      svg.appendChild(text);

      // XP value text on top
      const valText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      valText.setAttribute("x", bx + barWidth/2);
      valText.setAttribute("y", by - 6);
      valText.setAttribute("text-anchor", "middle");
      valText.setAttribute("fill", "var(--accent-cyan)");
      valText.setAttribute("font-size", "9px");
      valText.setAttribute("font-family", "'JetBrains Mono', monospace");
      valText.textContent = `+${item.xpEarned}`;
      svg.appendChild(valText);
    });

    // Create Gradient definition for bars
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const linearGrad = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    linearGrad.setAttribute("id", "bar-gradient");
    linearGrad.setAttribute("x1", "0%");
    linearGrad.setAttribute("y1", "0%");
    linearGrad.setAttribute("x2", "0%");
    linearGrad.setAttribute("y2", "100%");
    
    linearGrad.innerHTML = `
      <stop offset="0%" stop-color="#59D5E0" />
      <stop offset="100%" stop-color="#4656A1" />
    `;
    defs.appendChild(linearGrad);
    svg.appendChild(defs);
  }
}

// Bootstrap Coordinator
window.addEventListener("DOMContentLoaded", () => {
  window.AppCoordinator = new AppCoordinator();
  
  // Create icons matching lucide definitions
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Register PWA Service Worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js")
        .then(reg => console.log("MathPeak PWA Service Worker Registered", reg))
        .catch(err => console.error("Service Worker registration failed", err));
    });
  }
});
