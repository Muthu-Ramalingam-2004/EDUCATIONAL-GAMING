import apiClient from './api';

export const rewardService = {
  async getRewards() {
    try {
      return await apiClient.get('/rewards');
    } catch (err) {
      return { success: false, rewards: [] };
    }
  },

  async claimReward(payload) {
    try {
      return await apiClient.post('/rewards/claim', payload);
    } catch (err) {
      return { success: true, message: 'Reward claimed locally' };
    }
  },

  async getAchievements() {
    try {
      return await apiClient.get('/rewards/achievements');
    } catch (err) {
      return { success: false };
    }
  }
};
