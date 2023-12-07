import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddBudget from '../AddBudget';
import axios from 'axios';

jest.mock('axios');

describe('AddBudget component', () => {
  it('should render the form with input fields and a submit button', () => {
    render(<AddBudget token="dummyToken" />);

    expect(screen.getByLabelText('Category:')).toBeInTheDocument();
    expect(screen.getByLabelText('Number:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Budget' })).toBeInTheDocument();
  });

  it('should display error notifications when input fields are empty', async () => {
    render(<AddBudget token="dummyToken" />);
  
    fireEvent.click(screen.getByRole('button', { name: 'Add Budget' }));
  
    await waitFor(() => {
      expect(screen.getByText('Error: An error occurred')).toBeInTheDocument();
    });
  });
  

  it('should submit the form data and display a success notification on successful submission', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Budget added successfully' } });

    render(<AddBudget token="dummyToken" />);

    const budgetNameInput = screen.getByLabelText('Category:');
    const budgetNumberInput = screen.getByLabelText('Number:');
    const submitButton = screen.getByRole('button', { name: 'Add Budget' });

    fireEvent.change(budgetNameInput, { target: { value: 'Groceries' } });
    fireEvent.change(budgetNumberInput, { target: { value: '100' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Budget added successfully')).toBeInTheDocument();
    });
  });

  it('should display an error notification when the API request fails', async () => {
    axios.post.mockRejectedValue({ response: { data: { message: 'Error adding budget' } } });

    render(<AddBudget token="dummyToken" />);

    const budgetNameInput = screen.getByLabelText('Category:');
    const budgetNumberInput = screen.getByLabelText('Number:');
    const submitButton = screen.getByRole('button', { name: 'Add Budget' });

    fireEvent.change(budgetNameInput, { target: { value: 'Groceries' } });
    fireEvent.change(budgetNumberInput, { target: { value: '100' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Error: Error adding budget')).toBeInTheDocument();
    });
  });
});
