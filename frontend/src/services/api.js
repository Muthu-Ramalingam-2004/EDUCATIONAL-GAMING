import axios from 'axios';

// Use relative /api path so Vite's proxy handles it in dev (no CORS, no env vars needed)
// In production, this would point to the same server serving the frontend
const API_BASE_URL = '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

// Request Interceptor: Attach JWT Token if available
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('mathquest_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // localStorage not available (SSR etc.)
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Extract real server error messages cleanly
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let errorMsg = 'Network Error. Please check your connection.';

    if (error.response) {
      // Server responded with an error status (4xx, 5xx)
      errorMsg = error.response.data?.message
        || error.response.data?.error
        || `Server error: ${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response received
      errorMsg = 'Cannot reach the server. Please make sure the backend is running.';
    } else {
      // Something else happened
      errorMsg = error.message || 'Unexpected error occurred.';
    }

    return Promise.reject(new Error(errorMsg));
  }
);

export default apiClient;
