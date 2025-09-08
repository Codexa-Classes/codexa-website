export type UserRole = 'admin' | 'user';
export type UserType = 'employee' | 'candidate';

// Backend API User interface
export interface BackendUser {
  id: number;
  email: string;
  mobile: string;
  full_name: string;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
}

// Frontend User interface (adapted for frontend use)
export interface User {
  id: string;
  name: string;
  mobile: string;
  role: UserRole;
  type: UserType;
  isAuthenticated: boolean;
}

// Login credentials for backend API
export interface LoginCredentials {
  mobile: string;
  password: string;
}

// Backend API login response
export interface BackendLoginResponse {
  access_token: string;
  token_type: string;
  user: BackendUser;
}

// Frontend login response
export interface LoginResponse {
  user: User;
  token: string;
}

// API Error response
export interface ApiError {
  detail: string;
}