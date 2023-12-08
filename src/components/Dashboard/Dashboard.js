//Dashboard.js

import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import AddBudget from './AddBudget';
import BudgetList from './BudgetList';
import BudgetChart from './BudgetChart';
import AddBudgetCapacity from './AddBudgetCapacity';
import { useAuth } from '../Auth/AuthContext';
import '../../styles/Dashboard.css'; // Import the new CSS file
import config from '../../config';
const BASE_URL = config.apiUrl;

const Dashboard = ({ token, username }) => {
  const { logout, refreshAccessToken, checkTokenExpiration } = useAuth();

  const [showAddBudget, setShowAddBudget] = useState(false);
  const [showBudgetList, setShowBudgetList] = useState(false);
  const [showBudgetChart, setShowBudgetChart] = useState(false);
  const [showAddBudgetCapacity, setShowAddBudgetCapacity] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isTokenRefreshed, setIsTokenRefreshed] = useState(false);

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleTokenRefreshConfirmation = () => {
    setShowConfirmationModal(true);

    // After 5 seconds, if the user hasn't made a choice, hide the modal
    setTimeout(() => {
      setShowConfirmationModal(false);
    }, 5000);
  };

  const handleConfirmationYes = async () => {
    // User clicked 'Yes' to refresh token
    setIsTokenRefreshed(true);
    setShowConfirmationModal(false);
    try {
      console.log('Refreshing token...');
      //await handleTokenRefresh();
      console.log('Token refreshed successfully. Continuing with the action...');
      // Perform other actions after token refresh, if needed
    } catch (error) {
      console.error('Error refreshing token:', error);
      // Handle errors, e.g., redirect to login page
      logout();
    }
  };

  const handleConfirmationNo = () => {
    // User clicked 'No' to not refresh token
    setShowConfirmationModal(false);
    window.location.reload();
  };

  const handleTokenRefresh = async () => {
    // Add your token refresh logic here
    // Example:
    // const newAccessToken = await token.refreshAccessToken();
    // setAccessToken(newAccessToken);
  };

  const handleAddBudgetClick = () => {
    setShowAddBudget(true);
    setShowBudgetList(false);
    setShowBudgetChart(false);
    setShowAddBudgetCapacity(false);
  };

  const handleBudgetListClick = () => {
    setShowAddBudget(false);
    setShowBudgetList(true);
    setShowBudgetChart(false);
    setShowAddBudgetCapacity(false);
  };

  const handleBudgetChartClick = () => {
    setShowAddBudget(false);
    setShowBudgetList(false);
    setShowBudgetChart(true);
    setShowAddBudgetCapacity(false);
  };

  const handleAddBudgetCapacityClick = () => {
    setShowAddBudget(false);
    setShowBudgetList(false);
    setShowBudgetChart(false);
    setShowAddBudgetCapacity(true);
  };

  const handleLogout = () => {
    window.location.reload();
    logout();
  };

  const handleAddBudgetCapacity = async (data) => {
    // Your logic for adding budget capacity
    try {
      const apiUrl = BASE_URL+'/api/budgets/capacity';
      console.log('dashboard apiUrl', apiUrl);

      data.username = username;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      console.log('apiUrl', apiUrl);
      console.log('response from dashboard', response);

      // Log headers and request payload for debugging
      console.log('Request Headers:', response.headers);
      console.log('Request Payload:', JSON.stringify(data));

      let responseData;

      if (response.ok) {
        responseData = await response.json();
        console.log('Budget capacity added successfully:', responseData);
        return { success: true, message: 'Budget capacity added successfully', responseData };
        
      } else {
        console.error('Failed to add budget capacity:', response.statusText);

        const errorData = await response.json();
        console.error('Error Data:', errorData);

        throw new Error('Failed to add budget capacity');
      }
    } catch (error) {
      console.error('Error adding budget capacity:', error.message);
      throw error;
    }
  };

  //const isTokenRefreshedRef = useRef(false);
  useEffect(() => {
    let isMounted = true; // Flag to track whether the component is mounted
  
    console.log('Setting up token refresh interval...');
    const tokenRefreshInterval = setInterval(async () => {
      if (!isTokenRefreshed && isMounted) {
        console.log('Token about to expire. Displaying confirmation modal...');
        setShowConfirmationModal(true);
  
        // After 10 seconds, if the user hasn't made a choice, hide the modal and refresh the page
        setTimeout(async () => {
          if (!isTokenRefreshed && isMounted) {
            setShowConfirmationModal(false);
            try {
              console.log('Refreshing token...');
              // Replace the following line with the actual token refresh logic
              // await handleTokenRefresh();
              if (isMounted) {
                setIsTokenRefreshed(true); // Set the state to true after token refresh
                console.log('Token refreshed successfully.');
                window.location.reload();
              }
            } catch (error) {
              console.error('Error refreshing token:', error);
              logout();
              window.location.reload();
            }
          } else {
            setShowConfirmationModal(false);
          }
        }, 10000);
      }
    }, 50000);
  
    // Cleanup function
    return () => {
      console.log('Clearing token refresh interval...');
      clearInterval(tokenRefreshInterval);
      isMounted = false; // Set the flag to false when the component unmounts
    };
  }, [isTokenRefreshed, logout]);
  


  return (
    <div>
      <h1 className="personalbudget">Personal Budget Application</h1>
      <h2 className="personalbudget">Dashboard</h2>
      <p className="personalbudget">View and manage your budgets here.</p>


      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>


      <nav className="dashboard">
        <ul>
          <li>
            <button onClick={handleBudgetListClick}>Budget List</button>
          </li>
          <li>
            <button onClick={handleBudgetChartClick}>Budget Chart</button>
          </li>
          <li>
            <button onClick={handleAddBudgetClick}>Add Budget</button>
          </li>
          <li>
            <button onClick={handleAddBudgetCapacityClick}>Configure Budget Capacity</button>
          </li>
        </ul>
      </nav>

      {showAddBudget && (
          <div className="centered-component add-budget-component">
            <AddBudget token={token} />
          </div>
        )}
        {showBudgetList && (
          <div className="centered-component budget-list-component">
            <BudgetList token={token} />
          </div>
        )}
        {showBudgetChart && (
          <div className="centered-component budget-chart-component">
            <BudgetChart token={token} />
          </div>
        )}
        {showAddBudgetCapacity && (
          <div className="centered-component add-budget-capacity-component">
            <AddBudgetCapacity token={token} onAddBudgetCapacity={handleAddBudgetCapacity} username={username} />
          </div>
        )}



      {/* Token Refresh Confirmation Modal */}
      <Modal
        isOpen={showConfirmationModal}
        onRequestClose={handleCloseConfirmationModal}
        contentLabel="Token Refresh Confirmation Modal"
        className="dashboard-modal" // Apply the class for custom styles
      >
        <h2>Your session is about to expire</h2>
        <p>Do you want to refresh your session?</p>
        <button onClick={handleConfirmationYes}>Yes</button>
        <button onClick={handleConfirmationNo}>No</button>
      </Modal>
    </div>
  );
};

export default Dashboard;
