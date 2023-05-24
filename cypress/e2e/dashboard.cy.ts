import { aliasQuery, aliasMutation } from "../utils/graphql-test-utils"

describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      aliasQuery(req, 'User')
      req.reply({
        fixture: 'user-fixture.json'
      })
    })
    .visit('https://mia-fe.vercel.app/')
    cy.get('.submit-button').click()
    .get('[type="text"]').type('1')
    .get('[type="password"]').type('mia123')
    .get('.submit-button').click()
  })

  it('Should navigate to dashboard and display conditions', () => { 
    cy.url().should('contain', '/user-dashboard')
    .get('.condition-cards >').should('have.length', 3)
  })

  it('Should be able to click a condition', () => {
    cy.intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      aliasQuery(req, 'Conditions')
      req.reply({
        fixture: 'condition-fixture.json'
      })
    })
    cy.get(':nth-child(1) > .condition-card').click()
    .get('h2').should('contain', 'Tummy Ache')
  })

  it('Should navigate to the new condition page', () => {
    cy.get('[href="/add-condition"] > button').click()
    .get('h2').should('contain', 'Create a New Condition')
  })
})