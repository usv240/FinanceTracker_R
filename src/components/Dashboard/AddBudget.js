import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBudget = ({ token }) => {
  console.log('addbudget token',token);
  const [budgetName, setBudgetName] = useState('');
  const [budgetNumber, setBudgetNumber] = useState('');

  const handleAddBudget = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/budgets',
        { budgetName, budgetNumber },
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

    } catch (error) {
      console.error('Error adding budget:', error.response.data.message);

      // Show error notification
      toast.error(`Error: ${error.response.data.message}`, {
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
    <div>
      <h2>Add Budget</h2>
      <label>
        Budget Name:
        <input
          type="text"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
        />
      </label>
      <label>
        Budget Number:
        <input
          type="number"
          value={budgetNumber}
          onChange={(e) => setBudgetNumber(e.target.value)}
        />
      </label>
      <button onClick={handleAddBudget}>Add Budget</button>
    </div>
  );
};

export default AddBudget;
