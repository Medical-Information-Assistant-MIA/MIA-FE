import { DoctorForm } from './DoctorForm/DoctorForm'
import { HealthEventForm } from './HealthEventForm/HealthEventForm'
import { MedicationForm } from './MedicationForm/MedicationForm'
import './NewConditionPage.css'
import { TitleForm } from './TitleForm/TitleForm'

export const NewConditionPage = () => {
  return (
    <section>
      <h2>Create a New Condition</h2>
      <TitleForm />
      <MedicationForm />
      <DoctorForm />
      <HealthEventForm />
    </section>
  )
}