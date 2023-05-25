import { gql } from '@apollo/client';

export const GET_DOCTORS = gql`
  query UserDoctors($id: Int!){
    userDoctors(userId: $id){
      name
      address
      phone
      category
    }
  }
`;

export const CREATE_DOCTOR = gql`
  mutation CreateDoctor($input: CreateDoctorInput!) {
    createDoctor(input: $input) {
      doctor {
        id
        name
        phone
        address
        category
      }
      errors
    }
  }
`;