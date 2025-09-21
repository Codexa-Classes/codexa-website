import apiClient from '@/lib/api/client';
import { API_CONFIG } from '@/lib/config/api';
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
    name: backendUser.full_name || backendUser.email,
    mobile: backendUser.mobile,
    role: backendUser.is_admin ? 'admin' : 'user' as UserRole,
    type: 'employee' as UserType,
    isAuthenticated: true,
  };
};

// Utility function to transform backend candidate to frontend user
const transformBackendCandidate = (backendCandidate: any): User => {
  return {
    id: backendCandidate.id.toString(),
    name: backendCandidate.full_name || backendCandidate.email,
    mobile: backendCandidate.phone_number, // candidates use phone_number
    role: 'user' as UserRole, // candidates are always users
    type: 'candidate' as UserType,
    isAuthenticated: true,
  };
};

// Authentication service
export class AuthService {
  /**
   * Login employee/admin with mobile number and password
   * Note: Currently only supports employee/admin login
   * Candidates don't have login functionality yet in backend
   */
  static async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      const response = await apiClient.post<BackendLoginResponse>(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN, 
        credentials
      );
      
      const { access_token, user: backendUser } = response.data;
      
      // Transform backend user to frontend user
      const user = transformBackendUser(backendUser);
      
      // Store token and user data
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { user, token: access_token };
    } catch (error: any) {
      // Handle different error scenarios
      if (error.response) {
        const status = error.response.status;
        const detail = error.response.data?.detail;
        
        if (status === 401) {
          throw new Error(detail || 'Invalid mobile number or password');
        } else if (status === 422) {
          throw new Error('Please check your mobile number and password');
        } else if (status === 500) {
          throw new Error('Server error. Please try again later');
        } else {
          throw new Error(detail || 'Login failed');
        }
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please try again');
      } else if (!error.response) {
        throw new Error('Network error. Check your connection');
      } else {
        throw new Error('Login failed. Please try again');
      }
    }
  }

  /**
   * Get current user from token
   */
  static async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get<BackendUser>(API_CONFIG.ENDPOINTS.AUTH.ME);
      const user = transformBackendUser(response.data);
      
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(user));
      
      return user;
    } catch (error: any) {
      if (error.response?.status === 401) {
        // Clear invalid token
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        throw new Error('Session expired. Please login again');
      }
      throw new Error(error?.response?.data?.detail || 'Failed to get current user');
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      // Clear local storage first
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      
      // Call logout endpoint if backend implements it
      // await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
      // Ensure local data is cleared even if API fails
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
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
   * Get stored token
   */
  static getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /**
   * Get stored user
   */
  static getStoredUser(): User | null {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        return JSON.parse(userData) as User;
      }
      return null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
      return null;
    }
  }

  /**
   * Clear authentication data
   */
  static clearAuthData(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }

  /**
   * Register new employee/admin user
   */
  static async register(userData: {
    email: string;
    mobile: string;
    password: string;
    full_name?: string;
  }): Promise<User> {
    try {
      const response = await apiClient.post<BackendUser>(
        API_CONFIG.ENDPOINTS.AUTH.REGISTER,
        userData
      );
      return transformBackendUser(response.data);
    } catch (error: any) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error('Registration failed. Please try again');
    }
  }

  /**
   * Check what type of user is currently logged in
   */
  static getUserType(): UserType | null {
    const user = this.getStoredUser();
    return user?.type || null;
  }

  /**
   * Check if current user is admin
   */
  static isAdmin(): boolean {
    const user = this.getStoredUser();
    return user?.role === 'admin';
  }

  /**
   * Check if current user is candidate
   */
  static isCandidate(): boolean {
    const user = this.getStoredUser();
    return user?.type === 'candidate';
  }

  /**
   * Check if current user is employee
   */
  static isEmployee(): boolean {
    const user = this.getStoredUser();
    return user?.type === 'employee';
  }

  /**
   * Candidate login (placeholder for future implementation)
   * TODO: Implement candidate login when backend supports it
   */
  static async candidateLogin(credentials: {
    phone_number: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    throw new Error('Candidate login not implemented yet. Please contact admin for access.');
  }
}
