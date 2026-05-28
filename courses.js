// MathPeak Structured Peak Progression Timeline Module
// Renders the interactive timeline course blocks and topic pathways.

class CoursesManager {
  constructor() {
    this.container = document.getElementById("peaks-scroll-container");
    window.addEventListener("progressUpdated", () => this.renderPeaks());
  }

  renderPeaks() {
    if (!this.container) return;
    this.container.innerHTML = "";

    const state = window.ProgressManager.state;

    COURSES_DATA.forEach((peak, index) => {
      // Logic to determine if this peak is unlocked.
      // Foundation is always unlocked. Others are unlocked if the previous peak has at least 1 completed lesson, or standard progress.
      let isUnlocked = true;
      if (index > 0) {
        const prevPeak = COURSES_DATA[index - 1];
        const completedPrevCount = prevPeak.topics.filter(t => state.completedLessons.includes(t.id)).length;
        // Require at least one lesson completed in previous peak to unlock next peak, or baseline XP
        isUnlocked = completedPrevCount > 0 || state.totalXp >= index * 150;
      }

      const nodeWrapper = document.createElement("div");
      nodeWrapper.className = `peak-node-wrapper ${isUnlocked ? "unlocked" : "locked"}`;
      
      // Highlight the active climb node (the highest unlocked peak that isn't fully completed yet)
      const isPeakCompleted = peak.topics.every(t => state.completedLessons.includes(t.id));
      const isActive = isUnlocked && !isPeakCompleted;
      if (isActive) {
        nodeWrapper.classList.add("active-peak");
      }

      // Build Details Card
      const card = document.createElement("div");
      card.className = "peak-details-card";
      
      // Populate Peak Header
      card.innerHTML = `
        <div class="peak-meta-row">
          <span class="peak-difficulty-pill" style="color: ${peak.color}; border-color: ${peak.color}50;">${peak.difficulty}</span>
          <span class="peak-difficulty-pill">${isPeakCompleted ? "100% Mastered" : isUnlocked ? "In Progress" : "Locked"}</span>
        </div>
        <div class="peak-title-row">
          <h3>Peak ${index + 1}: ${peak.title}</h3>
        </div>
        <p class="peak-tagline-text">${peak.tagline}</p>
      `;

      // Build Sub-topics Grid/Pathway
      const road = document.createElement("div");
      road.className = "peak-topics-road";

      peak.topics.forEach(topic => {
        const topicNode = document.createElement("div");
        topicNode.className = "topic-road-node";
        
        const isCompleted = state.completedLessons.includes(topic.id);
        const statusIcon = isCompleted ? "✅" : "⏳";
        
        topicNode.innerHTML = `
          <div class="topic-road-header">
            <span class="topic-road-title">${topic.title}</span>
            <span class="topic-road-status-icon">${statusIcon}</span>
          </div>
          <div class="topic-road-meta">
            <span>${topic.difficulty || "Intermediate"}</span>
            <span>+30 XP</span>
          </div>
        `;

        if (isUnlocked) {
          topicNode.addEventListener("click", () => {
            if (window.AppCoordinator) {
              window.AppCoordinator.openLesson(topic.id);
            }
          });
        } else {
          topicNode.style.cursor = "not-allowed";
          topicNode.style.opacity = "0.5";
          topicNode.addEventListener("click", (e) => {
            e.stopPropagation();
            alert("This math peak is locked. Earn more XP or complete previous peaks to unlock!");
          });
        }

        road.appendChild(topicNode);
      });

      card.appendChild(road);

      // Icon Bubble on Timeline Left
      nodeWrapper.innerHTML = `
        <div class="peak-icon-bubble" title="${peak.title}">
          ${isUnlocked ? peak.icon : "🔒"}
        </div>
      `;
      nodeWrapper.appendChild(card);

      this.container.appendChild(nodeWrapper);
    });
  }
}

window.CoursesManager = new CoursesManager();
