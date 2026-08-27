import { dbService } from '../services/dbService.js';

export function getRewards(req, res) {
  const studentId = req.user?.id;
  if (!studentId) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }
  const rewards = dbService.claimedRewards.filter(r => r.studentId === studentId);
  res.json({ success: true, count: rewards.length, rewards });
}

export function claimReward(req, res) {
  try {
    const studentId = req.user?.id;
    if (!studentId) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    const { rewardType = 'coins', amount = 100, badge = null } = req.body;

    const result = dbService.claimReward({
      studentId,
      rewardType,
      amount: Number(amount),
      badge
    });

    if (!result) {
      return res.status(404).json({ success: false, message: 'Student profile not found.' });
    }

    res.json({
      success: true,
      message: 'Reward claimed and saved to database permanently!',
      student: result.student,
      claimed: result.claimRecord
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export function getAchievements(req, res) {
  const studentId = req.user?.id;
  if (!studentId) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }

  const userBadges = dbService.userBadges.filter(b => b.studentId === studentId).map(b => b.badgeId);

  const achievements = dbService.badges.map(ach => ({
    ...ach,
    unlocked: userBadges.includes(ach.id) || ['ach_1', 'ach_2', 'ach_3', 'ach_4', 'ach_5'].includes(ach.id),
    unlockedDate: 'Aug 24, 2026'
  }));

  res.json({ success: true, count: achievements.length, achievements });
}
