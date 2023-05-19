import { DoctorForm } from './DoctorForm/DoctorForm'
import { HealthEventForm } from './HealthEventForm/HealthEventForm'
import { MedicationForm } from './MedicationForm/MedicationForm'
import './NewConditionPage.css'
import { Route, Switch } from 'react-router-dom'
import { TitleForm } from './TitleForm/TitleForm'
import { useState } from 'react'

type NewConditionProps = {
  userId: number,
}

export const NewConditionPage = ({ userId }: NewConditionProps) => {
  const [conditionId, setConditionId] = useState(0)

  console.log('conditionID',conditionId)

  return (
    <section className='nav-spacing'>
      <h2>Create a New Condition</h2>
      <Switch>
        <Route exact path='/add-condition' render={() => <TitleForm userId={userId} setConditionId={setConditionId}/>}/>
        <Route exact path='/add-condition/add-medication' render={() => <MedicationForm conditionId={conditionId}/>}/>
        <Route exact path='/add-condition/add-doctor' render={() => <DoctorForm conditionId={conditionId}/>}/>
        <Route exact path='/add-condition/add-health-event' render={() => <HealthEventForm conditionId={conditionId}/>} />
      </Switch>
    </section>
  )
}