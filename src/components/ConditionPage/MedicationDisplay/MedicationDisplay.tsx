import { MedicationDisplayProps } from '../../../types';

export const MedicationDisplay = ({med, formatDate}: MedicationDisplayProps) => {
  return (
    <div className='condition-info'>
      <p>Medication Name: {med.name}</p>
      {med.datePrescribed ? <p>Date Prescribed: {formatDate(med.datePrescribed)}</p> : null}
      {med.dosage ? <p>Dosage: {med.dosage}</p> : null}
      {med.frequency ? <p>Frequency: {med.frequency}</p>: null}
      {med.prescribedBy ? <p>Prescribed By: {med.prescribedBy}</p> : null}
    </div>
  )
}