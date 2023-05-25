import { aliasQuery, aliasMutation } from "../utils/graphql-test-utils"

describe('Dashboard Display', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      aliasQuery(req, 'User')
      req.reply({
        fixture: 'user-fixture.json'
      })
    })
    .visit('http://localhost:3000/')
    cy.get('a.submit-button').click()
      .get('[type="text"]').type('1')
      .get('[type="password"]').type('mia123')
      .get('form > .submit-button').click()
  })

  it('Should navigate to the users dashboard and display their name, add new condition button and conditions', () => { 
    cy.url().should('contain', '/user-dashboard')
      .get('h1').should('contain', 'Captain Cold\'s Dashboard')
      .get('.submit-button').should('contain', 'Create New Condition')
      .get('.condition-cards >').should('have.length', 3)
      .get('[href="/conditions/1"]').should('contain', 'Bronchitis')
      .get('[href="/conditions/3"]').should('contain', 'Hypertension')
  })

  it('Should have navigation buttons in the nav bar', () => {
    cy.get('.nav-bar')
      .get('[href="/"]').should('contain', 'Logout')
      .get('[href="/your-doctors"]').should('contain', 'Your Doctors')
      .get('[href="/add-condition"]').should('contain', 'Create New Condition')
  })

  it('Should be able to click a condition', () => {
    cy.intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      aliasQuery(req, 'Conditions')
      req.reply({
        fixture: 'condition-fixture.json'
      })
    })
    cy.get(':nth-child(1) > .condition-card').click()
      .get('h1').should('contain', 'Tummy Ache')
      .url().should('contain', '/conditions/1')
  })

  it('Should navigate to the new condition page', () => {
    cy.get('.user-dashboard > [href="/add-condition"]').click()
      .get('h1').should('contain', 'Create a New Condition')
      .url().should('contain', '/add-condition')
  })
})