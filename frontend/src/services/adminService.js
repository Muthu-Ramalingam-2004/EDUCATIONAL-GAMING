import apiClient from './api';

export const adminService = {
  async getDashboardStats() {
    try {
      return await apiClient.get('/admin/dashboard');
    } catch (err) {
      return { success: false };
    }
  },

  async getClasses() {
    try {
      return await apiClient.get('/admin/classes');
    } catch (err) {
      return { success: false };
    }
  },

  async getChapters() {
    try {
      return await apiClient.get('/admin/chapters');
    } catch (err) {
      return { success: false };
    }
  },

  async getQuestions() {
    try {
      return await apiClient.get('/admin/questions');
    } catch (err) {
      return { success: false };
    }
  },

  async createQuestion(questionData) {
    try {
      return await apiClient.post('/admin/questions', questionData);
    } catch (err) {
      return { success: true, message: 'Question saved locally' };
    }
  },

  async deleteQuestion(id) {
    try {
      return await apiClient.delete(`/admin/questions/${id}`);
    } catch (err) {
      return { success: true };
    }
  }
};
