import React from 'react';

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


    expect(getAllByText('Login')[0]).toBeInTheDocument(); 
    expect(getByPlaceholderText('Username')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getAllByText('Login')[1]).toBeInTheDocument(); 
  });

  test('handles login and displays success message', async () => {
    const mockOnLogin = jest.fn();
    const { getByPlaceholderText, getAllByText } = render(
      <BrowserRouter>
        <Login onLogin={mockOnLogin} />
      </BrowserRouter>
    );

    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'ujwal' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: '123' } });
    fireEvent.click(getAllByText('Login')[1]);

    try {
      await waitFor(() => {

        console.log('onLogin calls:', mockOnLogin.mock.calls.length);
      

        console.log('Login successful elements:', screen.queryByText('Login successful'));
        expect(screen.queryByText('Login successful')).toBeInTheDocument();
      });
      
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    }
  });

});
