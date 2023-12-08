/// <reference types="cypress" />
import 'cypress-eyes';

describe('AddBudgetCapacity', () => {
  // E2E: Test adding budget capacity
  it('should add budget capacity', () => {
    // Visit the page that includes AddBudgetCapacity component
    cy.visit('/settings'); // Replace with the actual URL of your settings page

    // Interact with the AddBudgetCapacity component (enter details and click add)
    cy.get('.add-budget-container select').select('1'); // Select January
    cy.get('.add-budget-container input[type="text"]').eq(0).type('Test Budget');
    cy.get('.add-budget-container input[type="text"]').eq(1).type('1000');
    cy.get('.add-budget-container button.add-budget-button').click();

    // Add assertions based on the component's behavior (e.g., check for success message, updated UI, etc.)
    cy.get('.modal h2').should('contain', 'Budget added successfully');
    // Add more assertions based on your component's behavior
  });

  // Visual Regression: Test for matching the AddBudgetCapacity component snapshot
  it('should match the AddBudgetCapacity component snapshot', () => {
    // Visit the page that includes AddBudgetCapacity component
    cy.visit('/settings'); // Replace with the actual URL of your settings page

    // Take a snapshot of the AddBudgetCapacity component
    cy.eyesOpen({
      appName: 'personalbudget', // Replace with your app name
      testName: 'AddBudgetCapacity Component Snapshot',
    });

    // Check the AddBudgetCapacity component
    cy.eyesCheckWindow('AddBudgetCapacity Component');

    // Close the Applitools Eyes test
    cy.eyesClose();
  });
});
