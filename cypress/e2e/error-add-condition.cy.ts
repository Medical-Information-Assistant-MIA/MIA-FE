import { getInputByLabel } from "../utils/get-input-by-label"
import { aliasQuery, aliasMutation } from "../utils/graphql-test-utils"

describe('Should see errors when errors are present', () => {
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
      }
    })

    .visit('http://localhost:3000/')
    cy.get('a.submit-button').click()
    .get('[type="text"]').type('1')
    .get('[type="password"]').type('mia123')
    cy.get('form > .submit-button').click()
  })

  it('should not navigate past add condition title page without entering a title', () => {
    cy.url().should('contain', 'user-dashboard')
    cy.get('.user-dashboard > [href="/add-condition"]').click()
    .get('h1').should('contain', 'Create a New Condition')
    cy.get('form > .submit-button').click()
    .url().should('not.contain', '/add-medication')
  })

  it('should not navigate past add medication page without entering a name', () => {
    cy.get('.user-dashboard > [href="/add-condition"]').click()
    .get('h1').should('contain', 'Create a New Condition')
    cy.get('[type="text"]').type('Cold')
    cy.get('form > .submit-button').click()
    .url().should('include', '/add-medication')

    cy.get(':nth-child(2) > input').type('2023-05-22')
    .get(':nth-child(4) > input').type('Twice a day')

    .intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
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
    cy.get('.user-dashboard > [href="/add-condition"]').click()
    .get('h1').should('contain', 'Create a New Condition')
    cy.get('[type="text"]').type('Cold')
   
    cy.get('form > .submit-button').click()
    .url().should('include', '/add-medication')
    cy.get(':nth-child(1) > input').type('Dayquil')
    cy.get(':nth-child(2) > input').type('2023-05-22')
    cy.get(':nth-child(4) > input').type('Twice a day')

    cy.intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      if (req.body.operationName === 'CreateMedication') {
        req.alias = 'gqlCreateMedicationQuery'
        req.reply({fixture: 'create-medication-fixture.json'})
      }
    })
    cy.get('[type="button"]').click()

    .url().should('include', '/add-doctor')

    cy.get(':nth-child(2) > input').type('1234')
    .get(':nth-child(3) > input').type('Tardis')
    .get(':nth-child(4) > input').type('Any')

    .intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      if (req.body.operationName === 'CreateDoctor') {
        req.alias = 'gqlCreateDoctorQuery'
        req.reply({fixture: 'create-doctor-500-response.json'})
      }
    })
    .get('[type="button"]').click()
    cy.get('p').should('contain', 'Name can\'t be blank')
    cy.get('form > .submit-button').click()
    cy.get('p').should('contain', 'Name can\'t be blank')

  })

  it('should not navigate past add new health event page without all inputs filled out', () => {
    cy.get('.user-dashboard > [href="/add-condition"]').click()
    .get('h1').should('contain', 'Create a New Condition')
    cy.get('[type="text"]').type('Cold')
    cy.get('form > .submit-button').click()
    .url().should('include', '/add-medication')
    cy.get(':nth-child(1) > input').type('Dayquil')
    cy.get(':nth-child(2) > input').type('2023-05-22')
    cy.get(':nth-child(4) > input').type('Twice a day')

    cy.intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      if(req.body.operationName === 'CreateMedication') {
        req.alias = 'gqlCreateMedicationQuery'
        req.reply({fixture: 'create-medication-fixture.json'})
      }
    })
    cy.get('[type="button"]').click()

    .url().should('include', '/add-doctor')
    cy.get(':nth-child(1) > input').type('Doctor Who')
    cy.get(':nth-child(2) > input').type('1234')
    .get(':nth-child(3) > input').type('Tardis')
    .get(':nth-child(4) > input').type('Any')

    .intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      if(req.body.operationName === 'CreateDoctor') {
        req.alias = 'gqlCreateDoctorQuery'
        req.reply({fixture: 'create-doctor-fixture.json'})
      }
      if (req.body.operationName === 'UserDoctors') {
        req.alias = 'gqlUserDoctorsQuery'
        req.reply({fixture: 'user-doctors.json'})
      }
    })
    .get('[type="button"]').click()
    .url().should('contain', '/add-health-event')

    cy.get('select').select('general_note')
    getInputByLabel('Describe the event').type('Issues with my automated testing')

    cy.intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      if(req.body.operationName === 'CreateHealthEvent') {
        req.alias = 'gqlCreateHealthEventQuery'
        req.reply({fixture: 'create-event-500-response.json'})
      }
    })
    .get('button:contains("Return to Dash")').click()
    cy.url().should('not.contain', '/user-dashboard')
    cy.get('p').should('contain', 'Please fill out all fields')
  })
})