// TokenRefreshModal.js
import React from 'react';
import Modal from 'react-modal'; // Import the modal library you installed

const TokenRefreshModal = ({ isOpen, onRefresh, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Token Refresh Modal"
    >
      <div>
        <p>Your token is about to expire. Do you want to refresh it?</p>
        <button onClick={onRefresh}>Refresh Token</button>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default TokenRefreshModal;
