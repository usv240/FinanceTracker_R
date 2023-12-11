// Signup.test.js

import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import Signup from '../Signup'; 
import authService from '../../services/authService';


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

    await waitFor(() => {
      expect(screen.getByText('Signup successful!')).toBeInTheDocument();
    });
  });

});
