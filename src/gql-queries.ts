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

export const CREATE_MEDICATION = gql`
  mutation CreateMedication($input: CreateMedicationInput!){
    createMedication(input: $input) {
      medication {
        id
        conditionId
        name
        datePrescribed
        dosage
        frequency
        prescribedBy
      }
      errors
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