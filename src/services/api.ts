import axios from 'axios';

const API_URL = 'http://localhost:5002/api';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API methods
const api = {
  // Auth
  login: async (username: string, password: string) => {
    const response = await axiosInstance.post('/login', { username, password });
    return response.data;
  },

  // Accounts
  getAccounts: async () => {
    const response = await axiosInstance.get('/accounts');
    return response.data;
  },

  getAccountById: async (id: string) => {
    const response = await axiosInstance.get(`/accounts/${id}`);
    return response.data;
  },

  createAccount: async (companyName: string, matchScore: number) => {
    const response = await axiosInstance.post('/accounts', { companyName, matchScore });
    return response.data;
  },

  updateAccountStatus: async (id: string, status: 'Target' | 'Not Target') => {
    const response = await axiosInstance.post(`/accounts/${id}/status`, { status });
    return response.data;
  }
};

export default api;