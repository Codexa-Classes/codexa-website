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
    mobile: backendUser.mobile,
    role: backendUser.is_admin ? 'admin' : 'user' as UserRole,
    type: 'employee' as UserType, // Default type, can be enhanced later
    isAuthenticated: true,
  };
};

// Authentication service
export class AuthService {
  /**
   * Login user with mobile number and password
   */
  static async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      const response = await apiClient.post<BackendLoginResponse>('/auth/login', credentials);
      const { access_token, user: backendUser } = response.data;
      
      // Transform backend user to frontend user
      const user = transformBackendUser(backendUser);
      
      // Store token and user data
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { user, token: access_token };
    } catch (error: any) {
      throw new Error(error?.response?.data?.detail || 'Login failed');
    }
  }

  /**
   * Get current user from token
   */
  static async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get<BackendUser>('/auth/me');
      return transformBackendUser(response.data);
    } catch (error: any) {
      throw new Error(error?.response?.data?.detail || 'Failed to get current user');
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      // Clear local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      
      // Optionally call logout endpoint if backend has one
      // await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local storage even if API call fails
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  /**
   * Get stored token
   */
  static getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
