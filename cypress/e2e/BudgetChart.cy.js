/// <reference types="cypress" />

describe('BudgetChart', () => {
    // E2E: Test changing the selected month and loading charts
    it('should change the selected month and load charts', () => {
      // Visit the page that includes BudgetChart component
      cy.visit('/dashboard'); // Replace with the actual URL of your dashboard page
  
      // Stub the API requests to simulate successful responses
      cy.intercept('GET', 'http://localhost:5000/api/budgets/getAllBudgets', { fixture: 'budgets.json' }).as('getAllBudgets');
      cy.intercept('GET', 'http://localhost:5000/api/budgets/capacity', { fixture: 'capacity.json' }).as('getCapacity');
  
      // Interact with the BudgetChart component (changing the selected month)
      cy.get('.budget-chart select').select('2'); // Change to February
  
      // Wait for API requests to complete
      cy.wait('@getAllBudgets');
      cy.wait('@getCapacity');
  
      // Assert that charts are visible
      cy.get('.budget-canvas').should('be.visible');
      cy.get('.budget-pie-canvas').should('be.visible');
      cy.get('.budget-line-canvas').should('be.visible');
    });
  
    // Visual Regression: Test for matching the BudgetChart component snapshot
    it('should match the BudgetChart component snapshot', () => {
      // Visit the page that includes BudgetChart component
      cy.visit('/dashboard'); // Replace with the actual URL of your dashboard page
  
      // Stub the API requests to simulate successful responses
      cy.intercept('GET', 'http://localhost:5000/api/budgets/getAllBudgets', { fixture: 'budgets.json' }).as('getAllBudgets');
      cy.intercept('GET', 'http://localhost:5000/api/budgets/capacity', { fixture: 'capacity.json' }).as('getCapacity');
  
      // Take a snapshot of the BudgetChart component
      cy.eyesOpen({
        appName: 'personalbudget', // Replace with your app name
        testName: 'BudgetChart Component Snapshot',
      });
  
      // Check the BudgetChart component
      cy.eyesCheckWindow('BudgetChart Component');
  
      // Close the Applitools Eyes test
      cy.eyesClose();
    });
  });
  