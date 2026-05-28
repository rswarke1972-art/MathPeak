// MathPeak Courses Database - Complete 9 Peak Curriculum
// Supports Normal & ELI10 modes, layered difficulties, and interactive presets.

const COURSES_DATA = [
  {
    id: "foundation",
    title: "Foundation Peak",
    icon: "🌱",
    tagline: "For absolute beginners. Master the core rules of numbers.",
    color: "#4CAF50",
    difficulty: "Beginner 🌱",
    topics: [
      {
        id: "arithmetic",
        title: "Arithmetic & Numbers",
        shortDesc: "Addition, subtraction, multiplication, division, decimals, percentages, and averages.",
        difficulty: "Beginner 🌱",
        formulas: [
          { name: "Average (Mean)", tex: "\\bar{x} = \\frac{\\sum_{i=1}^{n} x_i}{n}", desc: "Sum of values divided by count" },
          { name: "Percentage", tex: "P = \\frac{\\text{Part}}{\\text{Whole}} \\times 100", desc: "Expressing a number as a fraction of 100" }
        ],
        normalExplanation: `
          <h3>The Bedrock of Mathematics</h3>
          <p>Arithmetic is the oldest and most fundamental branch of mathematics. It deals with properties and manipulation of numbers. We use four core operators: <strong>addition</strong> (+), <strong>subtraction</strong> (-), <strong>multiplication</strong> (&times;), and <strong>division</strong> (&divide;).</p>
          <p>Percentages translate parts of a whole into a uniform scale of 100, making comparisons straightforward: $P = \\frac{\\text{Part}}{\\text{Whole}} \\times 100$. Decimals represent fractions in place-value format (tenths, hundredths, thousandths).</p>
          <p>Averages summarize a group of numbers into a single central value. The arithmetic mean is computed by summing all terms and dividing by the total count: $\\bar{x} = \\frac{\\sum x_i}{n}$.</p>
        `,
        eli10Explanation: `
          <h3>Math's Construction Blocks</h3>
          <p>Imagine numbers are Lego blocks. <strong>Arithmetic</strong> is just how we combine them!</p>
          <ul>
            <li><strong>Addition</strong> is piling blocks together.</li>
            <li><strong>Subtraction</strong> is taking blocks away.</li>
            <li><strong>Multiplication</strong> is repeating groups of blocks really fast.</li>
            <li><strong>Division</strong> is sharing your blocks equally with friends!</li>
            <li><strong>Percentages</strong> are like measuring slices of pizza. A whole pizza is always 100%. So if you eat 25%, you ate exactly one quarter of the pizza!</li>
            <li>An <strong>Average</strong> is like trying to make everyone have the same number of sweets. If you have 8 sweets and your friend has 2, you pool them together (10 total) and share them equally so you both get 5!</li>
          </ul>
        `,
        questions: [
          {
            id: "arith_q1",
            difficulty: "easy",
            question: "Find the mean average of the numbers: 4, 8, 15, 16, 23, and 42.",
            options: ["18", "20.5", "16", "15"],
            answer: "18",
            hint: "Add all the numbers together, then divide by the total count (which is 6).",
            solution: "Sum = 4 + 8 + 15 + 16 + 23 + 42 = 108. Total count = 6. Average = 108 / 6 = 18."
          },
          {
            id: "arith_q2",
            difficulty: "medium",
            question: "If a coat originally costing $120 is on sale for 25% off, what is the new sale price?",
            options: ["$90", "$95", "$80", "$100"],
            answer: "$90",
            hint: "Find 25% of $120 by dividing by 4, then subtract that amount from the original price.",
            solution: "Discount = 25% of 120 = 0.25 * 120 = $30. Sale Price = 120 - 30 = $90."
          }
        ]
      },
      {
        id: "operations",
        title: "Order of Operations & BODMAS",
        shortDesc: "Learn why operator sequence matters. Stop falling for internet equation traps!",
        difficulty: "Beginner 🌱",
        formulas: [
          { name: "BODMAS", tex: "\\text{B} \\rightarrow \\text{O} \\rightarrow \\text{D} \\rightarrow \\text{M} \\rightarrow \\text{A} \\rightarrow \\text{S}", desc: "Brackets, Orders, Division, Multiplication, Addition, Subtraction" }
        ],
        normalExplanation: `
          <h3>Order of Operations</h3>
          <p>Without standard rules, equations like $6 \\div 2(1 + 2)$ would yield different results depending on the reading direction. Mathematically, operations are structured hierarchically using **BODMAS** or **PEMDAS**:</p>
          <ol>
            <li><strong>B</strong>rackets / <strong>P</strong>arentheses first</li>
            <li><strong>O</strong>rders (Exponents and Roots)</li>
            <li><strong>D</strong>ivision & <strong>M</strong>ultiplication (left-to-right)</li>
            <li><strong>A</strong>ddition & <strong>S</strong>ubtraction (left-to-right)</li>
          </ol>
          <p>Division and Multiplication share the same priority level, so you evaluate them in order from left to right. The same applies to Addition and Subtraction.</p>
        `,
        eli10Explanation: `
          <h3>Traffic Rules for Math</h3>
          <p>If there were no traffic rules on the road, cars would crash! Math has traffic rules too, so we don't get mixed up. We call it <strong>BODMAS</strong>:</p>
          <p>1. <strong>Brackets ()</strong> always get VIP treatment. Solve inside them first!</p>
          <p>2. <strong>Orders</strong> (like small squared numbers $x^2$) are second.</p>
          <p>3. <strong>Division / Multiplication</strong> are third. They are equally fast, so do whichever comes first from left to right.</p>
          <p>4. <strong>Addition / Subtraction</strong> are last. They are slow joggers, so solve them at the very end!</p>
          <p>For example, in $2 + 3 \\times 4$, multiplication jumps the queue! Do $3 \\times 4 = 12$ first, then add $2$ to get $14$.</p>
        `,
        questions: [
          {
            id: "ops_q1",
            difficulty: "easy",
            question: "Evaluate: 12 + 6 / 3 - 2 * 3",
            options: ["8", "12", "6", "24"],
            answer: "8",
            hint: "Perform Division (6/3) and Multiplication (2*3) first, then proceed left-to-right with Addition and Subtraction.",
            solution: "1. Division: 6 / 3 = 2. 2. Multiplication: 2 * 3 = 6. 3. Rewrite: 12 + 2 - 6 = 8."
          },
          {
            id: "ops_q2",
            difficulty: "medium",
            question: "Solve: 80 / (2 * (6 - 2)^2) + 5",
            options: ["7.5", "15", "6.25", "10"],
            answer: "7.5",
            hint: "Innermost brackets first (6-2), then raise to power of 2, then multiply by 2, then divide 80 by that result, and finally add 5.",
            solution: "1. Inner brackets: 6 - 2 = 4. 2. Exponent: 4^2 = 16. 3. Outer brackets: 2 * 16 = 32. 4. Division: 80 / 32 = 2.5. 5. Addition: 2.5 + 5 = 7.5."
          }
        ]
      },
      {
        id: "fractions",
        title: "Fractions & Decimals",
        shortDesc: "Simplifying, adding, subtracting, multiplying, and dividing slices of mathematical entities.",
        difficulty: "Beginner 🌱",
        formulas: [
          { name: "Fraction Addition", tex: "\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}", desc: "Cross-multiply to find a common denominator" },
          { name: "Fraction Division", tex: "\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c} = \\frac{ad}{bc}", desc: "Multiply by the reciprocal of the divisor" }
        ],
        normalExplanation: `
          <h3>Fractions: Ratios of Integers</h3>
          <p>A fraction represents a part of a whole, written as $\\frac{a}{b}$, where $a$ is the **numerator** (how many parts we have) and $b$ is the **denominator** (how many equal parts make a whole).</p>
          <p>To add or subtract fractions, you must establish a **common denominator**:</p>
          $$\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}$$
          <p>To multiply, simply multiply numerators together and denominators together. To divide, multiply by the **reciprocal** (flip the second fraction).</p>
        `,
        eli10Explanation: `
          <h3>Slices of a Cake</h3>
          <p>Think of fractions as cutting up a giant chocolate cake!</p>
          <ul>
            <li>$\\frac{1}{2}$ means you cut the cake in 2 equal pieces, and took 1.</li>
            <li>$\\frac{3}{4}$ means you cut it in 4 pieces, and took 3!</li>
            <li><strong>Adding</strong> is easy if the pieces are the same size. If you have $\\frac{1}{5}$ of a cake and add $\\frac{2}{5}$, you have $\\frac{3}{5}$ of a cake.</li>
            <li>But if you have $\\frac{1}{2}$ (half) and $\\frac{1}{4}$ (quarter), you can't just add them directly! You must cut the half into two quarters first, making it $\\frac{2}{4}$. Now: $\\frac{2}{4} + \\frac{1}{4} = \\frac{3}{4}$!</li>
            <li><strong>Dividing</strong> fractions sounds scary but it's a magic trick: flip the second fraction upside down and multiply instead! So $\\frac{1}{2} \\div \\frac{3}{4}$ becomes $\\frac{1}{2} \\times \\frac{4}{3} = \\frac{4}{6} = \\frac{2}{3}$.</li>
          </ul>
        `,
        questions: [
          {
            id: "frac_q1",
            difficulty: "easy",
            question: "Simplify the fraction 24 / 36 to its lowest terms.",
            options: ["2/3", "3/4", "4/6", "12/18"],
            answer: "2/3",
            hint: "Find the greatest common factor (GCF) of 24 and 36, and divide both numbers by it.",
            solution: "The GCF of 24 and 36 is 12. 24/12 = 2. 36/12 = 3. Thus, the simplified fraction is 2/3."
          },
          {
            id: "frac_q2",
            difficulty: "medium",
            question: "Solve: (3/4) - (1/6)",
            options: ["7/12", "2/10", "5/12", "7/24"],
            answer: "7/12",
            hint: "Find the Least Common Denominator of 4 and 6, which is 12. Convert fractions and subtract.",
            solution: "1. LCD of 4 and 6 is 12. 2. Convert: 3/4 = 9/12, and 1/6 = 2/12. 3. Subtract: 9/12 - 2/12 = 7/12."
          }
        ]
      }
    ]
  },
  {
    id: "algebra",
    title: "Algebra Peak",
    icon: "📘",
    tagline: "Move from numbers to variables. Solve for the unknown.",
    color: "#2196F3",
    difficulty: "Intermediate 📘",
    topics: [
      {
        id: "equations",
        title: "Equations & Inequalities",
        shortDesc: "Master isolating variables, simultaneous systems, and graphing boundary lines.",
        difficulty: "Intermediate 📘",
        formulas: [
          { name: "Linear Equation", tex: "ax + b = c \\Rightarrow x = \\frac{c - b}{a}", desc: "Isolating x in single-variable equations" },
          { name: "Simultaneous Solutions", tex: "x = \\frac{e\\cdot d - b\\cdot f}{a\\cdot d - b\\cdot c}", desc: "Solving linear systems via Cramer's rule" }
        ],
        normalExplanation: `
          <h3>Linear Equations and Balance</h3>
          <p>Algebra is built on the concept of **balance**. Whatever operation you apply to one side of an equation, you must apply to the other side to maintain equilibrium. The primary goal is to **isolate** the unknown variable.</p>
          <p>For a standard linear equation:</p>
          $$ax + b = c$$
          <p>We first subtract $b$ from both sides, then divide by $a$ to yield: $x = \\frac{c-b}{a}$.</p>
          <p>When solving **inequalities** (e.g., $ax + b > c$), remember that multiplying or dividing both sides by a **negative number** reverses the direction of the inequality sign!</p>
        `,
        eli10Explanation: `
          <h3>The Balance Scale</h3>
          <p>Imagine algebra is a balance scale. The equals sign ($=$) means both sides weigh exactly the same!</p>
          <p>If you have a box of mystery weight $x$ plus $3$ apples, and it balances with $8$ apples: $$x + 3 = 8$$</p>
          <p>How do we find the weight of the mystery box $x$? Just take away 3 apples from **both sides** of the scale! It stays perfectly balanced, and you see that: $$x = 5$$</p>
          <p><strong>Inequalities</strong> ($>$ or $<$) are like seesaws tilted to one side. The rules are the same, except if you multiply or divide by a negative number, the seesaw tips the other way!</p>
        `,
        questions: [
          {
            id: "alg_q1",
            difficulty: "easy",
            question: "Solve for x: 3x - 7 = 14",
            options: ["7", "9", "21/3", "4"],
            answer: "7",
            hint: "Add 7 to both sides, then divide by 3.",
            solution: "3x = 14 + 7 => 3x = 21 => x = 21 / 3 = 7."
          },
          {
            id: "alg_q2",
            difficulty: "medium",
            question: "Solve the inequality: -2x + 5 < 11",
            options: ["x > -3", "x < -3", "x > 3", "x < 3"],
            answer: "x > -3",
            hint: "Subtract 5 from both sides, then divide by -2. Don't forget to flip the inequality sign!",
            solution: "-2x < 11 - 5 => -2x < 6. Divide by -2 and flip sign: x > -3."
          }
        ]
      },
      {
        id: "quadratics",
        title: "Polynomials & Quadratics",
        shortDesc: "Explore curves of degree 2. Factor equations and unlock the Quadratic Formula.",
        difficulty: "Intermediate 📘",
        formulas: [
          { name: "Quadratic Formula", tex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", desc: "Roots of ax² + bx + c = 0" },
          { name: "Discriminant", tex: "\\Delta = b^2 - 4ac", desc: "Determines nature of quadratic roots" }
        ],
        normalExplanation: `
          <h3>Solving Quadratics</h3>
          <p>A quadratic equation is a polynomial of degree 2, written in standard form as:</p>
          $$ax^2 + bx + c = 0$$
          <p>The values of $x$ that satisfy this equation are its <strong>roots</strong>. These represent where the parabolic curve crosses the x-axis. The roots are given by the famous <strong>Quadratic Formula</strong>:</p>
          $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$
          <p>The term under the radical, $\\Delta = b^2 - 4ac$, is the **discriminant**:</p>
          <ul>
            <li>If $\\Delta > 0$, there are two distinct real roots.</li>
            <li>If $\\Delta = 0$, there is one repeated real root (the vertex touches the axis).</li>
            <li>If $\\Delta < 0$, there are two complex conjugate roots (no real x-intercepts).</li>
          </ul>
        `,
        eli10Explanation: `
          <h3>The Throwing Curve</h3>
          <p>When you throw a basketball, it flies up in a beautiful curve and falls back down. That shape is called a **parabola**, and its math equation is a **quadratic** ($ax^2 + bx + c$).</p>
          <p>The "roots" of the equation are just the places where the ball touches the ground!</p>
          <p>To find these landing points, we use a magic math formula: $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$</p>
          <p>The secret code inside the square root ($b^2 - 4ac$) is called the **discriminant**: if it's positive, the ball hits the ground twice. If it's zero, the ball just grazes the floor at its peak. If it's negative, the ball is floating high in the air and never touches the floor!</p>
        `,
        questions: [
          {
            id: "quad_q1",
            difficulty: "easy",
            question: "Find the roots of x² - 5x + 6 = 0 by factoring.",
            options: ["x = 2, 3", "x = -2, -3", "x = 1, 5", "x = 6, -1"],
            answer: "x = 2, 3",
            hint: "Look for two numbers that multiply to 6 and add to -5.",
            solution: "x^2 - 5x + 6 = (x - 2)(x - 3) = 0. Therefore, x - 2 = 0 or x - 3 = 0, giving roots x = 2 and x = 3."
          },
          {
            id: "quad_q2",
            difficulty: "medium",
            question: "What is the discriminant of the quadratic: 2x² - 4x + 5 = 0?",
            options: ["-24", "56", "-12", "0"],
            answer: "-24",
            hint: "Use the formula Delta = b^2 - 4ac with a = 2, b = -4, c = 5.",
            solution: "Delta = (-4)^2 - 4(2)(5) = 16 - 40 = -24. Since it is negative, the equation has no real roots!"
          }
        ]
      }
    ]
  },
  {
    id: "geometry",
    title: "Geometry & Trig Peak",
    icon: "📐",
    tagline: "Uncover properties of shapes, coordinate spaces, and the unit circle.",
    color: "#00BCD4",
    difficulty: "Intermediate 📘",
    topics: [
      {
        id: "trigonometry",
        title: "Trigonometry & Unit Circle",
        shortDesc: "Master Sine, Cosine, Tangent, and how angles generate wave functions.",
        difficulty: "Intermediate 📘",
        formulas: [
          { name: "Pythagorean Identity", tex: "\\sin^2\\theta + \\cos^2\\theta = 1", desc: "Fundamental trigonometric identity" },
          { name: "Euler's Relation", tex: "e^{i\\theta} = \\cos\\theta + i\\sin\\theta", desc: "Connects trigonometry to complex exponents" }
        ],
        normalExplanation: `
          <h3>Trigonometry and Circular Functions</h3>
          <p>Trigonometry begins with the study of right-angled triangles using ratios of sides relative to an angle $\\theta$:</p>
          <ul>
            <li>$\\sin\\theta = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}$</li>
            <li>$\\cos\\theta = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}}$</li>
            <li>$\\tan\\theta = \\frac{\\text{Opposite}}{\\text{Adjacent}} = \\frac{\\sin\\theta}{\\cos\\theta}$</li>
          </ul>
          <p>By mapping these functions onto a circle of radius 1 (the **Unit Circle**), we can define trig functions for any real angle. A point $P(x,y)$ on the circle at angle $\\theta$ has coordinates $(\\cos\\theta, \\sin\\theta)$. The equation of the circle $x^2 + y^2 = 1$ leads directly to the core identity:</p>
          $$\\sin^2\\theta + \\cos^2\\theta = 1$$
        `,
        eli10Explanation: `
          <h3>The Rotating Clock Hand</h3>
          <p>Imagine a clock with a single glowing hand that is exactly $1$ meter long, spinning counter-clockwise.</p>
          <ul>
            <li><strong>Cosine</strong> is just the shadow of the hand on the **floor** (horizontal distance).</li>
            <li><strong>Sine</strong> is the shadow of the hand on the **wall** (vertical height).</li>
            <li><strong>Tangent</strong> is how steep the clock hand is!</li>
          </ul>
          <p>Since the hand is always $1$ meter long, no matter what angle it is at, the shadows always make a perfect right triangle. Using Pythagoras, the floor shadow squared plus the wall shadow squared always equals $1$! $$\\cos^2\\theta + \\sin^2\\theta = 1$$</p>
        `,
        questions: [
          {
            id: "trig_q1",
            difficulty: "easy",
            question: "In a right triangle, if the opposite side to angle theta is 3 and the hypotenuse is 5, what is sin(theta)?",
            options: ["3/5", "4/5", "3/4", "5/3"],
            answer: "3/5",
            hint: "Sine is defined as the ratio of the opposite side to the hypotenuse.",
            solution: "sin(theta) = Opposite / Hypotenuse = 3 / 5."
          },
          {
            id: "trig_q2",
            difficulty: "medium",
            question: "What is the exact value of cos(120 degrees)?",
            options: ["-1/2", "1/2", "-sqrt(3)/2", "sqrt(3)/2"],
            answer: "-1/2",
            hint: "120 degrees is in the second quadrant. cos(180 - theta) = -cos(theta).",
            solution: "120 degrees is in Quadrant II, where x-coordinates (cosine) are negative. cos(120) = -cos(60) = -1/2."
          }
        ]
      },
      {
        id: "vectors",
        title: "Vector Algebra",
        shortDesc: "Manipulate quantities with magnitude and direction. Compute dot and cross products.",
        difficulty: "Advanced 🧠",
        formulas: [
          { name: "Dot Product", tex: "\\vec{u} \\cdot \\vec{v} = u_x v_x + u_y v_y = ||\\vec{u}|| ||\\vec{v}|| \\cos\\theta", desc: "Measures vector alignment" },
          { name: "Cross Product Magnitude", tex: "||\\vec{u} \\times \\vec{v}|| = ||\\vec{u}|| ||\\vec{v}|| \\sin\\theta", desc: "Yields perpendicular vector area" }
        ],
        normalExplanation: `
          <h3>Vector Mathematics</h3>
          <p>A vector $\\vec{v}$ represents a quantity possessing both **magnitude** (length) and **direction**. In 2D space, it is written as $\\vec{v} = \\langle v_x, v_y \\rangle$.</p>
          <p>Two critical operations define vector multiplication:</p>
          <ol>
            <li><strong>Dot Product ($\vec{u} \cdot \vec{v}$)</strong>: A scalar value representing the projection of one vector onto another. It is zero if vectors are orthogonal (perpendicular).
            $$\\vec{u} \\cdot \\vec{v} = u_x v_x + u_y v_y = ||\\vec{u}|| ||\\vec{v}|| \\cos\\theta$$</li>
            <li><strong>Cross Product ($\vec{u} \times \vec{v}$)</strong>: An operation in 3D yielding a vector perpendicular to both input vectors, with magnitude equal to the area of the spanned parallelogram:
            $$||\\vec{u} \\times \\vec{v}|| = ||\\vec{u}|| ||\\vec{v}|| \\sin\\theta$$</li>
          </ol>
        `,
        eli10Explanation: `
          <h3>Arrows with Strength</h3>
          <p>Normal numbers just tell you "how much" (like $5$ apples). But a <strong>vector</strong> is an **arrow** that tells you both "how much" AND "which direction"!</p>
          <p>For example, "Walk $5$ steps to the North" is a vector. "Walk $5$ steps" is not (where are you going?!).</p>
          <ul>
            <li><strong>Adding</strong> two arrows is just gluing the start of the second arrow to the tip of the first arrow.</li>
            <li>The **Dot Product** is a way to multiply two arrows to see how much they point in the **same direction**. If they are perpendicular, they score a $0$!</li>
            <li>The **Cross Product** is a formula that takes two arrows on a table and shoots a new arrow straight up into the ceiling, perpendicular to both!</li>
          </ul>
        `,
        questions: [
          {
            id: "vec_q1",
            difficulty: "easy",
            question: "Find the magnitude of the vector u = <3, 4>.",
            options: ["5", "7", "25", "1"],
            answer: "5",
            hint: "Use the distance formula: ||u|| = sqrt(x^2 + y^2).",
            solution: "||u|| = sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5."
          },
          {
            id: "vec_q2",
            difficulty: "medium",
            question: "Calculate the dot product of vector u = <2, -3> and vector v = <4, 1>.",
            options: ["5", "11", "10", "6"],
            answer: "5",
            hint: "Multiply the x-components, multiply the y-components, and add the results.",
            solution: "u . v = (2 * 4) + (-3 * 1) = 8 - 3 = 5."
          }
        ]
      }
    ]
  },
  {
    id: "tlmaths",
    title: "TLMaths A-Level Peak",
    icon: "🎓",
    tagline: "Rigorous curriculum covering Pure Mathematics, Mechanics, and Statistics.",
    color: "#E91E63",
    difficulty: "Advanced 🧠",
    topics: [
      {
        id: "pure_maths",
        title: "Pure Mathematics A-Level",
        shortDesc: "Calculus proofs, integration techniques, coordinate geometry, and numerical methods.",
        difficulty: "Advanced 🧠",
        formulas: [
          { name: "Integration by Parts", tex: "\\int u \\, dv = uv - \\int v \\, du", desc: "Reverse product rule for integration" },
          { name: "Newton-Raphson", tex: "x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}", desc: "Numerical iteration for finding roots" }
        ],
        normalExplanation: `
          <h3>A-Level Pure Mathematics</h3>
          <p>Pure mathematics at the A-Level acts as the transition point between simple calculations and formal abstract analysis. Key areas include advanced algebraic proofs, series expansion (Binomial expansion for rational powers), and sophisticated calculus techniques.</p>
          <p>In calculus, we learn how to integrate complex functions using techniques such as **Substitution**, **Partial Fractions**, and **Integration by Parts**, which is derived from the product rule of differentiation:</p>
          $$\\int u \\, dv = uv - \\int v \\, du$$
          <p>We also study numerical methods like the **Newton-Raphson method** to solve equations that cannot be factored analytically: $x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$.</p>
        `,
        eli10Explanation: `
          <h3>The Professional Math Toolbox</h3>
          <p>A-Level Pure Math is like going from building houses with wood to building skyscrapers with steel. It gives you professional tools to solve problems that seem impossible at first!</p>
          <ul>
            <li><strong>Integration by Parts</strong> is a trick to find the area under curves that are made by multiplying two different functions together (like $x$ multiplied by $\\sin(x)$).</li>
            <li>The <strong>Newton-Raphson method</strong> is a smart guessing game. If you don't know where a complex curve hits zero, you make a guess, draw a tangent line, and follow it to get a much better guess, repeating until you are perfectly correct!</li>
          </ul>
        `,
        questions: [
          {
            id: "pure_q1",
            difficulty: "medium",
            question: "Using integration by parts, evaluate the indefinite integral of x * e^x dx.",
            options: ["x*e^x - e^x + C", "x*e^x + e^x + C", "0.5*x^2 * e^x + C", "e^x * (x + 1) + C"],
            answer: "x*e^x - e^x + C",
            hint: "Let u = x (so du = dx) and dv = e^x dx (so v = e^x). Use the parts formula uv - Integral(v du).",
            solution: "u = x => du = dx; dv = e^x dx => v = e^x. Formula: uv - S(v du) = x*e^x - S(e^x dx) = x*e^x - e^x + C."
          }
        ]
      }
    ]
  },
  {
    id: "higher_maths",
    title: "Higher Mathematics",
    icon: "🧠",
    tagline: "The calculus revolution. Study change, limits, slopes, and infinite sums.",
    color: "#9C27B0",
    difficulty: "Advanced 🧠",
    topics: [
      {
        id: "limits",
        title: "Limits & Continuity",
        shortDesc: "Understand what happens as numbers get infinitely close to a boundary.",
        difficulty: "Advanced 🧠",
        formulas: [
          { name: "Formal Limit Definition", tex: "\\lim_{x \\to c} f(x) = L", desc: "f(x) becomes arbitrarily close to L as x approaches c" },
          { name: "Derivative Definition", tex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}", desc: "Calculates instantaneous rate of change" }
        ],
        normalExplanation: `
          <h3>The Foundation of Calculus: Limits</h3>
          <p>Before calculus, mathematics struggled to deal with dividing by zero or calculating instantaneous speeds. The breakthrough was the concept of a **limit**.</p>
          <p>We write $\\lim_{x \\to c} f(x) = L$ to state that as the variable $x$ gets arbitrarily close to $c$ (but not exactly equal to it), the value of the function $f(x)$ gets closer to $L$.</p>
          <p>For a function to be **continuous** at $c$, three things must be true: the function is defined at $c$, the limit exists as $x$ approaches $c$, and the limit equals $f(c)$. The formal definition utilizes $\\epsilon-\\delta$ notation, asserting that for any small buffer $\\epsilon > 0$, there exists a window $\\delta > 0$ such that if $0 < |x - c| < \\delta$, then $|f(x) - L| < \\epsilon$.</p>
        `,
        eli10Explanation: `
          <h3>Getting Infinitely Close</h3>
          <p>Imagine you want to walk toward a wall, but you can only take steps that cover exactly half of the remaining distance. First step: half way. Second step: quarter way. Third step: eighth way.</p>
          <p>Will you ever actually *touch* the wall? Technically, no! You will always have a tiny fraction left. But practically, you get so close that you are basically there. That wall is your **limit**!</p>
          <p>In math, a limit is a way of asking: "We can't plug in this exact number because it causes a divide-by-zero error, but if we get **super, super close** to it, what value does the formula seem to want to be?" It lets us touch the forbidden zero safely!</p>
        `,
        questions: [
          {
            id: "lim_q1",
            difficulty: "easy",
            question: "Evaluate the limit: lim (x -> 3) of (x² - 9) / (x - 3)",
            options: ["6", "3", "0", "undefined"],
            answer: "6",
            hint: "You cannot plug in x = 3 directly because it gives 0/0. Simplify the numerator by factoring first.",
            solution: "(x^2 - 9)/(x - 3) = (x - 3)(x + 3)/(x - 3). For x != 3, this is equal to (x + 3). The limit as x -> 3 is 3 + 3 = 6."
          }
        ]
      },
      {
        id: "derivatives",
        title: "Derivatives & Tangents",
        shortDesc: "Measure instant rates of change. Watch secant lines collapse into tangents.",
        difficulty: "Advanced 🧠",
        formulas: [
          { name: "Limit Definition", tex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}", desc: "First principles formula" },
          { name: "Chain Rule", tex: "\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)", desc: "Differentiating nested functions" }
        ],
        normalExplanation: `
          <h3>What is a Derivative?</h3>
          <p>The derivative represents the **instantaneous rate of change** of a function, which corresponds to the **slope** of the tangent line touching the curve at a single point.</p>
          <p>To find this slope, we draw a line connecting two points on a curve separated by a distance $h$ (a **secant line**). The slope of this line is:</p>
          $$\\text{Slope} = \\frac{f(x+h) - f(x)}{h}$$
          <p>By taking the **limit** as the separation distance $h$ collapses to zero, the secant line morphs into a tangent line at a single point, yielding the derivative:</p>
          $$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$
        `,
        eli10Explanation: `
          <h3>The Speedometer Trick</h3>
          <p>If you drive $100$ miles in $2$ hours, your average speed is $50$ mph. But during that drive, were you *always* going exactly $50$? No! You sped up, slowed down, and stopped at red lights.</p>
          <p>How does your car's speedometer know your speed at **one exact split-second**? It doesn't look at hours; it looks at how far you traveled in a tiny fraction of a millisecond! It divides that micro-distance by that micro-time.</p>
          <p>That is what a **derivative** is. It's the math speedometer! It tells you how fast a curve is climbing or falling at one exact point, by shrinking the time window down to zero.</p>
        `,
        questions: [
          {
            id: "der_q1",
            difficulty: "easy",
            question: "What is the derivative of f(x) = 3x² + 5x - 2?",
            options: ["6x + 5", "3x + 5", "6x", "6x² + 5"],
            answer: "6x + 5",
            hint: "Use the Power Rule: d/dx(x^n) = n*x^(n-1).",
            solution: "d/dx(3x^2) = 3*2x = 6x. d/dx(5x) = 5. d/dx(-2) = 0. Total derivative is 6x + 5."
          },
          {
            id: "der_q2",
            difficulty: "medium",
            question: "Find the derivative of f(x) = sin(x²).",
            options: ["2x * cos(x²)", "cos(x²)", "2x * sin(x²)", "-2x * cos(x²)"],
            answer: "2x * cos(x²)",
            hint: "Use the Chain Rule: differentiate the outer function (sin) keeping the inner function, then multiply by the derivative of the inner function (x^2).",
            solution: "Outer: d/du(sin u) = cos u. Inner: d/dx(x^2) = 2x. Combine: cos(x^2) * 2x = 2x * cos(x^2)."
          }
        ]
      },
      {
        id: "integration",
        title: "Integration & Area",
        shortDesc: "The reverse of differentiation. Accumulate infinite slices to find total area.",
        difficulty: "Advanced 🧠",
        formulas: [
          { name: "Fundamental Theorem", tex: "\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)", desc: "Connects integration and differentiation" },
          { name: "Riemann Sum", tex: "\\int_{a}^{b} f(x) \\, dx = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i) \\Delta x", desc: "Infinite sum of rectangular area approximations" }
        ],
        normalExplanation: `
          <h3>Integration: The Math of Accumulation</h3>
          <p>Integration is the process of calculating the net accumulation of a quantity. Geometrically, the definite integral $\\int_a^b f(x) \\, dx$ represents the **area under the curve** of $f(x)$ bounded between $x = a$ and $x = b$.</p>
          <p>We approximate this area by drawing $n$ rectangles under the curve (a **Riemann Sum**). As we increase the number of rectangles to infinity ($n \\to \\infty$), the width of each rectangle shrinks to $dx$, and the sum converges to the exact integral:</p>
          $$\\int_{a}^{b} f(x) \\, dx = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i) \\Delta x$$
          <p>The **Fundamental Theorem of Calculus** connects this accumulation to derivatives, stating that if $F'(x) = f(x)$, then:</p>
          $$\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)$$
        `,
        eli10Explanation: `
          <h3>Slicing a Strange Shape</h3>
          <p>Imagine you have a weird, wavy piece of wood, and you want to know its exact surface area. You can't use a normal ruler because the top is curved!</p>
          <p>So, you slice the wood vertically into super thin strips. Each strip is so thin that its top is basically flat, making it a simple rectangle! You calculate the area of each rectangle (width times height) and add them all together.</p>
          <p>If you cut it into $10$ slices, your answer is okay. If you cut it into $10,000$ microscopically thin slices, your answer is almost perfect!</p>
          <p><strong>Integration</strong> is the math magic that lets us sum up an **infinite number of infinitely thin slices** to get the 100% perfect, exact area under a curved line!</p>
        `,
        questions: [
          {
            id: "int_q1",
            difficulty: "easy",
            question: "Evaluate the definite integral of x dx from 0 to 4.",
            options: ["8", "16", "4", "12"],
            answer: "8",
            hint: "Find the antiderivative of x, which is (1/2)x^2, and evaluate it at 4 and 0, then subtract.",
            solution: "Antiderivative of x is x^2 / 2. Evaluating from 0 to 4: (4^2 / 2) - (0^2 / 2) = 16 / 2 - 0 = 8."
          }
        ]
      }
    ]
  },
  {
    id: "advanced_maths",
    title: "Advanced Mathematics",
    icon: "🌌",
    tagline: "University-level mathematics. Dive into Topology, Real Analysis, and Tensors.",
    color: "#673AB7",
    difficulty: "Olympiad / University 🌌",
    topics: [
      {
        id: "topology",
        title: "Topology & Spaces",
        shortDesc: "Study properties that are preserved through stretching, twisting, and crumpling.",
        difficulty: "Olympiad / University 🌌",
        formulas: [
          { name: "Euler Characteristic", tex: "\\chi = V - E + F", desc: "Topological invariant for polyhedra/surfaces" },
          { name: "Topological Space", tex: "(X, \\tau)", desc: "A set X paired with a family of open sets tau" }
        ],
        normalExplanation: `
          <h3>What is Topology?</h3>
          <p>Topology is often referred to as "rubber-sheet geometry". It is the study of properties of spaces that remain invariant under **continuous deformations**—such as stretching, twisting, and bending—but excluding tearing, gluing, or intersecting.</p>
          <p>Formally, a **Topological Space** is a set $X$ together with a collection of subsets $\\tau$ (called open sets) that satisfy three axioms: the empty set and $X$ are in $\\tau$, any union of open sets is open, and any finite intersection of open sets is open.</p>
          <p>A classic topological invariant is the **Euler Characteristic** for polyhedra:</p>
          $$\\chi = V - E + F$$
          <p>Where $V$ is vertices, $E$ is edges, and $F$ is faces. A sphere has $\\chi = 2$, while a torus (doughnut) has $\\chi = 0$. In topology, a coffee mug and a doughnut are equivalent (homeomorphic) because one can be continuously morphed into the other without tearing!</p>
        `,
        eli10Explanation: `
          <h3>Clay Geometry</h3>
          <p>Imagine you have a ball of play-dough. You can squeeze it, stretch it, and roll it out into a long snake. In **topology**, that snake and the ball are considered the **exact same shape** because you didn't tear it or glue it!</p>
          <p>But if you want to turn that play-dough ball into a **doughnut**, you have to poke a hole through the middle. That requires breaking the clay! So, a ball and a doughnut are different shapes.</p>
          <p>A coffee cup, however, has exactly one handle (which is a hole!). That means you can carefully squash the cup's body and stretch the handle until it morphs into a perfect doughnut without tearing it! In topology, a coffee cup and a doughnut are twins!</p>
        `,
        questions: [
          {
            id: "top_q1",
            difficulty: "hard",
            question: "A cube has 8 vertices, 12 edges, and 6 faces. What is its Euler Characteristic (V - E + F)?",
            options: ["2", "0", "1", "6"],
            answer: "2",
            hint: "Compute V - E + F with V=8, E=12, F=6.",
            solution: "V - E + F = 8 - 12 + 6 = 2. This matches the Euler Characteristic of any topological sphere!"
          }
        ]
      },
      {
        id: "tensors",
        title: "Tensors & Multilinear Algebra",
        shortDesc: "Beyond scalars and vectors. Master the language of general relativity and deep learning.",
        difficulty: "Olympiad / University 🌌",
        formulas: [
          { name: "Tensor Contraction", tex: "T^i_j U^j_k = V^i_k", desc: "Summation over matching upper and lower indices" },
          { name: "Einstein Summation", tex: "A_i B^i = \\sum_{i} A_i B^i", desc: "Implicit summation over repeated indices" }
        ],
        normalExplanation: `
          <h3>Introduction to Tensors</h3>
          <p>Tensors are mathematical objects that generalize scalars (rank 0 tensors), vectors (rank 1 tensors), and matrices (rank 2 tensors) to arbitrary dimensional coordinates. They represent linear relationships between geometric vectors, scalars, and other tensors.</p>
          <p>A defining property of tensors is how their components transform under a change of coordinate systems. A tensor of type $(p,q)$ transforms contragradiently in its $p$ upper indices and cogradiently in its $q$ lower indices.</p>
          <p>Using the **Einstein summation convention**, a repeated index in a term implies summation over that index: $A_i B^i = \\sum_i A_i B^i$. Tensors are indispensable in physics (Einstein's field equations in general relativity) and modern machine learning, where multidimensional data arrays are processed through neural networks.</p>
        `,
        eli10Explanation: `
          <h3>The Direction Multiplier</h3>
          <p>Let's look at the ranks of math objects:</p>
          <ul>
            <li>A <strong>Scalar (Rank 0)</strong> is just a number. It tells you "temperature is $70$ degrees". It has no direction.</li>
            <li>A <strong>Vector (Rank 1)</strong> is an arrow. It tells you "wind is blowing $10$ mph to the East". It has one direction.</li>
            <li>A <strong>Matrix (Rank 2)</strong> is a grid of numbers that can transform an arrow, turning it in a new direction.</li>
            <li>A <strong>Tensor (Rank 3 or higher)</strong> is a super-grid of numbers. It can describe physical systems that respond in **many directions at the same time**!</li>
          </ul>
          <p>For example, if you squeeze a sponge, it squashes downward, but it also bulges outward to the left, right, front, and back. A tensor is the ultimate math tool that describes all those different forces and stretching directions simultaneously!</p>
        `,
        questions: [
          {
            id: "ten_q1",
            difficulty: "olympiad",
            question: "What is the rank of a tensor represented by a 3D grid of numbers (e.g., of size 3x3x3)?",
            options: ["3", "1", "2", "27"],
            answer: "3",
            hint: "The rank of a tensor corresponds to the number of indices needed to identify an element, or the number of dimensions of its array representation.",
            solution: "A scalar is rank 0, a vector (1D) is rank 1, a matrix (2D) is rank 2, and a 3D grid is a rank 3 tensor."
          }
        ]
      }
    ]
  },
  {
    id: "probability",
    title: "Probability & Stats",
    icon: "🎲",
    tagline: "Decode randomness, calculate odds, and analyze datasets with confidence.",
    color: "#FF9800",
    difficulty: "Intermediate 📘",
    topics: [
      {
        id: "bayes",
        title: "Bayes' Theorem",
        shortDesc: "Update the probability of a hypothesis as new evidence becomes available.",
        difficulty: "Advanced 🧠",
        formulas: [
          { name: "Bayes' Theorem", tex: "P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}", desc: "Calculates posterior probability" }
        ],
        normalExplanation: `
          <h3>Conditional Probability & Bayes' Theorem</h3>
          <p>Bayes' Theorem is the cornerstone of statistical inference. It dictates how to mathematically update our belief in a hypothesis ($A$) when we observe new evidence ($B$):</p>
          $$P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}$$
          <ul>
            <li>$P(A|B)$ is the **Posterior Probability**: probability of A given B.</li>
            <li>$P(B|A)$ is the **Likelihood**: probability of evidence B if A is true.</li>
            <li>$P(A)$ is the **Prior Probability**: initial probability of A before evidence.</li>
            <li>$P(B)$ is the **Marginal Probability**: total probability of evidence B.</li>
          </ul>
        `,
        eli10Explanation: `
          <h3>Updating Your Guess</h3>
          <p>Imagine you hear a barking sound outside ($B$). What is the probability that there is a dog in your garden ($A$)?</p>
          <p>Before you heard the bark, you might think "It's unlikely a dog is out there, maybe 1% chance." (That's your **Prior**!).</p>
          <p>But hearing the bark is huge evidence! You ask yourself: "If there *was* a dog in the garden, how likely is it that I'd hear a bark?" (Very likely, maybe 90%!). And "What else could make that sound?" (Maybe a toy or a TV, but rare).</p>
          <p><strong>Bayes' Theorem</strong> is a simple math formula that combines your initial guess (1%) with the strength of the new evidence (barking) to give you a new, highly accurate updated guess (maybe 95% chance it's a dog!). It is the science of changing your mind when you get new clues!</p>
        `,
        questions: [
          {
            id: "prob_q1",
            difficulty: "medium",
            question: "A medical test is 99% accurate for a disease that affects 1% of the population. If a patient tests positive, what is the probability they actually have the disease (using Bayes' Theorem)?",
            options: ["Approx. 50%", "99%", "90%", "1%"],
            answer: "Approx. 50%",
            hint: "Use Bayes' Theorem: P(D|+) = P(+|D)P(D) / [P(+|D)P(D) + P(+|not D)P(not D)]. Keep in mind false positives from the remaining 99% of healthy people.",
            solution: "P(D) = 0.01, P(not D) = 0.99. P(+|D) = 0.99, P(+|not D) = 0.01. P(+) = (0.99 * 0.01) + (0.01 * 0.99) = 0.0198. P(D|+) = (0.99 * 0.01) / 0.0198 = 0.0099 / 0.0198 = 0.50 (50%)."
          }
        ]
      }
    ]
  },
  {
    id: "logic",
    title: "Logic & Discrete Peak",
    icon: "♟️",
    tagline: "Build mathematical proofs, explore sets, graphs, and the rules of strategy.",
    color: "#607D8B",
    difficulty: "Advanced 🧠",
    topics: [
      {
        id: "gametheory",
        title: "Game Theory",
        shortDesc: "Understand strategic decision-making, payoffs, and the famous Nash Equilibrium.",
        difficulty: "Advanced 🧠",
        formulas: [
          { name: "Nash Equilibrium", tex: "u_i(s_i^*, s_{-i}^*) \\ge u_i(s_i, s_{-i}^*)", desc: "No player has an incentive to unilaterally deviate" }
        ],
        normalExplanation: `
          <h3>Strategic Mathematical Logic</h3>
          <p>Game Theory is the study of mathematical models of strategic interaction among rational decision-makers. It applies to economics, computer science, and evolutionary biology.</p>
          <p>A game consists of players, strategies available to them, and payoffs corresponding to outcomes. A central concept is the **Nash Equilibrium**. A set of strategies $(s_1^*, s_2^*, ..., s_n^*)$ is a Nash Equilibrium if no player $i$ can benefit by unilaterally changing their strategy $s_i$ while other players keep their strategies unchanged:</p>
          $$u_i(s_i^*, s_{-i}^*) \\ge u_i(s_i, s_{-i}^*)$$
          <p>The famous **Prisoner's Dilemma** illustrates how two rational individuals might not cooperate, even if it appears in their best interest to do so, because defection is the dominant strategy.</p>
        `,
        eli10Explanation: `
          <h3>The Rock-Paper-Scissors Secret</h3>
          <p>Imagine you and a friend are playing a game where you both win candy. If you both cooperate, you both get $3$ candies. If one betrays the other, the betrayer gets $5$ candies and the honest player gets $0$. If you both betray, you both get only $1$ candy! (This is the **Prisoner's Dilemma**).</p>
          <p>Even though getting $3$ candies each is the best outcome for the team, you both worry: "What if my friend betrays me? I'll get $0$! I should betray them to protect myself."</p>
          <p>Since you both think this way, you both betray and end up with only $1$ candy! This trap is a **Nash Equilibrium**: a state where, once you are there, neither player wants to change their mind because doing so would make things even worse. Game theory is the math of figuring out the smartest moves when other people are trying to outsmart you!</p>
        `,
        questions: [
          {
            id: "game_q1",
            difficulty: "medium",
            question: "In the Prisoner's Dilemma, what is the dominant strategy for each rational player?",
            options: ["Defect (Betray)", "Cooperate (Keep Quiet)", "Randomly choose", "Refuse to play"],
            answer: "Defect (Betray)",
            hint: "A dominant strategy is the choice that yields a higher payoff regardless of what the other player does.",
            solution: "If the opponent cooperates, defecting gives 5 instead of 3. If the opponent defects, defecting gives 1 instead of 0. Thus, defecting is always the best individual choice."
          }
        ]
      }
    ]
  },
  {
    id: "applied",
    title: "Applied Mathematics",
    icon: "⚙️",
    tagline: "Use mathematics to model real-world systems, physics, and finance.",
    color: "#795548",
    difficulty: "Advanced 🧠",
    topics: [
      {
        id: "finance",
        title: "Financial Mathematics",
        shortDesc: "Compound interest, discount rates, and equations that power global wealth.",
        difficulty: "Intermediate 📘",
        formulas: [
          { name: "Compound Interest", tex: "A = P \\left(1 + \\frac{r}{n}\\right)^{nt}", desc: "Future value of an investment with periodic compounding" },
          { name: "Continuous Compounding", tex: "A = P e^{rt}", desc: "Future value with continuous interest compounding" }
        ],
        normalExplanation: `
          <h3>The Time Value of Money</h3>
          <p>Financial mathematics uses mathematical models to analyze financial markets, investments, and interest growth. The fundamental concept is that money has a **time value**—a dollar today is worth more than a dollar tomorrow due to its potential earning capacity.</p>
          <p>When interest is compounded periodically (e.g., monthly, quarterly), the future value $A$ is:</p>
          $$A = P \\left(1 + \\frac{r}{n}\\right)^{nt}$$
          <p>As the frequency of compounding $n$ approaches infinity, the equation converges to **continuous compounding** using Euler's constant $e$:</p>
          $$A = P e^{rt}$$
        `,
        eli10Explanation: `
          <h3>The Snowballing Dollar</h3>
          <p>Imagine you have $100$ in a savings box. If the bank gives you a 10% reward every year for keeping it there, at the end of Year 1, you have $110$.</p>
          <p>For Year 2, the bank doesn't just reward you for your original $100$—they reward you for the full $110$! So you get 10% of $110$ ($11$), making your total $121$.</p>
          <p>Your money is snowballing! The interest is making interest. This is **Compound Interest**. Over time, this curve shoots up exponentially like a rocket. As Einstein allegedly said, "Compound interest is the eighth wonder of the world. He who understands it, earns it... he who doesn't, pays it!"</p>
        `,
        questions: [
          {
            id: "fin_q1",
            difficulty: "medium",
            question: "If you invest $1,000 at an annual interest rate of 6% compounded continuously, how much money will you have after 5 years (e^0.3 approx 1.35)?",
            options: ["$1,350", "$1,300", "$1,060", "$1,500"],
            answer: "$1,350",
            hint: "Use the continuous compounding formula A = P * e^(rt) with P = 1000, r = 0.06, t = 5.",
            solution: "A = 1000 * e^(0.06 * 5) = 1000 * e^(0.3). Since e^0.3 is approximately 1.35, A = 1000 * 1.35 = $1,350."
          }
        ]
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = COURSES_DATA;
} else {
  window.COURSES_DATA = COURSES_DATA;
}
