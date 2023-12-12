/// <reference types="cypress" />

describe('AuthContext', () => {
    // E2E: Test login functionality
    it('should log in a user and update AuthContext state', () => {
      
      cy.visit('/logingin');
      cy.get('.login-input[name="username"]').type('testuser');
      cy.get('.login-input[name="password"]').type('testpassword');
      cy.get('.login-button').click();

      cy.window().its('authContext').should('deep.include', { isLoggedIn: true, token: Cypress.any(String) });
    });

    it('should log out a user and update AuthContext state', () => {
      cy.get('.logout-button').click(); 
      cy.window().its('authContext').should('deep.include', { isLoggedIn: false, token: null });
    });
  

    // Visual Regression: Test for matching the AuthContext state snapshot
    it('should match the AuthContext state snapshot', () => {
      
      cy.visit('/dashboard'); 
      cy.eyesOpen({
        appName: 'personalbudget', 
        testName: 'AuthContext State Snapshot',
      });
      cy.eyesCheckWindow('AuthContext State');
      cy.eyesClose();
    });
  });
  