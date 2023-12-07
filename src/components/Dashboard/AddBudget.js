// AddBudget.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/AddBudget.css';

const AddBudget = ({ token }) => {
  const [budgetName, setBudgetName] = useState('');
  const [budgetNumber, setBudgetNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddBudget = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/budgets',
        { budgetName, budgetNumber, selectedDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log(response.data);
  
      // Show success notification
      toast.success('Budget added successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  
      // Clear input fields
      setBudgetName('');
      setBudgetNumber('');
      // Reset date to the current date
      setSelectedDate(new Date());
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
  
      console.error('Error adding budget:', errorMessage);
  
      // Show error notification
      toast.error(`Error: ${errorMessage}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  
  

  return (
    <div className="add-budget-form">
      <label>
        Budget Date:
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
      </label>
      <h2>Add Budget</h2>
      <label>
        Category:
        <input
          type="text"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
        />
      </label>
      <label>
        Number:
        <input
          type="number"
          value={budgetNumber}
          onChange={(e) => setBudgetNumber(e.target.value)}
        />
      </label>
      <button onClick={handleAddBudget}>Add Budget</button>

      {/* ToastContainer for displaying notifications */}
      <ToastContainer />
    </div>
  );
};

export default AddBudget;