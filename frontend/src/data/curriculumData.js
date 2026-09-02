// ====================================================================
// MathQuest Multi-Grade & Multi-Subject Curriculum Registry (Grades 4-12)
// ====================================================================

export const SUPPORTED_GRADES = [
  { id: 4, label: "4th Standard", category: "Primary", icon: "🌱", color: "from-emerald-500 to-teal-600" },
  { id: 5, label: "5th Standard", category: "Elementary", icon: "⭐", color: "from-cyan-500 to-blue-600" },
  { id: 6, label: "6th Standard", category: "Middle School", icon: "🚀", color: "from-blue-600 to-indigo-600" },
  { id: 7, label: "7th Standard", category: "Junior Explorer", icon: "🛡️", color: "from-indigo-600 to-purple-600" },
  { id: 8, label: "8th Standard", category: "Pre-High School", icon: "🔥", color: "from-purple-600 to-pink-600" },
  { id: 9, label: "9th Standard", category: "High School Core", icon: "⚡", color: "from-amber-500 to-red-600" },
  { id: 10, label: "10th Standard", category: "Board Exam Mastery", icon: "👑", color: "from-rose-600 to-orange-600" },
  { id: 11, label: "11th Standard", category: "Senior Foundations", icon: "🌌", color: "from-violet-600 to-fuchsia-700" },
  { id: 12, label: "12th Standard", category: "Advanced Scholar", icon: "🏆", color: "from-amber-400 to-yellow-600" }
];

export const SUBJECTS_BY_GRADE = {
  // Grades 4 to 8: Primary & Middle (Maths, Science, English, Social Studies, Tamil)
  4: [
    { id: 'maths', name: 'Mathematics', icon: '🔢', color: 'from-blue-600 to-indigo-700', desc: 'Numbers, Fractions & Basic Geometry' },
    { id: 'science', name: 'Science', icon: '🧪', color: 'from-emerald-600 to-teal-700', desc: 'Plants, Matter & Living Things' },
    { id: 'english', name: 'English', icon: '📖', color: 'from-purple-600 to-pink-700', desc: 'Grammar, Nouns & Verbs' },
    { id: 'social', name: 'Social Studies', icon: '🌍', color: 'from-amber-600 to-orange-700', desc: 'Maps, Community & Geography' },
    { id: 'tamil', name: 'Tamil (தமிழ்)', icon: '✍️', color: 'from-red-600 to-rose-700', desc: 'இலக்கணம், சொல் & தொடர்' }
  ],
  5: [
    { id: 'maths', name: 'Mathematics', icon: '📐', color: 'from-blue-600 to-indigo-700', desc: 'Factors, Multiples, Area & Perimeter' },
    { id: 'science', name: 'Science', icon: '🔬', color: 'from-emerald-600 to-teal-700', desc: 'Human Body, Simple Machines & Force' },
    { id: 'english', name: 'English', icon: '✍️', color: 'from-purple-600 to-pink-700', desc: 'Tenses, Vocabulary & Sentences' },
    { id: 'social', name: 'Social Studies', icon: '🗺️', color: 'from-amber-600 to-orange-700', desc: 'Continents, Oceans & Resources' },
    { id: 'tamil', name: 'Tamil (தமிழ்)', icon: '📜', color: 'from-red-600 to-rose-700', desc: 'செய்யுள், உரைநடை & இலக்கணம்' }
  ],
  6: [
    { id: 'maths', name: 'Mathematics', icon: '➕', color: 'from-blue-600 to-indigo-700', desc: 'Integers, Ratios & Basic Algebra' },
    { id: 'science', name: 'Science', icon: '🌿', color: 'from-emerald-600 to-teal-700', desc: 'Food Components & Light Shadows' },
    { id: 'english', name: 'English', icon: '📚', color: 'from-purple-600 to-pink-700', desc: 'Pronouns, Adjectives & Clauses' },
    { id: 'social', name: 'Social Studies', icon: '🏛️', color: 'from-amber-600 to-orange-700', desc: 'Ancient Empires & Globe' },
    { id: 'tamil', name: 'Tamil (தமிழ்)', icon: '🖋️', color: 'from-red-600 to-rose-700', desc: 'இன்பத்தமிழ், தமிழ் கும்மி & இலக்கணம்' }
  ],
  7: [
    { id: 'maths', name: 'Mathematics', icon: '📊', color: 'from-blue-600 to-indigo-700', desc: 'Rational Numbers & Triangles' },
    { id: 'science', name: 'Science', icon: '🌡️', color: 'from-emerald-600 to-teal-700', desc: 'Heat, Temperature, Acids & Bases' },
    { id: 'english', name: 'English', icon: '📝', color: 'from-purple-600 to-pink-700', desc: 'Direct & Indirect Speech, Idioms' },
    { id: 'social', name: 'Social Studies', icon: '🏰', color: 'from-amber-600 to-orange-700', desc: 'Medieval Kingdoms & Atmosphere' },
    { id: 'tamil', name: 'Tamil (தமிழ்)', icon: '📖', color: 'from-red-600 to-rose-700', desc: 'எங்கள் தமிழ், பகுபத உறுப்பிலக்கணம்' }
  ],
  8: [
    { id: 'maths', name: 'Mathematics', icon: '🎯', color: 'from-blue-600 to-indigo-700', desc: 'Exponents, Powers & Factorisation' },
    { id: 'science', name: 'Science', icon: '🦠', color: 'from-emerald-600 to-teal-700', desc: 'Microorganisms, Force & Pressure' },
    { id: 'english', name: 'English', icon: '💬', color: 'from-purple-600 to-pink-700', desc: 'Modal Verbs & Advanced Composition' },
    { id: 'social', name: 'Social Studies', icon: '⚖️', color: 'from-amber-600 to-orange-700', desc: 'Modern History & Judiciary' },
    { id: 'tamil', name: 'Tamil (தமிழ்)', icon: '🪶', color: 'from-red-600 to-rose-700', desc: 'தமிழ் மொழி வாழ்த்து & தொகைநிலைத் தொடர்' }
  ],

  // Grades 9 & 10: High School (Maths, Physics, Chemistry, Biology, English, Social Studies, Tamil)
  9: [
    { id: 'maths', name: 'Mathematics', icon: '📐', color: 'from-blue-600 to-indigo-700', desc: 'Number Systems, Algebra & Geometry' },
    { id: 'physics', name: 'Physics', icon: '⚡', color: 'from-cyan-600 to-blue-700', desc: 'Motion, Speed & Laws of Motion' },
    { id: 'chemistry', name: 'Chemistry', icon: '⚗️', color: 'from-teal-600 to-emerald-700', desc: 'Matter in Surroundings & Atoms' },
    { id: 'biology', name: 'Biology', icon: '🧬', color: 'from-green-600 to-emerald-800', desc: 'Cell Structure & Living Tissues' },
    { id: 'english', name: 'English', icon: '📖', color: 'from-purple-600 to-pink-700', desc: 'Literature & Grammar Rules' },
    { id: 'social', name: 'Social Studies', icon: '📜', color: 'from-amber-600 to-orange-700', desc: 'French Revolution & Physical Geography' },
    { id: 'tamil', name: 'Tamil (தமிழ்)', icon: '🏛️', color: 'from-red-600 to-rose-700', desc: 'திராவிட மொழிக்குடும்பம் & தொடர் இலக்கணம்' }
  ],
  10: [
    { id: 'maths', name: 'Mathematics', icon: '💎', color: 'from-blue-600 to-indigo-700', desc: 'Quadratic Equations, Trigonometry & AP' },
    { id: 'physics', name: 'Physics', icon: '💡', color: 'from-cyan-600 to-blue-700', desc: 'Light Reflection, Lenses & Electricity' },
    { id: 'chemistry', name: 'Chemistry', icon: '🧪', color: 'from-teal-600 to-emerald-700', desc: 'Chemical Reactions, Acids & Metals' },
    { id: 'biology', name: 'Biology', icon: '🩺', color: 'from-green-600 to-emerald-800', desc: 'Life Processes & Reproduction' },
    { id: 'english', name: 'English', icon: '✒️', color: 'from-purple-600 to-pink-700', desc: 'Subject-Verb Agreement & Writing' },
    { id: 'social', name: 'Social Studies', icon: '🏛️', color: 'from-amber-600 to-orange-700', desc: 'Nationalism & Resource Power Sharing' },
    { id: 'tamil', name: 'Tamil (தமிழ்)', icon: '👑', color: 'from-red-600 to-rose-700', desc: 'அன்னைய மொழியே, சொல் நெறி & புணர்ச்சி' }
  ],

  // Grades 11 & 12: Senior Secondary (12 exact subjects)
  11: [
    { id: 'maths', name: 'Mathematics', icon: '📈', color: 'from-blue-600 to-indigo-700', desc: 'Sets, Complex Numbers & Calculus Limits' },
    { id: 'physics', name: 'Physics', icon: '🌌', color: 'from-cyan-600 to-blue-700', desc: 'Kinematics & Work Energy Power' },
    { id: 'chemistry', name: 'Chemistry', icon: '⚛️', color: 'from-teal-600 to-emerald-700', desc: 'Atomic Structure & Chemical Bonding' },
    { id: 'biology', name: 'Biology', icon: '🌱', color: 'from-green-600 to-emerald-800', desc: 'Living World & Plant Physiology' },
    { id: 'cs', name: 'Computer Science', icon: '💻', color: 'from-violet-600 to-indigo-800', desc: 'Python Core Logic & Algorithms' },
    { id: 'english', name: 'English', icon: '📝', color: 'from-purple-600 to-pink-700', desc: 'Advanced Literature & Comprehension' },
    { id: 'ca', name: 'Computer Applications', icon: '🖥️', color: 'from-indigo-600 to-blue-800', desc: 'HTML5, Web Design & Office Automation' },
    { id: 'history', name: 'History', icon: '🏛️', color: 'from-amber-700 to-yellow-800', desc: 'Early India & World Empires' },
    { id: 'economics', name: 'Economics', icon: '📊', color: 'from-emerald-700 to-teal-800', desc: 'Microeconomics & Indian Economy' },
    { id: 'commerce', name: 'Commerce', icon: '💼', color: 'from-blue-700 to-cyan-800', desc: 'Business Studies & Trade Foundations' },
    { id: 'accounts', name: 'Accountancy', icon: '📑', color: 'from-purple-700 to-indigo-900', desc: 'Journal, Ledger & Trial Balance' },
    { id: 'tamil', name: 'Tamil (தமிழ்)', icon: '🌺', color: 'from-red-600 to-rose-700', desc: 'யுகத்தின் பாடல் & நன்னூல் பாயிரம்' }
  ],
  12: [
    { id: 'maths', name: 'Mathematics', icon: '♾️', color: 'from-blue-600 to-indigo-700', desc: 'Matrices, Derivatives & Integrals' },
    { id: 'physics', name: 'Physics', icon: '🔌', color: 'from-cyan-600 to-blue-700', desc: 'Electrostatics & Optics' },
    { id: 'chemistry', name: 'Chemistry', icon: '🧫', color: 'from-teal-600 to-emerald-700', desc: 'Solutions & Chemical Kinetics' },
    { id: 'biology', name: 'Biology', icon: '🧬', color: 'from-green-600 to-emerald-800', desc: 'Genetics, Evolution & Biotech' },
    { id: 'cs', name: 'Computer Science', icon: '💾', color: 'from-violet-600 to-indigo-800', desc: 'Data Structures & SQL Database' },
    { id: 'english', name: 'English', icon: '📖', color: 'from-purple-600 to-pink-700', desc: 'Classics & Advanced Rhetoric' },
    { id: 'ca', name: 'Computer Applications', icon: '🌐', color: 'from-indigo-600 to-blue-800', desc: 'PHP, MySQL & E-Commerce Systems' },
    { id: 'history', name: 'History', icon: '⚔️', color: 'from-amber-700 to-yellow-800', desc: 'Modern World & Indian Independence' },
    { id: 'economics', name: 'Economics', icon: '📈', color: 'from-emerald-700 to-teal-800', desc: 'Macroeconomics & National Income' },
    { id: 'commerce', name: 'Commerce', icon: '🏬', color: 'from-blue-700 to-cyan-800', desc: 'Principles of Management & Marketing' },
    { id: 'accounts', name: 'Accountancy', icon: '📊', color: 'from-purple-700 to-indigo-900', desc: 'Company Accounts & Financial Statements' },
    { id: 'tamil', name: 'Tamil (தமிழ்)', icon: '🏆', color: 'from-red-600 to-rose-700', desc: 'உயர் தமிழியல் & அணியிலக்கணம்' }
  ]
};

// Generate Topic / Chapter Realms dynamically per Grade & Subject
export function getChaptersForGradeAndSubject(grade, subjectId) {
  const g = Number(grade) || 9;
  const s = (subjectId || 'maths').toLowerCase();

  const registry = {
    4: {
      maths: [
        { id: 'g4_maths_w1', topicId: 'g4_maths_numbers', title: 'Realm 1 – Large Numbers', subtitle: 'Place value, face value & 5-digit numbers', icon: '🔢', color: 'from-blue-600 to-indigo-700' },
        { id: 'g4_maths_w2', topicId: 'g4_maths_fractions', title: 'Realm 2 – Fraction Quest', subtitle: 'Proper, improper fractions & basic decimals', icon: '🍰', color: 'from-cyan-600 to-blue-700' }
      ],
      science: [
        { id: 'g4_sci_w1', topicId: 'g4_sci_plants', title: 'Realm 1 – Plant Life Explorer', subtitle: 'Photosynthesis, roots & leaf structure', icon: '🌱', color: 'from-emerald-600 to-teal-700' },
        { id: 'g4_sci_w2', topicId: 'g4_sci_matter', title: 'Realm 2 – States of Matter', subtitle: 'Solids, liquids & gases in everyday life', icon: '🧊', color: 'from-teal-600 to-cyan-700' }
      ],
      english: [
        { id: 'g4_eng_w1', topicId: 'g4_eng_grammar', title: 'Realm 1 – Grammar Galaxy', subtitle: 'Nouns, pronouns, verbs & sentence building', icon: '✍️', color: 'from-purple-600 to-pink-700' }
      ],
      social: [
        { id: 'g4_soc_w1', topicId: 'g4_soc_maps', title: 'Realm 1 – Earth & Maps', subtitle: 'Continents, oceans, cardinal directions', icon: '🗺️', color: 'from-amber-600 to-orange-700' }
      ],
      tamil: [
        { id: 'g4_tam_w1', topicId: 'g4_tam_grammar', title: 'Realm 1 – தமிழ் அமுது', subtitle: 'சொற்கள், எழுத்துக்கள் & எளிய இலக்கணம்', icon: '✍️', color: 'from-red-600 to-rose-700' }
      ]
    },
    5: {
      maths: [
        { id: 'g5_maths_w1', topicId: 'g5_maths_factors', title: 'Realm 1 – Factors & Multiples', subtitle: 'HCF, LCM & Divisibility rules', icon: '🧩', color: 'from-blue-600 to-indigo-700' },
        { id: 'g5_maths_w2', topicId: 'g5_maths_area', title: 'Realm 2 – Area & Perimeter', subtitle: 'Measuring 2D shapes & rectangle perimeter', icon: '📐', color: 'from-cyan-600 to-blue-700' }
      ],
      science: [
        { id: 'g5_sci_w1', topicId: 'g5_sci_humanbody', title: 'Realm 1 – Human Organ Systems', subtitle: 'Digestive & circulatory system functions', icon: '🫀', color: 'from-emerald-600 to-teal-700' },
        { id: 'g5_sci_w2', topicId: 'g5_sci_machines', title: 'Realm 2 – Simple Machines Lab', subtitle: 'Levers, pulleys, inclined planes & force', icon: '⚙️', color: 'from-teal-600 to-cyan-700' }
      ],
      english: [
        { id: 'g5_eng_w1', topicId: 'g5_eng_tenses', title: 'Realm 1 – Tenses & Sentences', subtitle: 'Past, present & future tense construction', icon: '✍️', color: 'from-purple-600 to-pink-700' }
      ],
      social: [
        { id: 'g5_soc_w1', topicId: 'g5_soc_continents', title: 'Realm 1 – World Geography', subtitle: 'Continents, oceans & natural resources', icon: '🗺️', color: 'from-amber-600 to-orange-700' }
      ],
      tamil: [
        { id: 'g5_tam_w1', topicId: 'g5_tam_lit', title: 'Realm 1 – தமிழ் செய்யுள்', subtitle: 'பாடல் நயம் & வாக்கிய அமைப்புகள்', icon: '📜', color: 'from-red-600 to-rose-700' }
      ]
    },
    6: {
      maths: [
        { id: 'g6_maths_w1', topicId: 'g6_maths_integers', title: 'Realm 1 – Integer Odyssey', subtitle: 'Positive & negative integers on number line', icon: '➕', color: 'from-blue-600 to-indigo-700' },
        { id: 'g6_maths_w2', topicId: 'g6_maths_ratio', title: 'Realm 2 – Ratio & Proportion', subtitle: 'Comparing quantities & unitary method', icon: '⚖️', color: 'from-cyan-600 to-blue-700' }
      ],
      science: [
        { id: 'g6_sci_w1', topicId: 'g6_sci_food', title: 'Realm 1 – Food & Nutrition', subtitle: 'Proteins, vitamins, minerals & balanced diet', icon: '🥗', color: 'from-emerald-600 to-teal-700' },
        { id: 'g6_sci_w2', topicId: 'g6_sci_light', title: 'Realm 2 – Light & Shadows', subtitle: 'Opaque, transparent objects & pinhole camera', icon: '🔦', color: 'from-teal-600 to-cyan-700' }
      ],
      english: [
        { id: 'g6_eng_w1', topicId: 'g6_eng_clauses', title: 'Realm 1 – Pronouns & Clauses', subtitle: 'Reflexive pronouns & relative clauses', icon: '📚', color: 'from-purple-600 to-pink-700' }
      ],
      social: [
        { id: 'g6_soc_w1', topicId: 'g6_soc_history', title: 'Realm 1 – Ancient History', subtitle: 'Indus Valley Civilisation & Vedic Period', icon: '🏛️', color: 'from-amber-600 to-orange-700' }
      ],
      tamil: [
        { id: 'g6_tam_w1', topicId: 'g6_tam_gummi', title: 'Realm 1 – இன்பத்தமிழ்', subtitle: 'தமிழ்க்கும்மி & பெயர்ச்சொல் வகைகள்', icon: '🖋️', color: 'from-red-600 to-rose-700' }
      ]
    },
    7: {
      maths: [
        { id: 'g7_maths_w1', topicId: 'g7_maths_algebra', title: 'Realm 1 – Algebra Foundations', subtitle: 'Linear equations in 1 variable & expressions', icon: '📊', color: 'from-blue-600 to-indigo-700' },
        { id: 'g7_maths_w2', topicId: 'g7_maths_triangles', title: 'Realm 2 – Triangle Kingdom', subtitle: 'Angle sum property & exterior angle theorem', icon: '🔺', color: 'from-cyan-600 to-blue-700' }
      ],
      science: [
        { id: 'g7_sci_w1', topicId: 'g7_sci_heat', title: 'Realm 1 – Heat & Temperature', subtitle: 'Conduction, convection, radiation & thermometers', icon: '🔥', color: 'from-emerald-600 to-teal-700' },
        { id: 'g7_sci_w2', topicId: 'g7_sci_acids', title: 'Realm 2 – Acids & Bases Lab', subtitle: 'Litmus indicators & neutralisation reactions', icon: '🧪', color: 'from-teal-600 to-cyan-700' }
      ],
      english: [
        { id: 'g7_eng_w1', topicId: 'g7_eng_speech', title: 'Realm 1 – Reported Speech', subtitle: 'Direct and indirect transformation rules', icon: '📝', color: 'from-purple-600 to-pink-700' }
      ],
      social: [
        { id: 'g7_soc_w1', topicId: 'g7_soc_kingdoms', title: 'Realm 1 – Medieval History', subtitle: 'Delhi Sultanate & Chola Empire', icon: '🏰', color: 'from-amber-600 to-orange-700' }
      ],
      tamil: [
        { id: 'g7_tam_w1', topicId: 'g7_tam_engal', title: 'Realm 1 – எங்கள் தமிழ்', subtitle: 'பகுபத உறுப்பிலக்கணம் & வழக்கு', icon: '📖', color: 'from-red-600 to-rose-700' }
      ]
    },
    8: {
      maths: [
        { id: 'g8_maths_w1', topicId: 'g8_maths_exponents', title: 'Realm 1 – Exponents & Powers', subtitle: 'Laws of exponents & scientific notation', icon: '⚡', color: 'from-blue-600 to-indigo-700' },
        { id: 'g8_maths_w2', topicId: 'g8_maths_factorisation', title: 'Realm 2 – Factorisation Master', subtitle: 'Common factors & algebraic identities', icon: '🎯', color: 'from-cyan-600 to-blue-700' }
      ],
      science: [
        { id: 'g8_sci_w1', topicId: 'g8_sci_micro', title: 'Realm 1 – Microorganisms Realm', subtitle: 'Bacteria, fungi, viruses & food preservation', icon: '🦠', color: 'from-emerald-600 to-teal-700' },
        { id: 'g8_sci_w2', topicId: 'g8_sci_force', title: 'Realm 2 – Force & Pressure', subtitle: 'Contact force, atmospheric pressure & friction', icon: '🥊', color: 'from-teal-600 to-cyan-700' }
      ],
      english: [
        { id: 'g8_eng_w1', topicId: 'g8_eng_modals', title: 'Realm 1 – Modal Auxiliaries', subtitle: 'Expressing ability, permission & obligation', icon: '💬', color: 'from-purple-600 to-pink-700' }
      ],
      social: [
        { id: 'g8_soc_w1', topicId: 'g8_soc_modern', title: 'Realm 1 – Modern History', subtitle: 'Freedom struggle & Indian Constitution', icon: '⚖️', color: 'from-amber-600 to-orange-700' }
      ],
      tamil: [
        { id: 'g8_tam_w1', topicId: 'g8_tam_mozhi', title: 'Realm 1 – தமிழ் வாழ்த்து', subtitle: 'தொகைநிலைத் தொடர்கள் & இலக்கணம்', icon: '🪶', color: 'from-red-600 to-rose-700' }
      ]
    },
    9: {
      maths: [
        { id: 'class9_world1', topicId: 'number_systems', title: 'World 1 – Number Quest', subtitle: 'Master Real Numbers & Irrational Surds', icon: '🔢', color: 'from-blue-600 to-indigo-700' },
        { id: 'class9_world2', topicId: 'polynomials', title: 'World 2 – Algebra Arena', subtitle: 'Linear Equations & Polynomial Factorisation', icon: '⚡', color: 'from-indigo-600 to-purple-700' },
        { id: 'class9_world3', topicId: 'triangles', title: 'World 3 – Geometry Kingdom', subtitle: 'Lines, Angles & Congruent Triangles', icon: '📐', color: 'from-emerald-600 to-teal-700' },
        { id: 'class9_world4', topicId: 'mensuration', title: 'World 4 – Mensuration Mission', subtitle: 'Heron\'s Formula, Surface Area & Volume', icon: '🕋', color: 'from-amber-600 to-orange-700' }
      ],
      physics: [
        { id: 'g9_phy_w1', topicId: 'g9_phy_motion', title: 'World 1 – Motion & Velocity', subtitle: 'Distance, displacement, acceleration & equations', icon: '🚗', color: 'from-cyan-600 to-blue-700' }
      ],
      chemistry: [
        { id: 'g9_chem_w1', topicId: 'g9_chem_matter', title: 'World 1 – Matter & Atoms', subtitle: 'States of matter, atoms & molecular mass', icon: '⚛️', color: 'from-teal-600 to-emerald-700' }
      ],
      biology: [
        { id: 'g9_bio_w1', topicId: 'g9_bio_cell', title: 'World 1 – Cell Unit of Life', subtitle: 'Cell organelles, nucleus, mitochondria & mitosis', icon: '🧬', color: 'from-green-600 to-emerald-800' }
      ],
      english: [
        { id: 'g9_eng_w1', topicId: 'g9_eng_lit', title: 'World 1 – English Literature', subtitle: 'Poetry appreciation, figures of speech & grammar', icon: '📖', color: 'from-purple-600 to-pink-700' }
      ],
      social: [
        { id: 'g9_soc_w1', topicId: 'g9_soc_rev', title: 'World 1 – French Revolution & Maps', subtitle: '1789 Revolution & Physical features of India', icon: '📜', color: 'from-amber-600 to-orange-700' }
      ],
      tamil: [
        { id: 'g9_tam_w1', topicId: 'g9_tam_dravida', title: 'World 1 – திராவிட மொழிகள்', subtitle: 'திராவிட மொழிக்குடும்பம் & பகுதி விகுதி', icon: '🏛️', color: 'from-red-600 to-rose-700' }
      ]
    },
    10: {
      maths: [
        { id: 'class10_world1', topicId: 'real_numbers_10', title: 'World 1 – Real Numbers', subtitle: 'Euclid HCF & Fundamental Theorem of Arithmetic', icon: '💎', color: 'from-blue-700 to-cyan-800' },
        { id: 'class10_world2', topicId: 'algebra_10', title: 'World 2 – Algebra Master', subtitle: 'Quadratic Equations & Arithmetic Progressions', icon: '🎯', color: 'from-violet-700 to-purple-900' },
        { id: 'class10_world3', topicId: 'coordinate_10', title: 'World 3 – Coordinate Quest', subtitle: 'Distance Formula, Section Formula & Centroid', icon: '🗺️', color: 'from-teal-600 to-emerald-800' },
        { id: 'class10_world4', topicId: 'trigonometry_10', title: 'World 4 – Trigonometry Realm', subtitle: 'Trig Ratios, Identities & Heights & Distances', icon: '🏛️', color: 'from-amber-700 to-red-800' },
        { id: 'class10_world5', topicId: 'probability_10', title: 'World 5 – Probability Arena', subtitle: 'Theoretical Probability & Sample Spaces', icon: '🎲', color: 'from-purple-700 to-indigo-900' }
      ],
      physics: [
        { id: 'g10_phy_w1', topicId: 'g10_phy_light', title: 'World 1 – Light Reflection & Lenses', subtitle: 'Mirror formula, refraction index & lens power', icon: '💡', color: 'from-cyan-600 to-blue-700' },
        { id: 'g10_phy_w2', topicId: 'g10_phy_electricity', title: 'World 2 – Electricity & Circuits', subtitle: 'Ohm\'s Law, resistance & electrical energy', icon: '⚡', color: 'from-blue-600 to-indigo-800' }
      ],
      chemistry: [
        { id: 'g10_chem_w1', topicId: 'g10_chem_reactions', title: 'World 1 – Chemical Reactions', subtitle: 'Balancing equations, redox & acids bases', icon: '🧪', color: 'from-teal-600 to-emerald-700' }
      ],
      biology: [
        { id: 'g10_bio_w1', topicId: 'g10_bio_life', title: 'World 1 – Life Processes', subtitle: 'Nutrition, respiration, circulation & excretion', icon: '🩺', color: 'from-green-600 to-emerald-800' }
      ],
      english: [
        { id: 'g10_eng_w1', topicId: 'g10_eng_grammar', title: 'World 1 – Advanced Grammar', subtitle: 'Subject-verb agreement & active passive voice', icon: '✒️', color: 'from-purple-600 to-pink-700' }
      ],
      social: [
        { id: 'g10_soc_w1', topicId: 'g10_soc_nationalism', title: 'World 1 – Nationalism in India', subtitle: 'Satyagraha, Non-cooperation & Civil disobedience', icon: '🏛️', color: 'from-amber-600 to-orange-700' }
      ],
      tamil: [
        { id: 'g10_tam_w1', topicId: 'g10_tam_annai', title: 'World 1 – அன்னை மொழியே', subtitle: 'தமிழழகனார் கவிதை & சொல் புணர்ச்சி', icon: '👑', color: 'from-red-600 to-rose-700' }
      ]
    },
    11: {
      maths: [
        { id: 'g11_maths_w1', topicId: 'g11_maths_sets', title: 'World 1 – Sets & Functions', subtitle: 'Venn diagrams, domain, range & relations', icon: '📈', color: 'from-blue-600 to-indigo-700' },
        { id: 'g11_maths_w2', topicId: 'g11_maths_complex', title: 'World 2 – Complex Numbers', subtitle: 'Imaginary i, modulus, argument & quadratic roots', icon: '🌀', color: 'from-purple-600 to-pink-700' },
        { id: 'g11_maths_w3', topicId: 'g11_maths_calculus', title: 'World 3 – Calculus Limits', subtitle: 'Limits, continuity & first principle derivatives', icon: '♾️', color: 'from-cyan-600 to-blue-800' }
      ],
      physics: [
        { id: 'g11_phy_w1', topicId: 'g11_phy_kinematics', title: 'World 1 – Kinematics & Projectiles', subtitle: 'Vectors, 2D motion, trajectory & range', icon: '🌌', color: 'from-cyan-600 to-blue-700' }
      ],
      chemistry: [
        { id: 'g11_chem_w1', topicId: 'g11_chem_atomic', title: 'World 1 – Atomic Structure', subtitle: 'Bohr model, quantum numbers & orbital shapes', icon: '⚛️', color: 'from-teal-600 to-emerald-700' }
      ],
      biology: [
        { id: 'g11_bio_w1', topicId: 'g11_bio_living', title: 'World 1 – Living World & Taxonomy', subtitle: 'Taxonomic hierarchy & binomial nomenclature', icon: '🌱', color: 'from-green-600 to-emerald-800' }
      ],
      cs: [
        { id: 'g11_cs_w1', topicId: 'g11_cs_python', title: 'World 1 – Python Fundamentals', subtitle: 'Data types, loops, lists & custom functions', icon: '💻', color: 'from-violet-600 to-indigo-800' }
      ],
      english: [
        { id: 'g11_eng_w1', topicId: 'g11_eng_comprehension', title: 'World 1 – Advanced Prose & Poetry', subtitle: 'Text analysis, irony, metaphors & synthesis', icon: '📝', color: 'from-purple-600 to-pink-700' }
      ],
      ca: [
        { id: 'g11_ca_w1', topicId: 'g11_ca_webdesign', title: 'World 1 – Web Design & HTML5', subtitle: 'HTML tags, forms, tables & CSS styling', icon: '🖥️', color: 'from-indigo-600 to-blue-800' }
      ],
      history: [
        { id: 'g11_hist_w1', topicId: 'g11_hist_early', title: 'World 1 – Early India & Civilisations', subtitle: 'Harappan era, Vedic age & Mauryan Empire', icon: '🏛️', color: 'from-amber-700 to-yellow-800' }
      ],
      economics: [
        { id: 'g11_eco_w1', topicId: 'g11_eco_micro', title: 'World 1 – Microeconomics', subtitle: 'Demand, supply, elasticity & consumer utility', icon: '📊', color: 'from-emerald-700 to-teal-800' }
      ],
      commerce: [
        { id: 'g11_comm_w1', topicId: 'g11_comm_business', title: 'World 1 – Business Foundations', subtitle: 'Sole proprietorship, partnership & companies', icon: '💼', color: 'from-blue-700 to-cyan-800' }
      ],
      accounts: [
        { id: 'g11_acc_w1', topicId: 'g11_acc_journal', title: 'World 1 – Bookkeeping & Journal', subtitle: 'Double entry system, debit credit & journal entries', icon: '📑', color: 'from-purple-700 to-indigo-900' }
      ],
      tamil: [
        { id: 'g11_tam_w1', topicId: 'g11_tam_yugam', title: 'World 1 – யுகத்தின் பாடல்', subtitle: 'நன்னூல் பாயிரம் & தொல்காப்பியக் கூறுகள்', icon: '🌺', color: 'from-red-600 to-rose-700' }
      ]
    },
    12: {
      maths: [
        { id: 'g12_maths_w1', topicId: 'g12_maths_matrices', title: 'World 1 – Matrices & Determinants', subtitle: 'Matrix algebra, inverse & Cramer\'s rule', icon: '🔢', color: 'from-blue-600 to-indigo-700' },
        { id: 'g12_maths_w2', topicId: 'g12_maths_integrals', title: 'World 2 – Integral Calculus', subtitle: 'Indefinite integration, substitution & definite area', icon: '♾️', color: 'from-cyan-600 to-blue-800' },
        { id: 'g12_maths_w3', topicId: 'g12_maths_vectors', title: 'World 3 – 3D Vectors & Lines', subtitle: 'Dot product, cross product & line equations', icon: '📐', color: 'from-purple-600 to-pink-700' }
      ],
      physics: [
        { id: 'g12_phy_w1', topicId: 'g12_phy_electrostatics', title: 'World 1 – Electrostatics & Fields', subtitle: 'Coulomb\'s law, electric potential & Gauss law', icon: '🔌', color: 'from-cyan-600 to-blue-700' }
      ],
      chemistry: [
        { id: 'g12_chem_w1', topicId: 'g12_chem_solutions', title: 'World 1 – Solutions & Kinetics', subtitle: 'Raoult\'s law, molarity & rate constant', icon: '🧫', color: 'from-teal-600 to-emerald-700' }
      ],
      biology: [
        { id: 'g12_bio_w1', topicId: 'g12_bio_genetics', title: 'World 1 – Genetics & DNA', subtitle: 'Mendelian inheritance, DNA replication & PCR', icon: '🧬', color: 'from-green-600 to-emerald-800' }
      ],
      cs: [
        { id: 'g12_cs_w1', topicId: 'g12_cs_sql', title: 'World 1 – SQL & Database Systems', subtitle: 'Select queries, joins, group by & table DDL', icon: '💾', color: 'from-violet-600 to-indigo-800' }
      ],
      english: [
        { id: 'g12_eng_w1', topicId: 'g12_eng_classics', title: 'World 1 – Rhetoric & Classics', subtitle: 'Advanced critical analysis & formal essays', icon: '📖', color: 'from-purple-600 to-pink-700' }
      ],
      ca: [
        { id: 'g12_ca_w1', topicId: 'g12_ca_php', title: 'World 1 – PHP & MySQL Development', subtitle: 'Server-side scripts, database connection & sessions', icon: '🌐', color: 'from-indigo-600 to-blue-800' }
      ],
      history: [
        { id: 'g12_hist_w1', topicId: 'g12_hist_modern', title: 'World 1 – Modern World & Freedom', subtitle: 'World Wars, Cold War & Indian Independence', icon: '⚔️', color: 'from-amber-700 to-yellow-800' }
      ],
      economics: [
        { id: 'g12_eco_w1', topicId: 'g12_eco_macro', title: 'World 1 – Macroeconomics & GDP', subtitle: 'National Income, fiscal policy & RBI banking', icon: '📈', color: 'from-emerald-700 to-teal-800' }
      ],
      commerce: [
        { id: 'g12_comm_w1', topicId: 'g12_comm_marketing', title: 'World 1 – Marketing & Management', subtitle: 'Principles of Management, 4 Ps & stock exchange', icon: '🏬', color: 'from-blue-700 to-cyan-800' }
      ],
      accounts: [
        { id: 'g12_acc_w1', topicId: 'g12_acc_financial', title: 'World 1 – Financial Statements', subtitle: 'Balance sheet, cash flow statement & ratios', icon: '📊', color: 'from-purple-700 to-indigo-900' }
      ],
      tamil: [
        { id: 'g12_tam_w1', topicId: 'g12_tam_uyar', title: 'World 1 – உயர் தமிழியல்', subtitle: 'சங்க இலக்கியம் & அணியிலக்கணம்', icon: '🏆', color: 'from-red-600 to-rose-700' }
      ]
    }
  };

  const gradeObj = registry[g] || registry[9];
  const list = gradeObj[s] || gradeObj['maths'] || registry[9]['maths'];

  return list.map(ch => ({
    ...ch,
    unlocked: true,
    progress: 40,
    stars: 6,
    maxStars: 15,
    totalLevels: 5,
    levels: [
      { id: 1, title: `Level 1 — ${ch.title.replace(/.*– /, '')} Basics`, difficulty: 'Easy', stars: 3, completed: true, xp: 100 },
      { id: 2, title: `Level 2 — ${ch.title.replace(/.*– /, '')} Practice`, difficulty: 'Practice', stars: 3, completed: true, xp: 150 },
      { id: 3, title: `Level 3 — ${ch.title.replace(/.*– /, '')} Challenge`, difficulty: 'Challenge', stars: 2, completed: false, active: true, xp: 200 },
      { id: 4, title: `Level 4 — Advanced Mastery`, difficulty: 'Hard', stars: 0, completed: false, locked: true, xp: 250 },
      { id: 5, title: `Level 5 — Overlord Boss Battle`, difficulty: 'Master Boss', stars: 0, completed: false, locked: true, xp: 350, isBoss: true }
    ]
  }));
}
