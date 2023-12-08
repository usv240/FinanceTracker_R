/// <reference types="cypress" />

describe('AuthContext', () => {
    // E2E: Test login functionality
    it('should log in a user and update AuthContext state', () => {
      // Visit a page that uses AuthProvider, e.g., the login page
      cy.visit('/login'); // Replace with the actual URL of your login page
  
      // Perform login actions (filling out the form, clicking the login button)
      cy.get('.login-input[name="username"]').type('testuser');
      cy.get('.login-input[name="password"]').type('testpassword');
      cy.get('.login-button').click();
  
      // Assert that AuthContext state is updated after login
      cy.window().its('authContext').should('deep.include', { isLoggedIn: true, token: Cypress.any(String) });
    });
  
    // E2E: Test logout functionality
    it('should log out a user and update AuthContext state', () => {
      // Trigger logout action (e.g., by clicking a logout button)
      cy.get('.logout-button').click(); // Replace with the actual selector for your logout button
  
      // Assert that AuthContext state is updated after logout
      cy.window().its('authContext').should('deep.include', { isLoggedIn: false, token: null });
    });
  
    // Visual Regression: Test for matching the AuthContext state snapshot
    it('should match the AuthContext state snapshot', () => {
      // Visit a page that uses AuthProvider, e.g., the dashboard page
      cy.visit('/dashboard'); // Replace with the actual URL of your dashboard page
  
      // Take a snapshot of the AuthContext state
      cy.eyesOpen({
        appName: 'personalbudget', // Replace with your app name
        testName: 'AuthContext State Snapshot',
      });
  
      // Check the AuthContext state
      cy.eyesCheckWindow('AuthContext State');
  
      // Close the Applitools Eyes test
      cy.eyesClose();
    });
  });
  