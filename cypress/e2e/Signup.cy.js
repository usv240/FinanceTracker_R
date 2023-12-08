/// <reference types="cypress" />

describe('Signup', () => {
    beforeEach(() => {
      cy.visit('/signup'); // E2E: Replace with the actual URL of your signup page
    });
  
    // E2E: Test for successful user signup
    it('should successfully sign up a user', () => {
      // Fill out the signup form
      cy.get('.signup-input[name="fullName"]').type('John Doe');
      cy.get('.signup-input[name="username"]').type('john.doe');
      cy.get('.signup-input[name="password"]').type('securePassword');
  
      // Submit the form
      cy.get('.signup-button').click();
  
      // Assert that the success dialog appears
      cy.get('.dialog.success').should('be.visible');
    });
  
    // E2E: Test for handling signup failure
    it('should handle signup failure', () => {
      // Fill out the signup form with invalid data
      cy.get('.signup-input[name="fullName"]').type('Invalid User');
      cy.get('.signup-input[name="username"]').type('invalid.user');
      cy.get('.signup-input[name="password"]').type('weakPassword');
  
      // Submit the form
      cy.get('.signup-button').click();
  
      // Assert that the error dialog appears
      cy.get('.dialog.error').should('be.visible');
    });
  
    // Visual Regression: Test for matching the signup page snapshot
    it('should match the signup page snapshot', () => {
      // Take a snapshot of the entire page
      cy.eyesOpen({
        appName: 'personalbudget', // Replace with your app name
        testName: 'Signup Page Snapshot',
      });
  
      // Check the entire page
      cy.eyesCheckWindow('Signup Page');
  
      // Close the Applitools Eyes test
      cy.eyesClose();
    });
  });
  