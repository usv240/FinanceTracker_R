// TokenRefreshHandler.js

import React from 'react';
import Modal from 'react-modal';

const TokenRefreshHandler = ({ isOpen, onConfirmationYes, onConfirmationNo, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Token Refresh Confirmation Modal"
      className="dashboard-modal" 
    >
      <h2>Your session is about to expire</h2>
      <p>Do you want to refresh your session?</p>
      <button onClick={onConfirmationYes}>Yes</button>
      <button onClick={onConfirmationNo}>No</button>
    </Modal>
  );
};

export default TokenRefreshHandler;
