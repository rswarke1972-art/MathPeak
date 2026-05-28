// MathPeak Smart Fuzzy Search Engine
// Implements Levenshtein distance and typo-tolerant indexing across formulas, topics, and lessons.

class SearchSystem {
  constructor() {
    this.input = document.getElementById("global-search-input");
    this.dropdown = document.getElementById("search-dropdown-results");
    this.index = [];
    this.buildIndex();
    this.bindEvents();
  }

  buildIndex() {
    this.index = [];
    COURSES_DATA.forEach(peak => {
      peak.topics.forEach(topic => {
        // Index topic lessons
        this.index.push({
          type: "lesson",
          title: topic.title,
          subTitle: `Peak: ${peak.title}`,
          id: topic.id,
          keywords: `${topic.title} ${topic.shortDesc} lesson study peak`.toLowerCase()
        });

        // Index practice quizzes
        this.index.push({
          type: "practice",
          title: `${topic.title} Quiz`,
          subTitle: `Practice: ${peak.title}`,
          id: topic.id,
          keywords: `${topic.title} practice quiz solve question arena`.toLowerCase()
        });

        // Index formulas
        if (topic.formulas) {
          topic.formulas.forEach(f => {
            this.index.push({
              type: "formula",
              title: f.name,
              subTitle: `Equation inside: ${topic.title}`,
              id: topic.id,
              keywords: `${f.name} ${f.desc} formula identity equation tex proof`.toLowerCase()
            });
          });
        }
      });
    });
  }

  bindEvents() {
    if (!this.input || !this.dropdown) return;

    this.input.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (q.length < 2) {
        this.dropdown.classList.add("hidden");
        return;
      }
      this.search(q);
    });

    // Close search dropdown on click outside
    document.addEventListener("click", (e) => {
      if (!this.input.contains(e.target) && !this.dropdown.contains(e.target)) {
        this.dropdown.classList.add("hidden");
      }
    });
  }

  search(query) {
    // 1. Calculate fuzzy match scores
    let results = [];
    
    this.index.forEach(item => {
      let score = 0;
      
      // Exact substring matches give maximum score
      if (item.keywords.includes(query)) {
        score = 100;
      } else {
        // Split query into tokens and search with a simple Levenshtein or token-match
        const tokens = query.split(/\s+/);
        let matchCount = 0;
        
        tokens.forEach(tok => {
          // Check words in item keyword list
          const words = item.keywords.split(/\s+/);
          words.forEach(w => {
            const dist = this.levenshteinDistance(tok, w);
            // Allow up to 2 character typos depending on token length
            if (dist <= 2 || w.includes(tok)) {
              matchCount++;
            }
          });
        });

        if (matchCount > 0) {
          score = matchCount * 25; // Fuzzy score
        }
      }

      if (score > 0) {
        results.push({ ...item, score });
      }
    });

    // Sort by score descending
    results.sort((a, b) => b.score - a.score);

    // Limit to top 6 results
    this.renderDropdown(results.slice(0, 6));
  }

  renderDropdown(items) {
    if (!this.dropdown) return;
    this.dropdown.innerHTML = "";

    if (items.length === 0) {
      this.dropdown.innerHTML = `<div class="search-no-results">No matching topics or equations found. Try "derivative" or "BODMAS".</div>`;
      this.dropdown.classList.remove("hidden");
      return;
    }

    items.forEach(item => {
      const row = document.createElement("div");
      row.className = "search-result-item";
      
      let badgeColor = "var(--accent-cyan)";
      if (item.type === "practice") badgeColor = "var(--color-success)";
      if (item.type === "formula") badgeColor = "var(--color-warning)";

      row.innerHTML = `
        <span class="search-result-title">${item.title}</span>
        <span class="search-result-meta" style="color: ${badgeColor};">${item.type} | ${item.subTitle}</span>
      `;

      row.addEventListener("click", () => {
        this.dropdown.classList.add("hidden");
        this.input.value = "";
        
        // Execute view shift via AppCoordinator
        if (window.AppCoordinator) {
          if (item.type === "practice") {
            window.AppCoordinator.openPractice(item.id);
          } else {
            window.AppCoordinator.openLesson(item.id);
          }
        }
      });

      this.dropdown.appendChild(row);
    });

    this.dropdown.classList.remove("hidden");
  }

  // Classic Levenshtein Distance for typo tolerance
  levenshteinDistance(str1, str2) {
    const track = Array(str2.length + 1).fill(null).map(() =>
      Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i += 1) {
      track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
      track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1, // deletion
          track[j - 1][i] + 1, // insertion
          track[j - 1][i - 1] + indicator // substitution
        );
      }
    }
    return track[str2.length][str1.length];
  }
}

window.SearchCoordinator = new SearchSystem();
