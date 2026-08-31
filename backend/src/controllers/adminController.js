import { dbService } from '../services/dbService.js';

export async function getDashboardStats(req, res) {
  try {
    const stats = await dbService.getRealAdminStats();
    res.json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Classes CRUD
export function getClasses(req, res) {
  res.json({
    success: true,
    classes: [
      { id: 1, standard: 9, title: "Class 9th Mathematics", chaptersCount: 5 },
      { id: 2, standard: 10, title: "Class 10th Mathematics", chaptersCount: 5 }
    ]
  });
}

export function createClass(req, res) {
  const { standard, title } = req.body;
  res.status(201).json({ success: true, message: 'Class created', classItem: { id: Date.now(), standard, title } });
}

// Chapters CRUD
export function getChapters(req, res) {
  res.json({
    success: true,
    chapters: [
      { id: 'c9_w1', title: 'World 1 – Number Quest', classStandard: 9 },
      { id: 'c9_w2', title: 'World 2 – Algebra Arena', classStandard: 9 },
      { id: 'c10_w1', title: 'World 1 – Real Numbers', classStandard: 10 },
      { id: 'c10_w2', title: 'World 2 – Algebra Master', classStandard: 10 }
    ]
  });
}

export function createChapter(req, res) {
  const { title, classStandard, subtitle } = req.body;
  res.status(201).json({ success: true, message: 'Chapter world created', chapter: { id: `c_${Date.now()}`, title, classStandard, subtitle } });
}

// Topics CRUD
export function getTopics(req, res) {
  res.json({
    success: true,
    topics: [
      { id: 't1', title: 'Real Numbers & Euclid Lemma', chapterId: 'c10_w1' },
      { id: 't2', title: 'Polynomial Factorisation', chapterId: 'c9_w2' },
      { id: 't3', title: 'Trigonometric Ratios', chapterId: 'c10_w4' }
    ]
  });
}

export function createTopic(req, res) {
  const { title, chapterId, description } = req.body;
  res.status(201).json({ success: true, message: 'Topic created', topic: { id: `t_${Date.now()}`, title, chapterId, description } });
}

// Questions CRUD
export function getAdminQuestions(req, res) {
  res.json({ success: true, count: dbService.questions.length, questions: dbService.questions });
}

export async function createQuestion(req, res) {
  try {
    const { questionText, options = [], classStandard = 9, questionType = 'quiz', explanation = '', difficulty = 'Medium', xpReward = 50, coinsReward = 20, topicId, chapterId, chapterName, topicName } = req.body;
    
    if (!questionText || !questionText.trim()) {
      return res.status(400).json({ success: false, message: 'Question text is required.' });
    }

    const newQ = await dbService.createQuestion({
      questionText: questionText.trim(),
      options,
      classStandard: Number(classStandard),
      questionType,
      explanation,
      difficulty,
      xpReward: Number(xpReward),
      coinsReward: Number(coinsReward),
      topicId,
      chapterId,
      chapterName,
      topicName
    });

    res.status(201).json({ success: true, message: 'Question created successfully', question: newQ });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function updateQuestion(req, res) {
  try {
    const { id } = req.params;
    const updated = await dbService.updateQuestion(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    res.json({ success: true, message: 'Question updated successfully', question: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function deleteQuestion(req, res) {
  try {
    const { id } = req.params;
    const success = await dbService.deleteQuestion(id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    res.json({ success: true, message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Students CRUD
export async function getStudents(req, res) {
  try {
    const students = await dbService.getAllStudents();
    res.json({ success: true, students });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function updateStudent(req, res) {
  try {
    const { id } = req.params;
    const updated = await dbService.updateStudentProfile(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }
    res.json({ success: true, message: 'Student stats updated successfully', student: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function deleteStudent(req, res) {
  try {
    const { id } = req.params;
    const success = await dbService.deleteStudent(id);
    if (!success) {
      return res.status(500).json({ success: false, message: 'Failed to delete student' });
    }
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Leaderboard
export async function getLeaderboard(req, res) {
  try {
    const leaderboard = await dbService.getRealLeaderboard();
    res.json({ success: true, leaderboard });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Badges
export function getBadges(req, res) {
  res.json({ success: true, badges: dbService.badges });
}
