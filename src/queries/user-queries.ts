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