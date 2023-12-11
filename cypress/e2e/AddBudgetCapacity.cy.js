/// <reference types="cypress" />
import 'cypress-eyes';

describe('AddBudgetCapacity', () => {
  // E2E: Test adding budget capacity
  it('should add budget capacity', () => {
    cy.visit('/settings'); 

    cy.get('.add-budget-container select').select('1'); 
    cy.get('.add-budget-container input[type="text"]').eq(0).type('Test Budget');
    cy.get('.add-budget-container input[type="text"]').eq(1).type('1000');
    cy.get('.add-budget-container button.add-budget-button').click();

    cy.get('.modal h2').should('contain', 'Budget added successfully');

  });

  // Visual Regression: Test for matching the AddBudgetCapacity component snapshot
  it('should match the AddBudgetCapacity component snapshot', () => {
   
    cy.visit('/settings'); 
    cy.eyesOpen({
      appName: 'personalbudget', 
      testName: 'AddBudgetCapacity Component Snapshot',
    });
    cy.eyesCheckWindow('AddBudgetCapacity Component');
    cy.eyesClose();
  });
});
