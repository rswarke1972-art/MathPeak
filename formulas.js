// MathPeak Formula & Concept Library Module
// Manages rendering, indexing, and filtering cards of crucial mathematical identities and proofs.

class FormulasLibrary {
  constructor() {
    this.container = document.getElementById("formulas-library-grid");
    this.activeCat = "all";
    this.bindEvents();
    window.addEventListener("progressUpdated", () => this.renderLibrary());
  }

  bindEvents() {
    const filters = document.getElementById("formula-category-filters");
    if (filters) {
      filters.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter-btn");
        if (!btn) return;
        
        // Update active class
        filters.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        this.activeCat = btn.dataset.cat;
        this.renderLibrary();
      });
    }
  }

  renderLibrary() {
    if (!this.container) return;
    this.container.innerHTML = "";

    // Gather all formulas across all peaks
    let list = [];
    COURSES_DATA.forEach(peak => {
      peak.topics.forEach(topic => {
        if (topic.formulas) {
          topic.formulas.forEach(form => {
            list.push({
              ...form,
              topicId: topic.id,
              topicTitle: topic.title,
              peakId: peak.id
            });
          });
        }
      });
    });

    // Apply category filters
    if (this.activeCat !== "all") {
      list = list.filter(item => item.peakId === this.activeCat || (this.activeCat === "calculus" && item.peakId === "higher_maths"));
    }

    if (list.length === 0) {
      this.container.innerHTML = `<p class="empty-state-text">No formulas match this category filter.</p>`;
      return;
    }

    list.forEach(item => {
      const card = document.createElement("div");
      card.className = "formula-card card-glowing";
      
      card.innerHTML = `
        <div class="formula-card-header">
          <span class="formula-title">${item.name}</span>
          <span class="formula-category-tag">${item.topicTitle}</span>
        </div>
        <div class="formula-card-formula math-wrap">
          $${item.tex}$
        </div>
        <p class="formula-desc-text">${item.desc}</p>
        <button class="btn btn-secondary btn-touch" style="padding: 6px 12px; font-size:11px; width: fit-content; align-self: flex-end;" onclick="window.AppCoordinator.openLesson('${item.topicId}')">
          Study Topic
        </button>
      `;

      this.container.appendChild(card);
    });

    // Typeset formulas in grid
    if (window.renderMathInElement) {
      window.renderMathInElement(this.container, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ]
      });
    }
  }
}

window.FormulasLibrary = new FormulasLibrary();
