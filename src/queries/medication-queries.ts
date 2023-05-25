import { gql } from '@apollo/client';

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