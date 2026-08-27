export const initialQuestionsData = [
  // CLASS 9 QUESTIONS
  {
    id: "q9_1",
    classStandard: 9,
    chapterId: "class9_world1",
    topicId: "number_systems",
    topicName: "Number Systems",
    questionType: "quiz",
    questionText: "What is the decimal expansion of 1/7?",
    problemStatement: null,
    options: [
      { id: "A", text: "0.142857...", isCorrect: true },
      { id: "B", text: "0.14" },
      { id: "C", text: "0.25" },
      { id: "D", text: "0.5" }
    ],
    explanation: "1 divided by 7 is 0.142857142857... which is non-terminating repeating.",
    difficulty: "Medium",
    xpReward: 60,
    coinsReward: 25
  },
  {
    id: "q9_2",
    classStandard: 9,
    chapterId: "class9_world2",
    topicId: "polynomials",
    topicName: "Polynomials",
    questionType: "quiz",
    questionText: "What is the degree of the zero polynomial?",
    options: [
      { id: "A", text: "0" },
      { id: "B", text: "1" },
      { id: "C", text: "Not defined", isCorrect: true },
      { id: "D", text: "Infinity" }
    ],
    explanation: "The degree of a non-zero constant polynomial is 0, but the degree of the zero polynomial is not defined.",
    difficulty: "Easy",
    xpReward: 50,
    coinsReward: 20
  },
  {
    id: "q9_3",
    classStandard: 9,
    chapterId: "class9_world2",
    topicId: "linear_equations",
    topicName: "Linear Equations in Two Variables",
    questionType: "quiz",
    questionText: "How many linear equations in x and y can be satisfied by x = 2 and y = 3?",
    options: [
      { id: "A", text: "Only one" },
      { id: "B", text: "Two" },
      { id: "C", text: "Infinitely many", isCorrect: true },
      { id: "D", text: "None" }
    ],
    explanation: "Infinitely many lines can pass through the point (2,3), such as x + y = 5, 2x - y = 1, etc.",
    difficulty: "Medium",
    xpReward: 60,
    coinsReward: 25
  },
  {
    id: "q9_4",
    classStandard: 9,
    chapterId: "class9_world3",
    topicId: "lines_angles",
    topicName: "Lines and Angles",
    questionType: "quiz",
    questionText: "If two interior angles on the same side of a transversal intersecting two parallel lines are in ratio 2:3, the larger angle is:",
    options: [
      { id: "A", text: "72°" },
      { id: "B", text: "108°", isCorrect: true },
      { id: "C", text: "90°" },
      { id: "D", text: "120°" }
    ],
    explanation: "Interior angles on the same side are supplementary (sum = 180°). 2x + 3x = 180° => 5x = 180° => x = 36°. Larger angle = 3 × 36° = 108°.",
    difficulty: "Challenge",
    xpReward: 80,
    coinsReward: 30
  },
  {
    id: "q9_5",
    classStandard: 9,
    chapterId: "class9_world3",
    topicId: "triangles",
    topicName: "Triangles & Congruence",
    questionType: "quiz",
    questionText: "In ΔABC, if ∠A = 40° and ∠B = 70°, then the triangle is:",
    options: [
      { id: "A", text: "Scalene" },
      { id: "B", text: "Isosceles", isCorrect: true },
      { id: "C", text: "Equilateral" },
      { id: "D", text: "Right-angled" }
    ],
    explanation: "Sum of angles = 180° => ∠C = 180° - (40° + 70°) = 70°. Since ∠B = ∠C = 70°, sides opposite are equal, making it isosceles.",
    difficulty: "Medium",
    xpReward: 70,
    coinsReward: 25
  },

  // CLASS 10 QUESTIONS
  {
    id: "q10_1",
    classStandard: 10,
    chapterId: "class10_world1",
    topicId: "real_numbers",
    topicName: "Real Numbers",
    questionType: "quiz",
    questionText: "If HCF(306, 657) = 9, what is LCM(306, 657)?",
    options: [
      { id: "A", text: "22338", isCorrect: true },
      { id: "B", text: "11234" },
      { id: "C", text: "30600" },
      { id: "D", text: "45000" }
    ],
    explanation: "Formula: HCF × LCM = Product of numbers => 9 × LCM = 306 × 657 => LCM = 201042 / 9 = 22,338.",
    difficulty: "Medium",
    xpReward: 70,
    coinsReward: 30
  },
  {
    id: "q10_2",
    classStandard: 10,
    chapterId: "class10_world2",
    topicId: "quadratic_equations",
    topicName: "Quadratic Equations",
    questionType: "quiz",
    questionText: "What is the discriminant of the quadratic equation 2x² - 4x + 3 = 0?",
    options: [
      { id: "A", text: "-8", isCorrect: true },
      { id: "B", text: "8" },
      { id: "C", text: "16" },
      { id: "D", text: "-16" }
    ],
    explanation: "Discriminant D = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24 = -8.",
    difficulty: "Medium",
    xpReward: 75,
    coinsReward: 30
  },
  {
    id: "q10_3",
    classStandard: 10,
    chapterId: "class10_world2",
    topicId: "arithmetic_progressions",
    topicName: "Arithmetic Progressions",
    questionType: "quiz",
    questionText: "What is the sum of the first 20 positive integers?",
    options: [
      { id: "A", text: "200" },
      { id: "B", text: "210", isCorrect: true },
      { id: "C", text: "190" },
      { id: "D", text: "400" }
    ],
    explanation: "Formula S_n = n(n+1)/2 => S_20 = 20 × 21 / 2 = 210.",
    difficulty: "Easy",
    xpReward: 60,
    coinsReward: 20
  },
  {
    id: "q10_4",
    classStandard: 10,
    chapterId: "class10_world4",
    topicId: "trigonometry",
    topicName: "Introduction to Trigonometry",
    questionType: "quiz",
    questionText: "Evaluate: sin²(30°) + cos²(30°)",
    options: [
      { id: "A", text: "1", isCorrect: true },
      { id: "B", text: "1/2" },
      { id: "C", text: "0" },
      { id: "D", text: "2" }
    ],
    explanation: "By fundamental trigonometric identity sin²(θ) + cos²(θ) = 1 for any angle θ.",
    difficulty: "Easy",
    xpReward: 50,
    coinsReward: 20
  },
  {
    id: "q10_5",
    classStandard: 10,
    chapterId: "class10_world5",
    topicId: "probability",
    topicName: "Probability",
    questionType: "quiz",
    questionText: "A card is drawn from a well-shuffled deck of 52 cards. What is the probability of getting a king of red color?",
    options: [
      { id: "A", text: "1/26", isCorrect: true },
      { id: "B", text: "1/13" },
      { id: "C", text: "1/52" },
      { id: "D", text: "2/13" }
    ],
    explanation: "There are 2 red kings (King of Hearts and King of Diamonds) out of 52 cards. P = 2/52 = 1/26.",
    difficulty: "Medium",
    xpReward: 70,
    coinsReward: 25
  }
];

export const initialBadgesData = [
  { id: "ach_1", title: "🎯 First Game", description: "Completed your very first MathQuest challenge", category: "Beginner", xpReward: 100, icon: "🎯" },
  { id: "ach_2", title: "🧠 Quick Learner", description: "Answered 5 questions in under 10 seconds each", category: "Speed", xpReward: 150, icon: "🧠" },
  { id: "ach_3", title: "🔥 7-Day Streak", description: "Log in and complete at least 1 mission for 7 consecutive days", category: "Consistency", xpReward: 300, icon: "🔥" },
  { id: "ach_4", title: "🏆 Quiz Champion", description: "Achieve a 100% perfect score in 10 Quiz Arena matches", category: "Mastery", xpReward: 250, icon: "🏆" },
  { id: "ach_5", title: "⭐ Perfect Score", description: "Score 100% accuracy on a level 3 or higher challenge", category: "Accuracy", xpReward: 200, icon: "⭐" },
  { id: "ach_6", title: "📚 Chapter Master", description: "Complete all 5 levels of any Class 9 or 10 Game World", category: "Completion", xpReward: 500, icon: "📚" },
  { id: "ach_7", title: "🚀 Fast Learner", description: "Reach Level 15 in under 14 days", category: "Milestone", xpReward: 400, icon: "🚀" }
];
