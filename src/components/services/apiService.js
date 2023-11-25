import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Replace with your actual backend URL

const apiService = {
  get: async (endpoint, token) => {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;
