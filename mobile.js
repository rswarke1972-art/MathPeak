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
    // Simple hooks to expand sidebar drawer on tablets if needed in the future
    const state = window.ProgressManager.state;
    // Safe-guard checks against viewport overflows
    window.addEventListener("resize", () => {
      const w = window.innerWidth;
      const sidebar = document.querySelector(".sidebar");
      if (w > 1024 && sidebar) {
        sidebar.classList.remove("mobile-open");
      }
    });
  }
}

// Instantiate Mobile Helper
window.MobileController = new MobileInterfaceController();
