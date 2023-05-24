import { aliasQuery, aliasMutation } from "../utils/graphql-test-utils"

describe('Should not be able to add a condition without a title', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      if(req.body.operationName === 'User') {
        aliasQuery(req, 'User')
        req.reply({
          fixture: 'user-fixture.json'
        })
      } else if (req.body.operationName === 'CreateCondition') {
        aliasMutation(req, 'CreateCondition')
        req.reply({fixture: 'create-condition-response.json'})
      } else if (req.body.operationName === 'CreateMedication') {
        aliasMutation(req, 'CreateMedication')
      } else if (req.body.operationName === 'CreateDoctor') {
        aliasMutation(req, 'CreateDoctor')
        req.reply({fixture: 'create-doctor-fixture.json'})
      } else if (req.body.operationName === 'CreateHealthEvent') {
        aliasMutation(req, 'CreateHealthEvent')
        req.reply({fixture: 'create-event-fixture.json'})
      }
    })

    .visit('https://mia-fe.vercel.app/')
    cy.get('.submit-button').click()
    .get('[type="text"]').type('1')
    .get('[type="password"]').type('mia123')
    .get('.submit-button').click()
  })

  it('should not navigate past add condition title page without entering a title', () => {
    cy.url().should('contain', 'user-dashboard')
    cy.get('[href="/add-condition"] > button').click()
    .get('h2').should('contain', 'Create a New Condition')
    cy.get('form > .submit-button').click()
    .url().should('not.contain', '/add-medication')
  })

  it('should not navigate past add medication page without entering a name', () => {
    cy.get('[href="/add-condition"] > button').click()
    .get('h2').should('contain', 'Create a New Condition')
    cy.get('[type="text"]').type('Cold')
    cy.get('form > .submit-button').click()
    .url().should('include', '/add-medication')

    cy.get(':nth-child(2) > input').type('2023-05-22')
    .get(':nth-child(4) > input').type('Twice a day')

    .intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      const { body } = req
      if(req.body.operationName === 'CreateMedication') {
        req.alias = 'gqlCreateMedicationQuery'
        req.reply({fixture: 'create-medication-500-response.json'})
      }
    })
    cy.get('[type="button"]').click()

    .url().should('include', '/add-medication')
    cy.get('p').should('contain', 'Name can\'t be blank')

    cy.get('.med-form > .submit-button').click()
    .url().should('include', '/add-medication')
    cy.get('p').should('contain', 'Name can\'t be blank')
  })

  it('should not navigate past add doctor page without entering a name', () => {
    cy.get('[href="/add-condition"] > button').click()
    .get('h2').should('contain', 'Create a New Condition')
    cy.get('[type="text"]').type('Cold')
   
    cy.get('form > .submit-button').click()
    .url().should('include', '/add-medication')
    cy.get(':nth-child(1) > input').type('Dayquil')
    cy.get(':nth-child(2) > input').type('2023-05-22')
    cy.get(':nth-child(4) > input').type('Twice a day')

    cy.intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      const { body } = req
      if(req.body.operationName === 'CreateMediciation') {
        req.alias = 'gqlCreateMediciationQuery'
        req.reply({fixture: 'create-medication-response.json'})
      }
    })
    cy.get('[type="button"]').click()

    .url().should('include', '/add-doctor')
  })
})