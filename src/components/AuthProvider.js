// AuthProvider.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.reload();
  };

  const refreshAccessToken = async () => {
    try {
      const newToken = await authService.refreshAccessToken();
      setToken(newToken);
      localStorage.setItem('token', newToken);
    } catch (error) {
      console.error('Error refreshing access token:', error);
      logout();
    }
  };

  const checkTokenExpiration = () => {

    const expirationTime = Math.floor(Date.now() / 1000) + 60; 
    const currentTime = Date.now() / 1000;

    return currentTime < expirationTime;
  };

  const contextValue = {
    isLoggedIn,
    token,
    login,
    logout,
    refreshAccessToken,
    checkTokenExpiration,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
