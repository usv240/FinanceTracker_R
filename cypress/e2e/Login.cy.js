/// <reference types="cypress" />
import '@applitools/eyes-cypress/commands';

// Open Applitools session for visual testing
Cypress.eyesOpen('personalbudget', 'Login Tests');

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login'); // Update the URL if needed
  });

  it('should login successfully (E2E)', () => {
    cy.get('.login-input').first().type('your_username');
    cy.get('.login-input').last().type('your_password');
    cy.get('.login-button').click();

    // Assert that the user is redirected to the dashboard
    cy.url().should('include', '/dashboard');

    // Add more E2E assertions if needed

    // Capture visual checkpoint for successful login (Visual Regression)
    cy.eyesCheckWindow('Successful Login');
  });

  it('should display login failure message (E2E)', () => {
    // Test login failure scenario
    cy.get('.login-input').first().type('invalid_username');
    cy.get('.login-input').last().type('invalid_password');
    cy.get('.login-button').click();

    // Assert that the modal is open and contains the login failure message
    cy.get('.login-modal').should('be.visible');
    cy.get('.login-modal h2').should('contain.text', 'Login failed');

    // Capture visual checkpoint for login failure (Visual Regression)
    cy.eyesCheckWindow('Login Failure');
  });

  it('should look correct (Visual Regression)', () => {
    // Test login page appearance for visual regression (Visual Regression)
    cy.eyesCheckWindow('Login Page');
  });
});

// Close Applitools session after all tests are executed
Cypress.eyesClose();
