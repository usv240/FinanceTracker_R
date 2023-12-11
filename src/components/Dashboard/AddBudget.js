// AddBudget.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/AddBudget.css';
import config from '../../config';

const BASE_URL = config.apiUrl;
const AddBudget = ({ token }) => {
  const [budgetName, setBudgetName] = useState('');
  const [budgetNumber, setBudgetNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddBudget = async () => {
    try {
      const response = await axios.post(
        BASE_URL+'/api/budgets',
        { budgetName, budgetNumber, selectedDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log(response.data);

      toast.success('Budget added successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setBudgetName('');
      setBudgetNumber('');

      setSelectedDate(new Date());
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
  
      console.error('Error adding budget:', errorMessage);

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

      <ToastContainer />
    </div>
  );
};

export default AddBudget;