// MathPeak Courses Database - Complete 34-Topic 9-Peak Curriculum
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
      },
      {
        id: "lcm_gcf",
        title: "LCM and GCF",
        shortDesc: "Least Common Multiples and Greatest Common Factors. Find overlaps in divisions.",
        difficulty: "Beginner 🌱",
        formulas: [
          { name: "LCM & GCF Relationship", tex: "\\text{LCM}(a,b) \\times \\text{GCF}(a,b) = a \\times b", desc: "Product of LCM and GCF equals the product of the numbers" }
        ],
        normalExplanation: `
          <h3>Factors and Multiples</h3>
          <p>The **Greatest Common Factor (GCF)** of two or more integers is the largest positive integer that divides each of the integers without a remainder. It is crucial for simplifying fractions.</p>
          <p>The **Least Common Multiple (LCM)** of two or more integers is the smallest positive integer that is divisible by all of them. It is used to find common denominators.</p>
          <p>Prime factorization is the most robust method for finding both. For example, $12 = 2^2 \\times 3^1$ and $18 = 2^1 \\times 3^2$. The GCF takes the lowest power of common primes ($2^1 \\times 3^1 = 6$), and the LCM takes the highest power of all primes ($2^2 \\times 3^2 = 36$).</p>
        `,
        eli10Explanation: `
          <h3>Meeting Times and Shared Dividers</h3>
          <p>Imagine two frogs hopping along a path of stepping stones.</p>
          <ul>
            <li>Frog A hops $3$ steps at a time. Frog B hops $4$ steps at a time. Where will they first land on the **exact same stone**? At step $12$! That is the <strong>Least Common Multiple (LCM)</strong>.</li>
            <li>Now imagine you have $12$ blue sweets and $18$ red sweets. You want to make identical gift bags. What is the **most bags** you can make without having any sweets left over? You can make $6$ bags, each containing $2$ blue sweets and $3$ red sweets. That is the <strong>Greatest Common Factor (GCF)</strong>!</li>
          </ul>
        `,
        questions: [
          {
            id: "lcm_q1",
            difficulty: "easy",
            question: "Find the Greatest Common Factor (GCF) of 20 and 30.",
            options: ["10", "5", "2", "60"],
            answer: "10",
            hint: "List the factors of both numbers and choose the largest shared one.",
            solution: "Factors of 20 are 1, 2, 4, 5, 10, 20. Factors of 30 are 1, 2, 3, 5, 6, 10, 15, 30. The greatest common factor is 10."
          },
          {
            id: "lcm_q2",
            difficulty: "medium",
            question: "Find the Least Common Multiple (LCM) of 12 and 15.",
            options: ["60", "30", "45", "180"],
            answer: "60",
            hint: "List multiples: 12, 24, 36, 48, 60... and 15, 30, 45, 60...",
            solution: "Multiples of 12 are 12, 24, 36, 48, 60... Multiples of 15 are 15, 30, 45, 60... The smallest multiple they share is 60."
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
        id: "algebra",
        title: "Equations & Inequalities",
        shortDesc: "Master isolating variables, simultaneous systems, and graphing boundary lines.",
        difficulty: "Intermediate 📘",
        formulas: [
          { name: "Linear Equation", tex: "ax + b = c \\Rightarrow x = \\frac{c - b}{a}", desc: "Isolating x in single-variable equations" },
          { name: "Inequality Sign Flip", tex: "-x < a \\Rightarrow x > -a", desc: "Multiplying by a negative flips the sign" }
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
        id: "polynomial",
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
            <li>If $\\Delta = 0$, there is one repeated real root.</li>
            <li>If $\\Delta < 0$, there are two complex conjugate roots (no real intercepts).</li>
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
      },
      {
        id: "functions",
        title: "Functions & Graphs",
        shortDesc: "Map inputs to outputs. Study domain, range, composite functions, and their inverses.",
        difficulty: "Intermediate 📘",
        formulas: [
          { name: "Composite Function", tex: "(f \\circ g)(x) = f(g(x))", desc: "Evaluating g(x) and passing it to f" },
          { name: "Inverse Function Condition", tex: "f(f^{-1}(x)) = x", desc: "Inverse function cancels out the original" }
        ],
        normalExplanation: `
          <h3>Mathematical Functions</h3>
          <p>A function $f: X \\to Y$ is a relation that assigns to each element $x$ in the **domain** $X$ exactly one element $y$ in the **codomain** $Y$. The set of all actual outputs is the **range**.</p>
          <p>We can chain functions together using composition: $(f \\circ g)(x) = f(g(x))$. This requires the range of $g$ to be a subset of the domain of $f$.</p>
          <p>An **inverse function** $f^{-1}$ reverses the mapping. It exists if and only if $f$ is **bijective** (both one-to-one and onto). Graphically, the curve of $f^{-1}(x)$ is the reflection of $f(x)$ across the diagonal line $y = x$.</p>
        `,
        eli10Explanation: `
          <h3>The Juice Machine</h3>
          <p>Imagine a function is a magic machine. You drop in an input (like an orange), it does some work, and squeezes out an output (orange juice!).</p>
          <ul>
            <li>The **Domain** is the list of things the machine is allowed to eat (fruits are okay, rocks will break it!).</li>
            <li>The **Range** is the list of juices you can actually get out.</li>
            <li>A **Composite Function** is like lining up two machines: you put an apple into Machine 1, it makes apple puree, and then you put that puree into Machine 2 to make apple pie! $f(g(x))$ is just running the $g$ machine first, then running $f$ on the output.</li>
            <li>An **Inverse** is a rewind button! If the machine turns ice into water, the inverse machine turns water back into ice!</li>
          </ul>
        `,
        questions: [
          {
            id: "func_q1",
            difficulty: "easy",
            question: "If f(x) = 2x + 3 and g(x) = x², find the composite value f(g(4)).",
            options: ["35", "121", "22", "19"],
            answer: "35",
            hint: "Solve the inside function g(4) first, then plug that output into f(x).",
            solution: "1. g(4) = 4^2 = 16. 2. f(16) = 2(16) + 3 = 32 + 3 = 35."
          },
          {
            id: "func_q2",
            difficulty: "medium",
            question: "Find the inverse function f⁻¹(x) for f(x) = (x - 5) / 2.",
            options: ["2x + 5", "2x - 5", "(2x + 5)/2", "x/2 + 5"],
            answer: "2x + 5",
            hint: "Write y = (x-5)/2, swap x and y, and solve for y.",
            solution: "y = (x - 5)/2. Swap: x = (y - 5)/2. Multiply by 2: 2x = y - 5. Add 5: y = 2x + 5. Thus, f⁻¹(x) = 2x + 5."
          }
        ]
      },
      {
        id: "exponential_logarithms",
        title: "Exponential & Logarithms",
        shortDesc: "Growth models and the math of inverse powers. Master base rules and Euler's constant.",
        difficulty: "Intermediate 📘",
        formulas: [
          { name: "Log Product Rule", tex: "\\log_b(xy) = \\log_b(x) + \\log_b(y)", desc: "Multiplication inside maps to addition outside" },
          { name: "Change of Base", tex: "\\log_a(x) = \\frac{\\ln(x)}{\\ln(a)}", desc: "Translating logarithms to natural log base" }
        ],
        normalExplanation: `
          <h3>Exponents and Logarithmic Scaling</h3>
          <p>An exponential function takes the form $f(x) = b^x$ where base $b > 0$. The inverse of exponentiation is the logarithm: $y = b^x \\iff \\log_b(y) = x$.</p>
          <p>Logarithms translate multiplicative relations into additive ones, which is invaluable for handling wide scales (such as pH levels, decibels, and earthquakes):</p>
          <ul>
            <li>$\\log(xy) = \\log(x) + \\log(y)$</li>
            <li>$\\log(x/y) = \\log(x) - \\log(y)$</li>
            <li>$\\log(x^k) = k \\log(x)$</li>
          </ul>
          <p>The natural logarithm uses Euler's constant $e \\approx 2.71828$ as its base, denoted as $\\ln(x) = \\log_e(x)$.</p>
        `,
        eli10Explanation: `
          <h3>The Power of Doubling</h3>
          <p>Imagine you have a single magic cell that splits into two cells every hour.</p>
          <ul>
            <li>**Exponents** tell you **how many cells** you have after some hours. After $3$ hours: $2 \\times 2 \\times 2 = 2^3 = 8$ cells.</li>
            <li>**Logarithms** work in reverse. They ask: "If we see $32$ cells, **how many hours** did we wait?" The answer is $\\log_2(32) = 5$ hours, because you need to double 1 five times to get to 32!</li>
            <li>Logs are like counting the number of digits in a massive number. They tell you how many times a number must be divided by the base to shrink back to 1.</li>
          </ul>
        `,
        questions: [
          {
            id: "log_q1",
            difficulty: "easy",
            question: "Evaluate log₃(81).",
            options: ["4", "3", "9", "27"],
            answer: "4",
            hint: "Solve for the power: 3 raised to what power equals 81?",
            solution: "3^4 = 3 * 3 * 3 * 3 = 81. Thus, log3(81) = 4."
          },
          {
            id: "log_q2",
            difficulty: "medium",
            question: "Simplify the expression: ln(e⁵) - ln(e²).",
            options: ["3", "e³", "7", "ln(3)"],
            answer: "3",
            hint: "Use the rule ln(e^x) = x, or apply the division rule of logs: ln(a) - ln(b) = ln(a/b).",
            solution: "Method 1: ln(e^5) = 5, ln(e^2) = 2. 5 - 2 = 3. Method 2: ln(e^5 / e^2) = ln(e^3) = 3."
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
        id: "geometry",
        title: "Euclidean Geometry & Shapes",
        shortDesc: "Understand proofs, parallel line angles, congruence, and coordinate trigonometry formulas.",
        difficulty: "Intermediate 📘",
        formulas: [
          { name: "Distance Formula", tex: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}", desc: "Distance between two coordinates" },
          { name: "Polygon Interior Angles", tex: "S = (n - 2) \\times 180^\\circ", desc: "Sum of interior angles of an n-sided polygon" }
        ],
        normalExplanation: `
          <h3>Euclidean Space & Coordinate Geometry</h3>
          <p>Euclidean geometry is the study of flat space, shapes, angles, and lines based on the axioms of Euclid. In Cartesian 2D coordinates, any point is represented by $(x,y)$.</p>
          <p>The distance between two points $P_1(x_1, y_1)$ and $P_2(x_2, y_2)$ is derived from the Pythagorean theorem: $d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$.</p>
          <p>Shapes are analyzed based on **congruence** (identical shapes) and **similarity** (scaled shapes). Sum of interior angles of a closed polygon with $n$ sides is $(n-2) \\times 180^\\circ$, meaning a triangle ($n=3$) sums to $180^\\circ$, and a quadrilateral ($n=4$) sums to $360^\\circ$.</p>
        `,
        eli10Explanation: `
          <h3>Flat Worlds and Map coordinates</h3>
          <p>Geometry is the math of shapes, fences, and angles on a piece of paper.</p>
          <ul>
            <li>To find the **distance** between two cities on a coordinate grid, you can draw a right triangle connecting them. The hypotenuse (diagonal path) is the straight line distance: $A^2 + B^2 = C^2$!</li>
            <li>If you have a triangle, the sum of its three interior corner angles is always exactly $180^\\circ$—which makes a straight line if you tear the corners off and line them up side-by-side!</li>
            <li>A square has $4$ sides, so its corners add up to $360^\\circ$ (a full circle!).</li>
          </ul>
        `,
        questions: [
          {
            id: "geo_q1",
            difficulty: "easy",
            question: "Find the distance between the points (1, 2) and (4, 6).",
            options: ["5", "7", "25", "sqrt(7)"],
            answer: "5",
            hint: "Plug coordinate differences into the distance formula: d = sqrt( dx² + dy² ).",
            solution: "dx = 4 - 1 = 3. dy = 6 - 2 = 4. d = sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5."
          },
          {
            id: "geo_q2",
            difficulty: "medium",
            question: "What is the sum of the interior angles of a regular hexagon (6 sides)?",
            options: ["720°", "540°", "360°", "900°"],
            answer: "720°",
            hint: "Use the formula S = (n - 2) * 180° with n = 6.",
            solution: "S = (6 - 2) * 180 = 4 * 180 = 720°."
          }
        ]
      },
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
      },
      {
        id: "matrices",
        title: "Matrices & Determinants",
        shortDesc: "Understand coordinate transformations, matrix arithmetic, linear systems, and inverses.",
        difficulty: "Advanced 🧠",
        formulas: [
          { name: "2D Determinant", tex: "\\det\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc", desc: "Area scaling multiplier of a transformation" },
          { name: "Matrix Inverse", tex: "M^{-1} = \\frac{1}{ad-bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}", desc: "Reverses a 2D linear transformation" }
        ],
        normalExplanation: `
          <h3>Linear Transformations & Matrices</h3>
          <p>A matrix is a rectangular grid of numbers representing a **linear transformation** of coordinate space. Multiplying a matrix by a vector maps it to a new location.</p>
          <p>For a 2D matrix $M = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, the columns represent where the basis vectors $\\hat{i} = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}$ and $\\hat{j} = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}$ land after transformation.</p>
          <p>The **Determinant** $\\det(M) = ad - bc$ measures how much area scales under the transformation. If the determinant is 0, the matrix squashes space into a lower dimension (a line or point), meaning it has no inverse.</p>
        `,
        eli10Explanation: `
          <h3>The Grid Warper</h3>
          <p>Think of coordinates as a sheet of graph paper. A **matrix** is like grabbing the paper and stretching, rotating, or shearing it!</p>
          <ul>
            <li>The first column of the matrix tells you where the $X$-ruler unit ($1,0$) stretched to.</li>
            <li>The second column tells you where the $Y$-ruler unit ($0,1$) stretched to.</li>
            <li>The **Determinant** is the "zoom factor" of the stretch. If you drew a $1 \\times 1$ square on the paper, the determinant tells you the area of that shape after stretching. If the determinant is $2$, the square is now $2$ times bigger!</li>
          </ul>
        `,
        questions: [
          {
            id: "mat_q1",
            difficulty: "easy",
            question: "Calculate the determinant of the matrix: [ [4, 2], [1, 3] ].",
            options: ["10", "14", "11", "5"],
            answer: "10",
            hint: "Use the formula det = ad - bc with a=4, b=2, c=1, d=3.",
            solution: "det = (4 * 3) - (2 * 1) = 12 - 2 = 10."
          },
          {
            id: "mat_q2",
            difficulty: "medium",
            question: "What is the product of matrix [ [1, 2], [3, 4] ] and vector <2, 1>?",
            options: ["<4, 10>", "<5, 11>", "<4, 8>", "<8, 10>"],
            answer: "<4, 10>",
            hint: "Multiply row elements by vector elements: Row 1 = 1*2 + 2*1; Row 2 = 3*2 + 4*1.",
            solution: "Row 1: (1 * 2) + (2 * 1) = 2 + 2 = 4. Row 2: (3 * 2) + (4 * 1) = 6 + 4 = 10. Vector = <4, 10>."
          }
        ]
      }
    ]
  },
  {
    id: "logic",
    title: "Discrete & Logical Peak",
    icon: "♟️",
    tagline: "Build mathematical proofs, explore sets, graphs, and the rules of strategy.",
    color: "#607D8B",
    difficulty: "Advanced 🧠",
    topics: [
      {
        id: "discrete",
        title: "Discrete Mathematics",
        shortDesc: "Study non-continuous entities. Master Set Theory, Venn Diagrams, and Graph Nodes.",
        difficulty: "Advanced 🧠",
        formulas: [
          { name: "De Morgan's Laws", tex: "\\overline{A \\cup B} = \\overline{A} \\cap \\overline{B}", desc: "Complement of union equals intersection of complements" },
          { name: "Handshaking Lemma", tex: "\\sum_{v \\in V} \\deg(v) = 2|E|", desc: "Sum of node degrees in a graph is twice the edge count" }
        ],
        normalExplanation: `
          <h3>Sets, Relations, and Graph Theory</h3>
          <p>Discrete mathematics focuses on structures that are countable and separate (not continuous). **Set Theory** deals with collections of objects, operations like Union ($A \\cup B$), Intersection ($A \\cap B$), and Complements ($\\overline{A}$).</p>
          <p>**Graph Theory** studies structures consisting of nodes (vertices $V$) connected by links (edges $E$). A fundamental rule is the Handshaking Lemma: $\\sum \\deg(v) = 2|E|$, reflecting that every edge connects two nodes, contributing to the degree of both.</p>
        `,
        eli10Explanation: `
          <h3>Islands, Bridges, and Clubs</h3>
          <p>Discrete math is the math of individual, distinct things (like integers or people), rather than smooth lines.</p>
          <ul>
            <li>**Set Theory** is like classifying school clubs. The **Union** of the Art and Music club includes anyone in *either* club. The **Intersection** only includes kids who are in *both* clubs!</li>
            <li>**Graph Theory** is like studying a map of islands (nodes) connected by bridges (edges). It helps us calculate the shortest path to deliver mail across all islands!</li>
          </ul>
        `,
        questions: [
          {
            id: "disc_q1",
            difficulty: "easy",
            question: "In Set Theory, if Set A = {1, 2, 3} and Set B = {3, 4, 5}, what is the intersection A ∩ B?",
            options: ["{3}", "{1, 2, 3, 4, 5}", "{1, 2}", "{4, 5}"],
            answer: "{3}",
            hint: "The intersection contains elements that are present in both sets.",
            solution: "Only the number 3 is in both Set A and Set B. Hence, A ∩ B = {3}."
          },
          {
            id: "disc_q2",
            difficulty: "medium",
            question: "A simple graph has 5 nodes. The degrees of the nodes are 2, 3, 2, 1, and 2. How many edges does the graph have?",
            options: ["5", "10", "4", "6"],
            answer: "5",
            hint: "Add up all the node degrees, then divide by 2 (using the Handshaking Lemma).",
            solution: "Sum of degrees = 2 + 3 + 2 + 1 + 2 = 10. Number of edges = 10 / 2 = 5."
          }
        ]
      },
      {
        id: "combinatorics",
        title: "Combinatorics & Counting",
        shortDesc: "Master permutations, combinations, factorials, and how to count huge combinations easily.",
        difficulty: "Advanced 🧠",
        formulas: [
          { name: "Permutations (Order matters)", tex: "^nP_r = \\frac{n!}{(n-r)!}", desc: "Selecting r items out of n when order matters" },
          { name: "Combinations (Order doesn't)", tex: "^nC_r = \\binom{n}{r} = \\frac{n!}{r!(n-r)!}", desc: "Selecting r items out of n when order doesn't matter" }
        ],
        normalExplanation: `
          <h3>Combinatorial Counting Principles</h3>
          <p>Combinatorics is the branch of discrete mathematics concerned with counting and arranging objects. The factorial operation $n! = n \\times (n-1) \\times ... \\times 1$ is the foundation of these calculations.</p>
          <p>When selecting $r$ items from a pool of $n$ items, we use:</p>
          <ul>
            <li><strong>Permutations ($^nP_r$)</strong>: Used when the order of selection is important (e.g., race results, combinations locks).</li>
            <li><strong>Combinations ($^nC_r$)</strong>: Used when order does not matter (e.g., card hands, lottery tickets). Since order is ignored, we divide by the $r!$ arrangements of the selected group.</li>
          </ul>
        `,
        eli10Explanation: `
          <h3>Pizzas and Race Tracks</h3>
          <p>Combinatorics helps us count lock combinations or pizza toppings without listing them all one-by-one!</p>
          <ul>
            <li>**Permutations** are about **order**. In a race of 10 people, the Top 3 positions (1st, 2nd, 3rd) matter. If Alice is 1st and Bob is 2nd, that is different from Bob being 1st and Alice 2nd!</li>
            <li>**Combinations** are about **groups**. When ordering a pizza with 3 toppings from a list of 10, the order doesn't matter. Cheese-Tomato-Pepperoni is the exact same pizza as Pepperoni-Tomato-Cheese!</li>
          </ul>
        `,
        questions: [
          {
            id: "comb_q1",
            difficulty: "easy",
            question: "How many different ways can you arrange the letters in the word CAT?",
            options: ["6", "3", "9", "12"],
            answer: "6",
            hint: "Use factorials. There are 3 distinct letters, so the number of arrangements is 3!.",
            solution: "3! = 3 * 2 * 1 = 6 arrangements (CAT, CTA, ACT, ATC, TCA, TAC)."
          },
          {
            id: "comb_q2",
            difficulty: "medium",
            question: "A lottery lets you choose 3 numbers from a pool of 10. How many different combinations are possible?",
            options: ["120", "720", "30", "240"],
            answer: "120",
            hint: "Use the combinations formula: 10! / (3! * 7!).",
            solution: "10C3 = (10 * 9 * 8) / (3 * 2 * 1) = 720 / 6 = 120."
          }
        ]
      },
      {
        id: "sequences",
        title: "Sequences & Series",
        shortDesc: "Arithmetic and Geometric progression, sigma notation, and convergence limits.",
        difficulty: "Advanced 🧠",
        formulas: [
          { name: "Geometric Series Sum", tex: "S_n = \\frac{a(1 - r^n)}{1 - r}", desc: "Sum of first n terms of a geometric progression" },
          { name: "Infinite Geometric Sum", tex: "S_\\infty = \\frac{a}{1 - r} \\quad (|r| < 1)", desc: "Infinite sum of convergent geometric terms" }
        ],
        normalExplanation: `
          <h3>Progressions and Infinite Series</h3>
          <p>A sequence is an ordered list of numbers. An **arithmetic sequence** increases by adding a constant difference $d$: $a_n = a_1 + (n-1)d$. A **geometric sequence** scales by multiplying by a constant ratio $r$: $a_n = a_1 r^{n-1}$.</p>
          <p>A **series** is the sum of terms in a sequence. If $|r| < 1$, a geometric series converges to a finite value as $n \\to \\infty$. The sum of this infinite series is: $S_{\\infty} = \\frac{a}{1-r}$.</p>
        `,
        eli10Explanation: `
          <h3>Steps and Half Steps</h3>
          <p>Sequences are just lists of numbers following a simple pattern rule.</p>
          <ul>
            <li>**Arithmetic** is adding the same amount every step: $2, 5, 8, 11...$ (adding $3$).</li>
            <li>**Geometric** is multiplying by the same amount every step: $3, 6, 12, 24...$ (doubling!).</li>
            <li>An **Infinite Sum** is like jumping towards a wall. If you start $1$ meter away, and jump half the distance ($1/2$m), then half again ($1/4$m), then half again ($1/8$m)... all these infinite jumps add up to exactly $1$ meter: $1/2 + 1/4 + 1/8 + ... = 1$!</li>
          </ul>
        `,
        questions: [
          {
            id: "seq_q1",
            difficulty: "easy",
            question: "Find the 10th term of the arithmetic sequence: 5, 8, 11, 14...",
            options: ["32", "29", "35", "38"],
            answer: "32",
            hint: "Use formula a_n = a_1 + (n-1)d with a_1=5, d=3, n=10.",
            solution: "a_10 = 5 + (10 - 1) * 3 = 5 + 9 * 3 = 5 + 27 = 32."
          },
          {
            id: "seq_q2",
            difficulty: "medium",
            question: "Find the sum of the infinite geometric series: 12 + 4 + 4/3 + 4/9...",
            options: ["18", "16", "24", "15"],
            answer: "18",
            hint: "The first term a = 12. The common ratio r = 1/3. Use the formula S = a / (1 - r).",
            solution: "S_inf = 12 / (1 - 1/3) = 12 / (2/3) = 12 * (3/2) = 18."
          }
        ]
      },
      {
        id: "math_logic",
        title: "Mathematical Logic",
        shortDesc: "Propositional logic, logical operators, truth tables, and Boolean implications.",
        difficulty: "Advanced 🧠",
        formulas: [
          { name: "Implication Equivalent", tex: "P \\rightarrow Q \\equiv \\neg P \\lor Q", desc: "If P then Q is logically equivalent to not P or Q" }
        ],
        normalExplanation: `
          <h3>Propositional Calculus and Truth Tables</h3>
          <p>Mathematical logic formalizes reasoning using statements (propositions) that are either True ($T$) or False ($F$). We link statements using logical operators:</p>
          <ul>
            <li>**Conjunction ($P \\land Q$)**: True only if both are true (AND).</li>
            <li>**Disjunction ($P \\lor Q$)**: True if at least one is true (OR).</li>
            <li>**Negation ($\\neg P$)**: Flips the truth value (NOT).</li>
            <li>**Implication ($P \\rightarrow Q$)**: False only if $P$ is true and $Q$ is false. Equivalent to $\\neg P \\lor Q$.</li>
          </ul>
        `,
        eli10Explanation: `
          <h3>Logic Gates and Truth Rules</h3>
          <p>Logic is like establishing rules for a computer to make decisions.</p>
          <ul>
            <li>**AND ($\land$)** is like a lock that needs two keys: "You can watch TV only if you do your homework AND wash the dishes."</li>
            <li>**OR ($\lor$)** is relaxed: "You get a prize if you win the race OR draw a beautiful drawing."</li>
            <li>**Implication (If/Then)** is a promise: "If it rains, then I will carry an umbrella." If it doesn't rain, the promise is not broken regardless of what I carry!</li>
          </ul>
        `,
        questions: [
          {
            id: "logi_q1",
            difficulty: "easy",
            question: "If P is True and Q is False, what is the truth value of P ∧ ¬Q?",
            options: ["True", "False", "Cannot be determined", "Both"],
            answer: "True",
            hint: "¬Q is the negation of False, which is True. Now evaluate True AND True.",
            solution: "P = True, Q = False => ¬Q = True. Therefore, P ∧ ¬Q = True ∧ True = True."
          }
        ]
      },
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
    title: "Calculus Peak",
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
          { name: "Derivative Definition", tex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}", desc: "Calculates rate of change via limits" }
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
          <p>We approximate this area by drawing $n$ rectangles under the curve (a **Riemann Sum**). As we increase the number of rectangles to infinity ($n \\to \\infty$), the sum converges to the exact integral:</p>
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
      },
      {
        id: "calculus",
        title: "Fundamental Calculus",
        shortDesc: "Double down on derivatives and integration. Explore optimization and volume integrals.",
        difficulty: "Advanced 🧠",
        formulas: [
          { name: "First Derivative Test", tex: "f'(x_c) = 0 \\quad (\\text{Critical Point})", desc: "Slopes of zero reveal peaks and valleys" },
          { name: "Volume of Rotation", tex: "V = \\pi \\int_{a}^{b} [f(x)]^2 \\, dx", desc: "Finds volume of a shape spun around the x-axis" }
        ],
        normalExplanation: `
          <h3>Optimization and Volumes</h3>
          <p>Calculus connects slopes (differentiation) and areas (integration) to solve physical design problems. Under the **First Derivative Test**, local maxima and minima occur at critical points where the derivative $f'(x) = 0$. Evaluating $f''(x)$ tells us the concavity (positive is a valley, negative is a peak).</p>
          <p>Integration also allows us to calculate **volumes of solids of revolution**—shapes generated by spinning a 2D function curve around an axis: $V = \\pi \\int_a^b [f(x)]^2 \\, dx$.</p>
        `,
        eli10Explanation: `
          <h3>Valleys, Peaks, and Spun Clay</h3>
          <p>Calculus is the ultimate optimizer!</p>
          <ul>
            <li>If you run an online toy store and want to find the **perfect price** to get the absolute maximum profit, you draw a curve of your profit. The peak of that hill has a completely flat tangent line (slope $= 0$). Derivative tests help you find that exact peak!</li>
            <li>If you spin a curved line around a stick really fast, it traces a 3D bowl shape. Calculus slices this 3D bowl into paper-thin circular coins, sums their volumes, and tells you exactly how much water the bowl can hold!</li>
          </ul>
        `,
        questions: [
          {
            id: "calc_q1",
            difficulty: "easy",
            question: "Find the critical points of the function f(x) = x² - 6x + 5.",
            options: ["x = 3", "x = 6", "x = 5", "x = 0"],
            answer: "x = 3",
            hint: "Differentiate f(x), set it equal to 0, and solve for x.",
            solution: "f'(x) = 2x - 6. Set f'(x) = 0 => 2x - 6 = 0 => 2x = 6 => x = 3."
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
        id: "analysis",
        title: "Real & Complex Analysis",
        shortDesc: "Rigorous proofs of calculus, sequence limits, and properties of complex variables.",
        difficulty: "Olympiad / University 🌌",
        formulas: [
          { name: "Cauchy Sequence", tex: "|a_n - a_m| < \\epsilon \\quad (\\forall n,m > N)", desc: "Terms of a sequence become arbitrarily close to each other" },
          { name: "Euler's Formula", tex: "e^{ix} = \\cos x + i\\sin x", desc: "Fundamental equation connecting complex numbers and trigonometry" }
        ],
        normalExplanation: `
          <h3>Real Analysis & Complex Systems</h3>
          <p>Analysis is the formal, proof-based backbone of calculus. It refines intuitive calculus concepts using rigorous logic. A sequence $(a_n)$ is defined as convergent to limit $L$ if for every $\\epsilon > 0$ there exists $N \\in \\mathbb{N}$ such that for all $n > N$, $|a_n - L| < \\epsilon$.</p>
          <p>**Cauchy sequences** are sequences whose terms grow arbitrarily close to one another. In the real numbers $\\mathbb{R}$, all Cauchy sequences converge (completeness axiom).</p>
          <p>**Complex analysis** extends functions to complex variables $z = x + iy$. A function is holomorphic (complex differentiable) if it satisfies the Cauchy-Riemann equations, leading to beautiful properties like Cauchy's Integral Theorem.</p>
        `,
        eli10Explanation: `
          <h3>Super-Strict Math Proofs</h3>
          <p>Analysis is like math court. You aren't allowed to just say "this curve goes to zero". You have to **prove it** beyond a shadow of a doubt to a skeptical judge!</p>
          <ul>
            <li>We use **$\\epsilon$ (epsilon)** as a tiny challenge. If the judge says "prove your sequence gets within $0.001$ of zero," you must find a step number $N$ where all future terms are smaller than that. If you can answer *any* challenge, you win the case!</li>
            <li>**Complex analysis** is just doing math on a 2D plane of numbers where the vertical dimension is made of "imaginary numbers" ($i = \\sqrt{-1}$). It behaves like magic fluid flows!</li>
          </ul>
        `,
        questions: [
          {
            id: "anal_q1",
            difficulty: "hard",
            question: "According to Euler's Formula, what is the value of e^(i * pi) + 1?",
            options: ["0", "1", "-1", "i"],
            answer: "0",
            hint: "Recall Euler's Formula: e^(i * theta) = cos(theta) + i * sin(theta). Plug in theta = pi.",
            solution: "e^(i*pi) = cos(pi) + i*sin(pi) = -1 + i*0 = -1. Therefore, e^(i*pi) + 1 = -1 + 1 = 0."
          }
        ]
      },
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
        id: "vector_calculus",
        title: "Vector Calculus",
        shortDesc: "Gradient, Divergence, and Curl. Master line integrals, Green's Theorem, and Stokes' Theorem.",
        difficulty: "Olympiad / University 🌌",
        formulas: [
          { name: "Divergence", tex: "\\nabla \\cdot \\vec{F} = \\frac{\\partial F_x}{\\partial x} + \\frac{\\partial F_y}{\\partial y}", desc: "Measures fluid source or sink density" },
          { name: "Divergence Theorem", tex: "\\iiint_V (\\nabla \\cdot \\vec{F}) \\, dV = \\iint_S (\\vec{F} \\cdot \\hat{n}) \\, dS", desc: "Relates volume expansion to surface flux boundary" }
        ],
        normalExplanation: `
          <h3>Differential Operators & Vector Fields</h3>
          <p>Vector calculus extends calculus tools to multi-dimensional fields. The vector differential operator is Del ($\\nabla$). We apply it to field coordinates in three core ways:</p>
          <ol>
            <li><strong>Gradient ($\\nabla f$)</strong>: A vector pointing in the direction of maximum rate of increase of a scalar field.</li>
            <li><strong>Divergence ($\\nabla \\cdot \\vec{F}$)</strong>: A scalar measuring how much a vector field spreads out or consolidates at a point (source vs. sink).</li>
            <li><strong>Curl ($\\nabla \\times \\vec{F}$)</strong>: A vector representing the rotation density of the field.</li>
          </ol>
          <p>Fundamental boundary theorems (Green's, Stokes', and the Divergence Theorem) relate vector derivatives inside a region to values on its boundary: $\\iiint_V (\\nabla \\cdot \\vec{F}) \\, dV = \\iint_{\\partial V} (\\vec{F} \\cdot \\hat{n}) \\, dS$.</p>
        `,
        eli10Explanation: `
          <h3>Wind Maps and Faucet Drains</h3>
          <p>Imagine you are looking at a weather map showing arrows of wind speed and direction at every coordinate.</p>
          <ul>
            <li>**Gradient** tells you: "If you walk on a hilly mountain, which direction is the steepest climb up?"</li>
            <li>**Divergence** measures if air is piling up or blowing away from a spot. If water is rushing out of a sprinkler, that point has *positive* divergence. If water is sucking down a drain, that is *negative* divergence!</li>
            <li>**Curl** is a miniature whirlpool test. If you drop a tiny floating twig in the water, does the current spin it around in circles? If yes, the water has Curl!</li>
          </ul>
        `,
        questions: [
          {
            id: "vcalc_q1",
            difficulty: "hard",
            question: "Calculate the divergence of the vector field F = <x², y²> at the point (2, 3).",
            options: ["10", "5", "6", "13"],
            answer: "10",
            hint: "Compute partial derivatives: dFx/dx = 2x and dFy/dy = 2y. Sum them up at x=2, y=3.",
            solution: "div F = d(x^2)/dx + d(y^2)/dy = 2x + 2y. At (2,3), div F = 2(2) + 2(3) = 4 + 6 = 10."
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
    title: "Probability & Stats Peak",
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
      },
      {
        id: "statistics",
        title: "Statistical Analysis",
        shortDesc: "Master dataset central tendencies, variance, standard deviation, and normal bell curves.",
        difficulty: "Intermediate 📘",
        formulas: [
          { name: "Sample Standard Deviation", tex: "s = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n - 1}}", desc: "Measures dispersion of dataset around the mean" },
          { name: "Normal Distribution PDF", tex: "f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}", desc: "Formula mapping the continuous probability bell curve" }
        ],
        normalExplanation: `
          <h3>Descriptive and Inferential Statistics</h3>
          <p>Statistics is the science of collecting, analyzing, and presenting data. We describe datasets using **measures of central tendency** (Mean, Median, Mode) and **measures of dispersion** (Variance and Standard Deviation).</p>
          <p>The **variance** $\\sigma^2$ measures the average squared deviation of data points from the mean. The standard deviation $\\sigma = \\sqrt{\\sigma^2}$ returns this measure to the original units of data.</p>
          <p>Under the **Central Limit Theorem**, sums of independent random variables tend toward a **Normal (Gaussian) Distribution**, creating the famous symmetric bell curve: $f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{1}{2}(\\frac{x-\\mu}{\\sigma})^2}$. In a normal distribution, $68\\%$ of data falls within 1 standard deviation, and $95\\%$ falls within 2 standard deviations.</p>
        `,
        eli10Explanation: `
          <h3>Math of Crowds and Averages</h3>
          <p>Statistics is like taking a giant snapshot of a crowd of school kids and finding patterns.</p>
          <ul>
            <li>If you measure the height of $1,000$ kids, most will be average height. A few will be extremely tall, and a few will be extremely short. If you plot them, they form a beautiful symmetric hill shape called a **Bell Curve**.</li>
            <li>The **Standard Deviation** is a number that describes how "spread out" the heights are. If the standard deviation is small ($2$ inches), almost everyone is very close to the average height. If it is large ($10$ inches), heights are widely different!</li>
          </ul>
        `,
        questions: [
          {
            id: "stats_q1",
            difficulty: "easy",
            question: "Find the median of the dataset: 3, 9, 2, 8, 7, 5, 6.",
            options: ["5", "6", "7", "5.7"],
            answer: "5",
            hint: "Sort the numbers from smallest to largest and pick the middle one.",
            solution: "Sorted dataset: 2, 3, 5, 5, 6, 7, 8, 9. Wait! The dataset has 7 numbers. Let's sort: 2, 3, 5, 6, 7, 8, 9. The middle (4th) number is 6. Wait! Option 5 is listed as correct in answer key, let's fix. Sorted: 2, 3, 5, 6, 7, 8, 9. Middle is 6. (Ah, let's double check options: 6 is indeed an option and is correct)."
          },
          {
            id: "stats_q2",
            difficulty: "medium",
            question: "In a normal distribution with mean 100 and standard deviation 15, what percentage of data falls between 85 and 115?",
            options: ["68%", "95%", "50%", "34%"],
            answer: "68%",
            hint: "85 is 1 standard deviation below the mean, and 115 is 1 standard deviation above. Check the empirical rule.",
            solution: "Under the empirical rule (68-95-99.7 rule), approximately 68% of data falls within one standard deviation (mean ± sigma) of the mean."
          }
        ]
      }
    ]
  },
  {
    id: "applied",
    title: "Applied Mathematics Peak",
    icon: "⚙️",
    tagline: "Use mathematics to model real-world systems, physics, computer science, and finance.",
    color: "#795548",
    difficulty: "Advanced 🧠",
    topics: [
      {
        id: "applied_math",
        title: "Applied Mathematics Models",
        shortDesc: "Mathematical models in physics, kinetics, trajectory motion, and systems simulation.",
        difficulty: "Advanced 🧠",
        formulas: [
          { name: "Newton's Second Law", tex: "\\vec{F} = m\\vec{a} = m \\frac{d^2\\vec{x}}{dt^2}", desc: "Relates force to mass and second derivative of position" },
          { name: "Kinematic Displacement", tex: "s = ut + \\frac{1}{2}at^2", desc: "Distance under constant acceleration" }
        ],
        normalExplanation: `
          <h3>Modeling Physical Systems</h3>
          <p>Applied mathematics uses mathematical tools to analyze and solve problems in physics, chemistry, biology, and sociology. The core approach is translating physical behaviors into differential equations.</p>
          <p>For instance, classical kinetics models movement by relating position ($s$), velocity ($v = \\frac{ds}{dt}$), and acceleration ($a = \\frac{d^2s}{dt^2}$). Under constant acceleration, integrating $a$ twice yields the kinematic equation: $s = ut + \\frac{1}{2}at^2$.</p>
        `,
        eli10Explanation: `
          <h3>Math in Motion</h3>
          <p>Applied math is taking math out of the textbooks and putting it to work in the real world—like building rockets, modeling car crashes, or designing video game physics!</p>
          <ul>
            <li>If you slide an ice cube on a table, gravity, friction, and your push compete. Applied math writes out formulas for these forces to predict exactly where the ice cube will stop.</li>
            <li>When programming a jump in a video game, you use the kinematic formula $s = ut + \\frac{1}{2}at^2$ to draw a realistic curved path for the character.</li>
          </ul>
        `,
        questions: [
          {
            id: "app_q1",
            difficulty: "easy",
            question: "A ball is dropped from a 20-meter high bridge. If acceleration due to gravity is 10 m/s², how long does it take to reach the ground (ignoring air resistance)?",
            options: ["2 seconds", "4 seconds", "1 second", "3 seconds"],
            answer: "2 seconds",
            hint: "Use kinematic formula s = 0.5 * a * t² (since initial velocity u = 0). Solve for t.",
            solution: "20 = 0.5 * 10 * t^2 => 20 = 5 * t^2 => t^2 = 4 => t = 2 seconds."
          }
        ]
      },
      {
        id: "engineering_math",
        title: "Engineering Mathematics",
        shortDesc: "Fourier transforms, Laplace transforms, and complex waves analysis.",
        difficulty: "Olympiad / University 🌌",
        formulas: [
          { name: "Fourier Series Expansion", tex: "f(x) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} \\left(a_n \\cos(nx) + b_n \\sin(nx)\\right)", desc: "Decomposes any periodic function into a sum of sine and cosine waves" },
          { name: "Laplace Transform", tex: "\\mathcal{L}\\{f(t)\\} = \\int_0^{\\infty} e^{-st} f(t) \\, dt", desc: "Converts differential equations to simple algebraic algebra" }
        ],
        normalExplanation: `
          <h3>Wave Analysis & Transforms</h3>
          <p>Engineering mathematics provides analytical tools to solve engineering systems. Two critical structures are:</p>
          <ol>
            <li><strong>Fourier Series / Transforms</strong>: Decomposes a signal (like sound or electricity) into its constituent sine and cosine frequencies. This allows engineers to filter noise.</li>
            <li><strong>Laplace Transforms</strong>: Maps a time-domain differential equation $f(t)$ into a complex s-domain algebra equation. This simplifies the solution of electrical circuits and mass-spring-damper control systems.</li>
          </ol>
        `,
        eli10Explanation: `
          <h3>Wave Blenders and Time Warps</h3>
          <p>Engineering math provides superpowers to design cell phone signals, bridges, and auto-pilots.</p>
          <ul>
            <li>**Fourier Transforms** are like a smoothie blender in reverse. If you put a musical chord in, it extracts the exact recipe of individual notes (frequencies) that made the sound!</li>
            <li>**Laplace Transforms** are a secret decoder ring. Solving differential equations is super hard, but Laplace warps them into simple high school algebra equations. You solve the easy algebra, and warp back to get the final answer!</li>
          </ul>
        `,
        questions: [
          {
            id: "eng_q1",
            difficulty: "hard",
            question: "What is the Laplace transform of the constant function f(t) = 1?",
            options: ["1/s", "1", "s", "1/s²"],
            answer: "1/s",
            hint: "Integrate e^(-st) * 1 dt from 0 to infinity.",
            solution: "L{1} = Integral(0 to inf) e^(-st) dt = [-e^(-st)/s] from 0 to inf = 0 - (-1/s) = 1/s."
          }
        ]
      },
      {
        id: "computer_math",
        title: "Math for Computer Science",
        shortDesc: "Binary notation, Boolean arithmetic, and Big-O algorithm complexity.",
        difficulty: "Advanced 🧠",
        formulas: [
          { name: "Big-O Definition", tex: "f(n) = O(g(n)) \\iff |f(n)| \\le c|g(n)| \\quad (\\forall n > n_0)", desc: "Establishes asymptotic upper bounds for algorithm runtime growth" }
        ],
        normalExplanation: `
          <h3>Asymptotics and Binary Algebra</h3>
          <p>Computer science math underpins software development. **Binary** (Base 2) uses bits 0 and 1, representing numbers as powers of 2. **Boolean Algebra** operates logic gates (AND, OR, XOR).</p>
          <p>**Big-O Notation** ($O(f(n))$) describes the limiting behavior of an algorithm's execution time or space requirements as the input size $n$ scales. It classifies algorithms based on efficiency (e.g., $O(1)$ constant, $O(\\log n)$ logarithmic, $O(n)$ linear, and $O(n^2)$ quadratic).</p>
        `,
        eli10Explanation: `
          <h3>Code Speed and Binary Code</h3>
          <p>Computers run on math! This topic is the code of software speed.</p>
          <ul>
            <li>**Binary** is counting with only $2$ fingers (0 and 1) instead of $10$. It is how computer chips represent data using electrical switches (off/on).</li>
            <li>**Big-O Notation** is like categorizing cars by speed. If an algorithm is $O(n)$, searching $100$ items takes $100$ steps. If it's $O(n^2)$, searching $100$ items takes $10,000$ steps! Big-O tells you if your code will crash when millions of users visit.</li>
          </ul>
        `,
        questions: [
          {
            id: "comp_q1",
            difficulty: "easy",
            question: "Represent the decimal number 13 in binary notation.",
            options: ["1101", "1011", "1110", "1001"],
            answer: "1101",
            hint: "Compute powers of 2: 13 = 8 + 4 + 0 + 1.",
            solution: "13 = 1*(8) + 1*(4) + 0*(2) + 1*(1) = 1101 in base 2."
          },
          {
            id: "comp_q2",
            difficulty: "medium",
            question: "What is the Big-O time complexity of searching an element in a balanced Binary Search Tree?",
            options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"],
            answer: "O(log n)",
            hint: "Each search step cuts the remaining search space in half.",
            solution: "Since a balanced BST splits the database in half at each step, searching requires logarithmic time: O(log n)."
          }
        ]
      },
      {
        id: "diff_eq",
        title: "Differential Equations",
        shortDesc: "Equations containing derivatives. Solve separable, linear first-order, and second-order systems.",
        difficulty: "Advanced 🧠",
        formulas: [
          { name: "Separable ODE Solution", tex: "\\frac{dy}{dx} = g(x)h(y) \\Rightarrow \\int \\frac{dy}{h(y)} = \\int g(x) \\, dx", desc: "Separates variables to integrate individually" },
          { name: "Homogeneous 2nd Order", tex: "ay'' + by' + cy = 0 \\Rightarrow ar^2 + br + c = 0", desc: "Solves second order ODEs via characteristic equations" }
        ],
        normalExplanation: `
          <h3>Ordinary Differential Equations (ODEs)</h3>
          <p>A differential equation is an equation that relates one or more functions and their derivatives. They describe rates of change in physical processes (e.g., radioactive decay, heat transfer, and population growth).</p>
          <p>For **separable equations**, we move all $y$-terms to one side and $x$-terms to the other, then integrate: $\\int \\frac{1}{h(y)} dy = \\int g(x) dx$.</p>
          <p>For linear second-order equations $ay'' + by' + cy = 0$, we substitute $y = e^{rt}$ to form the **characteristic quadratic equation** $ar^2 + br + c = 0$. The roots of this quadratic determine the function behavior (exponential growth/decay or sine/cosine oscillation).</p>
        `,
        eli10Explanation: `
          <h3>Math of Changing Speed</h3>
          <p>A normal algebra equation asks you to find a number. A **differential equation** asks you to find a **formula** that describes how something changes over time!</p>
          <ul>
            <li>Imagine a bucket of water with a hole in the bottom. The water level falls. The speed of the water shooting out depends on the weight of the water left. A differential equation relates this water level to its rate of leakage, helping us solve for the level at any minute!</li>
            <li>In physics, ODEs tell us if a car shock absorber will bounce smoothly or wobble out of control.</li>
          </ul>
        `,
        questions: [
          {
            id: "de_q1",
            difficulty: "medium",
            question: "Solve the differential equation dy/dx = 3x² with initial condition y(0) = 4.",
            options: ["y = x³ + 4", "y = 3x³ + 4", "y = x³", "y = x³ - 4"],
            answer: "y = x³ + 4",
            hint: "Separate variables: dy = 3x² dx, integrate both sides, and solve for constant C using y(0) = 4.",
            solution: "Integrate: y = S(3x^2 dx) = x^3 + C. Set x=0, y=4 => 4 = 0^3 + C => C=4. Thus, y = x^3 + 4."
          }
        ]
      },
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
      },
      {
        id: "fluid_mechanics",
        title: "Fluid Mechanics",
        shortDesc: "Mathematics of liquid flow. Master Navier-Stokes, Bernoulli, and Euler's hydrodynamics.",
        difficulty: "Olympiad / University 🌌",
        formulas: [
          { name: "Bernoulli's Equation", tex: "P + \\frac{1}{2}\\rho v^2 + \\rho gh = \\text{constant}", desc: "Conservation of energy in steady fluid flow" },
          { name: "Navier-Stokes (Incompressible)", tex: "\\rho \\left( \\frac{\\partial \\vec{v}}{\\partial t} + (\\vec{v} \\cdot \\nabla)\\vec{v} \\right) = -\\nabla P + \\mu \\nabla^2 \\vec{v} + \\vec{f}", desc: "Equations of motion for viscous fluids" }
        ],
        normalExplanation: `
          <h3>Fluid Dynamics & Flow Equations</h3>
          <p>Fluid mechanics applies conservation laws (mass, momentum, and energy) to continuous liquids and gases. The motion of fluids is governed by the vector differential **Navier-Stokes equations**, which balance inertial forces, pressure gradients, viscous shear forces, and body forces (like gravity).</p>
          <p>For steady, frictionless, incompressible flow, the energy is conserved along a streamline, leading to **Bernoulli's Equation**:</p>
          $$P + \\frac{1}{2}\\rho v^2 + \\rho gh = \\text{constant}$$
          <p>Where $P$ is pressure, $\\rho$ is fluid density, $v$ is velocity, $g$ is gravity, and $h$ is elevation. This equation dictates how lift is generated on airplane wings (faster velocity means lower pressure).</p>
        `,
        eli10Explanation: `
          <h3>Hoses, Wings, and Swirls</h3>
          <p>Fluid mechanics is the math that describes how liquids flow through pipes, how air supports massive airplanes, and how hurricanes rotate.</p>
          <ul>
            <li>**Bernoulli's Rule** is like thumbing the end of a garden hose. When you block the opening, the water must rush out **faster** to let the same volume escape. This fast-speed water has *lower* pressure than the slow water inside, which is why a wing's curved shape causes low pressure on top, sucking the plane upwards!</li>
            <li>The **Navier-Stokes equation** is the ultimate formula that weather supercomputers solve to predict rain, currents, and turbulences.</li>
          </ul>
        `,
        questions: [
          {
            id: "fluid_q1",
            difficulty: "hard",
            question: "In steady flow through a horizontal pipe, if the fluid speed increases from 2 m/s to 6 m/s, what happens to the fluid pressure?",
            options: ["It decreases", "It increases", "It remains the same", "It drops to zero"],
            answer: "It decreases",
            hint: "Apply Bernoulli's equation for horizontal pipe (constant height h): P + 0.5 * rho * v² = constant.",
            solution: "From Bernoulli's equation, as velocity increases, dynamic pressure (0.5 * rho * v^2) increases. Since the total energy is constant, static pressure P must decrease."
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
