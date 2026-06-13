// MathPeak High-Performance Interactive Graphics Engine
// Implements 9 advanced canvas simulations with custom coordinate axes, drag systems, and animation loops.

class GraphsCoordinator {
  constructor() {
    this.canvas = document.getElementById("visuals-canvas");
    this.ctx = null;
    this.simKey = "quadratic";
    this.params = {};
    this.animationId = null;
    this.dragState = null; // State tracker for canvas dragging
    
    // Grid scaling factors
    this.originX = 0;
    this.originY = 0;
    this.scale = 40; // Pixels per math unit

    // Particles for Vector Fields / Calculus
    this.particles = [];

    this.bindCanvasEvents();
  }

  bindCanvasEvents() {
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    
    // Set coordinate readout labels
    const readout = document.getElementById("canvas-coordinate-readout");
    
    const getMathCoords = (clientX, clientY) => {
      const rect = this.canvas.getBoundingClientRect();
      const canvasX = clientX - rect.left;
      const canvasY = clientY - rect.top;
      
      const mathX = (canvasX - this.originX) / this.scale;
      const mathY = -(canvasY - this.originY) / this.scale;
      return { x: mathX, y: mathY };
    };

    const distance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

    this.canvas.addEventListener("pointerdown", (e) => {
      const coords = getMathCoords(e.clientX, e.clientY);
      this.dragState = null;

      if (this.simKey === "geometry") {
        const x1 = this.params.x1 !== undefined ? this.params.x1 : -2.0;
        const y1 = this.params.y1 !== undefined ? this.params.y1 : 2.0;
        const x2 = this.params.x2 !== undefined ? this.params.x2 : 3.0;
        const y2 = this.params.y2 !== undefined ? this.params.y2 : 1.5;

        if (distance(coords.x, coords.y, x1, y1) < 0.5) {
          this.dragState = { type: "geometry", point: "A" };
        } else if (distance(coords.x, coords.y, x2, y2) < 0.5) {
          this.dragState = { type: "geometry", point: "B" };
        }
      } else if (this.simKey === "trigonometry") {
        const theta = this.params.theta !== undefined ? this.params.theta : 45;
        const rad = (theta * Math.PI) / 180;
        const hx = Math.cos(rad);
        const hy = Math.sin(rad);
        if (distance(coords.x, coords.y, hx, hy) < 0.5) {
          this.dragState = { type: "trigonometry" };
        }
      } else if (this.simKey === "derivatives") {
        const x0 = this.params.xval !== undefined ? this.params.xval : 1.0;
        const y0 = x0 * x0 * x0 - 3 * x0;
        if (distance(coords.x, coords.y, x0, y0) < 0.5) {
          this.dragState = { type: "derivatives" };
        }
      }
    });

    this.canvas.addEventListener("pointermove", (e) => {
      const coords = getMathCoords(e.clientX, e.clientY);
      if (readout) {
        readout.textContent = `X: ${coords.x.toFixed(2)} | Y: ${coords.y.toFixed(2)}`;
      }

      if (this.dragState) {
        if (this.dragState.type === "geometry") {
          const pt = this.dragState.point;
          const px = pt === "A" ? "x1" : "x2";
          const py = pt === "A" ? "y1" : "y2";

          const clampedX = Math.max(-4, Math.min(4, coords.x));
          const clampedY = Math.max(-4, Math.min(4, coords.y));

          this.params[px] = clampedX;
          this.params[py] = clampedY;

          // Sync DOM controls
          const sliderX = document.getElementById(`slider-${px}`);
          if (sliderX) sliderX.value = clampedX;
          const valX = document.getElementById(`val-${px}`);
          if (valX) valX.textContent = clampedX.toFixed(2);

          const sliderY = document.getElementById(`slider-${py}`);
          if (sliderY) sliderY.value = clampedY;
          const valY = document.getElementById(`val-${py}`);
          if (valY) valY.textContent = clampedY.toFixed(2);
        } else if (this.dragState.type === "trigonometry") {
          let deg = Math.atan2(coords.y, coords.x) * (180 / Math.PI);
          if (deg < 0) deg += 360;

          this.params.theta = deg;

          const slider = document.getElementById("slider-theta");
          if (slider) slider.value = deg;
          const val = document.getElementById("val-theta");
          if (val) val.textContent = deg.toFixed(0);
        } else if (this.dragState.type === "derivatives") {
          const clampedX = Math.max(-2, Math.min(2, coords.x));
          this.params.xval = clampedX;

          const slider = document.getElementById("slider-xval");
          if (slider) slider.value = clampedX;
          const val = document.getElementById("val-xval");
          if (val) val.textContent = clampedX.toFixed(2);
        }
      }
    });

    this.canvas.addEventListener("pointerup", () => {
      this.dragState = null;
    });

    this.canvas.addEventListener("pointerleave", () => {
      this.dragState = null;
    });

    // Resize canvas dynamically
    const resize = () => {
      const rect = this.canvas.parentNode.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = 380; // Fit container height
      this.originX = this.canvas.width / 2;
      this.originY = this.canvas.height / 2;
    };
    resize();
    window.addEventListener("resize", resize);
  }

  initSimulation(simKey, sliders) {
    this.simKey = simKey;
    
    // Load initial sliders params
    this.params = {};
    sliders.forEach(s => {
      this.params[s.id] = s.val;
    });

    // Setup coordinate grids properties based on simulation
    if (this.simKey === "trigonometry") {
      this.originX = this.canvas.width * 0.35;
      this.scale = 100; // Zoom in on circular functions
    } else if (this.simKey === "probability") {
      this.originX = 50;
      this.originY = this.canvas.height - 50;
      this.scale = 40;
    } else {
      this.originX = this.canvas.width / 2;
      this.originY = this.canvas.height / 2;
      this.scale = 40;
    }

    // Set up particles for vector calculus field
    if (this.simKey === "vector-calculus") {
      this.particles = [];
      for (let i = 0; i < 60; i++) {
        this.particles.push({
          x: (Math.random() - 0.5) * 10,
          y: (Math.random() - 0.5) * 8,
          life: Math.random() * 100
        });
      }
    }

    // Cancel existing loop, launch new loop
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    const tick = () => {
      this.render();
      this.animationId = requestAnimationFrame(tick);
    };
    tick();
  }

  updateParam(key, value) {
    this.params[key] = value;
  }

  render() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Standard Clear Screen
    ctx.fillStyle = "#0B1528";
    ctx.fillRect(0, 0, w, h);

    // Call individual plotters
    switch (this.simKey) {
      case "quadratic":
        this.drawGrid();
        this.plotQuadratic();
        break;
      case "geometry":
        this.drawGrid();
        this.plotGeometry();
        break;
      case "trigonometry":
        this.plotTrigUnitCircle();
        break;
      case "derivatives":
        this.drawGrid();
        this.plotDerivatives();
        break;
      case "integration":
        this.drawGrid();
        this.plotIntegration();
        break;
      case "matrices":
        this.plotMatrixGrid();
        break;
      case "vectors":
        this.drawGrid();
        this.plotVectors();
        break;
      case "probability":
        this.plotProbability();
        break;
      case "vector-calculus":
        this.plotVectorField();
        break;
    }
  }

  // 0. Coordinate Grid Helper
  drawGrid() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.strokeStyle = "rgba(43, 61, 94, 0.35)";
    ctx.lineWidth = 1;
    ctx.font = "10px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(165, 180, 205, 0.4)";

    // Vertical grid lines
    const startX = Math.floor(-this.originX / this.scale);
    const endX = Math.ceil((w - this.originX) / this.scale);
    for (let x = startX; x <= endX; x++) {
      const cx = this.originX + x * this.scale;
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, h);
      ctx.stroke();

      if (x !== 0) {
        ctx.fillText(x, cx - 4, this.originY + 12);
      }
    }

    // Horizontal grid lines
    const startY = Math.floor(-this.originY / this.scale);
    const endY = Math.ceil((h - this.originY) / this.scale);
    for (let y = startY; y <= endY; y++) {
      const cy = this.originY - y * this.scale;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);
      ctx.stroke();

      if (y !== 0) {
        ctx.fillText(y, this.originX + 8, cy + 4);
      }
    }

    // Main Axes
    ctx.strokeStyle = "rgba(89, 213, 224, 0.25)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, this.originY);
    ctx.lineTo(w, this.originY);
    ctx.moveTo(this.originX, 0);
    ctx.lineTo(this.originX, h);
    ctx.stroke();
  }

  // 1. Quadratic Equation Plotter
  plotQuadratic() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const a = this.params.a || 1;
    const b = this.params.b || 0;
    const c = this.params.c || 0;

    // Draw Parabolic Line
    ctx.strokeStyle = "#59D5E0";
    ctx.lineWidth = 3;
    ctx.beginPath();

    const startX = -this.originX / this.scale;
    const endX = (w - this.originX) / this.scale;
    let first = true;

    for (let x = startX; x <= endX; x += 0.1) {
      const y = a * x * x + b * x + c;
      const cx = this.originX + x * this.scale;
      const cy = this.originY - y * this.scale;

      if (first) {
        ctx.moveTo(cx, cy);
        first = false;
      } else {
        ctx.lineTo(cx, cy);
      }
    }
    ctx.stroke();

    // 1. Calculate Vertex
    const vx = -b / (2 * a);
    const vy = c - (b * b) / (4 * a);
    const cvx = this.originX + vx * this.scale;
    const cvy = this.originY - vy * this.scale;

    // Draw Vertex Dot
    ctx.fillStyle = "#FF9800";
    ctx.beginPath();
    ctx.arc(cvx, cvy, 6, 0, Math.PI * 2);
    ctx.fill();

    // Draw vertex coordinate text
    ctx.fillStyle = "#F9FBFD";
    ctx.font = "11px Inter, sans-serif";
    ctx.fillText(`Vertex: (${vx.toFixed(1)}, ${vy.toFixed(1)})`, cvx + 10, cvy - 10);

    // Readout panel text rendering inside controller box
    const stats = document.getElementById("sandbox-stats-readout");
    if (stats) {
      const d = b * b - 4 * a * c;
      let rootDesc = "No Real Intercepts";
      if (d > 0) {
        const r1 = (-b + Math.sqrt(d)) / (2 * a);
        const r2 = (-b - Math.sqrt(d)) / (2 * a);
        rootDesc = `Roots: x₁ = ${r1.toFixed(2)}, x₂ = ${r2.toFixed(2)}`;
      } else if (d === 0) {
        const r = -b / (2 * a);
        rootDesc = `Single Root: x = ${r.toFixed(2)}`;
      }
      stats.innerHTML = `
        <div class="stat-row"><span>Equation:</span><strong>y = ${a.toFixed(1)}x² + ${b >= 0 ? "+" : ""}${b.toFixed(1)}x + ${c >= 0 ? "+" : ""}${c.toFixed(1)}</strong></div>
        <div class="stat-row"><span>Discriminant:</span><strong>Δ = ${d.toFixed(1)}</strong></div>
        <div class="stat-row"><span>Intercept Status:</span><strong>${rootDesc}</strong></div>
      `;
    }
  }

  // 2. Draggable Geometry Board Plotter
  plotGeometry() {
    const ctx = this.ctx;
    const x1 = this.params.x1 || -2;
    const y1 = this.params.y1 || 2;
    const x2 = this.params.x2 || 3;
    const y2 = this.params.y2 || 1.5;
    
    // Constant Vertex C (Fixed at origin to simplify manual vectors)
    const x3 = 0;
    const y3 = -2;

    const cx1 = this.originX + x1 * this.scale;
    const cyy1 = this.originY - y1 * this.scale;
    const cx2 = this.originX + x2 * this.scale;
    const cyy2 = this.originY - y2 * this.scale;
    const cx3 = this.originX + x3 * this.scale;
    const cyy3 = this.originY - y3 * this.scale;

    // Draw Triangle Area fill
    ctx.fillStyle = "rgba(70, 86, 161, 0.15)";
    ctx.beginPath();
    ctx.moveTo(cx1, cyy1);
    ctx.lineTo(cx2, cyy2);
    ctx.lineTo(cx3, cyy3);
    ctx.closePath();
    ctx.fill();

    // Draw Triangle Borders
    ctx.strokeStyle = "#4656A1";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw Vertex Handle Dots
    const drawHandle = (cx, cy, color, label) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#F9FBFD";
      ctx.font = "bold 11px Inter, sans-serif";
      ctx.fillText(label, cx - 4, cy - 14);
    };

    drawHandle(cx1, cyy1, "#59D5E0", "A");
    drawHandle(cx2, cyy2, "#FF9800", "B");
    drawHandle(cx3, cyy3, "#4CAF50", "C");

    // Math: Calculate Side Lengths
    const sideC = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
    const sideA = Math.sqrt((x3-x2)**2 + (y3-y2)**2);
    const sideB = Math.sqrt((x3-x1)**2 + (y3-y1)**2);

    // Math: Calculate Area via Shoelace Formula
    const area = 0.5 * Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));

    // Centroid calculation
    const gx = (x1 + x2 + x3) / 3;
    const gy = (y1 + y2 + y3) / 3;
    const cgx = this.originX + gx * this.scale;
    const cgy = this.originY - gy * this.scale;
    
    // Draw centroid node
    ctx.fillStyle = "#E91E63";
    ctx.beginPath();
    ctx.arc(cgx, cgy, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText("G (Centroid)", cgx + 10, cgy + 4);

    // Math: Angles via Law of Cosines
    const angleA = Math.acos((sideB**2 + sideC**2 - sideA**2) / (2 * sideB * sideC)) * (180 / Math.PI);
    const angleB = Math.acos((sideA**2 + sideC**2 - sideB**2) / (2 * sideA * sideC)) * (180 / Math.PI);
    const angleC = 180 - (angleA + angleB);

    // Readout panel update
    const stats = document.getElementById("sandbox-stats-readout");
    if (stats) {
      stats.innerHTML = `
        <div class="stat-row"><span>Side A (BC):</span><strong>${sideA.toFixed(1)} units</strong></div>
        <div class="stat-row"><span>Side B (AC):</span><strong>${sideB.toFixed(1)} units</strong></div>
        <div class="stat-row"><span>Side C (AB):</span><strong>${sideC.toFixed(1)} units</strong></div>
        <div class="stat-row"><span>Angle A:</span><strong>${angleA.toFixed(1)}°</strong></div>
        <div class="stat-row"><span>Angle B:</span><strong>${angleB.toFixed(1)}°</strong></div>
        <div class="stat-row"><span>Angle C:</span><strong>${angleC.toFixed(1)}°</strong></div>
        <div class="stat-row"><span>Triangle Area:</span><strong>${area.toFixed(2)} units²</strong></div>
      `;
    }
  }

  // 3. Unit Circle & Oscillating Wave function
  plotTrigUnitCircle() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const thetaDeg = this.params.theta || 45;
    const rad = (thetaDeg * Math.PI) / 180;

    // Unit circle center is shifted to left
    const ox = this.originX;
    const oy = this.originY;
    const r = this.scale; // 1 unit matches scale length (100px)

    // A. Draw floor shadow (Cosine - red)
    const px = Math.cos(rad) * r;
    const py = -Math.sin(rad) * r;

    ctx.strokeStyle = "#F44336"; // Cosine Red
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(ox + px, oy);
    ctx.stroke();

    // B. Draw wall shadow (Sine - blue)
    ctx.strokeStyle = "#2196F3"; // Sine Blue
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(ox + px, oy);
    ctx.lineTo(ox + px, oy + py);
    ctx.stroke();

    // C. Draw Hypotenuse radius line
    ctx.strokeStyle = "#F9FBFD";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(ox + px, oy + py);
    ctx.stroke();

    // D. Draw circular boundary grid
    ctx.strokeStyle = "rgba(43, 61, 94, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(ox, oy, r, 0, Math.PI * 2);
    ctx.stroke();

    // E. Draw horizontal wave guideline
    ctx.strokeStyle = "rgba(89, 213, 224, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(ox + px, oy + py);
    ctx.lineTo(ox + 180, oy + py);
    ctx.stroke();

    // F. Tracing the Sine wave on the right side
    const waveStart = ox + 180;
    const waveWidth = w - waveStart - 40;
    
    ctx.strokeStyle = "#2196F3";
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    for (let x = 0; x < waveWidth; x++) {
      // Map x to angle offset
      const angleOffset = (x / waveWidth) * Math.PI * 2.5;
      const waveY = oy - Math.sin(rad + angleOffset) * r;
      
      if (x === 0) {
        ctx.moveTo(waveStart + x, waveY);
      } else {
        ctx.lineTo(waveStart + x, waveY);
      }
    }
    ctx.stroke();

    // Pulsing dot on wave start
    ctx.fillStyle = "#59D5E0";
    ctx.beginPath();
    ctx.arc(waveStart, oy + py, 5, 0, Math.PI * 2);
    ctx.fill();

    // Update Stats panel
    const stats = document.getElementById("sandbox-stats-readout");
    if (stats) {
      stats.innerHTML = `
        <div class="stat-row"><span>Angle Theta:</span><strong>${thetaDeg.toFixed(0)}° (${rad.toFixed(2)} rad)</strong></div>
        <div class="stat-row" style="color:#F44336;"><span>Cosine (x-shadow):</span><strong>${Math.cos(rad).toFixed(3)}</strong></div>
        <div class="stat-row" style="color:#2196F3;"><span>Sine (y-shadow):</span><strong>${Math.sin(rad).toFixed(3)}</strong></div>
        <div class="stat-row"><span>Tangent (slope):</span><strong>${Math.abs(Math.cos(rad)) > 0.001 ? Math.tan(rad).toFixed(3) : "∞"}</strong></div>
      `;
    }
  }

  // 4. Derivative Tangent Runner Plotter
  plotDerivatives() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    // x0 coordinate on the curve f(x) = x³ - 3x
    const x0 = this.params.xval || 1.0;
    
    // Function definition
    const f = (x) => x*x*x - 3*x;
    // Derivative definition
    const df = (x) => 3*x*x - 3;

    // Draw main polynomial curve
    ctx.strokeStyle = "rgba(165, 180, 205, 0.4)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    const startX = -this.originX / this.scale;
    const endX = (w - this.originX) / this.scale;
    let first = true;

    for (let x = startX; x <= endX; x += 0.1) {
      const cy = this.originY - f(x) * this.scale;
      const cx = this.originX + x * this.scale;
      if (first) {
        ctx.moveTo(cx, cy);
        first = false;
      } else {
        ctx.lineTo(cx, cy);
      }
    }
    ctx.stroke();

    // Draw Tangent line at x0
    const y0 = f(x0);
    const slope = df(x0);
    
    ctx.strokeStyle = "#59D5E0"; // Cyan tangent
    ctx.lineWidth = 3;
    ctx.beginPath();

    const tStartX = x0 - 2;
    const tEndX = x0 + 2;
    
    const tStartY = y0 + slope * (tStartX - x0);
    const tEndY = y0 + slope * (tEndX - x0);

    ctx.moveTo(this.originX + tStartX * this.scale, this.originY - tStartY * this.scale);
    ctx.lineTo(this.originX + tEndX * this.scale, this.originY - tEndY * this.scale);
    ctx.stroke();

    // Tangent Coordinate Dot
    ctx.fillStyle = "#FF9800";
    ctx.beginPath();
    ctx.arc(this.originX + x0 * this.scale, this.originY - y0 * this.scale, 7, 0, Math.PI * 2);
    ctx.fill();

    // Readout panel
    const stats = document.getElementById("sandbox-stats-readout");
    if (stats) {
      stats.innerHTML = `
        <div class="stat-row"><span>Curve f(x):</span><strong>x³ - 3x</strong></div>
        <div class="stat-row"><span>Point Target:</span><strong>P(${x0.toFixed(2)}, ${y0.toFixed(2)})</strong></div>
        <div class="stat-row" style="color:var(--accent-cyan);"><span>Tangent Slope (dy/dx):</span><strong>f'(x) = ${slope.toFixed(3)}</strong></div>
      `;
    }
  }

  // 5. Riemann Sum Integrals Plotter
  plotIntegration() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    // Column count N
    const n = Math.floor(this.params.rects || 8);

    // Integrand: f(x) = sin(x) + 1.5
    const f = (x) => Math.sin(x) + 1.5;
    
    // Bounds [a, b]
    const a = -2;
    const b = 4;
    const dx = (b - a) / n;

    // Draw Riemann Rectangles
    ctx.fillStyle = "rgba(89, 213, 224, 0.25)";
    ctx.strokeStyle = "rgba(89, 213, 224, 0.6)";
    ctx.lineWidth = 1;

    let sum = 0;
    for (let i = 0; i < n; i++) {
      const rx = a + i * dx;
      const ry = f(rx + dx / 2); // Midpoint Riemann Sum
      sum += ry * dx;

      // Draw rectangle bounds
      const cx = this.originX + rx * this.scale;
      const cy = this.originY - ry * this.scale;
      const cWidth = dx * this.scale;
      const cHeight = ry * this.scale;

      ctx.fillRect(cx, cy, cWidth, cHeight);
      ctx.strokeRect(cx, cy, cWidth, cHeight);
    }

    // Draw original continuous curve on top
    ctx.strokeStyle = "#F9FBFD";
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const startX = -this.originX / this.scale;
    const endX = (w - this.originX) / this.scale;
    let first = true;

    for (let x = startX; x <= endX; x += 0.1) {
      const cy = this.originY - f(x) * this.scale;
      const cx = this.originX + x * this.scale;
      if (first) {
        ctx.moveTo(cx, cy);
        first = false;
      } else {
        ctx.lineTo(cx, cy);
      }
    }
    ctx.stroke();

    // Math: Exact Integral value using calculus
    // antiderivative of sin(x) + 1.5 is -cos(x) + 1.5x
    const exact = (-Math.cos(b) + 1.5 * b) - (-Math.cos(a) + 1.5 * a);

    // Readout panel
    const stats = document.getElementById("sandbox-stats-readout");
    if (stats) {
      stats.innerHTML = `
        <div class="stat-row"><span>Integrand f(x):</span><strong>sin(x) + 1.5</strong></div>
        <div class="stat-row"><span>Interval Bounds:</span><strong>[${a}, ${b}]</strong></div>
        <div class="stat-row"><span>Riemann Sum Area (N=${n}):</span><strong>${sum.toFixed(4)}</strong></div>
        <div class="stat-row" style="color:var(--color-success);"><span>Exact Integral Area:</span><strong>${exact.toFixed(4)}</strong></div>
        <div class="stat-row"><span>Approximation Error:</span><strong>${Math.abs(exact - sum).toFixed(4)}</strong></div>
      `;
    }
  }

  // 6. Warped Matrix Grid Plotter
  plotMatrixGrid() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Load custom base basis vectors
    const ix = this.params.ix || 1;
    const iy = this.params.iy || 0;
    const jx = this.params.jx || 0;
    const jy = this.params.jy || 1;

    // Draw grey background reference grid
    ctx.strokeStyle = "rgba(43, 61, 94, 0.15)";
    ctx.lineWidth = 1;
    for (let x = -8; x <= 8; x++) {
      ctx.beginPath();
      ctx.moveTo(this.originX + x * this.scale, 0);
      ctx.lineTo(this.originX + x * this.scale, h);
      ctx.stroke();
    }
    for (let y = -8; y <= 8; y++) {
      ctx.beginPath();
      ctx.moveTo(0, this.originY - y * this.scale);
      ctx.lineTo(w, this.originY - y * this.scale);
      ctx.stroke();
    }

    // Draw warped grid transformed by custom matrix coefficients
    ctx.strokeStyle = "rgba(89, 213, 224, 0.25)";
    ctx.lineWidth = 1.5;

    // We draw grid lines running along i-hat coordinates and j-hat coordinates
    for (let k = -8; k <= 8; k++) {
      // Line parallel to i-hat (displaced by k*j-hat)
      const x1 = -8 * ix + k * jx;
      const y1 = -8 * iy + k * jy;
      const x2 = 8 * ix + k * jx;
      const y2 = 8 * iy + k * jy;

      ctx.beginPath();
      ctx.moveTo(this.originX + x1 * this.scale, this.originY - y1 * this.scale);
      ctx.lineTo(this.originX + x2 * this.scale, this.originY - y2 * this.scale);
      ctx.stroke();

      // Line parallel to j-hat (displaced by k*i-hat)
      const xa = k * ix - 8 * jx;
      const ya = k * iy - 8 * jy;
      const xb = k * ix + 8 * jx;
      const yb = k * iy + 8 * jy;

      ctx.beginPath();
      ctx.moveTo(this.originX + xa * this.scale, this.originY - ya * this.scale);
      ctx.lineTo(this.originX + xb * this.scale, this.originY - yb * this.scale);
      ctx.stroke();
    }

    // Draw Transformed Basis vector arrows: i-hat (Red) and j-hat (Green)
    const drawArrow = (tx, ty, color, label) => {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 3.5;
      
      const cx = this.originX + tx * this.scale;
      const cy = this.originY - ty * this.scale;

      ctx.beginPath();
      ctx.moveTo(this.originX, this.originY);
      ctx.lineTo(cx, cy);
      ctx.stroke();

      // Simple arrowhead calculation
      const angle = Math.atan2(-ty, tx);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx - 10 * Math.cos(angle - 0.5), cy - 10 * Math.sin(angle - 0.5));
      ctx.lineTo(cx - 10 * Math.cos(angle + 0.5), cy - 10 * Math.sin(angle + 0.5));
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#F9FBFD";
      ctx.font = "bold 11px Inter, sans-serif";
      ctx.fillText(label, cx + 5, cy - 5);
    };

    drawArrow(ix, iy, "#F44336", "i-hat");
    drawArrow(jx, jy, "#4CAF50", "j-hat");

    // Math: Calculate Determinant of transformation
    const det = ix * jy - iy * jx;

    // Readout panel
    const stats = document.getElementById("sandbox-stats-readout");
    if (stats) {
      stats.innerHTML = `
        <div class="stat-row"><span>Matrix:</span><strong>[ [${ix.toFixed(1)}, ${jx.toFixed(1)}], [${iy.toFixed(1)}, ${jy.toFixed(1)}] ]</strong></div>
        <div class="stat-row" style="color:var(--accent-cyan);"><span>Determinant (Area Scaler):</span><strong>det(M) = ${det.toFixed(2)}</strong></div>
      `;
    }
  }

  // 7. Vector dot & cross products
  plotVectors() {
    const ctx = this.ctx;
    
    const ux = this.params.ux || 2;
    const uy = this.params.uy || 3;
    const vx = this.params.vx || 3;
    const vy = this.params.vy || -1;

    const cux = this.originX + ux * this.scale;
    const cuy = this.originY - uy * this.scale;
    const cvx = this.originX + vx * this.scale;
    const cvy = this.originY - vy * this.scale;

    // Vector drawing helper
    const drawVector = (cx, cy, color, label) => {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 3;
      
      ctx.beginPath();
      ctx.moveTo(this.originX, this.originY);
      ctx.lineTo(cx, cy);
      ctx.stroke();

      const angle = Math.atan2(this.originY - cy, cx - this.originX);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx - 10 * Math.cos(angle - 0.4), cy + 10 * Math.sin(angle - 0.4));
      ctx.lineTo(cx - 10 * Math.cos(angle + 0.4), cy + 10 * Math.sin(angle + 0.4));
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#F9FBFD";
      ctx.font = "bold 12px Inter, sans-serif";
      ctx.fillText(label, cx + 8, cy - 8);
    };

    drawVector(cux, cuy, "#FF9800", "Vector U");
    drawVector(cvx, cvy, "#59D5E0", "Vector V");

    // Math calculations
    const dot = ux * vx + uy * vy;
    const crossZ = ux * vy - uy * vx; // 2D cross product magnitude

    const magU = Math.sqrt(ux*ux + uy*uy);
    const magV = Math.sqrt(vx*vx + vy*vy);
    const angleCos = dot / (magU * magV);
    const angleRad = Math.acos(Math.min(1, Math.max(-1, angleCos)));
    const angleDeg = angleRad * (180 / Math.PI);

    // Readout panel
    const stats = document.getElementById("sandbox-stats-readout");
    if (stats) {
      stats.innerHTML = `
        <div class="stat-row"><span>Vector U:</span><strong>⟨${ux.toFixed(1)}, ${uy.toFixed(1)}⟩ (Mag: ${magU.toFixed(1)})</strong></div>
        <div class="stat-row"><span>Vector V:</span><strong>⟨${vx.toFixed(1)}, ${vy.toFixed(1)}⟩ (Mag: ${magV.toFixed(1)})</strong></div>
        <div class="stat-row"><span>Angle between:</span><strong>${angleDeg.toFixed(1)}°</strong></div>
        <div class="stat-row" style="color:#FF9800;"><span>Dot Product (U · V):</span><strong>${dot.toFixed(2)}</strong></div>
        <div class="stat-row" style="color:var(--accent-cyan);"><span>Cross Product (U × V)z:</span><strong>${crossZ.toFixed(2)}</strong></div>
      `;
    }
  }

  // 8. Probability Simulator ( converges toward Normal Bell curve )
  plotProbability() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    const sampleBatch = Math.floor(this.params.samples || 250);

    // We simulate throwing multiple coins ( Central Limit Theorem binomial spread )
    const trials = 12; // 12 coins
    const counts = new Array(trials + 1).fill(0);

    // Dynamic random loop to build histogram frequencies
    for (let s = 0; s < sampleBatch; s++) {
      let heads = 0;
      for (let t = 0; t < trials; t++) {
        if (Math.random() > 0.5) heads++;
      }
      counts[heads]++;
    }

    // Render Histogram bars
    const barWidth = (w - 100) / (trials + 1);
    const maxFreq = Math.max(1, ...counts);
    const maxBarHeight = h - 120;

    ctx.fillStyle = "rgba(70, 86, 161, 0.4)";
    ctx.strokeStyle = "#4656A1";
    ctx.lineWidth = 1.5;

    for (let i = 0; i <= trials; i++) {
      const bHeight = (counts[i] / maxFreq) * maxBarHeight;
      const bx = 50 + i * barWidth;
      const by = h - 50 - bHeight;

      ctx.fillRect(bx, by, barWidth - 4, bHeight);
      ctx.strokeRect(bx, by, barWidth - 4, bHeight);

      // Label column count
      ctx.fillStyle = "#A5B4CD";
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.fillText(i, bx + barWidth/2 - 6, h - 32);
    }

    // Continuous Normal Curve Overlay
    ctx.strokeStyle = "#59D5E0";
    ctx.lineWidth = 3;
    ctx.beginPath();

    // Standard deviation and mean for binomial distributions np = 6, variance npq = 3
    const mu = trials / 2;
    const sigma = Math.sqrt(trials * 0.25);
    
    let first = true;
    for (let x = 0; x <= trials; x += 0.1) {
      // Binomial frequency fit overlay formula
      const bellY = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
      
      // Scaling curve coordinates dynamically with sampleBatch size and max observed frequency
      const cx = 50 + x * barWidth + barWidth/2;
      const cy = h - 50 - (bellY * (sampleBatch / maxFreq) * maxBarHeight);

      if (first) {
        ctx.moveTo(cx, cy);
        first = false;
      } else {
        ctx.lineTo(cx, cy);
      }
    }
    ctx.stroke();

    // Readout panel
    const stats = document.getElementById("sandbox-stats-readout");
    if (stats) {
      stats.innerHTML = `
        <div class="stat-row"><span>Coin Batch Size:</span><strong>${sampleBatch} flips</strong></div>
        <div class="stat-row"><span>Distribution Shape:</span><strong>Binomial (Approaches Normal)</strong></div>
        <div class="stat-row"><span>Theoretical Mean (μ):</span><strong>${mu.toFixed(1)} heads</strong></div>
        <div class="stat-row"><span>Theoretical StdDev (σ):</span><strong>${sigma.toFixed(2)}</strong></div>
      `;
    }
  }

  // 9. Vector Fields Drift Plotter
  plotVectorField() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    const flowType = Math.floor(this.params.flowType || 1); // 1 = Curl, 2 = Divergence

    // Vector Field definitions
    // Curl: F = <-y, x>
    // Divergence: F = <x, y>
    const getField = (x, y) => {
      if (flowType === 1) {
        return { u: -y * 0.15, v: x * 0.15 };
      } else {
        return { u: x * 0.15, v: y * 0.15 };
      }
    };

    // Draw static field vectors layout in background
    ctx.strokeStyle = "rgba(43, 61, 94, 0.3)";
    ctx.lineWidth = 1;
    
    const gridSize = 0.8;
    for (let x = -6; x <= 6; x += gridSize) {
      for (let y = -4; y <= 4; y += gridSize) {
        const force = getField(x, y);
        const cx = this.originX + x * this.scale;
        const cy = this.originY - y * this.scale;

        // Draw small arrow representing force magnitude and direction
        const arrowLen = 15;
        const angle = Math.atan2(force.v, force.u);
        
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + arrowLen * Math.cos(angle), cy - arrowLen * Math.sin(angle));
        ctx.stroke();
      }
    }

    // Animate drift particle dots
    ctx.fillStyle = "#59D5E0";
    this.particles.forEach(p => {
      const force = getField(p.x, p.y);
      p.x += force.u * 0.2;
      p.y += force.v * 0.2;
      p.life -= 1;

      // Recirculate dead particles
      if (p.life <= 0 || Math.abs(p.x) > 8 || Math.abs(p.y) > 6) {
        p.x = (Math.random() - 0.5) * 10;
        p.y = (Math.random() - 0.5) * 8;
        p.life = Math.random() * 100 + 40;
      }

      ctx.beginPath();
      ctx.arc(this.originX + p.x * this.scale, this.originY - p.y * this.scale, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Readout panel
    const stats = document.getElementById("sandbox-stats-readout");
    if (stats) {
      stats.innerHTML = `
        <div class="stat-row"><span>Active Vector Field:</span><strong>${flowType === 1 ? "Rotational Flow (Curl)" : "Radial Flow (Divergence)"}</strong></div>
        <div class="stat-row"><span>Field Equation:</span><strong>${flowType === 1 ? "F(x,y) = ⟨-y, x⟩" : "F(x,y) = ⟨x, y⟩"}</strong></div>
      `;
    }
  }
}

// Bootstrap Graph Engine
window.GraphsManager = new GraphsCoordinator();
