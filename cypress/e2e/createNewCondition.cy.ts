import { aliasQuery, aliasMutation } from "../utils/graphql-test-utils"

describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      aliasQuery(req, 'User')
      req.reply({
        fixture: 'user-fixture.json'
      })
    })
    .visit('http://localhost:3000/')
    cy.get('.home-page > a > button').click()
    .get('[href="/add-condition"] > button').click()
  })

  it('Should add a new condition by title', () => {
    cy.get('input').type('Cold')
    .intercept('POST', 'https://mia-be.herokuapp.com/graphql', (req) => {
      if(req.body.query.includes('createCondition')) {
        req.reply({"body": {"data": {
          "createCondition": {
            "id": 4,
            "name": "Cold"
          }
        }}})
      }
    })
    .get('.submit-button').click()
  })
})