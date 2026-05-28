// MathPeak Visual Sandbox Controller Module
// Coordinates sandbox selectors, dynamically loading appropriate slider widgets and descriptions.

class VisualsManager {
  constructor() {
    this.activeSim = "quadratic";
    this.bindEvents();
  }

  bindEvents() {
    const selector = document.getElementById("sandbox-select");
    if (selector) {
      selector.addEventListener("change", (e) => {
        this.loadSimulation(e.target.value);
      });
    }
  }

  loadSimulation(simKey) {
    this.activeSim = simKey;
    
    // Sync dropdown UI
    const selector = document.getElementById("sandbox-select");
    if (selector) selector.value = simKey;

    // Load sliders, stats, and text descriptions based on selected key
    const title = document.getElementById("sandbox-controller-title");
    const desc = document.getElementById("sandbox-controller-desc");
    const slidersContainer = document.getElementById("sandbox-sliders-container");
    const statsContainer = document.getElementById("sandbox-stats-readout");
    const theoryBody = document.getElementById("sandbox-theory-body");

    if (!title || !desc || !slidersContainer || !statsContainer || !theoryBody) return;

    // Clear contents
    slidersContainer.innerHTML = "";
    statsContainer.innerHTML = "";

    // Load configuration blueprints
    const blueprint = this.getBlueprint(simKey);
    
    title.textContent = blueprint.title;
    desc.textContent = blueprint.desc;
    theoryBody.innerHTML = blueprint.theory;

    // Generate sliders dynamically
    blueprint.sliders.forEach(s => {
      const group = document.createElement("div");
      group.className = "slider-group";
      
      group.innerHTML = `
        <div class="slider-label-row">
          <span>${s.label}</span>
          <strong id="val-${s.id}">${s.val}</strong>
        </div>
        <input type="range" class="premium-range" id="slider-${s.id}" min="${s.min}" max="${s.max}" step="${s.step}" value="${s.val}">
      `;

      const input = group.querySelector("input");
      input.addEventListener("input", (e) => {
        const readout = document.getElementById(`val-${s.id}`);
        if (readout) readout.textContent = parseFloat(e.target.value).toFixed(2);
        
        // Notify graphics coordinator of param update
        if (window.GraphsManager) {
          window.GraphsManager.updateParam(s.id, parseFloat(e.target.value));
        }
      });

      slidersContainer.appendChild(group);
    });

    // Typeset equations in theory explanation
    if (window.renderMathInElement) {
      window.renderMathInElement(theoryBody, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ]
      });
    }

    // Trigger Graphs Manager to load fresh graphics canvas loop
    if (window.GraphsManager) {
      window.GraphsManager.initSimulation(simKey, blueprint.sliders);
    }
  }

  getBlueprint(simKey) {
    const blueprints = {
      quadratic: {
        title: "Parabolic Curve Sliders",
        desc: "Vary quadratic coefficients to shift vertex coordinates and intersections live.",
        theory: `
          <p>A quadratic function is a curved line equation of the form: $$f(x) = ax^2 + bx + c$$</p>
          <ul>
            <li><strong>Parameter a</strong>: Directs the curve steepness and opening. Positive values point upwards, negative values point downwards.</li>
            <li><strong>Parameter b</strong>: Shifts the curve vertex diagonally left or right.</li>
            <li><strong>Parameter c</strong>: Dictates the y-intercept value directly.</li>
          </ul>
        `,
        sliders: [
          { id: "a", label: "Steepness Coefficient (a)", min: -3, max: 3, step: 0.1, val: 1.0 },
          { id: "b", label: "Slope Coefficient (b)", min: -5, max: 5, step: 0.2, val: -2.0 },
          { id: "c", label: "Y-Intercept Offset (c)", min: -4, max: 4, step: 0.2, val: -1.0 }
        ]
      },
      geometry: {
        title: "Dynamic Triangle Board",
        desc: "Adjust coordinate parameters of the vertices. View side lengths, interior angles, and centroid calculations updating instantly.",
        theory: `
          <p>Drag the triangle's glowing vertices directly on the screen or adjust the coordinates using these sliders. Interior angles always sum up to exactly $180^\\circ$!</p>
          <p>The **Centroid** ($G$) represents the center of mass, computed as: $$G = \\left(\\frac{x_1+x_2+x_3}{3}, \\frac{y_1+y_2+y_3}{3}\\right)$$</p>
        `,
        sliders: [
          { id: "x1", label: "Vertex A (X)", min: -4, max: 4, step: 0.1, val: -2.0 },
          { id: "y1", label: "Vertex A (Y)", min: -4, max: 4, step: 0.1, val: 2.0 },
          { id: "x2", label: "Vertex B (X)", min: -4, max: 4, step: 0.1, val: 3.0 },
          { id: "y2", label: "Vertex B (Y)", min: -4, max: 4, step: 0.1, val: 1.5 }
        ]
      },
      trigonometry: {
        title: "Unit Circle Dial",
        desc: "Rotate the angle wheel to see sine and cosine projections mapping into waves real-time.",
        theory: `
          <p>The unit circle has a radius of exactly $1$. The coordinates of any point along the circle at angle $\\theta$ are defined by: $$P(\\theta) = (\\cos\\theta, \\sin\\theta)$$</p>
          <ul>
            <li>**Cosine shadow (Red)** is the floor distance.</li>
            <li>**Sine shadow (Blue)** is the wall height.</li>
          </ul>
        `,
        sliders: [
          { id: "theta", label: "Angle (Theta Degrees)", min: 0, max: 360, step: 1, val: 45 }
        ]
      },
      derivatives: {
        title: "Derivative Tangent Runner",
        desc: "Slide the point coordinates along the polynomial curve to watch secant lines collapse into tangents.",
        theory: `
          <p>A derivative measures the slope of a curve at a single point, given by the tangent line. Let's analyze $f(x) = x^3 - 3x$:</p>
          <p>The tangent slope matches the derivative formula: $$f'(x) = 3x^2 - 3$$</p>
        `,
        sliders: [
          { id: "xval", label: "Coordinate point (x)", min: -2.0, max: 2.0, step: 0.05, val: 1.0 }
        ]
      },
      integration: {
        title: "Riemann Integration sum",
        desc: "Increase the number of slice columns to watch approximation errors approach zero.",
        theory: `
          <p>Definite integration represents the area under a curve. We approximate this area by adding together $N$ rectangular columns.</p>
          <p>As the column count $N$ increases to infinity, the total sum converges perfectly to the exact integral area: $$\\lim_{N \\to \\infty} \\sum f(x_i)\\Delta x = \\int_a^b f(x)dx$$</p>
        `,
        sliders: [
          { id: "rects", label: "Rectangle Columns (N)", min: 2, max: 80, step: 1, val: 8 }
        ]
      },
      matrices: {
        title: "2D Grid Transformation matrix",
        desc: "Alter basis vectors to warp the coordinate system grid, displaying shears, scale transformations, and rotations.",
        theory: `
          <p>A matrix transforms a 2D vector coordinate space by multiplying the basis vectors: $$\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} ax+by \\\\ cx+dy \\end{bmatrix}$$</p>
          <p>The columns of the matrix represent where the original unit vectors $\\hat{i} = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$ and $\\hat{j} = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}$ land!</p>
        `,
        sliders: [
          { id: "ix", label: "Basis vector i-hat (X)", min: -2, max: 2, step: 0.1, val: 1.0 },
          { id: "iy", label: "Basis vector i-hat (Y)", min: -2, max: 2, step: 0.1, val: 0.0 },
          { id: "jx", label: "Basis vector j-hat (X)", min: -2, max: 2, step: 0.1, val: 0.5 },
          { id: "jy", label: "Basis vector j-hat (Y)", min: -2, max: 2, step: 0.1, val: 1.0 }
        ]
      },
      vectors: {
        title: "Vector Products Board",
        desc: "Rotate vector coordinates to analyze physical projections, calculating dot and cross products.",
        theory: `
          <p>Interact with vectors $\\vec{u}$ and $\\vec{v}$ to see their projection alignment:</p>
          <ul>
            <li>**Dot Product ($\vec{u} \\cdot \\vec{v}$)** is scalar alignment. It is positive if they point in similar directions, and zero if orthogonal.</li>
            <li>**Cross Product ($\vec{u} \\times \\vec{v}$)** is vector product perpendicular area.</li>
          </ul>
        `,
        sliders: [
          { id: "ux", label: "Vector U (X component)", min: -4, max: 4, step: 0.1, val: 2.0 },
          { id: "uy", label: "Vector U (Y component)", min: -4, max: 4, step: 0.1, val: 3.0 },
          { id: "vx", label: "Vector V (X component)", min: -4, max: 4, step: 0.1, val: 3.0 },
          { id: "vy", label: "Vector V (Y component)", min: -4, max: 4, step: 0.1, val: -1.0 }
        ]
      },
      probability: {
        title: "Normal Distribution Bell curve",
        desc: "Flipping hundreds of coins or rolling dice accumulates outputs, showcasing standard statistical probability spreads.",
        theory: `
          <p>Random occurrences compiled together converge to a standard shape. This is governed by the **Central Limit Theorem**.</p>
          <p>The bars represent simulation frequencies, matching the theoretical continuous bell-curve: $$f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}$$</p>
        `,
        sliders: [
          { id: "samples", label: "Simulation batch trials", min: 10, max: 1000, step: 10, val: 250 }
        ]
      },
      "vector-calculus": {
        title: "Vector Fields Fluid Flow",
        desc: "Observe dynamic particles floating along coordinate curl and divergence fields.",
        theory: `
          <p>A vector field assigns a force arrow to every coordinate point. The fluid represents particles drifting in:</p>
          <ul>
            <li><strong>Curl (Rotational force)</strong>: $\\vec{F} = \\langle -y, x \\rangle$.</li>
            <li><strong>Divergence (Expansion force)</strong>: $\\vec{F} = \\langle x, y \\rangle$.</li>
          </ul>
        `,
        sliders: [
          { id: "flowType", label: "Field Type (1=Curl, 2=Diverg)", min: 1, max: 2, step: 1, val: 1 }
        ]
      }
    };

    return blueprints[simKey] || blueprints.quadratic;
  }
}

window.VisualsManager = new VisualsManager();
