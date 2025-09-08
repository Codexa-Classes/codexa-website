'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginResponse, LoginCredentials } from '@/types/auth';
import { AuthService } from '@/lib/services/auth';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in on app load
    const checkAuthStatus = async () => {
      console.log('AuthContext: Starting auth check...');
      try {
        const token = localStorage.getItem('access_token');
        console.log('AuthContext: Token found:', !!token);
        if (token) {
          // Verify token with backend
          console.log('AuthContext: Verifying token with backend...');
          const currentUser = await AuthService.getCurrentUser();
          console.log('AuthContext: Current user:', currentUser);
          setUser(currentUser);
        } else {
          console.log('AuthContext: No token found');
        }
      } catch (error) {
        console.error('AuthContext: Error checking auth status:', error);
        // Clear invalid token
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
      } finally {
        console.log('AuthContext: Auth check completed');
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await AuthService.login(credentials);
      setUser(response.user);
      
      return response;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || error?.message || 'Login failed';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setError(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    error,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};