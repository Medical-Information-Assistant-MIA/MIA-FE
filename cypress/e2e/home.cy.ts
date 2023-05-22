import { aliasQuery, aliasMutation } from "../utils/graphql-test-utils"

describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      aliasQuery(req, 'User')
    })
    .visit('http://localhost:3000/')
  })

  it('Should get a user', () => {
    cy.wait('@gqlUserQuery')
      .its('response.body.data.user')
      .should('have.property', 'id')
  })

  it('Should land on the homepage', () => {
    cy.get('h2').should('contain', 'Welcome to Mia')
  })

  it('Should navigate to the login page', () => {
    cy.get('[href="/login"] > button').click()
    .url().should('contain', '/login')
  })

  it('Should navigate to the dashboard', () => {
    cy.get('.home-page > a > button').click()
    .url().should('contain', '/user-dashboard')
  })
})