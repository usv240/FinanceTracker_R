/// <reference types="cypress" />
import 'cypress-eyes';

describe('apiService', () => {
  // E2E: Test fetching data from the API
  it('should fetch data from the API using apiService.get', () => {
    // Stub the API response
    cy.intercept('GET', 'http://localhost:5000/api/**').as('apiRequest');

    // Call apiService.get and wait for the API request to complete
    cy.window().then((win) => {
      const token = 'your-test-token'; // Replace with a valid test token
      return win.apiService.get('/testEndpoint', token);
    });

    // Wait for the API request to complete
    cy.wait('@apiRequest').then((interception) => {
      // Add assertions based on the API response
      expect(interception.response.statusCode).to.equal(200);
      // Add more assertions based on your API response structure
    });
  });

  // Visual Regression: Test for matching the apiService snapshot
  it('should match the apiService snapshot', () => {
    // Open a new Eyes test for the apiService
    cy.eyesOpen({
      appName: 'YourAppName', // Replace with your app name
      testName: 'apiService Snapshot',
    });

    // Call apiService.get with a token
    cy.window().then((win) => {
      const token = 'your-test-token'; // Replace with a valid test token
      return win.apiService.get('/testEndpoint', token);
    });

    // Check the apiService window for visual differences
    cy.eyesCheckWindow('apiService Snapshot');

    // Close the Applitools Eyes test
    cy.eyesClose();
  });
});
