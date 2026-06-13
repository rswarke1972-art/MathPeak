// MathPeak Practice Arena Module
// Manages quizzes, feedback loops, scratchpad drawing boards, and solutions.

class PracticeManager {
  constructor() {
    this.activeTopic = null;
    this.activeQuestion = null;
    this.selectedOption = null;
    this.scratchpad = null;
    this.bindEvents();
  }

  bindEvents() {
    // Difficulty dropdown selector
    const diffSelect = document.getElementById("practice-diff-select");
    if (diffSelect) {
      diffSelect.addEventListener("change", (e) => {
        window.ProgressManager.state.activeDifficulty = e.target.value;
        window.ProgressManager.saveState();
        this.generateQuestion();
      });
    }

    const hintBtn = document.getElementById("practice-hint-btn");
    if (hintBtn) {
      hintBtn.addEventListener("click", () => {
        if (!this.activeQuestion) return;
        alert(`Hint: ${this.activeQuestion.hint}`);
      });
    }

    const nextBtn = document.getElementById("practice-next-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        this.generateQuestion();
      });
    }

    const clearScratch = document.getElementById("clear-scratchpad-btn");
    if (clearScratch) {
      clearScratch.addEventListener("click", () => {
        this.clearDrawZone();
      });
    }

    // Initialize scratchpad canvas
    this.setupScratchpad();
  }

  setupScratchpad() {
    const canvas = document.getElementById("scratchpad-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    this.scratchpad = { canvas, ctx, drawing: false };

    // Canvas scaling to match DOM bounds
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      
      // Clear background
      ctx.fillStyle = "#10203F";
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.strokeStyle = "rgba(89, 213, 224, 0.4)";
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
    };
    
    resize();
    window.addEventListener("resize", resize);

    // Pointer Event Listeners (Mouse & Touch united)
    canvas.addEventListener("pointerdown", (e) => {
      this.scratchpad.drawing = true;
      const rect = canvas.getBoundingClientRect();
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    });

    canvas.addEventListener("pointermove", (e) => {
      if (!this.scratchpad.drawing) return;
      const rect = canvas.getBoundingClientRect();
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    });

    canvas.addEventListener("pointerup", () => {
      this.scratchpad.drawing = false;
    });

    canvas.addEventListener("pointerleave", () => {
      this.scratchpad.drawing = false;
    });
  }

  clearDrawZone() {
    if (!this.scratchpad) return;
    const { canvas, ctx } = this.scratchpad;
    ctx.fillStyle = "#10203F";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  }

  loadArena(topicId) {
    // Find topic
    let foundTopic = null;
    for (const peak of COURSES_DATA) {
      const topic = peak.topics.find(t => t.id === topicId);
      if (topic) {
        foundTopic = topic;
        break;
      }
    }

    if (!foundTopic) return;
    this.activeTopic = foundTopic;

    // Load active difficulty preferences
    const activeDiff = window.ProgressManager.state.activeDifficulty;
    const diffSelect = document.getElementById("practice-diff-select");
    if (diffSelect) {
      diffSelect.value = activeDiff;
    }

    // Set topic subtitle
    const topicIndicator = document.getElementById("practice-topic-name");
    if (topicIndicator) {
      topicIndicator.textContent = this.activeTopic.title;
    }

    this.generateQuestion();
    this.clearDrawZone();
  }

  generateQuestion() {
    const diffSelect = document.getElementById("practice-diff-select");
    const diff = diffSelect ? diffSelect.value : "medium";
    
    // Hide next button, hide solution drawer
    const nextBtn = document.getElementById("practice-next-btn");
    const solutionDrawer = document.getElementById("practice-solution-drawer");
    if (nextBtn) nextBtn.classList.add("hidden");
    if (solutionDrawer) solutionDrawer.classList.add("hidden");

    this.selectedOption = null;

    // Set difficulty tag
    const diffPill = document.getElementById("practice-difficulty-pill");
    if (diffPill) {
      diffPill.className = `difficulty-tag ${diff}`;
      diffPill.textContent = diff.toUpperCase();
    }

    // Get relevant question bank
    let bank = this.activeTopic.questions || [];
    // Fallback if no questions defined
    if (bank.length === 0) {
      bank = [
        {
          id: "fallback_q1",
          difficulty: "easy",
          question: "Solve the basic equation: $2x + 4 = 10$",
          options: ["x = 3", "x = 4", "x = 2", "x = 5"],
          answer: "x = 3",
          hint: "Subtract 4, then divide by 2.",
          solution: "2x = 10 - 4 => 2x = 6 => x = 3."
        }
      ];
    }

    // Try to find matching difficulty questions, otherwise take whatever is available
    let questions = bank.filter(q => q.difficulty === diff);
    if (questions.length === 0) {
      questions = bank;
    }

    // Select random question
    const idx = Math.floor(Math.random() * questions.length);
    this.activeQuestion = questions[idx];

    // Render question text
    const qText = document.getElementById("practice-question-text");
    if (qText) {
      qText.innerHTML = this.activeQuestion.question;
      // Compile LaTeX inside question
      if (window.renderMathInElement) {
        window.renderMathInElement(qText, {
          delimiters: [{ left: "$", right: "$", display: false }]
        });
      }
    }

    // Render XP pill reward
    const xpPill = document.getElementById("practice-question-xp");
    if (xpPill) {
      const rewards = { easy: 20, medium: 35, hard: 50, olympiad: 100 };
      xpPill.textContent = rewards[this.activeQuestion.difficulty] || 25;
    }

    // Render Answer Choices
    const optionsGrid = document.getElementById("practice-options-grid");
    if (optionsGrid) {
      optionsGrid.innerHTML = "";
      
      this.activeQuestion.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "choice-btn btn-touch";
        btn.innerHTML = opt;
        btn.dataset.option = opt; // Store raw option value for precise comparison
        
        // Compile LaTeX in options
        if (window.renderMathInElement) {
          window.renderMathInElement(btn, {
            delimiters: [{ left: "$", right: "$", display: false }]
          });
        }

        btn.addEventListener("click", () => {
          if (this.selectedOption) return; // Prevent double clicking
          this.selectedOption = opt;
          this.submitAnswer(btn, opt);
        });

        optionsGrid.appendChild(btn);
      });
    }
  }

  submitAnswer(selectedBtn, answer) {
    const isCorrect = answer === this.activeQuestion.answer;
    
    // Log result to update progress module, weaknesses, strengths
    window.ProgressManager.logPracticeResult(this.activeTopic.id, isCorrect);

    // Apply color highlights
    if (isCorrect) {
      selectedBtn.classList.add("correct");
    } else {
      selectedBtn.classList.add("wrong");
      
      // Find and highlight correct answer as well
      const optionsGrid = document.getElementById("practice-options-grid");
      const buttons = optionsGrid.querySelectorAll(".choice-btn");
      buttons.forEach(btn => {
        // Evaluate option value match using dataset attribute
        if (btn.dataset.option.trim() === this.activeQuestion.answer.trim()) {
          btn.classList.add("correct");
        }
      });
    }

    // Show step-by-step solution drawer
    const solutionDrawer = document.getElementById("practice-solution-drawer");
    const solutionContent = document.getElementById("practice-solution-content");
    const nextBtn = document.getElementById("practice-next-btn");

    if (solutionDrawer && solutionContent) {
      solutionContent.innerHTML = this.activeQuestion.solution;
      solutionDrawer.classList.remove("hidden");
      
      // Compile math in solution
      if (window.renderMathInElement) {
        window.renderMathInElement(solutionContent, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ]
        });
      }
    }

    if (nextBtn) {
      nextBtn.classList.remove("hidden");
    }
  }
}

window.PracticeManager = new PracticeManager();
