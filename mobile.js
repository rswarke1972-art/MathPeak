// MathPeak Mobile Touch & Responsiveness Helper Module
// Prevents elastic browser scrolls on active canvas boundaries and handles touch target overlays.

class MobileInterfaceController {
  constructor() {
    this.preventDoubleTapZoom();
    this.lockCanvasScrolling();
    this.setupMobileMenuDrawers();
  }

  preventDoubleTapZoom() {
    // Intercept double taps on buttons to prevent safari/chrome mobile zooming lags
    let lastTap = 0;
    document.addEventListener("touchend", (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 300 && tapLength > 0) {
        if (e.target.closest("button") || e.target.closest(".pill-btn") || e.target.closest(".nav-item") || e.target.closest(".choice-btn")) {
          e.preventDefault();
        }
      }
      lastTap = currentTime;
    });
  }

  lockCanvasScrolling() {
    // Intercept active touchzones of simulation canvases to avoid scrolling the whole page while dragging parameters
    const touchSensitiveZones = [
      "visuals-canvas",
      "scratchpad-canvas",
      "svg-overlay-container",
      "visuals-canvas-container"
    ];

    touchSensitiveZones.forEach(id => {
      const element = document.getElementById(id);
      if (!element) return;

      // Apply CSS overrides to disable default browser swipes
      element.style.touchAction = "none";

      element.addEventListener("touchstart", (e) => {
        // Safe check to avoid scrolling page
        if (e.target === element) {
          e.stopPropagation();
        }
      }, { passive: false });

      element.addEventListener("touchmove", (e) => {
        if (e.target === element) {
          e.preventDefault(); // absolute block on elastic scrolls
          e.stopPropagation();
        }
      }, { passive: false });
    });
  }

  setupMobileMenuDrawers() {
    // Hooks to expand/collapse sidebar drawer on mobile
    const sidebar = document.querySelector(".sidebar");
    const menuBtn = document.getElementById("mobile-menu-btn");
    const closeBtn = document.getElementById("mobile-close-sidebar-btn");

    if (menuBtn && sidebar) {
      menuBtn.addEventListener("click", () => {
        sidebar.classList.add("mobile-open");
        
        // Play click sound
        if (window.SoundSynth && window.ProgressManager.state.preferences.sound) {
          window.SoundSynth.playNote(587.33, "triangle", window.SoundSynth.ctx.currentTime, 0.05);
        }
      });
    }

    if (closeBtn && sidebar) {
      closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("mobile-open");
      });
    }

    // Close sidebar on tapping main content pane area (scrim action)
    const mainContent = document.querySelector(".main-content");
    if (mainContent && sidebar) {
      mainContent.addEventListener("click", (e) => {
        if (sidebar.classList.contains("mobile-open") && !e.target.closest(".mobile-menu-toggle") && !e.target.closest(".sidebar")) {
          sidebar.classList.remove("mobile-open");
        }
      }, { passive: true });
    }

    // Safe-guard checks against viewport overflows on desktop resize
    window.addEventListener("resize", () => {
      const w = window.innerWidth;
      if (w > 1024 && sidebar) {
        sidebar.classList.remove("mobile-open");
      }
    });
  }
}

// Instantiate Mobile Helper
window.MobileController = new MobileInterfaceController();
