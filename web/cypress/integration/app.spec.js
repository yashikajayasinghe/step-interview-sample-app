/// <reference types="Cypress" />

context('Actions', () => {
  const BASE_URL = 'http://localhost:3000';
  
  beforeEach(() => {
    cy.visit(BASE_URL)
  })

  it('welcomes me', () => {
    cy.contains('Welcome to LandOnLite');
  })

})
