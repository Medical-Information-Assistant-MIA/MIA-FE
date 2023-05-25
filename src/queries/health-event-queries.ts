import { gql } from '@apollo/client';

export const CREATE_NOTE = gql `
  mutation CreateHealthEvent($input: CreateHealthEventInput!) {
    createHealthEvent(input: $input){
      healthEvent {
        id
        note
        date
        category
      }
      errors
    }
  }
`;