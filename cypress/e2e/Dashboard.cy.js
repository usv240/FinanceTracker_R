/// <reference types="cypress" />
import 'cypress-eyes';

describe('Dashboard', () => {
  // E2E: Test navigating to Budget List and adding a budget
  it('should navigate to Budget List and add a budget', () => {
    cy.visit('/dashboard'); 

    cy.get('.dashboard button').contains('Budget List').click();

    cy.url().should('include', '/budget-list'); 
    cy.get('.dashboard button').contains('Add Budget').click();

    cy.get('.add-budget-container select').select('1'); 
    cy.get('.add-budget-container input[type="text"]').eq(0).type('Test Budget');
    cy.get('.add-budget-container input[type="text"]').eq(1).type('1000');
    cy.get('.add-budget-container button.add-budget-button').click();

    cy.get('.modal h2').should('contain', 'Budget added successfully');
   
  });

  // Visual Regression: Test for matching the Dashboard component snapshot
  it('should match the Dashboard component snapshot', () => {
   
    cy.visit('/dashboard'); 
    cy.eyesOpen({
      appName: 'personalbudget', 
      testName: 'Dashboard Component Snapshot',
    });

    cy.eyesCheckWindow('Dashboard Component');

    cy.eyesClose();
  });

  it('should log out successfully', () => {

    cy.visit('/dashboard'); 

    cy.get('.logout-button').click();
    cy.url().should('include', '/logingin'); 
  });
});
