import apiClient from './api';

export const leaderboardService = {
  async getLeaderboard(period = 'daily') {
    try {
      return await apiClient.get(`/leaderboard/${period}`);
    } catch (err) {
      return { success: false };
    }
  }
};
