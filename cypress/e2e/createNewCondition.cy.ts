import { aliasQuery, aliasMutation } from "../utils/graphql-test-utils"

describe('New Condition Pages', () => {
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
    cy.get('.home-page > a > .submit-button').click()
    .get('[type="text"]').type('1')
    .get('[type="password"]').type('mia123')
    .get('form > .submit-button').click()
    .get('.user-dashboard > [href="/add-condition"] > .submit-button').click()
  })

  it('Should add a new condition by title', () => {
    cy.get('[type="text"]').type('Cold')
    .get('form > .submit-button').click()
    .url().should('include', '/add-medication')
  })

  it('Should be able to create a new condition', () => {
    cy.get('[type="text"]').type('Cold')
    .intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      const { body } = req
      if(req.body.operationName === 'User') {
        req.alias = 'User'
        req.reply({fixture: 'user-fixture-2.json'})
      }
    })
    
    cy.get('form > .submit-button').click()
    .get(':nth-child(1) > input').type('Dayquil')
    .get(':nth-child(2) > input').type('2023-05-22')
    .get(':nth-child(4) > input').type('Twice a day')
    .intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      const { body } = req
      if(req.body.operationName === 'CreateMedication') {
        req.alias = 'gqlCreateMedicationQuery'
        req.reply({fixture: 'create-medication-fixture.json'})
      }
    })
    .get('.med-form > .submit-button').click()
    .get('[type="button"]').click()
    .url().should('include', '/add-doctor')

    cy.get(':nth-child(1) > input').type('Doctor Who')
    .get(':nth-child(2) > input').type('1234')
    .get(':nth-child(3) > input').type('Tardis')
    .get(':nth-child(4) > input').type('Any')
    .get('form > .submit-button').click()
    .get('[type="button"]').click()
    .url().should('include', '/add-health-event')

    cy.get('select').select('general_note')
    .get(':nth-child(3) > input').type('2023-05-22')
    .get(':nth-child(4) > input').type('Cold started')
    .get('form > .submit-button').click()
    .get('[type="button"]').click()

    cy.url().should('include', '/user-dashboard')
    .get('.condition-cards >').should('have.length', 4)
  })
})