/// <reference types="cypress" />

describe('AddBudget', () => {
    // E2E: Test adding a budget
    it('should add a budget successfully and display a success notification', () => {
      cy.visit('/dashboard'); 
  
      cy.intercept('POST', 'http://localhost:5000/api/budgets', {
        statusCode: 200,
        body: { message: 'Budget added successfully' },
      }).as('addBudget');

      cy.get('.add-budget-form input[type="text"]').type('Groceries');
      cy.get('.add-budget-form input[type="number"]').type('100');

      cy.clock(new Date(2023, 0, 15).getTime());
      cy.get('.add-budget-form button').click();

      cy.wait('@addBudget');

      cy.get('.Toastify__toast--success').should('be.visible');
    });
  
    // Visual Regression: Test for matching the AddBudget component snapshot
    it('should match the AddBudget component snapshot', () => {
     
      cy.visit('/dashboard'); 
  

      cy.eyesOpen({
        appName: 'personalbudget', 
        testName: 'AddBudget Component Snapshot',
      });
      cy.eyesCheckWindow('AddBudget Component');
      cy.eyesClose();
    });
  });
  