/// <reference types="cypress" />
import 'cypress-eyes';

describe('Dashboard', () => {
  // E2E: Test navigating to Budget List and adding a budget
  it('should navigate to Budget List and add a budget', () => {
    // Visit the dashboard page
    cy.visit('/dashboard'); // Replace with the actual URL of your dashboard page

    // Click on Budget List button
    cy.get('.dashboard button').contains('Budget List').click();

    // Add assertions based on the Budget List behavior
    cy.url().should('include', '/budget-list'); // Check if the URL has changed to the Budget List page

    // Click on Add Budget button
    cy.get('.dashboard button').contains('Add Budget').click();

    // Interact with the Add Budget component (enter details and click add)
    cy.get('.add-budget-container select').select('1'); // Select January
    cy.get('.add-budget-container input[type="text"]').eq(0).type('Test Budget');
    cy.get('.add-budget-container input[type="text"]').eq(1).type('1000');
    cy.get('.add-budget-container button.add-budget-button').click();

    // Add assertions based on the Add Budget component behavior (e.g., check for success message)
    cy.get('.modal h2').should('contain', 'Budget added successfully');
    // Add more assertions based on your component's behavior
  });

  // Visual Regression: Test for matching the Dashboard component snapshot
  it('should match the Dashboard component snapshot', () => {
    // Visit the dashboard page
    cy.visit('/dashboard'); // Replace with the actual URL of your dashboard page

    // Take a snapshot of the Dashboard component
    cy.eyesOpen({
      appName: 'personalbudget', // Replace with your app name
      testName: 'Dashboard Component Snapshot',
    });

    // Check the Dashboard component
    cy.eyesCheckWindow('Dashboard Component');

    // Close the Applitools Eyes test
    cy.eyesClose();
  });

  // E2E: Test logging out
  it('should log out successfully', () => {
    // Visit the dashboard page
    cy.visit('/dashboard'); // Replace with the actual URL of your dashboard page

    // Click on Logout button
    cy.get('.logout-button').click();

    // Add assertions based on the logout behavior (e.g., check if redirected to the login page)
    cy.url().should('include', '/login'); // Check if the URL has changed to the login page
  });
});
