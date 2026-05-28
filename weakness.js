// MathPeak Weakness Detection & Recommendation Module
// Identifies error clusters in practice sessions and creates high-priority review items.

class WeaknessManager {
  constructor() {
    this.container = document.getElementById("weakness-auto-container");
    window.addEventListener("progressUpdated", () => this.renderWeaknesses());
  }

  renderWeaknesses() {
    if (!this.container) return;
    this.container.innerHTML = "";

    const state = window.ProgressManager.state;
    const log = state.weaknessLog;

    // Convert logs object to list
    let list = [];
    Object.keys(log).forEach(topicId => {
      list.push({
        id: topicId,
        count: log[topicId].count,
        lastTested: log[topicId].lastTested
      });
    });

    // Populate mock demo items if no weaknesses recorded yet to show off the system beautiful UI
    if (list.length === 0) {
      list = [
        { id: "trigonometry", count: 3, label: "Trigonometric Identities", level: "❌ High Priority Review" },
        { id: "equations", count: 1, label: "Simultaneous Equations", level: "⚠️ Moderate Risk" }
      ];
    } else {
      // Map formal labels
      list = list.map(item => {
        let label = item.id.charAt(0).toUpperCase() + item.id.slice(1);
        for (const peak of COURSES_DATA) {
          const t = peak.topics.find(top => top.id === item.id);
          if (t) label = t.title;
        }
        
        let level = "⚠️ Moderate Risk";
        if (item.count >= 3) {
          level = "❌ High Priority Review";
        }
        
        return { ...item, label, level };
      });
    }

    list.forEach(item => {
      const card = document.createElement("div");
      card.className = "weakness-item";
      card.style.cursor = "pointer";

      const isHigh = item.level.includes("High");

      card.innerHTML = `
        <div class="weakness-meta">
          <span class="weakness-topic-name">${item.label}</span>
          <span class="weakness-alert-pill" style="color:${isHigh ? "var(--color-danger)" : "var(--color-warning)"};">
            ${item.level}
          </span>
        </div>
        <button class="btn btn-secondary btn-touch" style="padding: 6px 12px; font-size:11px; border-color:${isHigh ? "rgba(244,67,54,0.3)" : "rgba(255,152,0,0.3)"};">
          Fix
        </button>
      `;

      card.addEventListener("click", () => {
        if (window.AppCoordinator) {
          window.AppCoordinator.openPractice(item.id);
        }
      });

      this.container.appendChild(card);
    });
  }
}

window.WeaknessManager = new WeaknessManager();
