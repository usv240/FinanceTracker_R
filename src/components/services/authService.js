// src/services/authService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000';

const authService = {
  signup: async (username, password, fullName) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        fullName,
        username,
        password,
      });

      // Handle the response, e.g., check if registration was successful
      console.log(response.data);
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  },

  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
      });

      // Extract the tokens from the response
      const { token, refreshToken } = response.data;

      // Save the tokens in localStorage or secure storage
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      return token;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  refreshAccessToken: async () => {
    try {
      // Retrieve the refresh token from localStorage or secure storage
      const refreshToken = localStorage.getItem('refreshToken');

      // Send a request to refresh the access token
      const response = await axios.post(`${API_URL}/api/auth/refreshAccessToken`, {
        refreshToken,
      });

      // Extract the new access token from the response
      const newAccessToken = response.data.accessToken;

      // Save the new access token in localStorage or secure storage
      localStorage.setItem('token', newAccessToken);

      return newAccessToken;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  },

  checkTokenExpiration: () => {
    // Add your logic to check if the token is expired
    // You can compare the token's expiration time with the current time
    const expirationTime = Math.floor(Date.now() / 1000) + 60; // 1 minute for testing, replace with actual logic
    const currentTime = Date.now() / 1000; // Current time in seconds

    return expirationTime < currentTime;
  },

  makeAuthenticatedRequest: async (url, options = {}) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token available');
      }

      const response = await axios(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Authenticated request error:', error);
      throw error;
    }
  },
};

export default authService;
