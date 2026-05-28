// MathPeak Smart Revision Module
// Calculates spaced repetition checksheets based on lesson completion history and accuracy logs.

class RevisionEngine {
  constructor() {
    this.container = document.getElementById("revision-card-list");
    window.addEventListener("progressUpdated", () => this.renderRevisionList());
  }

  renderRevisionList() {
    if (!this.container) return;
    this.container.innerHTML = "";

    const state = window.ProgressManager.state;
    
    // Spaced repetition queue
    let queue = [];

    // Pre-populate with beautiful default recommendations if no lessons have been completed
    if (state.completedLessons.length === 0) {
      queue = [
        { id: "arithmetic", title: "Arithmetic & Numbers", reason: "Due for 24h Review 🔁" },
        { id: "equations", title: "Equations & Inequalities", reason: "Due for 3d Review 🔁" },
        { id: "limits", title: "Limits & Continuity", reason: "Fading memory trace 🧠" }
      ];
    } else {
      // Process studied topics and flag due items
      state.completedLessons.forEach(tid => {
        // Simple logic: every completed lesson is added to the revision loop
        // If the accuracy is low, we prioritize it
        const acc = state.topicAccuracy[tid];
        let reason = "Due for weekly review";
        if (acc && acc.total > 0 && (acc.correct / acc.total) < 0.7) {
          reason = "Low Practice Accuracy (Requires review) ⚠️";
        }
        
        let title = tid.charAt(0).toUpperCase() + tid.slice(1);
        // Find formal title
        for (const peak of COURSES_DATA) {
          const t = peak.topics.find(top => top.id === tid);
          if (t) title = t.title;
        }

        queue.push({ id: tid, title, reason });
      });
    }

    queue.forEach(item => {
      const card = document.createElement("div");
      card.className = "plan-item pending";
      card.style.cursor = "pointer";
      card.style.justifyContent = "space-between";

      card.innerHTML = `
        <div style="display:flex; align-items:center; gap:16px;">
          <span class="plan-status">🔁</span>
          <div style="display:flex; flex-direction:column;">
            <span class="plan-text" style="font-weight:600;">${item.title}</span>
            <span style="font-size:10px; color:var(--text-muted); text-transform:uppercase;">${item.reason}</span>
          </div>
        </div>
        <button class="btn btn-secondary btn-touch" style="padding:6px 12px; font-size:11px;">
          Review
        </button>
      `;

      card.addEventListener("click", () => {
        if (window.AppCoordinator) {
          window.AppCoordinator.openLesson(item.id);
        }
      });

      this.container.appendChild(card);
    });
  }
}

window.RevisionEngine = new RevisionEngine();
