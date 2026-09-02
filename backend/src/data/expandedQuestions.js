// ====================================================================
// MathQuest Multi-Grade & Multi-Subject Questions (Grades 4-12)
// ====================================================================

export const expandedQuestionsData = [
  // ─── CLASS 4 ──────────────────────────────────────────────────────────────
  // Maths
  {
    id: "g4_m_1",
    classStandard: 4,
    subjectId: "maths",
    chapterId: "g4_maths_w1",
    chapterName: "Large Numbers",
    topicId: "g4_maths_numbers",
    topicName: "Large Numbers & Place Value",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "What is the place value of 7 in the number 47,520?",
    options: [
      { id: "A", text: "700" },
      { id: "B", text: "7,000", isCorrect: true },
      { id: "C", text: "70" },
      { id: "D", text: "70,000" }
    ],
    explanation: "In 47,520, the digit 7 is in the thousands place, so its place value is 7,000.",
    difficulty: "Easy",
    xpReward: 50,
    coinsReward: 20
  },
  {
    id: "g4_m_2",
    classStandard: 4,
    subjectId: "maths",
    chapterId: "g4_maths_w1",
    chapterName: "Large Numbers",
    topicId: "g4_maths_numbers",
    topicName: "Large Numbers & Place Value",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Which is the smallest 5-digit number?",
    options: [
      { id: "A", text: "10,000", isCorrect: true },
      { id: "B", text: "99,999" },
      { id: "C", text: "1,000" },
      { id: "D", text: "10,001" }
    ],
    explanation: "10,000 is the smallest 5-digit integer.",
    difficulty: "Easy",
    xpReward: 50,
    coinsReward: 20
  },
  {
    id: "g4_m_3",
    classStandard: 4,
    subjectId: "maths",
    chapterId: "g4_maths_w2",
    chapterName: "Fraction Quest",
    topicId: "g4_maths_fractions",
    topicName: "Fractions & Decimals",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Which fraction is equivalent to 1/2?",
    options: [
      { id: "A", text: "2/4", isCorrect: true },
      { id: "B", text: "1/3" },
      { id: "C", text: "3/5" },
      { id: "D", text: "4/9" }
    ],
    explanation: "Multiplying numerator and denominator of 1/2 by 2 gives 2/4.",
    difficulty: "Easy",
    xpReward: 50,
    coinsReward: 20
  },
  // Science
  {
    id: "g4_s_1",
    classStandard: 4,
    subjectId: "science",
    chapterId: "g4_sci_w1",
    chapterName: "Plant Life Explorer",
    topicId: "g4_sci_plants",
    topicName: "Photosynthesis & Leaf Structure",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "What green pigment in leaves absorbs sunlight for photosynthesis?",
    options: [
      { id: "A", text: "Chlorophyll", isCorrect: true },
      { id: "B", text: "Stomata" },
      { id: "C", text: "Xylem" },
      { id: "D", text: "Carotene" }
    ],
    explanation: "Chlorophyll is the green pigment that traps sunlight energy to make plant food.",
    difficulty: "Easy",
    xpReward: 50,
    coinsReward: 20
  },
  {
    id: "g4_s_2",
    classStandard: 4,
    subjectId: "science",
    chapterId: "g4_sci_w2",
    chapterName: "States of Matter",
    topicId: "g4_sci_matter",
    topicName: "Solids, Liquids & Gases",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Which state of matter has a definite volume but no fixed shape?",
    options: [
      { id: "A", text: "Solid" },
      { id: "B", text: "Liquid", isCorrect: true },
      { id: "C", text: "Gas" },
      { id: "D", text: "Plasma" }
    ],
    explanation: "Liquids have fixed volume and take the shape of their container.",
    difficulty: "Easy",
    xpReward: 50,
    coinsReward: 20
  },
  // English
  {
    id: "g4_e_1",
    classStandard: 4,
    subjectId: "english",
    chapterId: "g4_eng_w1",
    chapterName: "Grammar Galaxy",
    topicId: "g4_eng_grammar",
    topicName: "Nouns & Verbs",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Identify the action verb in: 'The happy dog runs in the garden.'",
    options: [
      { id: "A", text: "dog" },
      { id: "B", text: "happy" },
      { id: "C", text: "runs", isCorrect: true },
      { id: "D", text: "garden" }
    ],
    explanation: "'runs' expresses the physical action performed by the subject (dog).",
    difficulty: "Easy",
    xpReward: 50,
    coinsReward: 20
  },
  // Social Studies
  {
    id: "g4_soc_1",
    classStandard: 4,
    subjectId: "social",
    chapterId: "g4_soc_w1",
    chapterName: "Earth & Maps",
    topicId: "g4_soc_maps",
    topicName: "Continents & Maps",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Which is the largest continent on Earth?",
    options: [
      { id: "A", text: "Africa" },
      { id: "B", text: "Asia", isCorrect: true },
      { id: "C", text: "Europe" },
      { id: "D", text: "Antarctica" }
    ],
    explanation: "Asia is the largest continent by both land area and population.",
    difficulty: "Easy",
    xpReward: 50,
    coinsReward: 20
  },

  // ─── CLASS 5 ──────────────────────────────────────────────────────────────
  // Maths
  {
    id: "g5_m_1",
    classStandard: 5,
    subjectId: "maths",
    chapterId: "g5_maths_w1",
    chapterName: "Factors & Multiples",
    topicId: "g5_maths_factors",
    topicName: "HCF & LCM",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "What is the Highest Common Factor (HCF) of 12 and 18?",
    options: [
      { id: "A", text: "3" },
      { id: "B", text: "6", isCorrect: true },
      { id: "C", text: "12" },
      { id: "D", text: "36" }
    ],
    explanation: "Factors of 12 = {1,2,3,4,6,12}. Factors of 18 = {1,2,3,6,9,18}. Highest common factor is 6.",
    difficulty: "Easy",
    xpReward: 55,
    coinsReward: 25
  },
  {
    id: "g5_m_2",
    classStandard: 5,
    subjectId: "maths",
    chapterId: "g5_maths_w2",
    chapterName: "Area & Perimeter",
    topicId: "g5_maths_area",
    topicName: "Perimeter & Area",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "What is the perimeter of a square with a side length of 8 cm?",
    options: [
      { id: "A", text: "16 cm" },
      { id: "B", text: "32 cm", isCorrect: true },
      { id: "C", text: "64 cm²" },
      { id: "D", text: "24 cm" }
    ],
    explanation: "Perimeter of square = 4 × side = 4 × 8 cm = 32 cm.",
    difficulty: "Easy",
    xpReward: 55,
    coinsReward: 25
  },
  // Science
  {
    id: "g5_s_1",
    classStandard: 5,
    subjectId: "science",
    chapterId: "g5_sci_w1",
    chapterName: "Human Organ Systems",
    topicId: "g5_sci_humanbody",
    topicName: "Digestive & Circulatory System",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Where does digestion of food begin in the human body?",
    options: [
      { id: "A", text: "Stomach" },
      { id: "B", text: "Mouth", isCorrect: true },
      { id: "C", text: "Small Intestine" },
      { id: "D", text: "Esophagus" }
    ],
    explanation: "Digestion starts in the mouth where saliva mixes with food to break down starches.",
    difficulty: "Easy",
    xpReward: 55,
    coinsReward: 25
  },
  // English
  {
    id: "g5_e_1",
    classStandard: 5,
    subjectId: "english",
    chapterId: "g5_eng_w1",
    chapterName: "Tenses & Sentences",
    topicId: "g5_eng_tenses",
    topicName: "Past, Present & Future Tenses",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Choose the correct past tense verb: 'Yesterday, she _____ a cake.'",
    options: [
      { id: "A", text: "bakes" },
      { id: "B", text: "baked", isCorrect: true },
      { id: "C", text: "baking" },
      { id: "D", text: "will bake" }
    ],
    explanation: "'Yesterday' signals a completed past action, so past simple 'baked' is correct.",
    difficulty: "Easy",
    xpReward: 55,
    coinsReward: 25
  },
  // Social
  {
    id: "g5_soc_1",
    classStandard: 5,
    subjectId: "social",
    chapterId: "g5_soc_w1",
    chapterName: "Continents & Oceans",
    topicId: "g5_soc_continents",
    topicName: "World Geography",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Which ocean is the deepest and largest ocean on Earth?",
    options: [
      { id: "A", text: "Atlantic Ocean" },
      { id: "B", text: "Pacific Ocean", isCorrect: true },
      { id: "C", text: "Indian Ocean" },
      { id: "D", text: "Arctic Ocean" }
    ],
    explanation: "The Pacific Ocean covers over 30% of the Earth's surface and contains Mariana Trench.",
    difficulty: "Easy",
    xpReward: 55,
    coinsReward: 25
  },

  // ─── CLASS 6 ──────────────────────────────────────────────────────────────
  // Maths
  {
    id: "g6_m_1",
    classStandard: 6,
    subjectId: "maths",
    chapterId: "g6_maths_w1",
    chapterName: "Integer Odyssey",
    topicId: "g6_maths_integers",
    topicName: "Integers & Operations",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "What is the value of (-15) + (+8)?",
    options: [
      { id: "A", text: "-7", isCorrect: true },
      { id: "B", text: "-23" },
      { id: "C", text: "7" },
      { id: "D", text: "23" }
    ],
    explanation: "(-15) + 8 = -(15 - 8) = -7.",
    difficulty: "Easy",
    xpReward: 60,
    coinsReward: 25
  },
  // Science
  {
    id: "g6_s_1",
    classStandard: 6,
    subjectId: "science",
    chapterId: "g6_sci_w1",
    chapterName: "Food & Nutrition",
    topicId: "g6_sci_food",
    topicName: "Components of Food",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Deficiency of Vitamin C causes which disease?",
    options: [
      { id: "A", text: "Rickets" },
      { id: "B", text: "Scurvy", isCorrect: true },
      { id: "C", text: "Beriberi" },
      { id: "D", text: "Anaemia" }
    ],
    explanation: "Vitamin C deficiency leads to scurvy, causing bleeding gums and skin lesions.",
    difficulty: "Easy",
    xpReward: 60,
    coinsReward: 25
  },
  // English
  {
    id: "g6_e_1",
    classStandard: 6,
    subjectId: "english",
    chapterId: "g6_eng_w1",
    chapterName: "Pronouns & Clauses",
    topicId: "g6_eng_clauses",
    topicName: "Pronouns & Sentence Clauses",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Which word is a reflexive pronoun in: 'He solved the puzzle himself.'?",
    options: [
      { id: "A", text: "He" },
      { id: "B", text: "himself", isCorrect: true },
      { id: "C", text: "solved" },
      { id: "D", text: "puzzle" }
    ],
    explanation: "'himself' refers back to the subject 'He' as an intensive/reflexive pronoun.",
    difficulty: "Easy",
    xpReward: 60,
    coinsReward: 25
  },
  // Social
  {
    id: "g6_soc_1",
    classStandard: 6,
    subjectId: "social",
    chapterId: "g6_soc_w1",
    chapterName: "Ancient History",
    topicId: "g6_soc_history",
    topicName: "Indus Valley Civilisation",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Which major Indus Valley site contained the famous 'Great Bath'?",
    options: [
      { id: "A", text: "Harappa" },
      { id: "B", text: "Mohenjo-daro", isCorrect: true },
      { id: "C", text: "Lothal" },
      { id: "D", text: "Kalibangan" }
    ],
    explanation: "The Great Bath brick structure was discovered at Mohenjo-daro.",
    difficulty: "Easy",
    xpReward: 60,
    coinsReward: 25
  },

  // ─── CLASS 7 ──────────────────────────────────────────────────────────────
  // Maths
  {
    id: "g7_m_1",
    classStandard: 7,
    subjectId: "maths",
    chapterId: "g7_maths_w1",
    chapterName: "Algebra Foundations",
    topicId: "g7_maths_algebra",
    topicName: "Linear Equations & Expressions",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Solve for x: 3x - 5 = 16",
    options: [
      { id: "A", text: "x = 5" },
      { id: "B", text: "x = 7", isCorrect: true },
      { id: "C", text: "x = 9" },
      { id: "D", text: "x = 6" }
    ],
    explanation: "3x = 16 + 5 => 3x = 21 => x = 7.",
    difficulty: "Medium",
    xpReward: 65,
    coinsReward: 30
  },
  // Science
  {
    id: "g7_s_1",
    classStandard: 7,
    subjectId: "science",
    chapterId: "g7_sci_w1",
    chapterName: "Heat & Temperature",
    topicId: "g7_sci_heat",
    topicName: "Heat Transfer",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "What mode of heat transfer requires direct physical contact between solids?",
    options: [
      { id: "A", text: "Conduction", isCorrect: true },
      { id: "B", text: "Convection" },
      { id: "C", text: "Radiation" },
      { id: "D", text: "Evaporation" }
    ],
    explanation: "Conduction transfers thermal energy through direct particle collisions in solids.",
    difficulty: "Medium",
    xpReward: 65,
    coinsReward: 30
  },
  // English
  {
    id: "g7_e_1",
    classStandard: 7,
    subjectId: "english",
    chapterId: "g7_eng_w1",
    chapterName: "Direct & Indirect Speech",
    topicId: "g7_eng_speech",
    topicName: "Reported Speech",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Convert to indirect speech: He said, 'I am reading a book.'",
    options: [
      { id: "A", text: "He said that he is reading a book." },
      { id: "B", text: "He said that he was reading a book.", isCorrect: true },
      { id: "C", text: "He told he reads a book." },
      { id: "D", text: "He says he read a book." }
    ],
    explanation: "Present continuous 'am reading' changes to past continuous 'was reading' in reported speech.",
    difficulty: "Medium",
    xpReward: 65,
    coinsReward: 30
  },
  // Social
  {
    id: "g7_soc_1",
    classStandard: 7,
    subjectId: "social",
    chapterId: "g7_soc_w1",
    chapterName: "Medieval Kingdoms",
    topicId: "g7_soc_kingdoms",
    topicName: "Delhi Sultanate & Mughals",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Who was the first woman ruler of the Delhi Sultanate?",
    options: [
      { id: "A", text: "Nur Jahan" },
      { id: "B", text: "Razia Sultana", isCorrect: true },
      { id: "C", text: "Chand Bibi" },
      { id: "D", text: "Mumtaz Mahal" }
    ],
    explanation: "Razia Sultana, daughter of Iltutmish, ruled the Delhi Sultanate from 1236 to 1240 CE.",
    difficulty: "Medium",
    xpReward: 65,
    coinsReward: 30
  },

  // ─── CLASS 8 ──────────────────────────────────────────────────────────────
  // Maths
  {
    id: "g8_m_1",
    classStandard: 8,
    subjectId: "maths",
    chapterId: "g8_maths_w1",
    chapterName: "Exponents & Powers",
    topicId: "g8_maths_exponents",
    topicName: "Laws of Exponents",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Simplify: 2⁻³",
    options: [
      { id: "A", text: "-8" },
      { id: "B", text: "1/8", isCorrect: true },
      { id: "C", text: "-6" },
      { id: "D", text: "1/6" }
    ],
    explanation: "a⁻ⁿ = 1/aⁿ => 2⁻³ = 1 / (2³) = 1/8.",
    difficulty: "Medium",
    xpReward: 70,
    coinsReward: 30
  },
  // Science
  {
    id: "g8_s_1",
    classStandard: 8,
    subjectId: "science",
    chapterId: "g8_sci_w1",
    chapterName: "Microorganisms Realm",
    topicId: "g8_sci_micro",
    topicName: "Microorganisms: Friend & Foe",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Which bacterium converts milk into curd?",
    options: [
      { id: "A", text: "Lactobacillus", isCorrect: true },
      { id: "B", text: "Rhizobium" },
      { id: "C", text: "E. coli" },
      { id: "D", text: "Penicillium" }
    ],
    explanation: "Lactobacillus bacteria ferment lactose sugar into lactic acid, setting curd.",
    difficulty: "Easy",
    xpReward: 70,
    coinsReward: 30
  },
  // English
  {
    id: "g8_e_1",
    classStandard: 8,
    subjectId: "english",
    chapterId: "g8_eng_w1",
    chapterName: "Modal Verbs",
    topicId: "g8_eng_modals",
    topicName: "Modals & Auxiliaries",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Which modal verb expresses strict obligation or rule?",
    options: [
      { id: "A", text: "might" },
      { id: "B", text: "must", isCorrect: true },
      { id: "C", text: "could" },
      { id: "D", text: "would" }
    ],
    explanation: "'must' is used to express strong obligation, duty, or legal requirement.",
    difficulty: "Medium",
    xpReward: 70,
    coinsReward: 30
  },
  // Social
  {
    id: "g8_soc_1",
    classStandard: 8,
    subjectId: "social",
    chapterId: "g8_soc_w1",
    chapterName: "Modern History & Judiciary",
    topicId: "g8_soc_modern",
    topicName: "Indian Constitution",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Who is known as the Father of the Indian Constitution?",
    options: [
      { id: "A", text: "Mahatma Gandhi" },
      { id: "B", text: "Dr. B.R. Ambedkar", isCorrect: true },
      { id: "C", text: "Jawaharlal Nehru" },
      { id: "D", text: "Sardar Vallabhbhai Patel" }
    ],
    explanation: "Dr. Bhimrao Ramji Ambedkar served as the Chairman of the Constitution Drafting Committee.",
    difficulty: "Easy",
    xpReward: 70,
    coinsReward: 30
  },

  // ─── CLASS 9 ──────────────────────────────────────────────────────────────
  // Physics
  {
    id: "g9_phy_1",
    classStandard: 9,
    subjectId: "physics",
    chapterId: "g9_phy_w1",
    chapterName: "Motion & Velocity",
    topicId: "g9_phy_motion",
    topicName: "Equations of Motion",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "What is the SI unit of acceleration?",
    options: [
      { id: "A", text: "m/s" },
      { id: "B", text: "m/s²", isCorrect: true },
      { id: "C", text: "km/h" },
      { id: "D", text: "N/m²" }
    ],
    explanation: "Acceleration is rate of change of velocity (m/s) per second, so unit is m/s².",
    difficulty: "Medium",
    xpReward: 75,
    coinsReward: 30
  },
  // Chemistry
  {
    id: "g9_chem_1",
    classStandard: 9,
    subjectId: "chemistry",
    chapterId: "g9_chem_w1",
    chapterName: "Matter & Atoms",
    topicId: "g9_chem_matter",
    topicName: "States of Matter & Atoms",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "The change of solid state directly to gas without passing through liquid is:",
    options: [
      { id: "A", text: "Evaporation" },
      { id: "B", text: "Sublimation", isCorrect: true },
      { id: "C", text: "Condensation" },
      { id: "D", text: "Melting" }
    ],
    explanation: "Sublimation is the direct transition from solid to gaseous state (e.g. Camphor, Dry Ice).",
    difficulty: "Medium",
    xpReward: 75,
    coinsReward: 30
  },
  // Biology
  {
    id: "g9_bio_1",
    classStandard: 9,
    subjectId: "biology",
    chapterId: "g9_bio_w1",
    chapterName: "Cell Unit of Life",
    topicId: "g9_bio_cell",
    topicName: "Cell Organelles",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Which cell organelle is known as the 'Powerhouse of the Cell'?",
    options: [
      { id: "A", text: "Ribosome" },
      { id: "B", text: "Mitochondria", isCorrect: true },
      { id: "C", text: "Golgi Apparatus" },
      { id: "D", text: "Lysosome" }
    ],
    explanation: "Mitochondria synthesize energy in the form of ATP molecules.",
    difficulty: "Easy",
    xpReward: 75,
    coinsReward: 30
  },

  // ─── CLASS 10 ─────────────────────────────────────────────────────────────
  // Physics
  {
    id: "g10_phy_1",
    classStandard: 10,
    subjectId: "physics",
    chapterId: "g10_phy_w1",
    chapterName: "Light Reflection & Lenses",
    topicId: "g10_phy_light",
    topicName: "Refraction & Lenses",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "The focal length of a spherical mirror of radius of curvature 30 cm is:",
    options: [
      { id: "A", text: "15 cm", isCorrect: true },
      { id: "B", text: "30 cm" },
      { id: "C", text: "60 cm" },
      { id: "D", text: "10 cm" }
    ],
    explanation: "Focal length f = R / 2 = 30 / 2 = 15 cm.",
    difficulty: "Medium",
    xpReward: 80,
    coinsReward: 35
  },
  // Chemistry
  {
    id: "g10_chem_1",
    classStandard: 10,
    subjectId: "chemistry",
    chapterId: "g10_chem_w1",
    chapterName: "Chemical Reactions",
    topicId: "g10_chem_reactions",
    topicName: "Acids, Bases & Reactions",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "What is the pH value of pure neutral water at 25°C?",
    options: [
      { id: "A", text: "0" },
      { id: "B", text: "7", isCorrect: true },
      { id: "C", text: "14" },
      { id: "D", text: "1" }
    ],
    explanation: "Neutral pure water has a pH of 7 on the 0–14 pH scale.",
    difficulty: "Easy",
    xpReward: 80,
    coinsReward: 35
  },

  // ─── CLASS 11 ─────────────────────────────────────────────────────────────
  // Maths
  {
    id: "g11_m_1",
    classStandard: 11,
    subjectId: "maths",
    chapterId: "g11_maths_w1",
    chapterName: "Sets & Functions",
    topicId: "g11_maths_sets",
    topicName: "Set Theory & Relations",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "If set A has 3 elements, how many subsets does set A have?",
    options: [
      { id: "A", text: "6" },
      { id: "B", text: "8", isCorrect: true },
      { id: "C", text: "9" },
      { id: "D", text: "16" }
    ],
    explanation: "Number of subsets of set with n elements = 2ⁿ = 2³ = 8.",
    difficulty: "Medium",
    xpReward: 85,
    coinsReward: 40
  },
  // Physics
  {
    id: "g11_phy_1",
    classStandard: 11,
    subjectId: "physics",
    chapterId: "g11_phy_w1",
    chapterName: "Kinematics & Projectiles",
    topicId: "g11_phy_kinematics",
    topicName: "Projectile Motion",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "At what angle of projection is the horizontal range of a projectile maximum?",
    options: [
      { id: "A", text: "30°" },
      { id: "B", text: "45°", isCorrect: true },
      { id: "C", text: "60°" },
      { id: "D", text: "90°" }
    ],
    explanation: "Horizontal range R = (u² sin 2θ)/g is maximum when sin 2θ = 1 => 2θ = 90° => θ = 45°.",
    difficulty: "Medium",
    xpReward: 85,
    coinsReward: 40
  },
  // Computer Science
  {
    id: "g11_cs_1",
    classStandard: 11,
    subjectId: "cs",
    chapterId: "g11_cs_w1",
    chapterName: "Python Fundamentals",
    topicId: "g11_cs_python",
    topicName: "Python Data Types",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "What will be the output of: print(type(5 / 2)) in Python 3?",
    options: [
      { id: "A", text: "<class 'float'>", isCorrect: true },
      { id: "B", text: "<class 'int'>" },
      { id: "C", text: "<class 'double'>" },
      { id: "D", text: "<class 'str'>" }
    ],
    explanation: "In Python 3, floating-point division (/) always produces a float result (2.5).",
    difficulty: "Easy",
    xpReward: 85,
    coinsReward: 40
  },

  // ─── CLASS 12 ─────────────────────────────────────────────────────────────
  // Maths
  {
    id: "g12_m_1",
    classStandard: 12,
    subjectId: "maths",
    chapterId: "g12_maths_w1",
    chapterName: "Matrices & Determinants",
    topicId: "g12_maths_matrices",
    topicName: "Matrix Inverse & Determinants",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "If matrix A is singular, what is its determinant |A|?",
    options: [
      { id: "A", text: "|A| = 1" },
      { id: "B", text: "|A| = 0", isCorrect: true },
      { id: "C", text: "|A| = -1" },
      { id: "D", text: "|A| = ∞" }
    ],
    explanation: "A square matrix is singular if and only if its determinant equals zero.",
    difficulty: "Medium",
    xpReward: 90,
    coinsReward: 45
  },
  // Physics
  {
    id: "g12_phy_1",
    classStandard: 12,
    subjectId: "physics",
    chapterId: "g12_phy_w1",
    chapterName: "Electrostatics & Fields",
    topicId: "g12_phy_electrostatics",
    topicName: "Coulomb's Law",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "What happens to electrostatic force between two point charges if distance is doubled?",
    options: [
      { id: "A", text: "Doubled" },
      { id: "B", text: "Decreased to 1/4th", isCorrect: true },
      { id: "C", text: "Halved" },
      { id: "D", text: "Quadrupled" }
    ],
    explanation: "By Coulomb's inverse square law, F ∝ 1/r². Doubling r reduces force to 1/2² = 1/4th.",
    difficulty: "Medium",
    xpReward: 90,
    coinsReward: 45
  },
  // Computer Science
  {
    id: "g12_cs_1",
    classStandard: 12,
    subjectId: "cs",
    chapterId: "g12_cs_w1",
    chapterName: "SQL & Database Systems",
    topicId: "g12_cs_sql",
    topicName: "SQL Queries & Clauses",
    levelNumber: 1,
    questionType: "quiz",
    questionText: "Which SQL clause is used to eliminate duplicate rows from a query result?",
    options: [
      { id: "A", text: "DISTINCT", isCorrect: true },
      { id: "B", text: "UNIQUE" },
      { id: "C", text: "GROUP BY" },
      { id: "D", text: "ORDER BY" }
    ],
    explanation: "SELECT DISTINCT eliminates duplicate rows from the query output set.",
    difficulty: "Easy",
    xpReward: 90,
    coinsReward: 45
  }
];
