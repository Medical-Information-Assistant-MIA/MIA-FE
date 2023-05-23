import { MedicationDisplayProps } from '../../../types';

export const MedicationDisplay = ({med, formatDate}: MedicationDisplayProps) => {
  return (
    <div className='condition-info'>
      <p>Medication Name: {med.name}</p>
      <p>Date Prescribed: {formatDate(med.datePrescribed)}</p>
      <p>Dosage: {med.dosage}</p>
      <p>Frequency: {med.frequency}</p>
      <p>Prescribed By: {med.prescribedBy}</p>
    </div>
  )
}