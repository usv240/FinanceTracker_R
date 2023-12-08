//apiService.js

import axios from 'axios';
import config from '../../config';

const BASE_URL =config.apiUrl + '/api'; // Replace with your actual backend URL
console.log('BASE_URL',BASE_URL);
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
