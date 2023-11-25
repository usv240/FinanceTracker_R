// AddBudgetCapacity.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const AddBudgetCapacity = ({ onAddBudgetCapacity, username, token }) => {
  const [budgetName, setBudgetName] = useState('');
  const [budgetNumber, setBudgetNumber] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addBudgetMessage, setAddBudgetMessage] = useState('');
  const navigate = useNavigate();

  const handleAddBudgetCapacity = async () => {
    try {
      if (typeof onAddBudgetCapacity !== 'function') {
        console.error('onAddBudgetCapacity is not a function');
        return;
      }
  
      const data = { budgetName, budgetNumber };
      const response = await onAddBudgetCapacity(data);
  
      if (response && response.success) {
        setAddBudgetMessage(response.message);
        openModal();
      } else {
        console.error('Failed to add budget capacity:', response ? response.message : 'Unknown error');
        setAddBudgetMessage(response ? response.message : 'Failed to add budget capacity');
        openModal();
      }
    } catch (error) {
      console.error('Error adding budget capacity:', error.message);
      setAddBudgetMessage('Error adding budget capacity');
      openModal();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h3>Add Budget Capacity</h3>
      <label>
        Budget Name:
        <input
          type="text"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Budget Number:
        <input
          type="text"
          value={budgetNumber}
          onChange={(e) => setBudgetNumber(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleAddBudgetCapacity}>Add Budget Capacity</button>

      {/* Modal for displaying add budget message */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Budget Message"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '50%',
            margin: 'auto',
            backgroundColor: 'white',
            padding: '20px',
          },
        }}
      >
        <h2>{addBudgetMessage}</h2>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default AddBudgetCapacity;
