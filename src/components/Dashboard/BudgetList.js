import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const BudgetList = ({token}) => {
  const [budgets, setBudgets] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        console.log('Token in budgetlist:', token);  // Log the token here
        const headers = {
          Authorization: `Bearer ${token}`, // Ensure you are accessing the correct property of the token object
        };
  
        console.log('Request headers:', headers);
  
        const response = await apiService.get('/budgets/getAllBudgets', { headers });
        // ... rest of the code
      } catch (error) {
        console.error('Error fetching budgets', error);
      }
    };
  
    fetchBudgets();
  }, [token]); // Include 'token' in the dependency array to trigger the effect when the token changes
  
  
  //   fetchBudgets();
  // }, [selectedMonth, token]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div>
      <h2>Budget List</h2>

      <label>
        Select Month:
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </label>

      <ul>
        {budgets.map((budget) => (
          <li key={budget.id}>{budget.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetList;
