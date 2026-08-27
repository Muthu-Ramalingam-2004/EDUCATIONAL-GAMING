import { dbService } from '../services/dbService.js';

export function getProgress(req, res) {
  const studentId = req.user?.id;

  if (!studentId) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }

  const student = dbService.getStudentById(studentId);

  if (!student) {
    // The user is authenticated (valid JWT) but has no student profile.
    // This can happen if an admin token is used here, or the profile is missing.
    return res.status(404).json({ success: false, message: 'Student profile not found for this account.' });
  }

  res.json({
    success: true,
    progress: {
      studentId: student.id,
      name: student.name,
      level: student.level,
      totalXp: student.totalXp,
      nextLevelXp: student.nextLevelXp,
      coins: student.coins,
      streakDays: student.streakDays,
      gamesPlayed: student.gamesPlayed,
      questionsSolved: student.questionsSolved,
      accuracyPct: student.accuracyPct,
      bestScore: student.bestScore,
      currentWorldId: student.currentWorldId,
      currentWorldName: student.currentWorldName,
      recentBadge: student.recentBadge
    }
  });
}

export function updateProgress(req, res) {
  const studentId = req.user?.id;

  if (!studentId) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }

  const student = dbService.getStudentById(studentId);

  if (!student) {
    return res.status(404).json({ success: false, message: 'Student profile not found.' });
  }

  const { xp, coins, streakDays, currentWorldId, currentWorldName } = req.body;
  if (xp) {
    student.totalXp += Number(xp);
    student.level = dbService.calculateLevel(student.totalXp);
  }
  if (coins) student.coins += Number(coins);
  if (streakDays) student.streakDays = Number(streakDays);
  if (currentWorldId) student.currentWorldId = currentWorldId;
  if (currentWorldName) student.currentWorldName = currentWorldName;

  res.json({ success: true, message: 'Progress updated', student });
}

export function getProgressSummary(req, res) {
  res.json({
    success: true,
    class9Mastery: 65,
    class10Mastery: 45,
    overallCompletionPct: 55,
    totalStarsEarned: 23,
    maxStarsPossible: 150,
    topicBreakdown: [
      { title: "Real Numbers & Surds", progress: 95 },
      { title: "Algebra & Polynomials", progress: 75 },
      { title: "Geometry & Triangles", progress: 60 },
      { title: "Coordinate Geometry", progress: 85 },
      { title: "Trigonometry & Ratios", progress: 40 },
      { title: "Statistics & Probability", progress: 50 }
    ]
  });
}
