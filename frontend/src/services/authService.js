import apiClient, { extractErrorMessage } from './api';

// ─── Centralized error normalizer ─────────────────────────────────────────────
// ALL auth errors pass through here before being thrown.
// Guarantees: always returns a non-empty plain string.
function normalizeAuthError(err, defaultMsg) {
  // err is always an Error instance from our api.js interceptor
  // err.message was already extracted by extractErrorMessage in api.js
  // But we re-validate defensively in case something bypasses the interceptor
  if (!err) return defaultMsg;
  if (err instanceof Error) {
    const msg = err.message;
    if (typeof msg === 'string' && msg.trim() && !msg.includes('[object')) {
      return msg.trim();
    }
  }
  // If err is not an Error instance (shouldn't happen, but guard it)
  if (typeof err === 'string' && err.trim()) return err.trim();
  // Last resort: try to extract from raw axios error structure
  try {
    const extracted = extractErrorMessage(err);
    if (extracted && !extracted.includes('[object')) return extracted;
  } catch (_) {}
  return defaultMsg;
}

export const authService = {
  // ─── Student Register ──────────────────────────────────────────────────────
  async register(registerData) {
    try {
      const res = await apiClient.post('/auth/register', registerData);
      // res is already response.data (unwrapped by interceptor)
      if (res && res.token && typeof res.token === 'string') {
        localStorage.setItem('mathquest_token', res.token);
        localStorage.setItem(
          'mathquest_session',
          JSON.stringify({ token: res.token, user: res.user, student: res.student })
        );
      }
      return res;
    } catch (err) {
      throw new Error(normalizeAuthError(err, 'Registration failed. Please check your details and try again.'));
    }
  },

  // ─── Student Login ─────────────────────────────────────────────────────────
  async login(credentials) {
    try {
      const res = await apiClient.post('/auth/login', credentials);
      if (res && res.token && typeof res.token === 'string') {
        localStorage.setItem('mathquest_token', res.token);
        localStorage.setItem(
          'mathquest_session',
          JSON.stringify({ token: res.token, user: res.user, student: res.student })
        );
      }
      return res;
    } catch (err) {
      throw new Error(normalizeAuthError(err, 'Invalid email or password. Please try again.'));
    }
  },

  // ─── Admin Login ──────────────────────────────────────────────────────────
  async adminLogin(credentials) {
    try {
      const res = await apiClient.post('/auth/admin-login', credentials);
      if (res && res.token && typeof res.token === 'string') {
        localStorage.setItem('mathquest_token', res.token);
        localStorage.setItem(
          'mathquest_session',
          JSON.stringify({ token: res.token, user: res.user, student: null })
        );
      }
      return res;
    } catch (err) {
      throw new Error(normalizeAuthError(err, 'Access denied. Invalid admin credentials.'));
    }
  },

  // ─── Get Profile ──────────────────────────────────────────────────────────
  async getProfile() {
    try {
      return await apiClient.get('/auth/profile');
    } catch (_err) {
      return { success: false };
    }
  },

  // ─── Update Profile ───────────────────────────────────────────────────────
  async updateProfile(profileData) {
    try {
      const res = await apiClient.put('/auth/profile', profileData);
      // Update cached session
      try {
        const sessionStr = localStorage.getItem('mathquest_session');
        if (sessionStr) {
          const session = JSON.parse(sessionStr);
          if (session.student && res && res.student) {
            session.student = { ...session.student, ...res.student };
            localStorage.setItem('mathquest_session', JSON.stringify(session));
          }
        }
      } catch (_e) {}
      return res;
    } catch (err) {
      throw new Error(normalizeAuthError(err, 'Profile update failed. Please try again.'));
    }
  },

  // ─── Logout ───────────────────────────────────────────────────────────────
  logout() {
    try {
      localStorage.removeItem('mathquest_token');
      localStorage.removeItem('mathquest_session');
    } catch (_e) {}
  },
};
