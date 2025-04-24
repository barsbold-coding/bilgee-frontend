'use client';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { authAPI, usersAPI } from '@/lib/api';
import { RegisterUserType, User } from '@/types/api.types';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (userData: RegisterUserType) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Optional: apply token to your API client headers manually if not global
          // e.g., usersAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const { data } = await usersAPI.getProfile();
          setUser(data);
          setAuthenticated(true);
        } catch (error) {
          console.error("Failed to fetch profile on load:", error);
          localStorage.removeItem('token');
          setUser(null);
          setAuthenticated(false);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      const { data } = await authAPI.login({ email, password });
      localStorage.setItem('token', data.access_token);
      const userResponse = await usersAPI.getProfile();
      setUser(userResponse.data);
      setAuthenticated(true);
      return userResponse.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterUserType) => {
    setLoading(true);
    try {
      const { data } = await authAPI.register(userData);
      localStorage.setItem('token', data.token);
      const userResponse = await usersAPI.getProfile();
      setUser(userResponse.data);
      setAuthenticated(true);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
