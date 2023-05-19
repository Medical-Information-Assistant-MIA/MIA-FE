import { DoctorForm } from './DoctorForm/DoctorForm'
import { HealthEventForm } from './HealthEventForm/HealthEventForm'
import { MedicationForm } from './MedicationForm/MedicationForm'
import './NewConditionPage.css'
import { TitleForm } from './TitleForm/TitleForm'

type NewConditionProps = {
  userId: number,
  setConditionId: Function
}

export const NewConditionPage = ({ userId, setConditionId }: NewConditionProps) => {
  return (
    <section className='nav-spacing'>
      <h2>Create a New Condition</h2>
      <TitleForm userId={userId} setConditionId={setConditionId}/>
      <MedicationForm />
      <DoctorForm />
      <HealthEventForm />
    </section>
  )
}