import apiClient from './api';

export const progressService = {
  async getProgress() {
    try {
      return await apiClient.get('/progress');
    } catch (err) {
      return { success: false };
    }
  },

  async updateProgress(data) {
    try {
      return await apiClient.put('/progress', data);
    } catch (err) {
      return { success: true };
    }
  },

  async getProgressSummary() {
    try {
      return await apiClient.get('/progress/summary');
    } catch (err) {
      return { success: false };
    }
  }
};
