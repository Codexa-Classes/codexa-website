// API Configuration
// This file centralizes all API-related configuration

export const API_CONFIG = {
  // Base URL from environment variable with fallback
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  
  // Environment
  ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development',
  
  // Request timeout
  TIMEOUT: 10000,
  
  // API endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      ME: '/auth/me',
    },
    CANDIDATES: {
      LIST: '/candidates',
      CREATE: '/candidates',
      UPDATE: (id: number) => `/candidates/${id}`,
      DELETE: (id: number) => `/candidates/${id}`,
      GET_BY_ID: (id: number) => `/candidates/${id}`,
      SEARCH: '/candidates/search',
      STATS: '/candidates/stats',
      UPDATE_STATUS: (id: number) => `/candidates/${id}/status`,
      UPDATE_PRIORITY: (id: number) => `/candidates/${id}/priority`,
    },
    COURSES: {
      LIST: '/courses',
      CREATE: '/courses',
      UPDATE: (id: number) => `/courses/${id}`,
      DELETE: (id: number) => `/courses/${id}`,
      GET_BY_ID: (id: number) => `/courses/${id}`,
    },
    JOBS: {
      LIST: '/jobs',
      CREATE: '/jobs',
      UPDATE: (id: number) => `/jobs/${id}`,
      DELETE: (id: number) => `/jobs/${id}`,
      GET_BY_ID: (id: number) => `/jobs/${id}`,
    },
    ENQUIRIES: {
      LIST: '/enquiries',
      CREATE: '/enquiries',
      UPDATE: (id: number) => `/enquiries/${id}`,
      DELETE: (id: number) => `/enquiries/${id}`,
      GET_BY_ID: (id: number) => `/enquiries/${id}`,
    },
  },
  
  // Headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
} as const;

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to check if we're in development
export const isDevelopment = (): boolean => {
  return API_CONFIG.ENVIRONMENT === 'development';
};

// Helper function to check if we're in production
export const isProduction = (): boolean => {
  return API_CONFIG.ENVIRONMENT === 'production';
};

// Console log API configuration in development
if (typeof window !== 'undefined' && isDevelopment()) {
  console.log('🔗 API Configuration:', {
    baseUrl: API_CONFIG.BASE_URL,
    environment: API_CONFIG.ENVIRONMENT,
  });
}
