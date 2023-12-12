// BudgetList.js

import React, { useState, useEffect } from 'react';
import apiService from './apiService';
import '../../styles/BudgetList.css';

const BudgetList = ({ token }) => {
  const [budgets, setBudgets] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [loading, setLoading] = useState(true);
  const [capacityData, setCapacityData] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const headers = {
          Authorization: 'Bearer ' + token,
        };

        const endpoint = selectedMonth
          ? `/budgets/getAllBudgets/${selectedMonth}`
          : '/budgets/getAllBudgets';

        const capacityEndpoint = selectedMonth
          ? `/budgets/capacity/${selectedMonth}`
          : '/budgets/capacity';

        const capacityParams = selectedMonth
          ? { params: { month: parseInt(selectedMonth, 10) } }
          : {};

        const [response, capacityResponse] = await Promise.all([
          apiService.get(endpoint, token, { params: { month: parseInt(selectedMonth, 10) } }),
          apiService.get(capacityEndpoint, token, capacityParams),
        ]);

        setBudgets(response.data);
        setCapacityData(capacityResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching budgets', error);
        setLoading(false);
      }
    };

    fetchBudgets();
  }, [token, selectedMonth]); 

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className="budget-list-container">
      <h2 className="list-header">ALL BUDGETS ARE LISTED HERE</h2>

      <label>
        Select Month:
        <select className="select-dropdown" value={selectedMonth} onChange={handleMonthChange}>
        <option value="">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </label>

      {!loading ? (
        budgets && budgets.length > 0 ? (
          <div className="budget-table">
            <div className="table-row header">
              <div className="table-cell">Budget Name</div>
              <div className="table-cell">Budget Number</div>
              <div className="table-cell">Total Capacity</div>
              <div className="table-cell">Remaining Balance</div>
            </div>
            {budgets.map((budget) => {
              const capacityForBudget = capacityData.find(
                (capacityItem) => capacityItem.budgetname === budget.budgetname
              );

              const budgetNumber = budget.budgetnumber || 0;
              const capacityNumber = capacityForBudget ? capacityForBudget.budgetnumber || 0 : 0;

              const remainingBalance = Math.max(0, capacityNumber - budgetNumber);

              return (
                <div className="table-row" key={budget.id}>
                  <div className="table-cell">{budget.budgetname}</div>
                  <div className="table-cell">{budgetNumber}</div>
                  <div className="table-cell">{capacityNumber}</div>
                  <div className={`table-cell remaining-balance`}>{remainingBalance}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-data-message">No budget data available.</p>
        )
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
};

export default BudgetList;
