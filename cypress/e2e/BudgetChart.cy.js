/// <reference types="cypress" />

describe('BudgetChart', () => {
    // E2E: Test changing the selected month and loading charts
    it('should change the selected month and load charts', () => {
      
      cy.visit('/dashboard'); 
  

      cy.intercept('GET', 'http://localhost:5000/api/budgets/getAllBudgets', { fixture: 'budgets.json' }).as('getAllBudgets');
      cy.intercept('GET', 'http://localhost:5000/api/budgets/capacity', { fixture: 'capacity.json' }).as('getCapacity');

      cy.get('.budget-chart select').select('2'); 

      cy.wait('@getAllBudgets');
      cy.wait('@getCapacity');

      cy.get('.budget-canvas').should('be.visible');
      cy.get('.budget-pie-canvas').should('be.visible');
      cy.get('.budget-line-canvas').should('be.visible');
    });
  

    // Visual Regression: Test for matching the BudgetChart component snapshot
    it('should match the BudgetChart component snapshot', () => {

      cy.visit('/dashboard'); 

      cy.intercept('GET', 'http://localhost:5000/api/budgets/getAllBudgets', { fixture: 'budgets.json' }).as('getAllBudgets');
      cy.intercept('GET', 'http://localhost:5000/api/budgets/capacity', { fixture: 'capacity.json' }).as('getCapacity');
  

      cy.eyesOpen({
        appName: 'personalbudget',
        testName: 'BudgetChart Component Snapshot',
      });

      cy.eyesCheckWindow('BudgetChart Component');

      cy.eyesClose();
    });
  });
  