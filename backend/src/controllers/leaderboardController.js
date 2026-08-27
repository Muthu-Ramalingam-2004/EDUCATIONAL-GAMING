import { dbService } from '../services/dbService.js';

export function getLeaderboard(req, res) {
  const period = req.params.period || req.query.period || 'daily';
  const rankings = dbService.getLeaderboard(period);
  res.json({ success: true, period, count: rankings.length, rankings });
}

export function getDailyLeaderboard(req, res) {
  const rankings = dbService.getLeaderboard('daily');
  res.json({ success: true, period: 'daily', count: rankings.length, rankings });
}

export function getWeeklyLeaderboard(req, res) {
  const rankings = dbService.getLeaderboard('weekly');
  res.json({ success: true, period: 'weekly', count: rankings.length, rankings });
}

export function getMonthlyLeaderboard(req, res) {
  const rankings = dbService.getLeaderboard('monthly');
  res.json({ success: true, period: 'monthly', count: rankings.length, rankings });
}

export function getOverallLeaderboard(req, res) {
  const rankings = dbService.getLeaderboard('overall');
  res.json({ success: true, period: 'overall', count: rankings.length, rankings });
}
