/// <reference types="cypress" />

describe('BudgetList', () => {
    // E2E: Test loading budgets for a specific month
    it('should load budgets for a specific month', () => {
      // Visit the page that includes BudgetList component
      cy.visit('/dashboard'); // Replace with the actual URL of your dashboard page
  
      // Stub the API request to simulate a successful response
      cy.intercept('GET', 'http://localhost:5000/api/budgets/getAllBudgets/2', { fixture: 'budgets.json' }).as('getAllBudgets');
  
      // Interact with the BudgetList component (changing the selected month)
      cy.get('.budget-list-container select').select('2'); // Change to February
  
      // Wait for the API request to complete
      cy.wait('@getAllBudgets');
  
      // Assert that the budget list is visible
      cy.get('.budget-table').should('be.visible');
      // Add more assertions based on your component's behavior
    });
  
    // Visual Regression: Test for matching the BudgetList component snapshot
    it('should match the BudgetList component snapshot', () => {
      // Visit the page that includes BudgetList component
      cy.visit('/dashboard'); // Replace with the actual URL of your dashboard page
  
      // Stub the API request to simulate a successful response
      cy.intercept('GET', 'http://localhost:5000/api/budgets/getAllBudgets', { fixture: 'budgets.json' }).as('getAllBudgets');
  
      // Take a snapshot of the BudgetList component
      cy.eyesOpen({
        appName: 'personalbudget', // Replace with your app name
        testName: 'BudgetList Component Snapshot',
      });
  
      // Check the BudgetList component
      cy.eyesCheckWindow('BudgetList Component');
  
      // Close the Applitools Eyes test
      cy.eyesClose();
    });
  });
  