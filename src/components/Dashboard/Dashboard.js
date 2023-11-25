// Dashboard.js
import React, { useState } from 'react';
import AddBudget from './AddBudget';
import BudgetList from './BudgetList';
import BudgetChart from './BudgetChart';
import AddBudgetCapacity from '../AddBudgetCapacity';

const Dashboard = ({ token, onLogout, username }) => {
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [showBudgetList, setShowBudgetList] = useState(false);
  const [showBudgetChart, setShowBudgetChart] = useState(false);
  const [showAddBudgetCapacity, setShowAddBudgetCapacity] = useState(false);

  const handleAddBudgetClick = () => {
    console.log('Clicked Add Budget');
    setShowAddBudget(true);
    setShowBudgetList(false);
    setShowBudgetChart(false);
    setShowAddBudgetCapacity(false);
  };

  const handleBudgetListClick = () => {
    console.log('Clicked Budget List');
    setShowAddBudget(false);
    setShowBudgetList(true);
    setShowBudgetChart(false);
    setShowAddBudgetCapacity(false);
  };

  const handleBudgetChartClick = () => {
    console.log('Clicked Budget Chart');
    setShowAddBudget(false);
    setShowBudgetList(false);
    setShowBudgetChart(true);
    setShowAddBudgetCapacity(false);
  };

  const handleAddBudgetCapacityClick = () => {
    console.log('Clicked Add Budget Capacity');
    setShowAddBudget(false);
    setShowBudgetList(false);
    setShowBudgetChart(false);
    setShowAddBudgetCapacity(true);
  };

  const handleAddBudgetCapacity = async (data) => {
    try {
      const apiUrl = 'http://localhost:5000/api/budgets/capacity';
  
      data.username = username;
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify(data),
      });
  
      console.log('apiUrl', apiUrl);
      console.log('response from dashboard', response);
  
      // Log headers and request payload for debugging
      console.log('Request Headers:', response.headers);
      console.log('Request Payload:', JSON.stringify(data));
  
      if (response.ok) {
        const responseData = await response.json();
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
  
  console.log('Current Token:', token);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>View and manage your budgets here.</p>

      <button onClick={onLogout}>Logout</button>

      <nav>
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
            <button onClick={handleAddBudgetCapacityClick}>Add Budget Capacity</button>
          </li>
        </ul>
      </nav>

      {showAddBudget && <AddBudget token={token} />}
{showBudgetList && <BudgetList token={token} />}
{showBudgetChart && <BudgetChart token={token} />}
{showAddBudgetCapacity && <AddBudgetCapacity token={token} onAddBudgetCapacity={handleAddBudgetCapacity} username={username} />}


      {/* Add more content or components as needed */}
    </div>
  );
};

export default Dashboard;
