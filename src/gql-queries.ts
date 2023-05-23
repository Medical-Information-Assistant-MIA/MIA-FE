import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query User($userId: Int!) {
    user(id: $userId) {
      id
      name
      conditions {
        id
        name
        createdAt
      } 
    }
  }
`;

export const GET_CONDITION = gql`
  query Condition($pId: Int!) {
    condition(id: $pId) {
      id
      name
      medications {
        id
        name
        datePrescribed
        dosage
        frequency
        prescribedBy
      }  
      doctors {
        id
        name
        createdAt
        phone
        address
        category
      }
      healthEvents {
        id
        date
        note
        category
      }
    }
  }
`;

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