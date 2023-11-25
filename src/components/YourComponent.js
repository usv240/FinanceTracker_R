// YourComponent.js
import React, { useEffect } from 'react';
import axios from 'axios';
import authService from '../services/authService'; // Adjust the path as needed

const API_URL = 'http://localhost:5000';

const YourComponent = () => {
  useEffect(() => {
    const makeAuthenticatedRequest = async () => {
      try {
        // Check if the token is about to expire
        if (authService.checkTokenExpiration()) {
          // Prompt the user to refresh the token
          const shouldRefreshToken = window.confirm('Your session is about to expire. Do you want to refresh your session?');

          if (shouldRefreshToken) {
            // If the user chooses to refresh, then refresh the token
            await authService.refreshAccessToken();
          } else {
            // If the user chooses not to refresh, handle the logout or redirect logic
            // e.g., redirect to the login page or log the user out
            // You can customize this part based on your application's requirements
          }
        }

        // Now make your API request with the updated token
        const response = await authService.makeAuthenticatedRequest(`${API_URL}/api/some-endpoint`);

        console.log('API Response:', response);
      } catch (error) {
        console.error('Error making API request:', error);

        // Handle errors, e.g., redirect to login page if the token is invalid
      }
    };

    // Call the function when the component mounts or whenever needed
    makeAuthenticatedRequest();
  }, []); // Run this effect only once when the component mounts

  // Render your component JSX
  return (
    <div>
      {/* Your component content */}
    </div>
  );
};

export default YourComponent;
