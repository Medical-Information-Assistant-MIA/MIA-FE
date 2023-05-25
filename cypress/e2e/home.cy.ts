import { aliasQuery, aliasMutation } from "../utils/graphql-test-utils"

describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      aliasQuery(req, 'User')
      req.reply({
        fixture: 'user-fixture.json'
      })
    })
    .visit('http://localhost:3000/')
  })

  it('Should get a user', () => {
    cy.wait('@gqlUserQuery')
      .its('response.body.data.user')
      .should('have.property', 'name')
  })

  it('Should have a home page with a title, discription and login buttons', () => {
    cy.get('h1').should('contain', 'Introducing Mia')
      .get('h2').should('contain', 'Your All-in-One Medical Information Assistant')
      .get('p').should('contain', 'Mia simplifies your healthcare journey by consolidating all your vital medical information in one place. Keep track of conditions, medications, doctors, and health events effortlessly. Access a centralized doctor directory. Maintain a personal health log to record important events and notes. Take control of your health with Mia.')
      .get('.nav-btn').should('contain', 'Login')
      .get('.submit-button').should('contain', 'Login')
    })

  it('Should navigate to the login page from either login button', () => {
    cy.get('a.submit-button').click()
      .url().should('contain', '/login')
      .get('.nav-btn').click()
      .url().should('contain', '/')
      .get('.nav-btn').click()
      .url().should('contain', '/login')
  })

  it('Should be able to login a user', () => {
    cy.get('a.submit-button').click()
      .get('[type="text"]').type('1')
      .get('[type="password"]').type('mia123')
      .get('form > .submit-button').click()
      .url().should('contain', '/user-dashboard')
  })
})