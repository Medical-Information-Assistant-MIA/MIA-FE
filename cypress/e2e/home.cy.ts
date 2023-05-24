import { aliasQuery, aliasMutation } from "../utils/graphql-test-utils"

describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      aliasQuery(req, 'User')
      req.reply({
        fixture: 'user-fixture.json'
      })
    })
    .visit('https://mia-fe.vercel.app/')
  })

  it('Should get a user', () => {
    cy.wait('@gqlUserQuery')
      .its('response.body.data.user')
      .should('have.property', 'name')
  })

  it('Should land on the homepage', () => {
    cy.get('h2').should('contain', 'Welcome to Mia')
  })

  it('Should navigate to the login page', () => {
    cy.get('.home-page > a > .submit-button').click()
    .url().should('contain', '/login')
  })

  it('Should be able to login', () => {
    cy.get('.home-page > a > .submit-button').click()
    .get('[type="text"]').type('1')
    .get('[type="password"]').type('mia123')
    .get('form > .submit-button').click()
    .url().should('contain', '/user-dashboard')
  })
})