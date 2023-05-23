import { aliasQuery, aliasMutation } from "../utils/graphql-test-utils"

describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      if(req.body.operationName === 'User') {
        aliasQuery(req, 'User')
        req.reply({
          fixture: 'user-fixture.json'
        })
      } else if (req.body.operationName === 'CreateCondition') {
        aliasMutation(req, 'CreateCondition')
      }
      
    })
    .visit('http://localhost:3000/')
    cy.get('.submit-button').click()
    .get('[type="text"]').type('1')
    .get('[type="password"]').type('mia123')
    .get('.submit-button').click()
    .get('.submit-button').click()
  })

  it('Should add a new condition by title', () => {
    cy.get('input').type('Cold')
    .intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      const { body } = req
      console.log(req)
      if(req.body.operationName === 'CreateCondition') {
        req.alias = 'gqlCreateConditionMutation'
        console.log('create condition')
        req.reply({fixture: 'create-condition-response.json'})
          // (res) => {
          
          // console.log('res', res)
          // res.body = {
          //   "data": {
          //       "createCondition":{
          //         "condition": {
          //           "id": 4,
          //           "name": "Cold"
          //         }
          //       }
          //   }
          // }
        // })
      }
    })
    
    cy.get('form > .submit-button').click()
    .url().should('include', '/add-medication')
  })
})