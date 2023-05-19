import { DoctorForm } from './DoctorForm/DoctorForm'
import { HealthEventForm } from './HealthEventForm/HealthEventForm'
import { MedicationForm } from './MedicationForm/MedicationForm'
import './NewConditionPage.css'
import { Route, Switch } from 'react-router-dom'
import { TitleForm } from './TitleForm/TitleForm'

type NewConditionProps = {
  userId: number,
  setConditionId: Function
}

export const NewConditionPage = ({ userId, setConditionId }: NewConditionProps) => {
  return (
    <section className='nav-spacing'>
      <h2>Create a New Condition</h2>
      <Switch>
        <Route exact path='/add-condition' render={() => <TitleForm userId={userId} setConditionId={setConditionId}/>}/>
        <Route exact path='/add-condition/add-medication' render={() => <MedicationForm />}/>
        <Route exact path='/add-condition/add-doctor' render={() => <DoctorForm />}/>
        {/* <HealthEventForm /> */}
      </Switch>
    </section>
  )
}