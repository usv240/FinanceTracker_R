/// <reference types="cypress" />

describe('AddBudget', () => {
    // E2E: Test adding a budget
    it('should add a budget successfully and display a success notification', () => {
      // Visit the page that includes AddBudget component
      cy.visit('/dashboard'); // Replace with the actual URL of your dashboard page
  
      // Stub the POST request to simulate a successful response
      cy.intercept('POST', 'http://localhost:5000/api/budgets', {
        statusCode: 200,
        body: { message: 'Budget added successfully' },
      }).as('addBudget');
  
      // Interact with the AddBudget component (filling out the form, clicking the add button)
      cy.get('.add-budget-form input[type="text"]').type('Groceries');
      cy.get('.add-budget-form input[type="number"]').type('100');
      // Use cy.clock() to set a fixed date for testing purposes
      cy.clock(new Date(2023, 0, 15).getTime());
      cy.get('.add-budget-form button').click();
  
      // Wait for the POST request to complete
      cy.wait('@addBudget');
  
      // Assert that success notification is displayed
      cy.get('.Toastify__toast--success').should('be.visible');
    });
  
    // Visual Regression: Test for matching the AddBudget component snapshot
    it('should match the AddBudget component snapshot', () => {
      // Visit the page that includes AddBudget component
      cy.visit('/dashboard'); // Replace with the actual URL of your dashboard page
  
      // Take a snapshot of the AddBudget component
      cy.eyesOpen({
        appName: 'personalbudget', // Replace with your app name
        testName: 'AddBudget Component Snapshot',
      });
  
      // Check the AddBudget component
      cy.eyesCheckWindow('AddBudget Component');
  
      // Close the Applitools Eyes test
      cy.eyesClose();
    });
  });
  