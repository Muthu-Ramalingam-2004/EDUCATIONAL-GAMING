import apiClient from './api';

export const adminService = {
  async getDashboardStats() {
    try {
      return await apiClient.get('/admin/dashboard');
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
      return { success: false };
    }
  },

  async updateQuestion(id, questionData) {
    try {
      return await apiClient.put(`/admin/questions/${id}`, questionData);
    } catch (err) {
      return { success: false };
    }
  },

  async deleteQuestion(id) {
    try {
      return await apiClient.delete(`/admin/questions/${id}`);
    } catch (err) {
      return { success: false };
    }
  },

  async getStudents() {
    try {
      return await apiClient.get('/admin/students');
    } catch (err) {
      return { success: false };
    }
  },

  async updateStudent(id, studentData) {
    try {
      return await apiClient.put(`/admin/students/${id}`, studentData);
    } catch (err) {
      return { success: false };
    }
  },

  async deleteStudent(id) {
    try {
      return await apiClient.delete(`/admin/students/${id}`);
    } catch (err) {
      return { success: false };
    }
  },

  async getLeaderboard() {
    try {
      return await apiClient.get('/admin/leaderboard');
    } catch (err) {
      return { success: false };
    }
  },

  async getBadges() {
    try {
      return await apiClient.get('/admin/badges');
    } catch (err) {
      return { success: false };
    }
  }
};
