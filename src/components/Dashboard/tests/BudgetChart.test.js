import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BudgetChart from '../BudgetChart';
import apiService from '../../services/apiService';

jest.mock('../../services/apiService');

describe('BudgetChart component', () => {
  it('should render the loading message when fetching data', async () => {
    render(<BudgetChart token="dummyToken" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render the charts and select box when data is fetched', async () => {
    const budgetData = [
      { budgetname: 'Groceries', budgetnumber: 100 },
      { budgetname: 'Rent', budgetnumber: 500 },
      { budgetname: 'Utilities', budgetnumber: 150 },
    ];

    const budgetCapacityData = [
      { budgetname: 'Groceries', budgetnumber: 200 },
      { budgetname: 'Rent', budgetnumber: 700 },
      { budgetname: 'Utilities', budgetnumber: 175 },
    ];

    apiService.get.mockImplementation(() =>
      Promise.resolve({
        data: budgetData,
      }),
    );

    render(<BudgetChart token="dummyToken" />);
  });

  it('should render the no data message when no budget data is available', async () => {
    apiService.get.mockImplementation(() =>
      Promise.resolve({
        data: [],
      }),
    );

    render(<BudgetChart token="dummyToken" />);

    await waitFor(() => {
      expect(screen.getByText('No budget data available.')).toBeInTheDocument();
    });
  });

  it('should render the no data message when no budget capacity data is available', async () => {
    const budgetData = [
      { budgetname: 'Groceries', budgetnumber: 100 },
      { budgetname: 'Rent', budgetnumber: 500 },
      { budgetname: 'Utilities', budgetnumber: 150 },
    ];

    apiService.get.mockImplementation(() => {
      if (endpoint.includes('/budgets/getAllBudgets')) {
        return Promise.resolve({
          data: budgetData,
        });
      } else {
        return Promise.resolve({
          data: [],
        });
      }
    });

    render(<BudgetChart token="dummyToken" />);

    await waitFor(() => {
      expect(screen.getByText('No budget data available.')).toBeInTheDocument();
    });
  });
});
