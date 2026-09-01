import { dbService } from '../services/dbService.js';

export function getGames(_req, res) {
  const games = [
    { id: 'quiz',       title: 'QUICK QUIZ',          mode: 'quiz',    difficulty: 'Medium',    xpReward: 150, minLevel: 1 },
    { id: 'puzzle',     title: 'MATHS PUZZLE',         mode: 'puzzle',  difficulty: 'Hard',      xpReward: 200, minLevel: 1 },
    { id: 'dragdrop',   title: 'DRAG & DROP REORDER',  mode: 'dragdrop',difficulty: 'Challenge', xpReward: 220, minLevel: 2 },
    { id: 'timeattack', title: 'TIME ATTACK',           mode: 'quiz',    difficulty: 'Extreme',   xpReward: 250, minLevel: 3 },
    { id: 'formula',    title: 'FORMULA MATCH',         mode: 'quiz',    difficulty: 'Practice',  xpReward: 180, minLevel: 4 },
    { id: 'memory',     title: 'MEMORY MATCH',          mode: 'puzzle',  difficulty: 'Medium',    xpReward: 190, minLevel: 5 },
  ];
  res.json({ success: true, games });
}

export function getGameById(req, res) {
  const { gameId } = req.params;
  res.json({
    success: true,
    game: { id: gameId, title: gameId.toUpperCase(), mode: gameId, difficulty: 'Medium', xpReward: 150 }
  });
}

export function getQuestions(req, res) {
  const { classStandard, chapterId, topicId, level, mode } = req.query;
  const questionType = (mode === 'puzzle' || mode === 'memory') 
    ? 'puzzle' 
    : (mode === 'dragdrop' || mode === 'numberquest') 
    ? 'dragdrop' 
    : 'quiz';

  const questions = dbService.getQuestionsFiltered({
    classStandard: classStandard ? Number(classStandard) : null,
    chapterId: chapterId || null,
    topicId: topicId || null,
    levelNumber: level ? Number(level) : null,
    questionType
  });

  res.json({
    success: true,
    count: questions.length,
    questions
  });
}

export function startGame(req, res) {
  const { gameId } = req.params;
  const { classStandard, chapterId, topicId, level, mode } = req.query;
  const targetMode = mode || gameId;
  const questionType = (targetMode === 'puzzle' || targetMode === 'memory') 
    ? 'puzzle' 
    : (targetMode === 'dragdrop' || targetMode === 'numberquest') 
    ? 'dragdrop' 
    : 'quiz';

  const activeQuestions = dbService.getQuestionsFiltered({
    classStandard: classStandard ? Number(classStandard) : null,
    chapterId: chapterId || null,
    topicId: topicId || null,
    levelNumber: level ? Number(level) : null,
    questionType
  });

  res.json({
    success: true,
    sessionId: `sess_${Date.now()}`,
    gameId,
    startTime: new Date().toISOString(),
    questions: activeQuestions
  });
}

// submitGame is now async because dbService.submitGameAttempt is async (PostgreSQL)
export async function submitGame(req, res) {
  try {
    const { gameId } = req.params;
    const { answers = [], timeTakenSeconds = 120 } = req.body;
    const studentId = req.user?.id;

    if (!studentId) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    const result = await dbService.submitGameAttempt({ studentId, gameId, answers, timeTakenSeconds });

    if (!result) {
      return res.status(404).json({ success: false, message: 'Student profile not found.' });
    }

    res.json({ success: true, message: 'Mission Complete!', ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Failed to submit game.' });
  }
}

export function getGameHistory(_req, res) {
  // Game history is not persisted to DB yet — returns empty array
  res.json({ success: true, history: [] });
}
