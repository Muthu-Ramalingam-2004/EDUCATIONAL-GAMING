export const initialQuestionsData = [
  // =========================================================================
  // CLASS 9 MATHEMATICS QUESTIONS
  // =========================================================================

  // -------------------------------------------------------------------------
  // CLASS 9 WORLD 1: NUMBER QUEST (chapterId: "class9_world1", topicId: "number_systems")
  // -------------------------------------------------------------------------
  // Level 1: Rational Numbers (Easy)
  {
    id: "q9_w1_l1_1",
    classStandard: 9,
    chapterId: "class9_world1",
    chapterName: "World 1 – Number Quest",
    topicId: "number_systems",
    topicName: "Number Systems",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Which of the following is a rational number?",
    options: [
      { id: "A", text: "√2" },
      { id: "B", text: "π" },
      { id: "C", text: "0.75", isCorrect: true },
      { id: "D", text: "√3" }
    ],
    explanation: "0.75 can be expressed as 3/4, which is in p/q form where p and q are integers (q ≠ 0).",
    difficulty: "Easy",
    xpReward: 50,
    coinsReward: 20
  },
  {
    id: "q9_w1_l1_2",
    classStandard: 9,
    chapterId: "class9_world1",
    chapterName: "World 1 – Number Quest",
    topicId: "number_systems",
    topicName: "Number Systems",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "What is the decimal expansion of 1/8?",
    options: [
      { id: "A", text: "0.125", isCorrect: true },
      { id: "B", text: "0.25" },
      { id: "C", text: "0.375" },
      { id: "D", text: "0.5" }
    ],
    explanation: "1 divided by 8 equals 0.125, which is a terminating decimal expansion.",
    difficulty: "Easy",
    xpReward: 50,
    coinsReward: 20
  },
  {
    id: "p9_w1_l1_1",
    classStandard: 9,
    chapterId: "class9_world1",
    chapterName: "World 1 – Number Quest",
    topicId: "number_systems",
    topicName: "Number Systems",
    levelNumber: 1,
    questionType: "puzzle",
    questionText: "Find the missing number in the rational sequence:",
    problemStatement: "Sequence: 1/2, 2/3, 3/4, ?, 5/6",
    sequenceJson: {
      sequence: ["1/2", "2/3", "3/4", "?", "5/6"],
      answer: "4/5",
      options: ["3/5", "4/5", "7/8", "1"],
      hint: "Observe numerator n and denominator n+1."
    },
    explanation: "The nth term is n/(n+1). For n=4, the fraction is 4/5.",
    difficulty: "Easy",
    xpReward: 60,
    coinsReward: 25
  },
  {
    id: "dd9_w1_l1_1",
    classStandard: 9,
    chapterId: "class9_world1",
    chapterName: "World 1 – Number Quest",
    topicId: "number_systems",
    topicName: "Number Systems",
    levelNumber: 1,
    questionType: "dragdrop",
    questionText: "Arrange the steps to convert 0.333... into p/q form:",
    problemStatement: "Express recurring decimal 0.333... as p/q",
    sequenceJson: {
      correctOrder: [
        "Let x = 0.333...",
        "Multiply both sides by 10: 10x = 3.333...",
        "Subtract equation (1) from (2): 10x - x = 3.333... - 0.333...",
        "Simplify: 9x = 3",
        "Divide by 9: x = 3/9 = 1/3"
      ],
      initialShuffled: [
        "Multiply both sides by 10: 10x = 3.333...",
        "Divide by 9: x = 3/9 = 1/3",
        "Let x = 0.333...",
        "Simplify: 9x = 3",
        "Subtract equation (1) from (2): 10x - x = 3.333... - 0.333..."
      ]
    },
    explanation: "Standard algebraic procedure to convert repeating decimal to rational fraction.",
    difficulty: "Easy",
    xpReward: 70,
    coinsReward: 30
  },

  // Level 2: Irrational & Surds (Medium)
  {
    id: "q9_w1_l2_1",
    classStandard: 9,
    chapterId: "class9_world1",
    chapterName: "World 1 – Number Quest",
    topicId: "number_systems",
    topicName: "Number Systems",
    levelNumber: 2,
    questionType: "quiz",
    questionText: "Which of the following numbers is irrational?",
    options: [
      { id: "A", text: "√4" },
      { id: "B", text: "√9" },
      { id: "C", text: "√7", isCorrect: true },
      { id: "D", text: "√16" }
    ],
    explanation: "√7 cannot be expressed as a ratio of integers; its decimal expansion is non-terminating and non-repeating.",
    difficulty: "Medium",
    xpReward: 60,
    coinsReward: 25
  },
  {
    id: "q9_w1_l2_2",
    classStandard: 9,
    chapterId: "class9_world1",
    chapterName: "World 1 – Number Quest",
    topicId: "number_systems",
    topicName: "Number Systems",
    levelNumber: 2,
    questionType: "quiz",
    questionText: "What is the product of (2 + √3) and (2 - √3)?",
    options: [
      { id: "A", text: "1", isCorrect: true },
      { id: "B", text: "4" },
      { id: "C", text: "7" },
      { id: "D", text: "2" }
    ],
    explanation: "Using (a+b)(a-b) = a² - b²: (2)² - (√3)² = 4 - 3 = 1.",
    difficulty: "Medium",
    xpReward: 60,
    coinsReward: 25
  },
  {
    id: "p9_w1_l2_1",
    classStandard: 9,
    chapterId: "class9_world1",
    chapterName: "World 1 – Number Quest",
    topicId: "number_systems",
    topicName: "Number Systems",
    levelNumber: 2,
    questionType: "puzzle",
    questionText: "Find the next surd in the sequence:",
    problemStatement: "Sequence: √2, √8, √18, √32, ?",
    sequenceJson: {
      sequence: ["√2", "2√2", "3√2", "4√2", "?"],
      answer: "√50",
      options: ["√40", "√48", "√50", "√64"],
      hint: "Express as n√2 and simplify back inside square root."
    },
    explanation: "The pattern is 1√2, 2√2, 3√2, 4√2, 5√2. 5√2 = √(25 × 2) = √50.",
    difficulty: "Medium",
    xpReward: 70,
    coinsReward: 30
  },

  // Level 3: Laws of Exponents (Hard)
  {
    id: "q9_w1_l3_1",
    classStandard: 9,
    chapterId: "class9_world1",
    chapterName: "World 1 – Number Quest",
    topicId: "number_systems",
    topicName: "Number Systems",
    levelNumber: 3,
    questionType: "quiz",
    questionText: "Evaluate: (64)^(1/3)",
    options: [
      { id: "A", text: "2" },
      { id: "B", text: "4", isCorrect: true },
      { id: "C", text: "8" },
      { id: "D", text: "16" }
    ],
    explanation: "Since 4³ = 64, (64)^(1/3) = (4³)^(1/3) = 4^(3 × 1/3) = 4.",
    difficulty: "Hard",
    xpReward: 75,
    coinsReward: 30
  },
  {
    id: "q9_w1_l3_2",
    classStandard: 9,
    chapterId: "class9_world1",
    chapterName: "World 1 – Number Quest",
    topicId: "number_systems",
    topicName: "Number Systems",
    levelNumber: 3,
    questionType: "quiz",
    questionText: "Simplify: (2^3 × 2^4) ÷ 2^5",
    options: [
      { id: "A", text: "2" },
      { id: "B", text: "4", isCorrect: true },
      { id: "C", text: "8" },
      { id: "D", text: "16" }
    ],
    explanation: "2^(3+4) / 2^5 = 2^7 / 2^5 = 2^(7-5) = 2² = 4.",
    difficulty: "Hard",
    xpReward: 75,
    coinsReward: 30
  },

  // Level 4: Rationalising Denominators (Advanced)
  {
    id: "q9_w1_l4_1",
    classStandard: 9,
    chapterId: "class9_world1",
    chapterName: "World 1 – Number Quest",
    topicId: "number_systems",
    topicName: "Number Systems",
    levelNumber: 4,
    questionType: "quiz",
    questionText: "Rationalise the denominator of 1 / (√5 + √2):",
    options: [
      { id: "A", text: "(√5 - √2) / 3", isCorrect: true },
      { id: "B", text: "(√5 + √2) / 3" },
      { id: "C", text: "(√5 - √2) / 7" },
      { id: "D", text: "√5 - √2" }
    ],
    explanation: "Multiply numerator and denominator by conjugate (√5 - √2). Denominator becomes 5 - 2 = 3.",
    difficulty: "Hard",
    xpReward: 85,
    coinsReward: 35
  },

  // Level 5: Number Master Boss (Master)
  {
    id: "q9_w1_l5_1",
    classStandard: 9,
    chapterId: "class9_world1",
    chapterName: "World 1 – Number Quest",
    topicId: "number_systems",
    topicName: "Number Systems",
    levelNumber: 5,
    questionType: "quiz",
    questionText: "If x = 3 + 2√2, what is the value of x + 1/x?",
    options: [
      { id: "A", text: "4" },
      { id: "B", text: "6", isCorrect: true },
      { id: "C", text: "4√2" },
      { id: "D", text: "8" }
    ],
    explanation: "1/x = 1/(3+2√2) = 3-2√2. So x + 1/x = (3+2√2) + (3-2√2) = 6.",
    difficulty: "Master",
    xpReward: 100,
    coinsReward: 50
  },

  // -------------------------------------------------------------------------
  // CLASS 9 WORLD 2: ALGEBRA ARENA (chapterId: "class9_world2", topicId: "polynomials")
  // -------------------------------------------------------------------------
  // Level 1: Linear Equations in 2 Variables (Easy)
  {
    id: "q9_w2_l1_1",
    classStandard: 9,
    chapterId: "class9_world2",
    chapterName: "World 2 – Algebra Arena",
    topicId: "polynomials",
    topicName: "Algebra & Linear Equations",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Solve for x: 3x - 7 = 14",
    options: [
      { id: "A", text: "x = 5" },
      { id: "B", text: "x = 7", isCorrect: true },
      { id: "C", text: "x = 9" },
      { id: "D", text: "x = 21" }
    ],
    explanation: "3x = 14 + 7 => 3x = 21 => x = 7.",
    difficulty: "Easy",
    xpReward: 50,
    coinsReward: 20
  },
  {
    id: "q9_w2_l1_2",
    classStandard: 9,
    chapterId: "class9_world2",
    chapterName: "World 2 – Algebra Arena",
    topicId: "polynomials",
    topicName: "Algebra & Linear Equations",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Any point on the line y = x is of the form:",
    options: [
      { id: "A", text: "(a, a)", isCorrect: true },
      { id: "B", text: "(a, 0)" },
      { id: "C", text: "(0, a)" },
      { id: "D", text: "(a, -a)" }
    ],
    explanation: "On line y = x, x-coordinate and y-coordinate are always equal.",
    difficulty: "Easy",
    xpReward: 50,
    coinsReward: 20
  },
  {
    id: "p9_w2_l1_1",
    classStandard: 9,
    chapterId: "class9_world2",
    chapterName: "World 2 – Algebra Arena",
    topicId: "polynomials",
    topicName: "Algebra & Linear Equations",
    levelNumber: 1,
    questionType: "puzzle",
    questionText: "Find the missing term in the linear progression:",
    problemStatement: "Equation outputs for x=1,2,3,4,5 in y = 2x + 3:",
    sequenceJson: {
      sequence: ["5", "7", "9", "?", "13"],
      answer: "11",
      options: ["10", "11", "12", "15"],
      hint: "Add 2 to previous term (common difference = 2)."
    },
    explanation: "For x = 4, y = 2(4) + 3 = 11.",
    difficulty: "Easy",
    xpReward: 60,
    coinsReward: 25
  },
  {
    id: "dd9_w2_l1_1",
    classStandard: 9,
    chapterId: "class9_world2",
    chapterName: "World 2 – Algebra Arena",
    topicId: "polynomials",
    topicName: "Algebra & Linear Equations",
    levelNumber: 1,
    questionType: "dragdrop",
    questionText: "Reorder the solution steps for linear equation 4x - 8 = 16:",
    problemStatement: "Solve 4x - 8 = 16 step by step",
    sequenceJson: {
      correctOrder: [
        "Given equation: 4x - 8 = 16",
        "Add 8 to both sides: 4x = 16 + 8",
        "Simplify right side: 4x = 24",
        "Divide both sides by 4: x = 24 / 4",
        "Final solution: x = 6"
      ],
      initialShuffled: [
        "Simplify right side: 4x = 24",
        "Given equation: 4x - 8 = 16",
        "Final solution: x = 6",
        "Divide both sides by 4: x = 24 / 4",
        "Add 8 to both sides: 4x = 16 + 8"
      ]
    },
    explanation: "Standard step-by-step linear equation algebraic resolution.",
    difficulty: "Easy",
    xpReward: 70,
    coinsReward: 30
  },

  // Level 2: Graphing Equations (Medium)
  {
    id: "q9_w2_l2_1",
    classStandard: 9,
    chapterId: "class9_world2",
    chapterName: "World 2 – Algebra Arena",
    topicId: "polynomials",
    topicName: "Algebra & Graphing",
    levelNumber: 2,
    questionType: "quiz",
    questionText: "The graph of linear equation 2x + 3y = 6 cuts the x-axis at:",
    options: [
      { id: "A", text: "(3, 0)", isCorrect: true },
      { id: "B", text: "(0, 2)" },
      { id: "C", text: "(2, 3)" },
      { id: "D", text: "(6, 0)" }
    ],
    explanation: "At x-axis, y = 0. Substituting y = 0 gives 2x = 6 => x = 3. Point is (3,0).",
    difficulty: "Medium",
    xpReward: 60,
    coinsReward: 25
  },

  // Level 3: Polynomial Factorisation (Hard)
  {
    id: "q9_w2_l3_1",
    classStandard: 9,
    chapterId: "class9_world2",
    chapterName: "World 2 – Algebra Arena",
    topicId: "polynomials",
    topicName: "Polynomial Factorisation",
    levelNumber: 3,
    questionType: "quiz",
    questionText: "Factorise completely: x² - 5x + 6",
    options: [
      { id: "A", text: "(x-2)(x-3)", isCorrect: true },
      { id: "B", text: "(x+2)(x+3)" },
      { id: "C", text: "(x-1)(x-6)" },
      { id: "D", text: "(x+1)(x-6)" }
    ],
    explanation: "Find numbers that multiply to 6 and add to -5: -2 and -3. So (x-2)(x-3).",
    difficulty: "Hard",
    xpReward: 75,
    coinsReward: 30
  },

  // Level 4: Algebraic Identities (Advanced)
  {
    id: "q9_w2_l4_1",
    classStandard: 9,
    chapterId: "class9_world2",
    chapterName: "World 2 – Algebra Arena",
    topicId: "polynomials",
    topicName: "Algebraic Identities",
    levelNumber: 4,
    questionType: "quiz",
    questionText: "If a + b + c = 0, then a³ + b³ + c³ is equal to:",
    options: [
      { id: "A", text: "3abc", isCorrect: true },
      { id: "B", text: "0" },
      { id: "C", text: "abc" },
      { id: "D", text: "a²+b²+c²" }
    ],
    explanation: "Identity: a³ + b³ + c³ - 3abc = (a+b+c)(a²+b²+c²-ab-bc-ca). If a+b+c = 0, then a³+b³+c³ = 3abc.",
    difficulty: "Advanced",
    xpReward: 85,
    coinsReward: 35
  },

  // Level 5: Algebra Overlord (Master)
  {
    id: "q9_w2_l5_1",
    classStandard: 9,
    chapterId: "class9_world2",
    chapterName: "World 2 – Algebra Arena",
    topicId: "polynomials",
    topicName: "Master Algebra",
    levelNumber: 5,
    questionType: "quiz",
    questionText: "Find the remainder when P(x) = x³ - 3x² + 4x - 5 is divided by (x - 2):",
    options: [
      { id: "A", text: "-1", isCorrect: true },
      { id: "B", text: "3" },
      { id: "C", text: "0" },
      { id: "D", text: "-5" }
    ],
    explanation: "By Remainder Theorem, Remainder = P(2) = (2)³ - 3(2)² + 4(2) - 5 = 8 - 12 + 8 - 5 = -1.",
    difficulty: "Master",
    xpReward: 100,
    coinsReward: 50
  },

  // -------------------------------------------------------------------------
  // CLASS 9 WORLD 3: GEOMETRY KINGDOM (chapterId: "class9_world3", topicId: "triangles")
  // -------------------------------------------------------------------------
  // Level 1: Angle Sum Property (Easy)
  {
    id: "q9_w3_l1_1",
    classStandard: 9,
    chapterId: "class9_world3",
    chapterName: "World 3 – Geometry Kingdom",
    topicId: "triangles",
    topicName: "Geometry & Triangles",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "The sum of all interior angles of a triangle is:",
    options: [
      { id: "A", text: "90°" },
      { id: "B", text: "180°", isCorrect: true },
      { id: "C", text: "270°" },
      { id: "D", text: "360°" }
    ],
    explanation: "The angle sum property of any triangle states that interior angles sum to 180°.",
    difficulty: "Easy",
    xpReward: 50,
    coinsReward: 20
  },
  {
    id: "p9_w3_l1_1",
    classStandard: 9,
    chapterId: "class9_world3",
    chapterName: "World 3 – Geometry Kingdom",
    topicId: "triangles",
    topicName: "Geometry & Triangles",
    levelNumber: 1,
    questionType: "puzzle",
    questionText: "Find the missing third angle of ΔABC:",
    problemStatement: "Given ∠A = 60°, ∠B = 70°, find ∠C:",
    sequenceJson: {
      sequence: ["∠A = 60°", "∠B = 70°", "∠C = ?"],
      answer: "50°",
      options: ["40°", "50°", "60°", "80°"],
      hint: "Angle sum property: ∠A + ∠B + ∠C = 180°."
    },
    explanation: "∠C = 180° - (60° + 70°) = 180° - 130° = 50°.",
    difficulty: "Easy",
    xpReward: 60,
    coinsReward: 25
  },

  // Level 2: Parallel Lines & Transversals (Medium)
  {
    id: "q9_w3_l2_1",
    classStandard: 9,
    chapterId: "class9_world3",
    chapterName: "World 3 – Geometry Kingdom",
    topicId: "triangles",
    topicName: "Parallel Lines",
    levelNumber: 2,
    questionType: "quiz",
    questionText: "If two parallel lines are cut by a transversal, alternate interior angles are:",
    options: [
      { id: "A", text: "Equal", isCorrect: true },
      { id: "B", text: "Supplementary" },
      { id: "C", text: "Complementary" },
      { id: "D", text: "Unequal" }
    ],
    explanation: "By parallel line theorems, alternate interior angles formed by a transversal are equal.",
    difficulty: "Medium",
    xpReward: 60,
    coinsReward: 25
  },

  // Level 3: Triangle Congruence Criteria (Hard)
  {
    id: "q9_w3_l3_1",
    classStandard: 9,
    chapterId: "class9_world3",
    chapterName: "World 3 – Geometry Kingdom",
    topicId: "triangles",
    topicName: "Congruence Criteria",
    levelNumber: 3,
    questionType: "quiz",
    questionText: "Which of the following is NOT a valid congruence criterion for triangles?",
    options: [
      { id: "A", text: "SAS" },
      { id: "B", text: "ASA" },
      { id: "C", text: "SSA", isCorrect: true },
      { id: "D", text: "SSS" }
    ],
    explanation: "SSA (Side-Side-Angle) is not a guaranteed congruence criterion.",
    difficulty: "Hard",
    xpReward: 75,
    coinsReward: 30
  },

  // Level 4: Quadrilateral Theorems (Advanced)
  {
    id: "q9_w3_l4_1",
    classStandard: 9,
    chapterId: "class9_world3",
    chapterName: "World 3 – Geometry Kingdom",
    topicId: "triangles",
    topicName: "Quadrilaterals",
    levelNumber: 4,
    questionType: "quiz",
    questionText: "The diagonals of a rhombus intersect each other at:",
    options: [
      { id: "A", text: "45°" },
      { id: "B", text: "60°" },
      { id: "C", text: "90°", isCorrect: true },
      { id: "D", text: "120°" }
    ],
    explanation: "Diagonals of a rhombus are perpendicular bisectors of each other (intersect at 90°).",
    difficulty: "Advanced",
    xpReward: 85,
    coinsReward: 35
  },

  // Level 5: Geometry Titan (Master)
  {
    id: "q9_w3_l5_1",
    classStandard: 9,
    chapterId: "class9_world3",
    chapterName: "World 3 – Geometry Kingdom",
    topicId: "triangles",
    topicName: "Master Geometry",
    levelNumber: 5,
    questionType: "quiz",
    questionText: "In a circle, the angle subtended by an arc at the center is:",
    options: [
      { id: "A", text: "Double the angle subtended at any point on remaining arc", isCorrect: true },
      { id: "B", text: "Equal to the angle subtended on remaining arc" },
      { id: "C", text: "Half the angle subtended on remaining arc" },
      { id: "D", text: "90° always" }
    ],
    explanation: "Circle Theorem: The central angle is twice the angle subtended at any point on the circumference.",
    difficulty: "Master",
    xpReward: 100,
    coinsReward: 50
  },

  // -------------------------------------------------------------------------
  // CLASS 9 WORLD 4: MENSURATION MISSION (chapterId: "class9_world4", topicId: "mensuration")
  // -------------------------------------------------------------------------
  // Level 1: Heron's Formula (Easy)
  {
    id: "q9_w4_l1_1",
    classStandard: 9,
    chapterId: "class9_world4",
    chapterName: "World 4 – Mensuration Mission",
    topicId: "mensuration",
    topicName: "Mensuration",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "In Heron's formula Area = √(s(s-a)(s-b)(s-c)), 's' represents:",
    options: [
      { id: "A", text: "Side of triangle" },
      { id: "B", text: "Semi-perimeter of triangle", isCorrect: true },
      { id: "C", text: "Sum of angles" },
      { id: "D", text: "Surface area" }
    ],
    explanation: "s = (a + b + c) / 2 is the semi-perimeter of the triangle.",
    difficulty: "Easy",
    xpReward: 50,
    coinsReward: 20
  },

  // Level 2: Surface Area of Cylinders (Medium)
  {
    id: "q9_w4_l2_1",
    classStandard: 9,
    chapterId: "class9_world4",
    chapterName: "World 4 – Mensuration Mission",
    topicId: "mensuration",
    topicName: "Surface Area",
    levelNumber: 2,
    questionType: "quiz",
    questionText: "Curved surface area of a cylinder of radius r and height h is:",
    options: [
      { id: "A", text: "πr²h" },
      { id: "B", text: "2πrh", isCorrect: true },
      { id: "C", text: "2πr(r+h)" },
      { id: "D", text: "πrh" }
    ],
    explanation: "Curved Surface Area (CSA) of cylinder = 2πrh.",
    difficulty: "Medium",
    xpReward: 60,
    coinsReward: 25
  },

  // Level 3: Volume of Cones & Spheres (Hard)
  {
    id: "q9_w4_l3_1",
    classStandard: 9,
    chapterId: "class9_world4",
    chapterName: "World 4 – Mensuration Mission",
    topicId: "mensuration",
    topicName: "Volumes",
    levelNumber: 3,
    questionType: "quiz",
    questionText: "What is the volume of a sphere of radius r?",
    options: [
      { id: "A", text: "(4/3)πr³", isCorrect: true },
      { id: "B", text: "4πr²" },
      { id: "C", text: "(1/3)πr²h" },
      { id: "D", text: "2πr³" }
    ],
    explanation: "The formula for volume of a sphere is V = (4/3)πr³.",
    difficulty: "Hard",
    xpReward: 75,
    coinsReward: 30
  },

  // Level 4: Combined Solid Volumes (Advanced)
  {
    id: "q9_w4_l4_1",
    classStandard: 9,
    chapterId: "class9_world4",
    chapterName: "World 4 – Mensuration Mission",
    topicId: "mensuration",
    topicName: "Combined Solids",
    levelNumber: 4,
    questionType: "quiz",
    questionText: "A wooden toy is in the form of a cone mounted on a hemisphere of same radius r. Total volume is:",
    options: [
      { id: "A", text: "(1/3)πr²h + (2/3)πr³", isCorrect: true },
      { id: "B", text: "πr²h + 4/3 πr³" },
      { id: "C", text: "2/3 πr²h" },
      { id: "D", text: "πr(r+l)" }
    ],
    explanation: "Total Volume = Vol(Cone) + Vol(Hemisphere) = (1/3)πr²h + (2/3)πr³.",
    difficulty: "Advanced",
    xpReward: 85,
    coinsReward: 35
  },

  // Level 5: Mensuration Monarch (Master)
  {
    id: "q9_w4_l5_1",
    classStandard: 9,
    chapterId: "class9_world4",
    chapterName: "World 4 – Mensuration Mission",
    topicId: "mensuration",
    topicName: "Master Mensuration",
    levelNumber: 5,
    questionType: "quiz",
    questionText: "If the radius of a sphere is doubled, its surface area increases by a factor of:",
    options: [
      { id: "A", text: "2" },
      { id: "B", text: "4", isCorrect: true },
      { id: "C", text: "6" },
      { id: "D", text: "8" }
    ],
    explanation: "Surface Area S = 4πr². If r -> 2r, S' = 4π(2r)² = 4 × (4πr²) = 4S.",
    difficulty: "Master",
    xpReward: 100,
    coinsReward: 50
  },

  // -------------------------------------------------------------------------
  // CLASS 9 WORLD 5: STATISTICS ZONE (chapterId: "class9_world5", topicId: "statistics")
  // -------------------------------------------------------------------------
  // Level 1: Mean, Median, Mode (Easy)
  {
    id: "q9_w5_l1_1",
    classStandard: 9,
    chapterId: "class9_world5",
    chapterName: "World 5 – Statistics Zone",
    topicId: "statistics",
    topicName: "Statistics Basics",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Find the mean of numbers: 4, 8, 12, 16, 20:",
    options: [
      { id: "A", text: "10" },
      { id: "B", text: "12", isCorrect: true },
      { id: "C", text: "14" },
      { id: "D", text: "16" }
    ],
    explanation: "Mean = (4 + 8 + 12 + 16 + 20) / 5 = 60 / 5 = 12.",
    difficulty: "Easy",
    xpReward: 50,
    coinsReward: 20
  },

  // Level 2: Histograms & Frequency Polygons (Medium)
  {
    id: "q9_w5_l2_1",
    classStandard: 9,
    chapterId: "class9_world5",
    chapterName: "World 5 – Statistics Zone",
    topicId: "statistics",
    topicName: "Frequency Distribution",
    levelNumber: 2,
    questionType: "quiz",
    questionText: "The class mark of the class interval 10 - 25 is:",
    options: [
      { id: "A", text: "15" },
      { id: "B", text: "17.5", isCorrect: true },
      { id: "C", text: "20" },
      { id: "D", text: "35" }
    ],
    explanation: "Class Mark = (Upper Limit + Lower Limit) / 2 = (25 + 10) / 2 = 35 / 2 = 17.5.",
    difficulty: "Medium",
    xpReward: 60,
    coinsReward: 25
  },

  // Level 3: Empirical Probability (Hard)
  {
    id: "q9_w5_l3_1",
    classStandard: 9,
    chapterId: "class9_world5",
    chapterName: "World 5 – Statistics Zone",
    topicId: "statistics",
    topicName: "Probability",
    levelNumber: 3,
    questionType: "quiz",
    questionText: "In 500 tosses of a coin, heads was obtained 260 times. Empirical probability of getting a tail is:",
    options: [
      { id: "A", text: "260/500" },
      { id: "B", text: "240/500", isCorrect: true },
      { id: "C", text: "1/2" },
      { id: "D", text: "1" }
    ],
    explanation: "Number of tails = 500 - 260 = 240. Probability = 240 / 500 = 12/25.",
    difficulty: "Hard",
    xpReward: 75,
    coinsReward: 30
  },

  // Level 4: Experimental Trial Simulation (Advanced)
  {
    id: "q9_w5_l4_1",
    classStandard: 9,
    chapterId: "class9_world5",
    chapterName: "World 5 – Statistics Zone",
    topicId: "statistics",
    topicName: "Experimental Probability",
    levelNumber: 4,
    questionType: "quiz",
    questionText: "If P(E) = 0.37, what is P(not E)?",
    options: [
      { id: "A", text: "0.37" },
      { id: "B", text: "0.63", isCorrect: true },
      { id: "C", text: "0.73" },
      { id: "D", text: "1.00" }
    ],
    explanation: "P(E) + P(not E) = 1 => P(not E) = 1 - 0.37 = 0.63.",
    difficulty: "Advanced",
    xpReward: 85,
    coinsReward: 35
  },

  // Level 5: Stats Mastermind (Master)
  {
    id: "q9_w5_l5_1",
    classStandard: 9,
    chapterId: "class9_world5",
    chapterName: "World 5 – Statistics Zone",
    topicId: "statistics",
    topicName: "Master Statistics",
    levelNumber: 5,
    questionType: "quiz",
    questionText: "The mean of 10 numbers is 15. If one number 21 is excluded, what is the new mean?",
    options: [
      { id: "A", text: "14.33..." },
      { id: "B", text: "14.33" },
      { id: "C", text: "14.333...", isCorrect: true },
      { id: "D", text: "15" }
    ],
    explanation: "Sum of 10 = 150. New sum = 150 - 21 = 129. New mean = 129 / 9 = 14.333...",
    difficulty: "Master",
    xpReward: 100,
    coinsReward: 50
  },

  // =========================================================================
  // CLASS 10 MATHEMATICS QUESTIONS
  // =========================================================================

  // -------------------------------------------------------------------------
  // CLASS 10 WORLD 1: REAL NUMBERS (chapterId: "class10_world1", topicId: "real_numbers_10")
  // -------------------------------------------------------------------------
  // Level 1: Euclid's HCF Algorithm (Easy)
  {
    id: "q10_w1_l1_1",
    classStandard: 10,
    chapterId: "class10_world1",
    chapterName: "World 1 – Real Numbers",
    topicId: "real_numbers_10",
    topicName: "Real Numbers",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "What is the HCF of 135 and 225 using Euclid's division algorithm?",
    options: [
      { id: "A", text: "15" },
      { id: "B", text: "45", isCorrect: true },
      { id: "C", text: "75" },
      { id: "D", text: "90" }
    ],
    explanation: "225 = 135 × 1 + 90; 135 = 90 × 1 + 45; 90 = 45 × 2 + 0. Last non-zero remainder is 45.",
    difficulty: "Easy",
    xpReward: 60,
    coinsReward: 25
  },
  {
    id: "q10_w1_l1_2",
    classStandard: 10,
    chapterId: "class10_world1",
    chapterName: "World 1 – Real Numbers",
    topicId: "real_numbers_10",
    topicName: "Real Numbers",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "The exponent of 2 in the prime factorisation of 144 is:",
    options: [
      { id: "A", text: "2" },
      { id: "B", text: "3" },
      { id: "C", text: "4", isCorrect: true },
      { id: "D", text: "6" }
    ],
    explanation: "144 = 2⁴ × 3². The power of 2 is 4.",
    difficulty: "Easy",
    xpReward: 60,
    coinsReward: 25
  },
  {
    id: "p10_w1_l1_1",
    classStandard: 10,
    chapterId: "class10_world1",
    chapterName: "World 1 – Real Numbers",
    topicId: "real_numbers_10",
    topicName: "Real Numbers",
    levelNumber: 1,
    questionType: "puzzle",
    questionText: "Complete Euclid's Division Lemma steps:",
    problemStatement: "225 = 135 × 1 + 90 ➔ 135 = 90 × 1 + 45 ➔ 90 = 45 × ? + 0",
    sequenceJson: {
      sequence: ["225=135(1)+90", "135=90(1)+45", "90=45(?)+0"],
      answer: "2",
      options: ["1", "2", "3", "4"],
      hint: "How many times does 45 go into 90?"
    },
    explanation: "45 × 2 = 90. Remainder is 0, so HCF is 45.",
    difficulty: "Easy",
    xpReward: 70,
    coinsReward: 30
  },
  {
    id: "dd10_w1_l1_1",
    classStandard: 10,
    chapterId: "class10_world1",
    chapterName: "World 1 – Real Numbers",
    topicId: "real_numbers_10",
    topicName: "Real Numbers",
    levelNumber: 1,
    questionType: "dragdrop",
    questionText: "Arrange the proof steps to prove √2 is irrational:",
    problemStatement: "Proof by contradiction for irrationality of √2",
    sequenceJson: {
      correctOrder: [
        "Assume to the contrary that √2 is rational",
        "Write √2 = a/b where a and b are co-prime integers (b ≠ 0)",
        "Square both sides: 2 = a²/b² => 2b² = a²",
        "Thus 2 divides a², which implies 2 divides a",
        "Substitute a = 2c: 2b² = 4c² => b² = 2c², so 2 divides b",
        "Contradiction: 2 divides both a and b, contradicting co-prime assumption. Thus √2 is irrational"
      ],
      initialShuffled: [
        "Square both sides: 2 = a²/b² => 2b² = a²",
        "Assume to the contrary that √2 is rational",
        "Contradiction: 2 divides both a and b, contradicting co-prime assumption. Thus √2 is irrational",
        "Substitute a = 2c: 2b² = 4c² => b² = 2c², so 2 divides b",
        "Write √2 = a/b where a and b are co-prime integers (b ≠ 0)",
        "Thus 2 divides a², which implies 2 divides a"
      ]
    },
    explanation: "Classical proof by contradiction for irrationality.",
    difficulty: "Easy",
    xpReward: 80,
    coinsReward: 35
  },

  // Level 2: Prime Factorisation & LCM (Medium)
  {
    id: "q10_w1_l2_1",
    classStandard: 10,
    chapterId: "class10_world1",
    chapterName: "World 1 – Real Numbers",
    topicId: "real_numbers_10",
    topicName: "HCF & LCM",
    levelNumber: 2,
    questionType: "quiz",
    questionText: "If HCF(306, 657) = 9, what is LCM(306, 657)?",
    options: [
      { id: "A", text: "22338", isCorrect: true },
      { id: "B", text: "11234" },
      { id: "C", text: "30600" },
      { id: "D", text: "45000" }
    ],
    explanation: "HCF × LCM = Product of numbers => 9 × LCM = 306 × 657 => LCM = 22338.",
    difficulty: "Medium",
    xpReward: 70,
    coinsReward: 30
  },

  // Level 3: Proving Irrationality (Hard)
  {
    id: "q10_w1_l3_1",
    classStandard: 10,
    chapterId: "class10_world1",
    chapterName: "World 1 – Real Numbers",
    topicId: "real_numbers_10",
    topicName: "Irrationality Proofs",
    levelNumber: 3,
    questionType: "quiz",
    questionText: "If p is a prime number, then √p is always:",
    options: [
      { id: "A", text: "Irrational", isCorrect: true },
      { id: "B", text: "Rational" },
      { id: "C", text: "An integer" },
      { id: "D", text: "A non-real complex number" }
    ],
    explanation: "The square root of any prime number is an irrational number.",
    difficulty: "Hard",
    xpReward: 80,
    coinsReward: 35
  },

  // Level 4: Decimal Expansions (Advanced)
  {
    id: "q10_w1_l4_1",
    classStandard: 10,
    chapterId: "class10_world1",
    chapterName: "World 1 – Real Numbers",
    topicId: "real_numbers_10",
    topicName: "Decimal Expansions",
    levelNumber: 4,
    questionType: "quiz",
    questionText: "The rational number 13 / 125 will have a decimal expansion that terminates after how many decimal places?",
    options: [
      { id: "A", text: "1" },
      { id: "B", text: "2" },
      { id: "C", text: "3", isCorrect: true },
      { id: "D", text: "4" }
    ],
    explanation: "125 = 5³. Denominator is 2^0 × 5³. Highest power is 3, so it terminates after 3 places (0.104).",
    difficulty: "Advanced",
    xpReward: 90,
    coinsReward: 40
  },

  // Level 5: Real Number Supreme (Master)
  {
    id: "q10_w1_l5_1",
    classStandard: 10,
    chapterId: "class10_world1",
    chapterName: "World 1 – Real Numbers",
    topicId: "real_numbers_10",
    topicName: "Real Number Supreme",
    levelNumber: 5,
    questionType: "quiz",
    questionText: "If n is a natural number, then 6^n - 5^n always ends with which digit?",
    options: [
      { id: "A", text: "1", isCorrect: true },
      { id: "B", text: "3" },
      { id: "C", text: "5" },
      { id: "D", text: "9" }
    ],
    explanation: "6^n always ends in 6 and 5^n always ends in 5. So 6^n - 5^n ends in 6 - 5 = 1.",
    difficulty: "Master",
    xpReward: 100,
    coinsReward: 50
  },

  // -------------------------------------------------------------------------
  // CLASS 10 WORLD 2: ALGEBRA MASTER (chapterId: "class10_world2", topicId: "algebra_10")
  // -------------------------------------------------------------------------
  // Level 1: Zeroes of Polynomials (Easy)
  {
    id: "q10_w2_l1_1",
    classStandard: 10,
    chapterId: "class10_world2",
    chapterName: "World 2 – Algebra Master",
    topicId: "algebra_10",
    topicName: "Algebra & AP",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "What are the zeroes of the quadratic polynomial P(x) = x² - 9?",
    options: [
      { id: "A", text: "3 and -3", isCorrect: true },
      { id: "B", text: "9 and -9" },
      { id: "C", text: "0 and 9" },
      { id: "D", text: "3 and 3" }
    ],
    explanation: "x² - 9 = 0 => (x-3)(x+3) = 0 => x = 3 or x = -3.",
    difficulty: "Easy",
    xpReward: 60,
    coinsReward: 20
  },
  {
    id: "p10_w2_l1_1",
    classStandard: 10,
    chapterId: "class10_world2",
    chapterName: "World 2 – Algebra Master",
    topicId: "algebra_10",
    topicName: "Algebra & AP",
    levelNumber: 1,
    questionType: "puzzle",
    questionText: "Find the 5th term of the Arithmetic Progression:",
    problemStatement: "AP: 3, 7, 11, 15, ?",
    sequenceJson: {
      sequence: ["3", "7", "11", "15", "?"],
      answer: "19",
      options: ["17", "18", "19", "21"],
      hint: "Common difference d = 4. Add 4 to 15."
    },
    explanation: "a = 3, d = 4. 5th term = 15 + 4 = 19.",
    difficulty: "Easy",
    xpReward: 60,
    coinsReward: 25
  },

  // Level 2: Quadratic Formula & Discriminant (Medium)
  {
    id: "q10_w2_l2_1",
    classStandard: 10,
    chapterId: "class10_world2",
    chapterName: "World 2 – Algebra Master",
    topicId: "algebra_10",
    topicName: "Quadratic Equations",
    levelNumber: 2,
    questionType: "quiz",
    questionText: "What is the discriminant of 2x² - 4x + 3 = 0?",
    options: [
      { id: "A", text: "-8", isCorrect: true },
      { id: "B", text: "8" },
      { id: "C", text: "16" },
      { id: "D", text: "-16" }
    ],
    explanation: "D = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24 = -8.",
    difficulty: "Medium",
    xpReward: 70,
    coinsReward: 30
  },

  // Level 3: AP nth term (Hard)
  {
    id: "q10_w2_l3_1",
    classStandard: 10,
    chapterId: "class10_world2",
    chapterName: "World 2 – Algebra Master",
    topicId: "algebra_10",
    topicName: "Arithmetic Progressions",
    levelNumber: 3,
    questionType: "quiz",
    questionText: "What is the 10th term of the AP: 2, 7, 12, 17...?",
    options: [
      { id: "A", text: "47", isCorrect: true },
      { id: "B", text: "42" },
      { id: "C", text: "52" },
      { id: "D", text: "50" }
    ],
    explanation: "a_n = a + (n-1)d => a_10 = 2 + (9 × 5) = 2 + 45 = 47.",
    difficulty: "Hard",
    xpReward: 80,
    coinsReward: 35
  },

  // Level 4: Sum of first n terms of AP (Advanced)
  {
    id: "q10_w2_l4_1",
    classStandard: 10,
    chapterId: "class10_world2",
    chapterName: "World 2 – Algebra Master",
    topicId: "algebra_10",
    topicName: "Sum of AP",
    levelNumber: 4,
    questionType: "quiz",
    questionText: "What is the sum of the first 20 positive integers (1 + 2 + ... + 20)?",
    options: [
      { id: "A", text: "210", isCorrect: true },
      { id: "B", text: "200" },
      { id: "C", text: "190" },
      { id: "D", text: "400" }
    ],
    explanation: "S_n = n(n+1)/2 => S_20 = 20 × 21 / 2 = 210.",
    difficulty: "Advanced",
    xpReward: 90,
    coinsReward: 40
  },

  // Level 5: Algebra Champion (Master)
  {
    id: "q10_w2_l5_1",
    classStandard: 10,
    chapterId: "class10_world2",
    chapterName: "World 2 – Algebra Master",
    topicId: "algebra_10",
    topicName: "Master Algebra",
    levelNumber: 5,
    questionType: "quiz",
    questionText: "If the roots of quadratic equation ax² + bx + c = 0 are equal, then c = :",
    options: [
      { id: "A", text: "b² / 4a", isCorrect: true },
      { id: "B", text: "-b / 2a" },
      { id: "C", text: "b² / 2a" },
      { id: "D", text: "-b² / 4a" }
    ],
    explanation: "For equal roots, D = b² - 4ac = 0 => 4ac = b² => c = b² / (4a).",
    difficulty: "Master",
    xpReward: 100,
    coinsReward: 50
  },

  // -------------------------------------------------------------------------
  // CLASS 10 WORLD 3: COORDINATE QUEST (chapterId: "class10_world3", topicId: "coordinate_10")
  // -------------------------------------------------------------------------
  // Level 1: Distance Formula (Easy)
  {
    id: "q10_w3_l1_1",
    classStandard: 10,
    chapterId: "class10_world3",
    chapterName: "World 3 – Coordinate Quest",
    topicId: "coordinate_10",
    topicName: "Coordinate Geometry",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Find the distance between the origin (0,0) and point P(6, 8):",
    options: [
      { id: "A", text: "10 units", isCorrect: true },
      { id: "B", text: "14 units" },
      { id: "C", text: "12 units" },
      { id: "D", text: "7 units" }
    ],
    explanation: "Distance = √(6² + 8²) = √(36 + 64) = √100 = 10 units.",
    difficulty: "Easy",
    xpReward: 60,
    coinsReward: 20
  },

  // Level 2: Section Formula (Medium)
  {
    id: "q10_w3_l2_1",
    classStandard: 10,
    chapterId: "class10_world3",
    chapterName: "World 3 – Coordinate Quest",
    topicId: "coordinate_10",
    topicName: "Section Formula",
    levelNumber: 2,
    questionType: "quiz",
    questionText: "The midpoint of the line segment joining points (4, 6) and (2, 2) is:",
    options: [
      { id: "A", text: "(3, 4)", isCorrect: true },
      { id: "B", text: "(6, 8)" },
      { id: "C", text: "(2, 4)" },
      { id: "D", text: "(3, 3)" }
    ],
    explanation: "Midpoint = ((4+2)/2, (6+2)/2) = (6/2, 8/2) = (3, 4).",
    difficulty: "Medium",
    xpReward: 70,
    coinsReward: 30
  },

  // Level 3: Midpoint & Centroid (Hard)
  {
    id: "q10_w3_l3_1",
    classStandard: 10,
    chapterId: "class10_world3",
    chapterName: "World 3 – Coordinate Quest",
    topicId: "coordinate_10",
    topicName: "Centroid of Triangle",
    levelNumber: 3,
    questionType: "quiz",
    questionText: "Centroid of ΔABC with vertices (0,0), (6,0), and (0,6) is:",
    options: [
      { id: "A", text: "(2, 2)", isCorrect: true },
      { id: "B", text: "(3, 3)" },
      { id: "C", text: "(6, 6)" },
      { id: "D", text: "(1, 1)" }
    ],
    explanation: "Centroid = ((0+6+0)/3, (0+0+6)/3) = (6/3, 6/3) = (2, 2).",
    difficulty: "Hard",
    xpReward: 80,
    coinsReward: 35
  },

  // Level 4: Area of Triangle (Advanced)
  {
    id: "q10_w4_l4_co",
    classStandard: 10,
    chapterId: "class10_world3",
    chapterName: "World 3 – Coordinate Quest",
    topicId: "coordinate_10",
    topicName: "Area of Triangle",
    levelNumber: 4,
    questionType: "quiz",
    questionText: "Points A(1, 2), B(0, 0), and C(a, b) are collinear if:",
    options: [
      { id: "A", text: "2a = b", isCorrect: true },
      { id: "B", text: "a = 2b" },
      { id: "C", text: "a + b = 0" },
      { id: "D", text: "a = b" }
    ],
    explanation: "For collinear points, Area of Triangle = 0 => 1/2 | 1(0 - b) + 0(b - 2) + a(2 - 0) | = 0 => -b + 2a = 0 => 2a = b.",
    difficulty: "Advanced",
    xpReward: 90,
    coinsReward: 40
  },

  // Level 5: Coordinate Legend (Master)
  {
    id: "q10_w3_l5_1",
    classStandard: 10,
    chapterId: "class10_world3",
    chapterName: "World 3 – Coordinate Quest",
    topicId: "coordinate_10",
    topicName: "Master Coordinate",
    levelNumber: 5,
    questionType: "quiz",
    questionText: "The ratio in which the y-axis divides the line segment joining (-4, 2) and (8, 3) is:",
    options: [
      { id: "A", text: "1 : 2", isCorrect: true },
      { id: "B", text: "2 : 1" },
      { id: "C", text: "1 : 3" },
      { id: "D", text: "3 : 4" }
    ],
    explanation: "At y-axis x = 0. By section formula: (k(8) - 4)/(k+1) = 0 => 8k = 4 => k = 1/2. Ratio is 1:2.",
    difficulty: "Master",
    xpReward: 100,
    coinsReward: 50
  },

  // -------------------------------------------------------------------------
  // CLASS 10 WORLD 4: GEOMETRY & TRIGONOMETRY (chapterId: "class10_world4", topicId: "trigonometry_10")
  // -------------------------------------------------------------------------
  // Level 1: Trig Ratios & Values (Easy)
  {
    id: "q10_w4_l1_1",
    classStandard: 10,
    chapterId: "class10_world4",
    chapterName: "World 4 – Geometry & Trigonometry",
    topicId: "trigonometry_10",
    topicName: "Trigonometry",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "What is the value of sin(30°)?",
    options: [
      { id: "A", text: "1/2", isCorrect: true },
      { id: "B", text: "√3/2" },
      { id: "C", text: "1/√2" },
      { id: "D", text: "1" }
    ],
    explanation: "Standard trigonometric ratio table value: sin(30°) = 1/2.",
    difficulty: "Easy",
    xpReward: 60,
    coinsReward: 20
  },
  {
    id: "p10_w4_l1_1",
    classStandard: 10,
    chapterId: "class10_world4",
    chapterName: "World 4 – Geometry & Trigonometry",
    topicId: "trigonometry_10",
    topicName: "Trigonometry",
    levelNumber: 1,
    questionType: "puzzle",
    questionText: "Complete the trigonometric ratio identity:",
    problemStatement: "tan(θ) = sin(θ) / ?",
    sequenceJson: {
      sequence: ["tan(θ)", "=", "sin(θ)", "/", "?"],
      answer: "cos(θ)",
      options: ["cos(θ)", "cot(θ)", "sec(θ)", "1"],
      hint: "Tangent is sine divided by cosine."
    },
    explanation: "By definition, tan(θ) = sin(θ) / cos(θ).",
    difficulty: "Easy",
    xpReward: 70,
    coinsReward: 25
  },

  // Level 2: Trigonometric Identities (Medium)
  {
    id: "q10_w4_l2_1",
    classStandard: 10,
    chapterId: "class10_world4",
    chapterName: "World 4 – Geometry & Trigonometry",
    topicId: "trigonometry_10",
    topicName: "Trig Identities",
    levelNumber: 2,
    questionType: "quiz",
    questionText: "Evaluate: 9 sec²(A) - 9 tan²(A)",
    options: [
      { id: "A", text: "9", isCorrect: true },
      { id: "B", text: "1" },
      { id: "C", text: "0" },
      { id: "D", text: "8" }
    ],
    explanation: "9(sec²A - tan²A) = 9(1) = 9.",
    difficulty: "Medium",
    xpReward: 70,
    coinsReward: 30
  },

  // Level 3: Tangents to a Circle (Hard)
  {
    id: "q10_w4_l3_1",
    classStandard: 10,
    chapterId: "class10_world4",
    chapterName: "World 4 – Geometry & Trigonometry",
    topicId: "trigonometry_10",
    topicName: "Circle Tangents",
    levelNumber: 3,
    questionType: "quiz",
    questionText: "The lengths of tangents drawn from an external point to a circle are:",
    options: [
      { id: "A", text: "Equal", isCorrect: true },
      { id: "B", text: "Unequal" },
      { id: "C", text: "Perpendicular" },
      { id: "D", text: "Parallel" }
    ],
    explanation: "Circle Theorem: Tangents drawn from an external point to a circle are equal in length.",
    difficulty: "Hard",
    xpReward: 80,
    coinsReward: 35
  },

  // Level 4: Angles of Elevation & Depression (Advanced)
  {
    id: "q10_w4_l4_1",
    classStandard: 10,
    chapterId: "class10_world4",
    chapterName: "World 4 – Geometry & Trigonometry",
    topicId: "trigonometry_10",
    topicName: "Heights & Distances",
    levelNumber: 4,
    questionType: "quiz",
    questionText: "If a tower 30m high casts a shadow 10√3 m long, the angle of elevation of the sun is:",
    options: [
      { id: "A", text: "30°" },
      { id: "B", text: "45°" },
      { id: "C", text: "60°", isCorrect: true },
      { id: "D", text: "90°" }
    ],
    explanation: "tan(θ) = height / shadow = 30 / (10√3) = 3/√3 = √3 => θ = 60°.",
    difficulty: "Advanced",
    xpReward: 90,
    coinsReward: 40
  },

  // Level 5: Trig & Geometry Overlord (Master)
  {
    id: "q10_w4_l5_1",
    classStandard: 10,
    chapterId: "class10_world4",
    chapterName: "World 4 – Geometry & Trigonometry",
    topicId: "trigonometry_10",
    topicName: "Master Trigonometry",
    levelNumber: 5,
    questionType: "quiz",
    questionText: "If sin(θ) + sin²(θ) = 1, then cos²(θ) + cos⁴(θ) = :",
    options: [
      { id: "A", text: "1", isCorrect: true },
      { id: "B", text: "0" },
      { id: "C", text: "2" },
      { id: "D", text: "1/2" }
    ],
    explanation: "sin(θ) = 1 - sin²(θ) = cos²(θ). Squaring gives sin²(θ) = cos⁴(θ). So cos²(θ) + cos⁴(θ) = sin(θ) + sin²(θ) = 1.",
    difficulty: "Master",
    xpReward: 100,
    coinsReward: 50
  },

  // -------------------------------------------------------------------------
  // CLASS 10 WORLD 5: PROBABILITY ARENA (chapterId: "class10_world5", topicId: "probability_10")
  // -------------------------------------------------------------------------
  // Level 1: Coin & Dice Probability (Easy)
  {
    id: "q10_w5_l1_1",
    classStandard: 10,
    chapterId: "class10_world5",
    chapterName: "World 5 – Probability Arena",
    topicId: "probability_10",
    topicName: "Probability",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "When a single fair die is rolled, what is the probability of getting an even number?",
    options: [
      { id: "A", text: "1/2", isCorrect: true },
      { id: "B", text: "1/3" },
      { id: "C", text: "1/6" },
      { id: "D", text: "2/3" }
    ],
    explanation: "Even numbers are 2, 4, 6 (3 outcomes out of 6). P = 3/6 = 1/2.",
    difficulty: "Easy",
    xpReward: 60,
    coinsReward: 20
  },

  // Level 2: Deck of Cards Probability (Medium)
  {
    id: "q10_w5_l2_1",
    classStandard: 10,
    chapterId: "class10_world5",
    chapterName: "World 5 – Probability Arena",
    topicId: "probability_10",
    topicName: "Cards Probability",
    levelNumber: 2,
    questionType: "quiz",
    questionText: "A card is drawn from a 52-card deck. What is the probability of getting a Red King?",
    options: [
      { id: "A", text: "1/26", isCorrect: true },
      { id: "B", text: "1/13" },
      { id: "C", text: "1/52" },
      { id: "D", text: "2/13" }
    ],
    explanation: "There are 2 Red Kings (Hearts & Diamonds). P = 2/52 = 1/26.",
    difficulty: "Medium",
    xpReward: 70,
    coinsReward: 30
  },

  // Level 3: Complementary Events (Hard)
  {
    id: "q10_w5_l3_1",
    classStandard: 10,
    chapterId: "class10_world5",
    chapterName: "World 5 – Probability Arena",
    topicId: "probability_10",
    topicName: "Complementary Probability",
    levelNumber: 3,
    questionType: "quiz",
    questionText: "If the probability of winning a game is 0.05, what is the probability of losing?",
    options: [
      { id: "A", text: "0.95", isCorrect: true },
      { id: "B", text: "0.50" },
      { id: "C", text: "0.05" },
      { id: "D", text: "0.90" }
    ],
    explanation: "P(Losing) = 1 - P(Winning) = 1 - 0.05 = 0.95.",
    difficulty: "Hard",
    xpReward: 80,
    coinsReward: 35
  },

  // Level 4: Two-Dice Outcomes (Advanced)
  {
    id: "q10_w5_l4_1",
    classStandard: 10,
    chapterId: "class10_world5",
    chapterName: "World 5 – Probability Arena",
    topicId: "probability_10",
    topicName: "Two Dice Probability",
    levelNumber: 4,
    questionType: "quiz",
    questionText: "Two dice are thrown simultaneously. What is the probability of getting a sum of 10?",
    options: [
      { id: "A", text: "1/12", isCorrect: true },
      { id: "B", text: "1/6" },
      { id: "C", text: "1/9" },
      { id: "D", text: "1/36" }
    ],
    explanation: "Outcomes for sum 10: (4,6), (5,5), (6,4) = 3 outcomes out of 36. P = 3/36 = 1/12.",
    difficulty: "Advanced",
    xpReward: 90,
    coinsReward: 40
  },

  // Level 5: Probability Wizard (Master)
  {
    id: "q10_w5_l5_1",
    classStandard: 10,
    chapterId: "class10_world5",
    chapterName: "World 5 – Probability Arena",
    topicId: "probability_10",
    topicName: "Master Probability",
    levelNumber: 5,
    questionType: "quiz",
    questionText: "What is the probability of a non-leap year having 53 Sundays?",
    options: [
      { id: "A", text: "1/7", isCorrect: true },
      { id: "B", text: "2/7" },
      { id: "C", text: "53/365" },
      { id: "D", text: "1/365" }
    ],
    explanation: "Non-leap year has 365 days = 52 weeks + 1 extra day. That 1 extra day can be Sunday with probability 1/7.",
    difficulty: "Master",
    xpReward: 100,
    coinsReward: 50
  }
];

export const initialBadgesData = [
  { id: "ach_1", title: "🎯 First Game", description: "Completed your very first MathQuest challenge", category: "Beginner", xpReward: 100, icon: "🎯" },
  { id: "ach_2", title: "🧠 Quick Learner", description: "Answered 5 questions in under 10 seconds each", category: "Speed", xpReward: 150, icon: "🧠" },
  { id: "ach_3", title: "🔥 5-Day Streak", description: "Logged in and played math games for 5 consecutive days", category: "Consistency", xpReward: 200, icon: "🔥" },
  { id: "ach_4", title: "👑 Algebra Conqueror", description: "Achieved 100% accuracy in Algebra Arena", category: "Mastery", xpReward: 300, icon: "👑" },
  { id: "ach_5", title: "⚡ Speed Demon", description: "Completed a Time Attack game with 10 correct answers", category: "Speed", xpReward: 250, icon: "⚡" },
  { id: "ach_6", title: "💎 Real Number Master", description: "Mastered all 5 levels of Real Numbers world", category: "Mastery", xpReward: 350, icon: "💎" }
];
