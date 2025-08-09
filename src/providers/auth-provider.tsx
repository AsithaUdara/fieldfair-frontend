// File Location: src/providers/auth-provider.tsx
'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: 'customer' | 'farmer' | 'admin';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage for existing session when the app loads
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User, token: string) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    // Redirect to home page after logout to ensure a clean state
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};