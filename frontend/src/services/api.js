import axios from 'axios';

// ─── API Base URL ─────────────────────────────────────────────────────────────
// Vite bakes import.meta.env.VITE_API_URL into the bundle at build time.
//
// • LOCAL DEV (`vite dev`):
//     .env.development has no VITE_API_URL → falls back to '/api'
//     Vite proxy (vite.config.js) forwards /api/* → http://localhost:5000
//     No CORS issues because same origin proxy is used.
//
// • PRODUCTION (`vite build` deployed to Vercel):
//     .env.production sets VITE_API_URL=https://educational-maths-gaming.onrender.com/api
//     Bundle hits Render directly. CORS headers on Render allow Vercel origin.
//
const RENDER_BACKEND_URL = 'https://educational-maths-gaming.onrender.com/api';
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? RENDER_BACKEND_URL : '/api');

// ─── Axios Instance ───────────────────────────────────────────────────────────
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 25000, // 25s — Render free tier can take ~20s to cold-start
  withCredentials: false, // Don't send cookies cross-origin (avoids CORS preflight issues)
});

// ─── Request Interceptor: Attach JWT Token ────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    try {
      const adminToken = sessionStorage.getItem('mathquest_admin_token') || localStorage.getItem('mathquest_admin_token');
      const studentToken = sessionStorage.getItem('mathquest_token') || localStorage.getItem('mathquest_token');
      const isAdminRoute = config.url && config.url.includes('/admin');
      const token = (isAdminRoute && adminToken) ? adminToken : (studentToken || adminToken);
      if (token && typeof token === 'string') {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (_e) {
      // Storage unavailable (private browsing restrictions etc.)
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Safe Error Message Extractor ─────────────────────────────────────────────
// This function is the SINGLE place where all error normalization happens.
// It ALWAYS returns a plain string — never an object, never undefined.
//
// Error sources it handles:
//   1. Backend JSON error  → extracts data.message / data.error / data.detail
//   2. HTML gateway error  → maps HTTP status code to friendly message
//   3. No response         → network/timeout/offline message
//   4. Unexpected          → generic fallback
//
export function extractErrorMessage(error) {
  try {
    // ── Case 1: Server responded (4xx / 5xx) ─────────────────────────────────
    if (error && error.response) {
      const status = error.response.status;
      const data = error.response.data;

      // Try to pull a human-readable string from the JSON body
      if (data !== null && data !== undefined) {
        // Most common: { message: "..." }
        if (typeof data.message === 'string' && data.message.trim()) {
          return data.message.trim();
        }
        // Alternative: { error: "..." }
        if (typeof data.error === 'string' && data.error.trim()) {
          return data.error.trim();
        }
        // FastAPI / Django REST: { detail: "..." } or { detail: [{msg:...}] }
        if (data.detail) {
          if (typeof data.detail === 'string' && data.detail.trim()) {
            return data.detail.trim();
          }
          if (Array.isArray(data.detail) && data.detail[0]?.msg) {
            return String(data.detail[0].msg);
          }
        }
        // Nested errors array: { errors: [{message: "..."}] }
        if (Array.isArray(data.errors) && data.errors[0]) {
          const first = data.errors[0];
          if (typeof first.message === 'string') return first.message;
          if (typeof first.msg === 'string') return first.msg;
          if (typeof first === 'string') return first;
        }
      }

      // If the body is an HTML page (gateway error) or empty, use HTTP status code
      switch (status) {
        case 400: return 'Invalid request. Please check your input and try again.';
        case 401: return 'Invalid email or password. Please try again.';
        case 403: return 'Access denied. You do not have permission for this action.';
        case 404: return 'Service not found. The backend server may be misconfigured.';
        case 409: return 'This email is already registered. Please log in instead.';
        case 422: return 'Invalid input. Please check your details and try again.';
        case 429: return 'Too many requests. Please wait a moment and try again.';
        case 500: return 'Server error. Please try again in a moment.';
        case 502: return 'Server temporarily unavailable (502). Please wait 30 seconds and try again — the server may be starting up.';
        case 503: return 'Service unavailable. Please try again shortly.';
        case 504: return 'Server timed out. Please try again.';
        default:  return `Request failed (HTTP ${status}). Please try again.`;
      }
    }

    // ── Case 2: No response received (network / CORS / offline / timeout) ────
    if (error && error.request) {
      if (
        error.code === 'ECONNABORTED' ||
        (typeof error.message === 'string' && error.message.toLowerCase().includes('timeout'))
      ) {
        return 'Connection timed out. The server may be starting up — please wait 30 seconds and try again.';
      }
      if (
        typeof error.message === 'string' &&
        error.message.toLowerCase().includes('network')
      ) {
        return 'Network error. Please check your internet connection and try again.';
      }
      return 'Cannot reach the server. Please check your connection or try again later.';
    }

    // ── Case 3: Setup error or other ─────────────────────────────────────────
    if (error && typeof error.message === 'string' && error.message.trim()) {
      // Don't expose raw internal messages that contain "[object Object]"
      if (error.message.includes('[object')) {
        return 'An unexpected error occurred. Please try again.';
      }
      return error.message.trim();
    }

    return 'An unexpected error occurred. Please try again.';
  } catch (_) {
    // Last resort — even error extraction failed
    return 'An unexpected error occurred. Please try again.';
  }
}

// ─── Response Interceptor ─────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  // SUCCESS: Unwrap response.data — callers get the parsed JSON body directly
  (response) => response.data,

  // ERROR: Always reject with new Error(string) — never with a raw object
  (error) => {
    const message = extractErrorMessage(error);

    // Global 401 handler: clear auth storage and notify App.jsx
    if (error && error.response && error.response.status === 401) {
      try {
        sessionStorage.removeItem('mathquest_token');
        sessionStorage.removeItem('mathquest_session');
        sessionStorage.removeItem('mathquest_admin_token');
        sessionStorage.removeItem('mathquest_admin_session');
        localStorage.removeItem('mathquest_token');
        localStorage.removeItem('mathquest_session');
        localStorage.removeItem('mathquest_admin_token');
        localStorage.removeItem('mathquest_admin_session');
        window.dispatchEvent(new CustomEvent('mathquest_unauthorized', {
          detail: { message }
        }));
      } catch (_e) {}
    }

    // Diagnostic console log — helps debug production issues in DevTools
    // Never shown to the user
    console.error('[MathQuest API Error]', {
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      baseURL: error.config?.baseURL,
      status: error.response?.status,
      rawData: error.response?.data,
      code: error.code,
      resolvedMessage: message,
    });

    return Promise.reject(new Error(message));
  }
);

export default apiClient;
