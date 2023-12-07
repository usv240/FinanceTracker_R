//authService.js

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
      // Retrieve the refresh token from localStorage
      let refreshToken = localStorage.getItem('refreshToken');

      // If there's no refresh token in local storage, fetch it from the backend API
      if (!refreshToken) {
        const response = await axios.get(`${API_URL}/api/auth/refreshAccessToken`);
        refreshToken = response.data.refreshToken;

        // Save the fetched refresh token in local storage
        localStorage.setItem('refreshToken', refreshToken);
      }

      // Make a request to refresh the access token using the backend API
      const response = await axios.get(`${API_URL}/api/auth/refreshAccessToken`, {
        refreshToken,
      });
      console.log('response in refreshaccesstoken', response);
      // Extract the new access token from the response
      const newToken = response.data.accessToken;

      // Save the new token in localStorage
      localStorage.setItem('token', newToken);

      return newToken;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  },

  checkTokenExpiration: () => {
    const expirationTime = Math.floor(Date.now() / 1000) + 50; // 50 seconds for testing, replace with actual logic
    const currentTime = Date.now() / 1000; // Current time in seconds

    return currentTime < expirationTime;
  },

  makeAuthenticatedRequest: async (url, options = {}) => {
    try {
      let token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token available');
      }

      // Check if the token is expired
      const isTokenExpired = authService.checkTokenExpiration(token);

      if (isTokenExpired) {
        // Token is expired, try to refresh it
        token = await authService.refreshAccessToken();

        // If token refresh fails, throw an error
        if (!token) {
          throw new Error('Failed to refresh token');
        }
      }

      const response = await axios(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
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
