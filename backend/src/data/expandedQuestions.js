// ====================================================================
// MathQuest Multi-Grade & Multi-Subject Questions (Grades 4-12)
// ====================================================================

export const expandedQuestionsData = [
  // ─── CLASS 4 ──────────────────────────────────────────────────────────────
  {
    id: "g4_m_1", classStandard: 4, subjectId: "maths", chapterId: "g4_maths_w1", chapterName: "Large Numbers", topicId: "g4_maths_numbers", topicName: "Large Numbers & Place Value", levelNumber: 1, questionType: "quiz",
    questionText: "What is the place value of 7 in the number 47,520?",
    options: [{ id: "A", text: "700" }, { id: "B", text: "7,000", isCorrect: true }, { id: "C", text: "70" }, { id: "D", text: "70,000" }],
    explanation: "In 47,520, the digit 7 is in the thousands place, so its place value is 7,000.", difficulty: "Easy", xpReward: 50, coinsReward: 20
  },
  {
    id: "g4_s_1", classStandard: 4, subjectId: "science", chapterId: "g4_sci_w1", chapterName: "Plant Life Explorer", topicId: "g4_sci_plants", topicName: "Photosynthesis & Leaf Structure", levelNumber: 1, questionType: "quiz",
    questionText: "What green pigment in leaves absorbs sunlight for photosynthesis?",
    options: [{ id: "A", text: "Chlorophyll", isCorrect: true }, { id: "B", text: "Stomata" }, { id: "C", text: "Xylem" }, { id: "D", text: "Carotene" }],
    explanation: "Chlorophyll is the green pigment that traps sunlight energy to make plant food.", difficulty: "Easy", xpReward: 50, coinsReward: 20
  },
  {
    id: "g4_e_1", classStandard: 4, subjectId: "english", chapterId: "g4_eng_w1", chapterName: "Grammar Galaxy", topicId: "g4_eng_grammar", topicName: "Nouns & Verbs", levelNumber: 1, questionType: "quiz",
    questionText: "Identify the action verb in: 'The happy dog runs in the garden.'",
    options: [{ id: "A", text: "dog" }, { id: "B", text: "happy" }, { id: "C", text: "runs", isCorrect: true }, { id: "D", text: "garden" }],
    explanation: "'runs' expresses the physical action performed by the subject (dog).", difficulty: "Easy", xpReward: 50, coinsReward: 20
  },
  {
    id: "g4_soc_1", classStandard: 4, subjectId: "social", chapterId: "g4_soc_w1", chapterName: "Earth & Maps", topicId: "g4_soc_maps", topicName: "Continents & Maps", levelNumber: 1, questionType: "quiz",
    questionText: "Which is the largest continent on Earth?",
    options: [{ id: "A", text: "Africa" }, { id: "B", text: "Asia", isCorrect: true }, { id: "C", text: "Europe" }, { id: "D", text: "Antarctica" }],
    explanation: "Asia is the largest continent by both land area and population.", difficulty: "Easy", xpReward: 50, coinsReward: 20
  },
  {
    id: "g4_tam_1", classStandard: 4, subjectId: "tamil", chapterId: "g4_tam_w1", chapterName: "தமிழ் அமுது", topicId: "g4_tam_grammar", topicName: "தமிழ் எழுத்துக்கள்", levelNumber: 1, questionType: "quiz",
    questionText: "தமிழ் மொழியில் உள்ள உயிர் எழுத்துக்களின் எண்ணிக்கை எத்தனை?",
    options: [{ id: "A", text: "18" }, { id: "B", text: "12", isCorrect: true }, { id: "C", text: "216" }, { id: "D", text: "1" }],
    explanation: "தமிழ் மொழியில் அ முதல் ஔ வரை 12 உயிர் எழுத்துக்கள் உள்ளன.", difficulty: "Easy", xpReward: 50, coinsReward: 20
  },

  // ─── CLASS 5 ──────────────────────────────────────────────────────────────
  {
    id: "g5_m_1", classStandard: 5, subjectId: "maths", chapterId: "g5_maths_w1", chapterName: "Factors & Multiples", topicId: "g5_maths_factors", topicName: "HCF & LCM", levelNumber: 1, questionType: "quiz",
    questionText: "What is the Highest Common Factor (HCF) of 12 and 18?",
    options: [{ id: "A", text: "3" }, { id: "B", text: "6", isCorrect: true }, { id: "C", text: "12" }, { id: "D", text: "36" }],
    explanation: "Factors of 12 = {1,2,3,4,6,12}. Factors of 18 = {1,2,3,6,9,18}. HCF = 6.", difficulty: "Easy", xpReward: 55, coinsReward: 25
  },
  {
    id: "g5_s_1", classStandard: 5, subjectId: "science", chapterId: "g5_sci_w1", chapterName: "Human Organ Systems", topicId: "g5_sci_humanbody", topicName: "Digestive System", levelNumber: 1, questionType: "quiz",
    questionText: "Where does digestion of food begin in the human body?",
    options: [{ id: "A", text: "Stomach" }, { id: "B", text: "Mouth", isCorrect: true }, { id: "C", text: "Small Intestine" }, { id: "D", text: "Esophagus" }],
    explanation: "Digestion starts in the mouth where saliva breaks down starches.", difficulty: "Easy", xpReward: 55, coinsReward: 25
  },
  {
    id: "g5_e_1", classStandard: 5, subjectId: "english", chapterId: "g5_eng_w1", chapterName: "Tenses & Sentences", topicId: "g5_eng_tenses", topicName: "Tenses", levelNumber: 1, questionType: "quiz",
    questionText: "Choose the past tense verb: 'Yesterday, she _____ a cake.'",
    options: [{ id: "A", text: "bakes" }, { id: "B", text: "baked", isCorrect: true }, { id: "C", text: "baking" }, { id: "D", text: "will bake" }],
    explanation: "'Yesterday' signals a completed past action, so 'baked' is correct.", difficulty: "Easy", xpReward: 55, coinsReward: 25
  },
  {
    id: "g5_soc_1", classStandard: 5, subjectId: "social", chapterId: "g5_soc_w1", chapterName: "Continents & Oceans", topicId: "g5_soc_continents", topicName: "World Geography", levelNumber: 1, questionType: "quiz",
    questionText: "Which ocean is the deepest and largest ocean on Earth?",
    options: [{ id: "A", text: "Atlantic Ocean" }, { id: "B", text: "Pacific Ocean", isCorrect: true }, { id: "C", text: "Indian Ocean" }, { id: "D", text: "Arctic Ocean" }],
    explanation: "The Pacific Ocean covers over 30% of Earth's surface.", difficulty: "Easy", xpReward: 55, coinsReward: 25
  },
  {
    id: "g5_tam_1", classStandard: 5, subjectId: "tamil", chapterId: "g5_tam_w1", chapterName: "தமிழ் செய்யுள்", topicId: "g5_tam_lit", topicName: "தமிழின் இனிமை", levelNumber: 1, questionType: "quiz",
    questionText: "'தமிழுக்கும் அமுதென்று பேர்' - என்று பாடியவர் யார்?",
    options: [{ id: "A", text: "பாரதியார்" }, { id: "B", text: "பாரதிதாசன்", isCorrect: true }, { id: "C", text: "கண்ணதாசன்" }, { id: "D", text: "நாமக்கல் கவிஞர்" }],
    explanation: "இப்பாடலை இயற்றியவர் புரட்சிக்கவிஞர் பாரதிதாசன் ஆவார்.", difficulty: "Easy", xpReward: 55, coinsReward: 25
  },

  // ─── CLASS 6 ──────────────────────────────────────────────────────────────
  {
    id: "g6_m_1", classStandard: 6, subjectId: "maths", chapterId: "g6_maths_w1", chapterName: "Integer Odyssey", topicId: "g6_maths_integers", topicName: "Integers", levelNumber: 1, questionType: "quiz",
    questionText: "What is the value of (-15) + (+8)?",
    options: [{ id: "A", text: "-7", isCorrect: true }, { id: "B", text: "-23" }, { id: "C", text: "7" }, { id: "D", text: "23" }],
    explanation: "(-15) + 8 = -(15 - 8) = -7.", difficulty: "Easy", xpReward: 60, coinsReward: 25
  },
  {
    id: "g6_s_1", classStandard: 6, subjectId: "science", chapterId: "g6_sci_w1", chapterName: "Food & Nutrition", topicId: "g6_sci_food", topicName: "Components of Food", levelNumber: 1, questionType: "quiz",
    questionText: "Deficiency of Vitamin C causes which disease?",
    options: [{ id: "A", text: "Rickets" }, { id: "B", text: "Scurvy", isCorrect: true }, { id: "C", text: "Beriberi" }, { id: "D", text: "Anaemia" }],
    explanation: "Vitamin C deficiency leads to scurvy.", difficulty: "Easy", xpReward: 60, coinsReward: 25
  },
  {
    id: "g6_e_1", classStandard: 6, subjectId: "english", chapterId: "g6_eng_w1", chapterName: "Pronouns & Clauses", topicId: "g6_eng_clauses", topicName: "Pronouns", levelNumber: 1, questionType: "quiz",
    questionText: "Which word is a reflexive pronoun in: 'He solved the puzzle himself.'?",
    options: [{ id: "A", text: "He" }, { id: "B", text: "himself", isCorrect: true }, { id: "C", text: "solved" }, { id: "D", text: "puzzle" }],
    explanation: "'himself' is a reflexive pronoun.", difficulty: "Easy", xpReward: 60, coinsReward: 25
  },
  {
    id: "g6_soc_1", classStandard: 6, subjectId: "social", chapterId: "g6_soc_w1", chapterName: "Ancient History", topicId: "g6_soc_history", topicName: "Indus Valley", levelNumber: 1, questionType: "quiz",
    questionText: "Which major Indus Valley site contained the famous 'Great Bath'?",
    options: [{ id: "A", text: "Harappa" }, { id: "B", text: "Mohenjo-daro", isCorrect: true }, { id: "C", text: "Lothal" }, { id: "D", text: "Kalibangan" }],
    explanation: "The Great Bath structure was discovered at Mohenjo-daro.", difficulty: "Easy", xpReward: 60, coinsReward: 25
  },
  {
    id: "g6_tam_1", classStandard: 6, subjectId: "tamil", chapterId: "g6_tam_w1", chapterName: "இன்பத்தமிழ்", topicId: "g6_tam_gummi", topicName: "தமிழ்க் கும்மி", levelNumber: 1, questionType: "quiz",
    questionText: "'தமிழ்க் கும்மி' என்ற பாடலின் ஆசிரியர் யார்?",
    options: [{ id: "A", text: "பெருஞ்சித்திரனார்", isCorrect: true }, { id: "B", text: "பாரதியார்" }, { id: "C", text: "கபிலர்" }, { id: "D", text: "ஔவையார்" }],
    explanation: "தமிழ்க் கும்மி பாடலை இயற்றியவர் பாவலரேறு பெருஞ்சித்திரனார்.", difficulty: "Easy", xpReward: 60, coinsReward: 25
  },

  // ─── CLASS 7 ──────────────────────────────────────────────────────────────
  {
    id: "g7_m_1", classStandard: 7, subjectId: "maths", chapterId: "g7_maths_w1", chapterName: "Algebra Foundations", topicId: "g7_maths_algebra", topicName: "Linear Equations", levelNumber: 1, questionType: "quiz",
    questionText: "Solve for x: 3x - 5 = 16",
    options: [{ id: "A", text: "x = 5" }, { id: "B", text: "x = 7", isCorrect: true }, { id: "C", text: "x = 9" }, { id: "D", text: "x = 6" }],
    explanation: "3x = 16 + 5 => 3x = 21 => x = 7.", difficulty: "Medium", xpReward: 65, coinsReward: 30
  },
  {
    id: "g7_s_1", classStandard: 7, subjectId: "science", chapterId: "g7_sci_w1", chapterName: "Heat & Temperature", topicId: "g7_sci_heat", topicName: "Heat Transfer", levelNumber: 1, questionType: "quiz",
    questionText: "What mode of heat transfer requires direct physical contact between solids?",
    options: [{ id: "A", text: "Conduction", isCorrect: true }, { id: "B", text: "Convection" }, { id: "C", text: "Radiation" }, { id: "D", text: "Evaporation" }],
    explanation: "Conduction transfers heat through direct physical contact in solids.", difficulty: "Medium", xpReward: 65, coinsReward: 30
  },
  {
    id: "g7_e_1", classStandard: 7, subjectId: "english", chapterId: "g7_eng_w1", chapterName: "Reported Speech", topicId: "g7_eng_speech", topicName: "Indirect Speech", levelNumber: 1, questionType: "quiz",
    questionText: "Convert to indirect speech: He said, 'I am reading a book.'",
    options: [{ id: "A", text: "He said that he is reading a book." }, { id: "B", text: "He said that he was reading a book.", isCorrect: true }, { id: "C", text: "He told he reads a book." }, { id: "D", text: "He says he read a book." }],
    explanation: "'am reading' changes to past continuous 'was reading'.", difficulty: "Medium", xpReward: 65, coinsReward: 30
  },
  {
    id: "g7_soc_1", classStandard: 7, subjectId: "social", chapterId: "g7_soc_w1", chapterName: "Medieval History", topicId: "g7_soc_kingdoms", topicName: "Delhi Sultanate", levelNumber: 1, questionType: "quiz",
    questionText: "Who was the first woman ruler of the Delhi Sultanate?",
    options: [{ id: "A", text: "Nur Jahan" }, { id: "B", text: "Razia Sultana", isCorrect: true }, { id: "C", text: "Chand Bibi" }, { id: "D", text: "Mumtaz Mahal" }],
    explanation: "Razia Sultana ruled the Delhi Sultanate from 1236 to 1240 CE.", difficulty: "Medium", xpReward: 65, coinsReward: 30
  },
  {
    id: "g7_tam_1", classStandard: 7, subjectId: "tamil", chapterId: "g7_tam_w1", chapterName: "எங்கள் தமிழ்", topicId: "g7_tam_engal", topicName: "பகுபத உறுப்பிலக்கணம்", levelNumber: 1, questionType: "quiz",
    questionText: "'எங்கள் தமிழ்' பாடலை இயற்றிய நாமக்கல் கவிஞர் யார்?",
    options: [{ id: "A", text: "வெ. இராமலிங்கனார்", isCorrect: true }, { id: "B", text: "பாரதியார்" }, { id: "C", text: "வாணிதாசன்" }, { id: "D", text: "சுரதா" }],
    explanation: "நாமக்கல் கவிஞர் வே. இராமலிங்கனார் இப்பாடலை இயற்றினார்.", difficulty: "Medium", xpReward: 65, coinsReward: 30
  },

  // ─── CLASS 8 ──────────────────────────────────────────────────────────────
  {
    id: "g8_m_1", classStandard: 8, subjectId: "maths", chapterId: "g8_maths_w1", chapterName: "Exponents & Powers", topicId: "g8_maths_exponents", topicName: "Laws of Exponents", levelNumber: 1, questionType: "quiz",
    questionText: "Simplify: 2⁻³",
    options: [{ id: "A", text: "-8" }, { id: "B", text: "1/8", isCorrect: true }, { id: "C", text: "-6" }, { id: "D", text: "1/6" }],
    explanation: "2⁻³ = 1 / (2³) = 1/8.", difficulty: "Medium", xpReward: 70, coinsReward: 30
  },
  {
    id: "g8_s_1", classStandard: 8, subjectId: "science", chapterId: "g8_sci_w1", chapterName: "Microorganisms Realm", topicId: "g8_sci_micro", topicName: "Microorganisms", levelNumber: 1, questionType: "quiz",
    questionText: "Which bacterium converts milk into curd?",
    options: [{ id: "A", text: "Lactobacillus", isCorrect: true }, { id: "B", text: "Rhizobium" }, { id: "C", text: "E. coli" }, { id: "D", text: "Penicillium" }],
    explanation: "Lactobacillus ferments milk lactose into curd.", difficulty: "Easy", xpReward: 70, coinsReward: 30
  },
  {
    id: "g8_e_1", classStandard: 8, subjectId: "english", chapterId: "g8_eng_w1", chapterName: "Modal Auxiliaries", topicId: "g8_eng_modals", topicName: "Modals", levelNumber: 1, questionType: "quiz",
    questionText: "Which modal verb expresses strict obligation or rule?",
    options: [{ id: "A", text: "might" }, { id: "B", text: "must", isCorrect: true }, { id: "C", text: "could" }, { id: "D", text: "would" }],
    explanation: "'must' expresses strong rule or obligation.", difficulty: "Medium", xpReward: 70, coinsReward: 30
  },
  {
    id: "g8_soc_1", classStandard: 8, subjectId: "social", chapterId: "g8_soc_w1", chapterName: "Modern History", topicId: "g8_soc_modern", topicName: "Indian Constitution", levelNumber: 1, questionType: "quiz",
    questionText: "Who is known as the Father of the Indian Constitution?",
    options: [{ id: "A", text: "Mahatma Gandhi" }, { id: "B", text: "Dr. B.R. Ambedkar", isCorrect: true }, { id: "C", text: "Jawaharlal Nehru" }, { id: "D", text: "Sardar Patel" }],
    explanation: "Dr. B.R. Ambedkar chaired the Constitution Drafting Committee.", difficulty: "Easy", xpReward: 70, coinsReward: 30
  },
  {
    id: "g8_tam_1", classStandard: 8, subjectId: "tamil", chapterId: "g8_tam_w1", chapterName: "தமிழ் வாழ்த்து", topicId: "g8_tam_mozhi", topicName: "தொகைநிலைத் தொடர்", levelNumber: 1, questionType: "quiz",
    questionText: "தமிழ் மொழியை 'செம்மொழி'யாக இந்திய அரசு அறிவித்த ஆண்டு எது?",
    options: [{ id: "A", text: "2001" }, { id: "B", text: "2004", isCorrect: true }, { id: "C", text: "2010" }, { id: "D", text: "1998" }],
    explanation: "2004 ஆம் ஆண்டு தமிழ் முதலாவது செம்மொழியாக அறிவிக்கப்பட்டது.", difficulty: "Medium", xpReward: 70, coinsReward: 30
  },

  // ─── CLASS 9 ──────────────────────────────────────────────────────────────
  {
    id: "g9_phy_1", classStandard: 9, subjectId: "physics", chapterId: "g9_phy_w1", chapterName: "Motion & Velocity", topicId: "g9_phy_motion", topicName: "Equations of Motion", levelNumber: 1, questionType: "quiz",
    questionText: "What is the SI unit of acceleration?",
    options: [{ id: "A", text: "m/s" }, { id: "B", text: "m/s²", isCorrect: true }, { id: "C", text: "km/h" }, { id: "D", text: "N/m²" }],
    explanation: "Acceleration unit is m/s².", difficulty: "Medium", xpReward: 75, coinsReward: 30
  },
  {
    id: "g9_chem_1", classStandard: 9, subjectId: "chemistry", chapterId: "g9_chem_w1", chapterName: "Matter & Atoms", topicId: "g9_chem_matter", topicName: "Sublimation", levelNumber: 1, questionType: "quiz",
    questionText: "Direct change of solid to gas without passing through liquid state is:",
    options: [{ id: "A", text: "Evaporation" }, { id: "B", text: "Sublimation", isCorrect: true }, { id: "C", text: "Condensation" }, { id: "D", text: "Melting" }],
    explanation: "Sublimation is direct solid to gas transition.", difficulty: "Medium", xpReward: 75, coinsReward: 30
  },
  {
    id: "g9_bio_1", classStandard: 9, subjectId: "biology", chapterId: "g9_bio_w1", chapterName: "Cell Unit of Life", topicId: "g9_bio_cell", topicName: "Cell Organelles", levelNumber: 1, questionType: "quiz",
    questionText: "Which cell organelle is known as the 'Powerhouse of the Cell'?",
    options: [{ id: "A", text: "Ribosome" }, { id: "B", text: "Mitochondria", isCorrect: true }, { id: "C", text: "Golgi Apparatus" }, { id: "D", text: "Lysosome" }],
    explanation: "Mitochondria synthesize ATP energy molecules.", difficulty: "Easy", xpReward: 75, coinsReward: 30
  },
  {
    id: "g9_eng_1", classStandard: 9, subjectId: "english", chapterId: "g9_eng_w1", chapterName: "English Literature", topicId: "g9_eng_lit", topicName: "Figures of Speech", levelNumber: 1, questionType: "quiz",
    questionText: "Identify the figure of speech in: 'Her smile was as bright as the sun.'",
    options: [{ id: "A", text: "Metaphor" }, { id: "B", text: "Simile", isCorrect: true }, { id: "C", text: "Personification" }, { id: "D", text: "Hyperbole" }],
    explanation: "Comparison using 'as' or 'like' is a Simile.", difficulty: "Easy", xpReward: 75, coinsReward: 30
  },
  {
    id: "g9_soc_1", classStandard: 9, subjectId: "social", chapterId: "g9_soc_w1", chapterName: "French Revolution", topicId: "g9_soc_rev", topicName: "1789 Revolution", levelNumber: 1, questionType: "quiz",
    questionText: "In which year did the French Revolution begin with the storming of the Bastille?",
    options: [{ id: "A", text: "1789", isCorrect: true }, { id: "B", text: "1799" }, { id: "C", text: "1815" }, { id: "D", text: "1776" }],
    explanation: "The storming of the Bastille occurred on 14 July 1789.", difficulty: "Medium", xpReward: 75, coinsReward: 30
  },
  {
    id: "g9_tam_1", classStandard: 9, subjectId: "tamil", chapterId: "g9_tam_w1", chapterName: "திராவிட மொழிகள்", topicId: "g9_tam_dravida", topicName: "மொழிக்குடும்பம்", levelNumber: 1, questionType: "quiz",
    questionText: "'திராவிட மொழிகளின் ஒப்பிலக்கணம்' என்ற நூலை எழுதியவர் யார்?",
    options: [{ id: "A", text: "கால்டுவெல்", isCorrect: true }, { id: "B", text: "ஜி.யு.போப்" }, { id: "C", text: "வீரமாமுனிவர்" }, { id: "D", text: "பெஸ்கி" }],
    explanation: "ராபர்ட் கால்டுவெல் 1856 இல் இந்நூலை வெளியிட்டார்.", difficulty: "Medium", xpReward: 75, coinsReward: 30
  },

  // ─── CLASS 10 ─────────────────────────────────────────────────────────────
  {
    id: "g10_phy_1", classStandard: 10, subjectId: "physics", chapterId: "g10_phy_w1", chapterName: "Light Reflection", topicId: "g10_phy_light", topicName: "Refraction & Lenses", levelNumber: 1, questionType: "quiz",
    questionText: "The focal length of a spherical mirror of radius of curvature 30 cm is:",
    options: [{ id: "A", text: "15 cm", isCorrect: true }, { id: "B", text: "30 cm" }, { id: "C", text: "60 cm" }, { id: "D", text: "10 cm" }],
    explanation: "Focal length f = R / 2 = 30 / 2 = 15 cm.", difficulty: "Medium", xpReward: 80, coinsReward: 35
  },
  {
    id: "g10_chem_1", classStandard: 10, subjectId: "chemistry", chapterId: "g10_chem_w1", chapterName: "Chemical Reactions", topicId: "g10_chem_reactions", topicName: "Acids, Bases & Reactions", levelNumber: 1, questionType: "quiz",
    questionText: "What is the pH value of pure neutral water at 25°C?",
    options: [{ id: "A", text: "0" }, { id: "B", text: "7", isCorrect: true }, { id: "C", text: "14" }, { id: "D", text: "1" }],
    explanation: "Neutral pure water has a pH of 7.", difficulty: "Easy", xpReward: 80, coinsReward: 35
  },
  {
    id: "g10_bio_1", classStandard: 10, subjectId: "biology", chapterId: "g10_bio_w1", chapterName: "Life Processes", topicId: "g10_bio_life", topicName: "Respiration & Circulation", levelNumber: 1, questionType: "quiz",
    questionText: "Which blood vessels carry oxygenated blood away from the heart to body tissues?",
    options: [{ id: "A", text: "Veins" }, { id: "B", text: "Arteries", isCorrect: true }, { id: "C", text: "Capillaries" }, { id: "D", text: "Lymphatics" }],
    explanation: "Arteries carry oxygenated blood under pressure away from the heart.", difficulty: "Easy", xpReward: 80, coinsReward: 35
  },
  {
    id: "g10_eng_1", classStandard: 10, subjectId: "english", chapterId: "g10_eng_w1", chapterName: "Advanced Grammar", topicId: "g10_eng_grammar", topicName: "Subject-Verb Agreement", levelNumber: 1, questionType: "quiz",
    questionText: "Choose the correct verb: 'Neither John nor his friends _____ present.'",
    options: [{ id: "A", text: "was" }, { id: "B", text: "were", isCorrect: true }, { id: "C", text: "is" }, { id: "D", text: "be" }],
    explanation: "When subjects are joined by 'neither... nor', verb agrees with closest subject ('friends' -> were).", difficulty: "Medium", xpReward: 80, coinsReward: 35
  },
  {
    id: "g10_soc_1", classStandard: 10, subjectId: "social", chapterId: "g10_soc_w1", chapterName: "Nationalism in India", topicId: "g10_soc_nationalism", topicName: "Civil Disobedience", levelNumber: 1, questionType: "quiz",
    questionText: "Mahatma Gandhi launched the Dandi Salt March in which year?",
    options: [{ id: "A", text: "1920" }, { id: "B", text: "1930", isCorrect: true }, { id: "C", text: "1942" }, { id: "D", text: "1919" }],
    explanation: "The Dandi March took place from March to April 1930.", difficulty: "Medium", xpReward: 80, coinsReward: 35
  },
  {
    id: "g10_tam_1", classStandard: 10, subjectId: "tamil", chapterId: "g10_tam_w1", chapterName: "அன்னை மொழியே", topicId: "g10_tam_annai", topicName: "தமிழழகனார் கவிதை", levelNumber: 1, questionType: "quiz",
    questionText: "'அன்னை மொழியே' என்னும் பாடலை எழுதியவர் யார்?",
    options: [{ id: "A", text: "பாவலரேறு பெருஞ்சித்திரனார்", isCorrect: true }, { id: "B", text: "பாரதியார்" }, { id: "C", text: "கண்ணதாசன்" }, { id: "D", text: "முடியரசன்" }],
    explanation: "பெருஞ்சித்திரனாரின் கனிச்சாறு தொகுப்பிலிருந்து இப்பாடல் எடுத்தாளப்பட்டது.", difficulty: "Medium", xpReward: 80, coinsReward: 35
  },

  // ─── CLASS 11 ─────────────────────────────────────────────────────────────
  {
    id: "g11_m_1", classStandard: 11, subjectId: "maths", chapterId: "g11_maths_w1", chapterName: "Sets & Functions", topicId: "g11_maths_sets", topicName: "Set Theory", levelNumber: 1, questionType: "quiz",
    questionText: "If set A has 3 elements, how many subsets does set A have?",
    options: [{ id: "A", text: "6" }, { id: "B", text: "8", isCorrect: true }, { id: "C", text: "9" }, { id: "D", text: "16" }],
    explanation: "Subsets = 2ⁿ = 2³ = 8.", difficulty: "Medium", xpReward: 85, coinsReward: 40
  },
  {
    id: "g11_phy_1", classStandard: 11, subjectId: "physics", chapterId: "g11_phy_w1", chapterName: "Kinematics & Projectiles", topicId: "g11_phy_kinematics", topicName: "Projectile Motion", levelNumber: 1, questionType: "quiz",
    questionText: "At what projection angle is projectile horizontal range maximum?",
    options: [{ id: "A", text: "30°" }, { id: "B", text: "45°", isCorrect: true }, { id: "C", text: "60°" }, { id: "D", text: "90°" }],
    explanation: "Range R is maximum when sin 2θ = 1 => θ = 45°.", difficulty: "Medium", xpReward: 85, coinsReward: 40
  },
  {
    id: "g11_chem_1", classStandard: 11, subjectId: "chemistry", chapterId: "g11_chem_w1", chapterName: "Atomic Structure", topicId: "g11_chem_atomic", topicName: "Quantum Numbers", levelNumber: 1, questionType: "quiz",
    questionText: "What is the maximum number of electrons that can be accommodated in a d-subshell?",
    options: [{ id: "A", text: "2" }, { id: "B", text: "6" }, { id: "C", text: "10", isCorrect: true }, { id: "D", text: "14" }],
    explanation: "d-subshell has 5 orbitals; max electrons = 2 × 5 = 10.", difficulty: "Medium", xpReward: 85, coinsReward: 40
  },
  {
    id: "g11_bio_1", classStandard: 11, subjectId: "biology", chapterId: "g11_bio_w1", chapterName: "Living World & Taxonomy", topicId: "g11_bio_living", topicName: "Binomial Nomenclature", levelNumber: 1, questionType: "quiz",
    questionText: "Who introduced the system of Binomial Nomenclature for naming species?",
    options: [{ id: "A", text: "Carl Linnaeus", isCorrect: true }, { id: "B", text: "Charles Darwin" }, { id: "C", text: "Gregor Mendel" }, { id: "D", text: "Robert Hooke" }],
    explanation: "Carl Linnaeus established binomial nomenclature in 1753.", difficulty: "Easy", xpReward: 85, coinsReward: 40
  },
  {
    id: "g11_cs_1", classStandard: 11, subjectId: "cs", chapterId: "g11_cs_w1", chapterName: "Python Fundamentals", topicId: "g11_cs_python", topicName: "Python Data Types", levelNumber: 1, questionType: "quiz",
    questionText: "What will be the output of: print(type(5 / 2)) in Python 3?",
    options: [{ id: "A", text: "<class 'float'>", isCorrect: true }, { id: "B", text: "<class 'int'>" }, { id: "C", text: "<class 'double'>" }, { id: "D", text: "<class 'str'>" }],
    explanation: "Division operator (/) in Python 3 always produces float.", difficulty: "Easy", xpReward: 85, coinsReward: 40
  },
  {
    id: "g11_eng_1", classStandard: 11, subjectId: "english", chapterId: "g11_eng_w1", chapterName: "Advanced Prose & Poetry", topicId: "g11_eng_comprehension", topicName: "Rhetoric", levelNumber: 1, questionType: "quiz",
    questionText: "What is an oxymoron?",
    options: [{ id: "A", text: "Juxtaposition of contradictory terms", isCorrect: true }, { id: "B", text: "Exaggerated statement" }, { id: "C", text: "Repetition of vowel sounds" }, { id: "D", text: "Direct address to absent person" }],
    explanation: "Oxymoron joins contradictory words (e.g. 'deafening silence').", difficulty: "Medium", xpReward: 85, coinsReward: 40
  },
  {
    id: "g11_ca_1", classStandard: 11, subjectId: "ca", chapterId: "g11_ca_w1", chapterName: "Web Design & HTML5", topicId: "g11_ca_webdesign", topicName: "HTML5 Elements", levelNumber: 1, questionType: "quiz",
    questionText: "Which HTML5 tag is used to embed audio files?",
    options: [{ id: "A", text: "<sound>" }, { id: "B", text: "<audio>", isCorrect: true }, { id: "C", text: "<music>" }, { id: "D", text: "<mp3>" }],
    explanation: "<audio> tag embeds audio playback in HTML5 documents.", difficulty: "Easy", xpReward: 85, coinsReward: 40
  },
  {
    id: "g11_hist_1", classStandard: 11, subjectId: "history", chapterId: "g11_hist_w1", chapterName: "Early India & Civilisations", topicId: "g11_hist_early", topicName: "Mauryan Empire", levelNumber: 1, questionType: "quiz",
    questionText: "Who was the minister and author of Arthashastra who assisted Chandragupta Maurya?",
    options: [{ id: "A", text: "Chanakya (Kautilya)", isCorrect: true }, { id: "B", text: "Bana" }, { id: "C", text: "Kalidasa" }, { id: "D", text: "Megasthenes" }],
    explanation: "Chanakya (Kautilya) authored the treatise Arthashastra.", difficulty: "Easy", xpReward: 85, coinsReward: 40
  },
  {
    id: "g11_eco_1", classStandard: 11, subjectId: "economics", chapterId: "g11_eco_w1", chapterName: "Microeconomics", topicId: "g11_eco_micro", topicName: "Law of Demand", levelNumber: 1, questionType: "quiz",
    questionText: "According to the Law of Demand, as price of a good increases, quantity demanded:",
    options: [{ id: "A", text: "Increases" }, { id: "B", text: "Decreases", isCorrect: true }, { id: "C", text: "Remains constant" }, { id: "D", text: "Becomes zero" }],
    explanation: "Price and quantity demanded have an inverse relationship.", difficulty: "Easy", xpReward: 85, coinsReward: 40
  },
  {
    id: "g11_comm_1", classStandard: 11, subjectId: "commerce", chapterId: "g11_comm_w1", chapterName: "Business Foundations", topicId: "g11_comm_business", topicName: "Forms of Business", levelNumber: 1, questionType: "quiz",
    questionText: "In which business form is owner liability unlimited?",
    options: [{ id: "A", text: "Sole Proprietorship", isCorrect: true }, { id: "B", text: "Joint Stock Company" }, { id: "C", text: "Cooperative" }, { id: "D", text: "LLP" }],
    explanation: "Sole proprietors face unlimited personal liability for business debts.", difficulty: "Medium", xpReward: 85, coinsReward: 40
  },
  {
    id: "g11_acc_1", classStandard: 11, subjectId: "accounts", chapterId: "g11_acc_w1", chapterName: "Bookkeeping & Journal", topicId: "g11_acc_journal", topicName: "Double Entry Rules", levelNumber: 1, questionType: "quiz",
    questionText: "What is the accounting golden rule for Real Accounts?",
    options: [{ id: "A", text: "Debit what comes in, Credit what goes out", isCorrect: true }, { id: "B", text: "Debit receiver, Credit giver" }, { id: "C", text: "Debit expenses, Credit incomes" }, { id: "D", text: "Debit assets, Credit capital" }],
    explanation: "Real Account rule: Debit what comes into business, Credit what goes out.", difficulty: "Medium", xpReward: 85, coinsReward: 40
  },
  {
    id: "g11_tam_1", classStandard: 11, subjectId: "tamil", chapterId: "g11_tam_w1", chapterName: "யுகத்தின் பாடல்", topicId: "g11_tam_yugam", topicName: "நன்னூல் பாயிரம்", levelNumber: 1, questionType: "quiz",
    questionText: "'நன்னூல்' என்ற தமிழ் இலக்கண நூலை எழுதியவர் யார்?",
    options: [{ id: "A", text: "பவணந்தி முனிவர்", isCorrect: true }, { id: "B", text: "தொல்காப்பியர்" }, { id: "C", text: "வீரமாமுனிவர்" }, { id: "D", text: "அகத்தியர்" }],
    explanation: "பவணந்தி முனிவர் 13ஆம் நூற்றாண்டில் நன்னூலை இயற்றினார்.", difficulty: "Medium", xpReward: 85, coinsReward: 40
  },

  // ─── CLASS 12 ─────────────────────────────────────────────────────────────
  {
    id: "g12_m_1", classStandard: 12, subjectId: "maths", chapterId: "g12_maths_w1", chapterName: "Matrices & Determinants", topicId: "g12_maths_matrices", topicName: "Matrix Inverse", levelNumber: 1, questionType: "quiz",
    questionText: "If matrix A is singular, what is its determinant |A|?",
    options: [{ id: "A", text: "|A| = 1" }, { id: "B", text: "|A| = 0", isCorrect: true }, { id: "C", text: "|A| = -1" }, { id: "D", text: "|A| = ∞" }],
    explanation: "A square matrix is singular if its determinant equals zero.", difficulty: "Medium", xpReward: 90, coinsReward: 45
  },
  {
    id: "g12_phy_1", classStandard: 12, subjectId: "physics", chapterId: "g12_phy_w1", chapterName: "Electrostatics & Fields", topicId: "g12_phy_electrostatics", topicName: "Coulomb's Law", levelNumber: 1, questionType: "quiz",
    questionText: "What happens to electrostatic force between two point charges if distance is doubled?",
    options: [{ id: "A", text: "Doubled" }, { id: "B", text: "Decreased to 1/4th", isCorrect: true }, { id: "C", text: "Halved" }, { id: "D", text: "Quadrupled" }],
    explanation: "F ∝ 1/r². Doubling r reduces force to 1/2² = 1/4th.", difficulty: "Medium", xpReward: 90, coinsReward: 45
  },
  {
    id: "g12_chem_1", classStandard: 12, subjectId: "chemistry", chapterId: "g12_chem_w1", chapterName: "Solutions & Kinetics", topicId: "g12_chem_solutions", topicName: "Solutions & Raoult Law", levelNumber: 1, questionType: "quiz",
    questionText: "A solution that obeys Raoult's law over the entire concentration range is called:",
    options: [{ id: "A", text: "Ideal solution", isCorrect: true }, { id: "B", text: "Non-ideal solution" }, { id: "C", text: "Azeotrope" }, { id: "D", text: "Colloid" }],
    explanation: "Ideal solutions strictly follow Raoult's law at all concentrations.", difficulty: "Medium", xpReward: 90, coinsReward: 45
  },
  {
    id: "g12_bio_1", classStandard: 12, subjectId: "biology", chapterId: "g12_bio_w1", chapterName: "Genetics & DNA", topicId: "g12_bio_genetics", topicName: "Mendelian Genetics", levelNumber: 1, questionType: "quiz",
    questionText: "What is the monohybrid phenotypic ratio in Mendel's F2 generation?",
    options: [{ id: "A", text: "1:2:1" }, { id: "B", text: "3:1", isCorrect: true }, { id: "C", text: "9:3:3:1" }, { id: "D", text: "1:1" }],
    explanation: "Monohybrid F2 phenotypic ratio is 3 Dominant : 1 Recessive.", difficulty: "Medium", xpReward: 90, coinsReward: 45
  },
  {
    id: "g12_cs_1", classStandard: 12, subjectId: "cs", chapterId: "g12_cs_w1", chapterName: "SQL & Database Systems", topicId: "g12_cs_sql", topicName: "SQL Queries", levelNumber: 1, questionType: "quiz",
    questionText: "Which SQL clause is used to eliminate duplicate rows from a query result?",
    options: [{ id: "A", text: "DISTINCT", isCorrect: true }, { id: "B", text: "UNIQUE" }, { id: "C", text: "GROUP BY" }, { id: "D", text: "ORDER BY" }],
    explanation: "SELECT DISTINCT removes duplicate rows from query output.", difficulty: "Easy", xpReward: 90, coinsReward: 45
  },
  {
    id: "g12_eng_1", classStandard: 12, subjectId: "english", chapterId: "g12_eng_w1", chapterName: "Rhetoric & Classics", topicId: "g12_eng_classics", topicName: "Essay Writing", levelNumber: 1, questionType: "quiz",
    questionText: "Which rhetorical device repeats the initial word or phrase in successive clauses?",
    options: [{ id: "A", text: "Anaphora", isCorrect: true }, { id: "B", text: "Alliteration" }, { id: "C", text: "Assonance" }, { id: "D", text: "Metonymy" }],
    explanation: "Anaphora is repetition of words at the start of consecutive sentences/clauses.", difficulty: "Hard", xpReward: 90, coinsReward: 45
  },
  {
    id: "g12_ca_1", classStandard: 12, subjectId: "ca", chapterId: "g12_ca_w1", chapterName: "PHP & MySQL Development", topicId: "g12_ca_php", topicName: "PHP Server Scripts", levelNumber: 1, questionType: "quiz",
    questionText: "All variables in PHP start with which symbol?",
    options: [{ id: "A", text: "&" }, { id: "B", text: "$", isCorrect: true }, { id: "C", text: "#" }, { id: "D", text: "@" }],
    explanation: "PHP variable names begin with the dollar sign ($) followed by variable name.", difficulty: "Easy", xpReward: 90, coinsReward: 45
  },
  {
    id: "g12_hist_1", classStandard: 12, subjectId: "history", chapterId: "g12_hist_w1", chapterName: "Modern World & Freedom", topicId: "g12_hist_modern", topicName: "Cold War Era", levelNumber: 1, questionType: "quiz",
    questionText: "Which military alliance was founded by Western powers in 1949?",
    options: [{ id: "A", text: "Warsaw Pact" }, { id: "B", text: "NATO", isCorrect: true }, { id: "C", text: "SEATO" }, { id: "D", text: "League of Nations" }],
    explanation: "NATO (North Atlantic Treaty Organization) was formed in April 1949.", difficulty: "Medium", xpReward: 90, coinsReward: 45
  },
  {
    id: "g12_eco_1", classStandard: 12, subjectId: "economics", chapterId: "g12_eco_w1", chapterName: "Macroeconomics & GDP", topicId: "g12_eco_macro", topicName: "National Income", levelNumber: 1, questionType: "quiz",
    questionText: "Which central bank regulates monetary policy and currency issuance in India?",
    options: [{ id: "A", text: "State Bank of India" }, { id: "B", text: "Reserve Bank of India", isCorrect: true }, { id: "C", text: "NITI Aayog" }, { id: "D", text: "SEBI" }],
    explanation: "The Reserve Bank of India (RBI) is the supreme monetary authority.", difficulty: "Easy", xpReward: 90, coinsReward: 45
  },
  {
    id: "g12_comm_1", classStandard: 12, subjectId: "commerce", chapterId: "g12_comm_w1", chapterName: "Marketing & Management", topicId: "g12_comm_marketing", topicName: "Marketing Mix 4 Ps", levelNumber: 1, questionType: "quiz",
    questionText: "Which of the following is NOT one of E. Jerome McCarthy's 4 Ps of Marketing?",
    options: [{ id: "A", text: "Product" }, { id: "B", text: "Price" }, { id: "C", text: "Profit", isCorrect: true }, { id: "D", text: "Promotion" }],
    explanation: "The 4 Ps are Product, Price, Place, and Promotion. Profit is not one of the 4 Ps.", difficulty: "Medium", xpReward: 90, coinsReward: 45
  },
  {
    id: "g12_acc_1", classStandard: 12, subjectId: "accounts", chapterId: "g12_acc_w1", chapterName: "Financial Statements", topicId: "g12_acc_financial", topicName: "Balance Sheet & Cash Flow", levelNumber: 1, questionType: "quiz",
    questionText: "Goodwill is classified under which asset category on a Balance Sheet?",
    options: [{ id: "A", text: "Current Asset" }, { id: "B", text: "Intangible Fixed Asset", isCorrect: true }, { id: "C", text: "Fictitious Asset" }, { id: "D", text: "Liquid Asset" }],
    explanation: "Goodwill is a non-physical asset categorized as an Intangible Fixed Asset.", difficulty: "Medium", xpReward: 90, coinsReward: 45
  },
  {
    id: "g12_tam_1", classStandard: 12, subjectId: "tamil", chapterId: "g12_tam_w1", chapterName: "உயர் தமிழியல்", topicId: "g12_tam_uyar", topicName: "சங்க இலக்கியம்", levelNumber: 1, questionType: "quiz",
    questionText: "'எட்டுத்தொகை' நூல்களில் அகநூல் அல்லாத புறநூல் எது?",
    options: [{ id: "A", text: "நற்றிணை" }, { id: "B", text: "புறநானூறு", isCorrect: true }, { id: "C", text: "குறுந்தொகை" }, { id: "D", text: "அகநானூறு" }],
    explanation: "புறநானூறு பண்டைத் தமிழரின் வீரம், கொடை, பண்பாடு ஆகியவற்றை கூறும் புறநூலாகும்.", difficulty: "Medium", xpReward: 90, coinsReward: 45
  }
];
