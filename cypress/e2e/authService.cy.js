/// <reference types="cypress" />
import 'cypress-eyes';

describe('authService', () => {
  // E2E: Test user signup
  it('should sign up a new user using authService.signup', () => {
    // Stub the API response
    cy.intercept('POST', 'http://localhost:5000/api/auth/register').as('signupRequest');

    // Call authService.signup and wait for the API request to complete
    cy.window().then((win) => {
      return win.authService.signup('testUser', 'testPassword', 'Test User');
    });

    // Wait for the API request to complete
    cy.wait('@signupRequest').then((interception) => {
      // Add assertions based on the API response
      expect(interception.response.statusCode).to.equal(200);
      // Add more assertions based on your signup response structure
    });
  });

  // E2E: Test user login
  it('should log in a user using authService.login', () => {
    // Stub the API response
    cy.intercept('POST', 'http://localhost:5000/api/auth/login').as('loginRequest');

    // Call authService.login and wait for the API request to complete
    cy.window().then((win) => {
      return win.authService.login('testUser', 'testPassword');
    });

    // Wait for the API request to complete
    cy.wait('@loginRequest').then((interception) => {
      // Add assertions based on the API response
      expect(interception.response.statusCode).to.equal(200);
      // Add more assertions based on your login response structure
    });
  });

  // Visual Regression: Test for matching the authService snapshot
  it('should match the authService snapshot', () => {
    // Open a new Eyes test for the authService
    cy.eyesOpen({
      appName: 'YourAppName', // Replace with your app name
      testName: 'authService Snapshot',
    });

    // Call authService.login with test credentials
    cy.window().then((win) => {
      return win.authService.login('testUser', 'testPassword');
    });

    // Check the authService window for visual differences
    cy.eyesCheckWindow('authService Snapshot');

    // Close the Applitools Eyes test
    cy.eyesClose();
  });

  // E2E: Test authenticated request
  it('should make an authenticated request using authService.makeAuthenticatedRequest', () => {
    // Stub the API response
    cy.intercept('GET', 'http://localhost:5000/api/testEndpoint').as('authenticatedRequest');

    // Call authService.makeAuthenticatedRequest and wait for the API request to complete
    cy.window().then((win) => {
      return win.authService.makeAuthenticatedRequest('http://localhost:5000/api/testEndpoint');
    });

    // Wait for the API request to complete
    cy.wait('@authenticatedRequest').then((interception) => {
      // Add assertions based on the API response
      expect(interception.response.statusCode).to.equal(200);
      // Add more assertions based on your authenticated request response structure
    });
  });
});
