import { aliasQuery, aliasMutation } from "../utils/graphql-test-utils"

describe('Doctor Display Page', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      if(req.body.operationName === 'User') {
        aliasQuery(req, 'User')
        req.reply({
          fixture: 'user-fixture.json'
        })
      } else if (req.body.operationName === 'UserDoctors') {
        aliasMutation(req, 'UserDoctors')
        req.reply({fixture: 'user-doctors.json'})
      }
    })
    cy.visit('http://localhost:3000/')
    cy.get('a.submit-button').click()
      .get('[type="text"]').type('1')
      .get('[type="password"]').type('mia123')
      .get('form > .submit-button').click()
      .get('[href="/your-doctors"]').click()
      .url().should('contain', '/your-doctors')
  })

  it('Should display a heading and navigation buttons', () => {
    cy.get('h1').should('contain', 'Your Doctors')
      .get('.doc-card-container > :nth-child(1)')
      .get('.doc-card-container > :nth-child(2)')
      .get('.logo')
      .get('[href="/"]').should('contain', 'Logout')
      .get('[href="/user-dashboard"]').should('contain', 'Dashboard')
      .get('[href="/add-condition"]').should('contain', 'Create New Condition')
  })

  it('Should have 2 doctor cards with each doctors details on them', () => { 
    cy.get('.doc-card-container > :nth-child(1)').should('contain', 'Dr. Jay Garrick')
      .get('.doc-card-container > :nth-child(1) > :nth-child(2)').should('contain', 'Dermatologist')
      .get('.doc-card-container > :nth-child(1) > :nth-child(3)').should('contain', '948.251.3542')
      .get('.doc-card-container > :nth-child(1) > :nth-child(4)').should('contain', 'Suite 931 136 Kuvalis Gardens, Robinchester, MT 93675')

    cy.get('.doc-card-container > :nth-child(2)').should('contain', 'Dr. Bart Allen')
      .get('.doc-card-container > :nth-child(2) > :nth-child(2)').should('contain', 'Endocrinologist')
      .get('.doc-card-container > :nth-child(2) > :nth-child(3)').should('contain', '1-748-749-6811 x38210')
      .get('.doc-card-container > :nth-child(2) > :nth-child(4)').should('contain', '3048 Satterfield Burgs, Paucekstad, RI 70555-5377')
  })

  it('Should take a user back to their dashboard', () => { 
    cy.get('[href="/user-dashboard"]').click()
      .url().should('contain', '/user-dashboard')
  })

  it('Should take a user to create a condition', () => { 
    cy.get('[href="/add-condition"]').click()
      .url().should('contain', '/add-condition')
  })

  it('Should navigate back to the users dashboard with the logo', () => { 
    cy.get('.logo').click()
      .url().should('contain', '/user-dashboard')
  })

})