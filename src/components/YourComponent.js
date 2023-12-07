// // YourComponent.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import authService from '../services/authService';
// import TokenRefreshModal from './TokenRefreshModal';

// const API_URL = 'http://localhost:5000';

// const YourComponent = () => {
//   const [isTokenRefreshing, setTokenRefreshing] = useState(false);

//   useEffect(() => {
//     const makeAuthenticatedRequest = async () => {
//       try {
//         // Check if the token is about to expire
//         if (authService.checkTokenExpiration()) {
//           // Open the token refresh modal
//           setTokenRefreshing(true);
//         } else {
//           // If the token is not about to expire, make your API request
//           await makeRequest();
//         }
//       } catch (error) {
//         console.error('Error making API request:', error);
//         // Handle errors, e.g., redirect to login page if the token is invalid
//       }
//     };

//     // Call the function when the component mounts or whenever needed
//     makeAuthenticatedRequest();
//   }, []); // Run this effect only once when the component mounts

//   const makeRequest = async () => {
//     // Make your API request with the current token
//     try {
//       const response = await authService.makeAuthenticatedRequest(`${API_URL}/api/refreshAccessToken`);
//       console.log('API Response:', response);
//     } catch (error) {
//       console.error('Error making API request after token refresh:', error);
//       // Handle errors, e.g., redirect to login page if the token is invalid
//     }
//   };

//   const handleTokenRefresh = async () => {
//     try {
//       // Close the token refresh modal
//       setTokenRefreshing(false);

//       // Refresh the access token
//       await authService.refreshAccessToken();
//       // After refreshing the token, make the API request with the updated token
//       await makeRequest();
//     } catch (error) {
//       console.error('Error refreshing token:', error);
//       // Handle errors, e.g., redirect to login page if the token is invalid
//     }
//   };

//   const handleCloseTokenRefreshModal = () => {
//     // Close the token refresh modal without refreshing the token
//     setTokenRefreshing(false);
//     // You can customize this part based on your application's requirements
//   };

//   // Render your component JSX
//   return (
//     <div>
//       {/* Your component content */}

//       {/* Token Refresh Modal */}
//       <TokenRefreshModal
//         isOpen={isTokenRefreshing}
//         onRefresh={handleTokenRefresh}
//         onClose={handleCloseTokenRefreshModal}
//       />
//     </div>
//   );
// };

// export default YourComponent;
