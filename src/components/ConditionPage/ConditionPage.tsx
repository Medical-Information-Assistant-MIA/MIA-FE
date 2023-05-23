import { useRouteMatch, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Doctor, HealthEvent, MatchParams, Medication } from '../../types';
import { DateTime } from 'luxon';
import { GET_CONDITION } from '../../gql-queries';
import { MedicationDisplay } from './MedicationDisplay/MedicationDisplay';
import { DoctorDisplay } from './DoctorDisplay/DoctorDisplay';
import { HealthEventDisplay } from './HealthNoteDisplay/HealthNoteDisplay';
import './ConditionPage.css';

const formatDate = (date: string) => {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
}

const formatEventCategory = (category: string) => {
  return category.split('_').join(' ');
}

export const ConditionPage = () => {
  const match = useRouteMatch<MatchParams>('/conditions/:id');
  const paraId: any = match?.params.id;
  const pId = parseInt(paraId);

  const { loading, error, data } = useQuery(GET_CONDITION, {
    variables: { pId }
  });
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  const {name, medications, doctors, healthEvents} = data.condition

  const medDisplay = medications.length ? 
    medications
      .slice(0)
      .sort((a : Medication, b: Medication) => Date.parse(b.datePrescribed) - Date.parse(a.datePrescribed))
      .map((med: Medication) => {
        return (
          <MedicationDisplay key={med.id} med={med} formatDate={formatDate}/>
        );
      }) : <p>No Medications Added</p>

  const docDisplay = doctors.length ? 
    doctors
      .slice(0)
      .sort((a: Doctor, b: Doctor) => Date.parse(b.createdAt) - Date.parse(a.createdAt)) 
      .map((doc: Doctor) => {
        return (
          <DoctorDisplay key={doc.id} doc={doc}/>
        );
      }) : <p>No Doctors Added</p>

  const healthEventDisplay = healthEvents.length ? 
    healthEvents
      .slice(0)
      .sort((a: HealthEvent, b: HealthEvent) => Date.parse(b.date) - Date.parse(a.date))
      .map((event: HealthEvent) => {
        return (
          <HealthEventDisplay key={event.id} event={event} formatDate={formatDate} formatEventCategory={formatEventCategory}/>
        )
      }) : <p>No Notes Added</p>

  return (
    <section className='condition-page nav-spacing'>
      <h2>{name}</h2>
      <h3 className='condition-heading'>Medications</h3>
      <button className='add-new-button'>
        <span className="material-symbols-outlined">add_circle</span>
      </button>
      <div className='info-block'>
        {medDisplay}
      </div>
      <h3 className='condition-heading'>Doctors</h3>
      <button className='add-new-button'>
        <span className="material-symbols-outlined">add_circle</span>
      </button>
      <div className='info-block'>
        {docDisplay}
      </div>
      <h3 className='condition-heading'>Health Events</h3>
      <button className='add-new-button'>
        <span className="material-symbols-outlined">add_circle</span>
      </button>
      <div className='info-block'>
        {healthEventDisplay}
      </div>
      <Link to='/user-dashboard'>
        <button className='submit-button go-back-btn'>Return To Dashboard</button>
      </Link>
    </section>
  );
}