//AddBudgetCapacity.js

import config from '../../config';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiService from '../services/apiService';
import '../../styles/AddBudgetCapacity.css'; // Import your CSS file

const BASE_URL = config.apiUrl;

// Define the AddBudgetCapacity component
const AddBudgetCapacity = ({ onAddBudgetCapacity, username, token }) => {
  // State variables
  const [budgetName, setBudgetName] = useState('');
  const [budgetNumber, setBudgetNumber] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addBudgetMessage, setAddBudgetMessage] = useState('');
  const [capacityData, setCapacityData] = useState([]);
  const navigate = useNavigate();

  // Function to handle adding budget capacity
  const handleAddBudgetCapacity = async () => {
    try {
      if (typeof onAddBudgetCapacity !== 'function') {
        console.error('onAddBudgetCapacity is not a function');
        return;
      }

      // Convert selectedMonth to integer
      const data = { budgetName, budgetNumber, selectedMonth: parseInt(selectedMonth, 10) };
      const response = await onAddBudgetCapacity(data);

      if (response && response.success) {
        setAddBudgetMessage(response.message);
        //openModal();
        // Display success Toastify notification
        toast.success(response.message);
        // Reset form fields after successful submission
        setBudgetName('');
        setBudgetNumber('');
        setSelectedMonth('');
      } else {
        console.error('Failed to add budget capacity:', response ? response.message : 'Unknown error');
        setAddBudgetMessage(response ? response.message : 'Failed to add budget capacity');
        //openModal();
        // Display error Toastify notification
        toast.error(response ? response.message : 'Failed to add budget capacity');
      }
    } catch (error) {
      console.error('Error adding budget capacity:', error.message);
      setAddBudgetMessage('Error adding budget capacity');
      //openModal();
      // Display error Toastify notification
      toast.error('Error adding budget capacity');
    }
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Define the API endpoint based on the selected month
  const capacityEndpoint = selectedMonth
    ? `/budgets/capacity/${selectedMonth}`
    : '/budgets/capacity';

  // Fetch capacity data when the component mounts or when the capacityEndpoint or token changes
  useEffect(() => {
    const fetchCapacityData = async () => {
      try {
        const response = await apiService.get(capacityEndpoint, token);
        setCapacityData(response.data || []);
      } catch (error) {
        console.error('Error fetching capacity data:', error);
      }
    };

    fetchCapacityData();
  }, [capacityEndpoint, token]);

  // Render the component
  return (
    <div className="add-budget-container">
      <h3 className="header">Add Budget Capacity</h3>
      <label>
        Select Month:
        <select
          className="select-dropdown"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Select Month</option>
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
      <label>
        Category:
        <input
          className="input-field"
          type="text"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Category limit:
        <input
          className="input-field"
          type="text"
          value={budgetNumber}
          onChange={(e) => setBudgetNumber(e.target.value)}
        />
      </label>
      <br />
      <button className="add-budget-button" onClick={handleAddBudgetCapacity}>
        Add Budget Capacity
      </button>

      {/* Display capacity data in a table */}
      <h3 className="header">Capacity Data</h3>
      {capacityData.length > 0 ? (
        <table className="capacity-table">
          <thead>
            <tr>
              <th>Budget Name</th>
              <th>Budget Number</th>
            </tr>
          </thead>
          <tbody>
            {capacityData.map((item) => (
              <tr key={item.budgetname}>
                <td>{item.budgetname}</td>
                <td>{item.budgetnumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No capacity added.</p>
      )}

      {/* Modal for displaying add budget message */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Budget Message"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{addBudgetMessage}</h2>
        <button onClick={closeModal}>Close</button>
      </Modal>

      {/* Toastify container */}
      <ToastContainer />
    </div>
  );
};

export default AddBudgetCapacity;
