import React, { useState } from 'react';
import authService from '../services/authService';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Call the signup service
      await authService.signup(username, password, fullName);

      // Display a success message in a dialog box
      window.alert('Signup successful!');

      // Optionally, redirect to login page or perform other actions upon successful signup
    } catch (error) {
      console.error('Signup failed', error);

      // Display an error message in a dialog box
      window.alert('Signup failed. Please try again.');

      // Handle signup failure, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label>
          Full Name:
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
