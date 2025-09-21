import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG } from '../config/api';

// API Configuration
const API_BASE_URL = API_CONFIG.BASE_URL;

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Client: Request interceptor - URL:', config.url, 'Method:', config.method);
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('API Client: Token added to request');
    } else {
      console.log('API Client: No token found in localStorage');
    }
    return config;
  },
  (error) => {
    console.error('API Client: Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('API Client: Response interceptor - Status:', response.status, 'URL:', response.config.url);
    return response;
  },
  (error: AxiosError) => {
    console.error('API Client: Response interceptor error:', error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      console.log('API Client: Unauthorized - clearing localStorage');
      // Token expired or invalid, clear auth data
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      // Redirect to login page if not already there
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
