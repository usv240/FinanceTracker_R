// Signup.test.js

import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Import user-event for better simulation of user interactions
import Signup from '../Signup'; // Adjust the import path based on your project structure
import authService from '../../services/authService';

// Mock the authService module
jest.mock('../../services/authService');

describe('Signup Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders signup form', () => {
    render(<Signup />);
    const signUpHeading = screen.getByRole('heading', { name: 'Sign Up' });
    const signUpButton = screen.getByRole('button', { name: 'Sign Up' });

    expect(signUpHeading).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  });

  test('handles signup and displays success message', async () => {
    render(<Signup />);
    userEvent.type(screen.getByLabelText('Full Name:'), 'John Doe');
    userEvent.type(screen.getByLabelText('Username:'), 'john_doe');
    userEvent.type(screen.getByLabelText('Password:'), 'password123');
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    // Wait for the signup process to complete
    await waitFor(() => {
      expect(screen.getByText('Signup successful!')).toBeInTheDocument();
    });
  });

//   test('handles signup failure and displays error message', async () => {
//     render(<Signup />);
//     userEvent.type(screen.getByLabelText('Full Name:'), 'John Doe');
//     userEvent.type(screen.getByLabelText('Username:'), 'john_doe');
//     userEvent.type(screen.getByLabelText('Password:'), 'invalidpassword');
//     fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

//     // Wait for the signup process to complete
//     await waitFor(() => {
//       expect(screen.getByText('Signup failed. Please try again.')).toBeInTheDocument();
//     });
  
//   });
});
