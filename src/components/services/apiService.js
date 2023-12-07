//apiService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Replace with your actual backend URL

const apiService = {
  get: async (endpoint, token, params = {}) => {
    console.log("Inside apiService ", token);
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: params, // Include the params property here
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;
