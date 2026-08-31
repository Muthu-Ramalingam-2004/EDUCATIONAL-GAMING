import apiClient from './api';

export const adminService = {
  async getDashboardStats() {
    return await apiClient.get('/admin/dashboard');
  },

  async getQuestions() {
    return await apiClient.get('/admin/questions');
  },

  async createQuestion(questionData) {
    return await apiClient.post('/admin/questions', questionData);
  },

  async updateQuestion(id, questionData) {
    return await apiClient.put(`/admin/questions/${id}`, questionData);
  },

  async deleteQuestion(id) {
    return await apiClient.delete(`/admin/questions/${id}`);
  },

  async getStudents() {
    return await apiClient.get('/admin/students');
  },

  async updateStudent(id, studentData) {
    return await apiClient.put(`/admin/students/${id}`, studentData);
  },

  async deleteStudent(id) {
    return await apiClient.delete(`/admin/students/${id}`);
  },

  async getLeaderboard() {
    return await apiClient.get('/admin/leaderboard');
  },

  async getBadges() {
    return await apiClient.get('/admin/badges');
  }
};
