import { gql } from '@apollo/client';

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

export const CREATE_CONDITION = gql`
  mutation CreateCondition($input: CreateConditionInput!) {
    createCondition(input: $input) {
      condition {
        id
        name 
      }
    }
  }
`;