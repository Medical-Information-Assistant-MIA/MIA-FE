import { DoctorForm } from './DoctorForm/DoctorForm';
import { HealthEventForm } from './HealthEventForm/HealthEventForm';
import { MedicationForm } from './MedicationForm/MedicationForm';
import { Route, Switch } from 'react-router-dom';
import { TitleForm } from './TitleForm/TitleForm';
import { useState } from 'react';
import { NewConditionProps } from '../../types';
import './NewConditionPage.css';


export const NewConditionPage = ({ userId }: NewConditionProps) => {
  const [conditionId, setConditionId] = useState(0)

  return (
    <section className='create-condition nav-spacing'>
      <h2>Create a New Condition</h2>
      <Switch>
        <Route exact path='/add-condition' render={() => <TitleForm userId={userId} setConditionId={setConditionId}/>}/>
        <Route exact path='/add-condition/add-medication' render={() => <MedicationForm conditionId={conditionId}/>}/>
        <Route exact path='/add-condition/add-doctor' render={() => <DoctorForm conditionId={conditionId} userId={userId}/>}/>
        <Route exact path='/add-condition/add-health-event' render={() => <HealthEventForm conditionId={conditionId}/>} />
      </Switch>
    </section>
  )
}