// AuthProvider.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService'; // Import authService for token-related functions

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if token is stored in localStorage
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token) => {
    setToken(token);
    setIsLoggedIn(true);
    // Store the token in localStorage
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    // Remove the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.reload();
  };

  const refreshAccessToken = async () => {
    try {
      const newToken = await authService.refreshAccessToken();
      setToken(newToken);
      // Update the token in localStorage
      localStorage.setItem('token', newToken);
    } catch (error) {
      console.error('Error refreshing access token:', error);
      // Handle errors, e.g., redirect to the login page if the token is invalid
      logout();
    }
  };

  const checkTokenExpiration = () => {
    // Your logic to check if the token is expired
    // You can compare the token's expiration time with the current time
    const expirationTime = Math.floor(Date.now() / 1000) + 60; // 1 minute for testing, replace with actual logic
    const currentTime = Date.now() / 1000; // Current time in seconds

    return currentTime < expirationTime;
  };

  // Include refreshAccessToken and checkTokenExpiration in the context value
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
