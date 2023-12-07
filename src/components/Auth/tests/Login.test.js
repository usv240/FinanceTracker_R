import React from 'react';
//import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import Login from '../Login';

describe('Login Component', () => {
  test('renders login form', () => {
    const { getAllByText, getByPlaceholderText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Check if the login form elements are present
    expect(getAllByText('Login')[0]).toBeInTheDocument(); // Use getAllByText and access the first element
    expect(getByPlaceholderText('Username')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getAllByText('Login')[1]).toBeInTheDocument(); // Use getAllByText and access the second element
  });

  test('handles login and displays success message', async () => {
    const mockOnLogin = jest.fn();
    const { getByPlaceholderText, getAllByText } = render(
      <BrowserRouter>
        <Login onLogin={mockOnLogin} />
      </BrowserRouter>
    );
  
    // Simulate user input and click the login button
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'ujwal' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: '123' } });
    fireEvent.click(getAllByText('Login')[1]);
  
    // Wait for the login process to complete with an increased timeout
    try {
      await waitFor(() => {
        // Check if the onLogin callback is called
        console.log('onLogin calls:', mockOnLogin.mock.calls.length);
      
        // Check if the success message is displayed
        console.log('Login successful elements:', screen.queryByText('Login successful'));
        expect(screen.queryByText('Login successful')).toBeInTheDocument();
      });
      
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });
  

  // Add more test cases for error scenarios, if needed
});
