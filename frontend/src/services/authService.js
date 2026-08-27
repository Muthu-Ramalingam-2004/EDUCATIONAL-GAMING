import apiClient from './api';

export const authService = {
  async register(registerData) {
    try {
      const res = await apiClient.post('/auth/register', registerData);
      if (res && res.token) {
        localStorage.setItem('mathquest_token', res.token);
        localStorage.setItem('mathquest_session', JSON.stringify({
          token: res.token,
          user: res.user,
          student: res.student
        }));
      }
      return res;
    } catch (err) {
      const msg = err.message || (err.data && err.data.message) || 'Registration failed. Please try again.';
      throw new Error(msg);
    }
  },

  async login(credentials) {
    try {
      const res = await apiClient.post('/auth/login', credentials);
      if (res && res.token) {
        localStorage.setItem('mathquest_token', res.token);
        localStorage.setItem('mathquest_session', JSON.stringify({
          token: res.token,
          user: res.user,
          student: res.student
        }));
      }
      return res;
    } catch (err) {
      const msg = err.message || (err.data && err.data.message) || 'Invalid email or password.';
      throw new Error(msg);
    }
  },

  async adminLogin(credentials) {
    try {
      const res = await apiClient.post('/auth/admin-login', credentials);
      if (res && res.token) {
        localStorage.setItem('mathquest_token', res.token);
        localStorage.setItem('mathquest_session', JSON.stringify({
          token: res.token,
          user: res.user,
          student: null
        }));
      }
      return res;
    } catch (err) {
      const msg = err.message || (err.data && err.data.message) || 'Access denied. Invalid admin credentials.';
      throw new Error(msg);
    }
  },

  async getProfile() {
    try {
      return await apiClient.get('/auth/profile');
    } catch (err) {
      return { success: false };
    }
  },

  async updateProfile(profileData) {
    try {
      const res = await apiClient.put('/auth/profile', profileData);
      // Update session in localStorage if present
      try {
        const sessionStr = localStorage.getItem('mathquest_session');
        if (sessionStr) {
          const session = JSON.parse(sessionStr);
          if (session.student && res.student) {
            session.student = { ...session.student, ...res.student };
            localStorage.setItem('mathquest_session', JSON.stringify(session));
          }
        }
      } catch (e) {}
      return res;
    } catch (err) {
      throw new Error(err.message || 'Profile update failed.');
    }
  },

  logout() {
    localStorage.removeItem('mathquest_token');
    localStorage.removeItem('mathquest_session');
  }
};
