// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

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
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    window.location.reload();
  };  

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
