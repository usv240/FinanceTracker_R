// login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import authService from '../services/authService';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const token = await authService.login(username, password);

      // Pass the token and username to the onLogin callback
      onLogin(token, username);

      setLoginMessage('Login successful');
      openModal();
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      setLoginMessage('Login failed');
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
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      {/* Modal for displaying login message */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Login Message"
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
        <h2>{loginMessage}</h2>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Login;
