import apiClient from '@/lib/api/client';
import { 
  LoginCredentials, 
  BackendLoginResponse, 
  BackendUser, 
  User, 
  UserRole, 
  UserType,
  ApiError 
} from '@/types/auth';

// Utility function to transform backend user to frontend user
const transformBackendUser = (backendUser: BackendUser): User => {
  return {
    id: backendUser.id.toString(),
    name: backendUser.full_name,
    mobile: backendUser.email, // Using email as mobile for now
    role: backendUser.is_admin ? 'admin' : 'user' as UserRole,
    type: 'employee' as UserType, // Default type, can be enhanced later
    isAuthenticated: true,
  };
};

// Authentication service
export class AuthService {
  /**
   * Login user with username and password
   */
  static async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      const response = await apiClient.post<BackendLoginResponse>('/auth/login', credentials);
      const { access_token, user: backendUser } = response.data;
      
      // Transform backend user to frontend user format
      const user = transformBackendUser(backendUser);
      
      // Store token and user data
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { user, token: access_token };
    } catch (error: any) {
      // Handle API errors
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      } else if (error.response?.status === 401) {
        throw new Error('Invalid username or password');
      } else if (error.response?.status === 422) {
        throw new Error('Please check your input and try again');
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please try again.');
      } else if (!error.response) {
        throw new Error('Network error. Please check your connection.');
      } else {
        throw new Error('Login failed. Please try again.');
      }
    }
  }

  /**
   * Logout user and clear stored data
   */
  static async logout(): Promise<void> {
    try {
      // Clear stored data
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      
      // Optional: Call logout endpoint if available
      // await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local data even if API call fails
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
  }

  /**
   * Get current user profile
   */
  static async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get<BackendUser>('/auth/me');
      return transformBackendUser(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Session expired. Please login again.');
      }
      throw new Error('Failed to fetch user profile');
    }
  }

  /**
   * Refresh token (if implemented in backend)
   */
  static async refreshToken(): Promise<string> {
    try {
      const response = await apiClient.post<{ access_token: string }>('/auth/refresh');
      const { access_token } = response.data;
      
      localStorage.setItem('access_token', access_token);
      return access_token;
    } catch (error) {
      throw new Error('Failed to refresh token');
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  }

  /**
   * Get stored user data
   */
  static getStoredUser(): User | null {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        return JSON.parse(userData) as User;
      }
      return null;
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      return null;
    }
  }

  /**
   * Get stored token
   */
  static getStoredToken(): string | null {
    return localStorage.getItem('access_token');
  }
}

export default AuthService;
