/// <reference types="cypress" />

describe('Signup', () => {
    beforeEach(() => {
      cy.visit('/signup');
  
    // E2E: Test for successful user signup
    it('should successfully sign up a user', () => {
      cy.get('.signup-input[name="fullName"]').type('John Doe');
      cy.get('.signup-input[name="username"]').type('john.doe');
      cy.get('.signup-input[name="password"]').type('securePassword');
      cy.get('.signup-button').click();
  
      cy.get('.dialog.success').should('be.visible');
    });
    it('should handle signup failure', () => {

      cy.get('.signup-input[name="fullName"]').type('Invalid User');
      cy.get('.signup-input[name="username"]').type('invalid.user');
      cy.get('.signup-input[name="password"]').type('weakPassword');

      cy.get('.signup-button').click();
      cy.get('.dialog.error').should('be.visible');
    });
  
    // Visual Regression: Test for matching the signup page snapshot
    it('should match the signup page snapshot', () => {
      cy.eyesOpen({
        appName: 'personalbudget', 
        testName: 'Signup Page Snapshot',
      });

      cy.eyesCheckWindow('Signup Page');
      cy.eyesClose();
    });
  });
  