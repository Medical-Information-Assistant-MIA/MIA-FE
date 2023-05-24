import { useRouteMatch, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CONDITION } from '../../gql-queries';
import { Doctor, HealthEvent, MatchParams, Medication } from '../../types';
import { DateTime } from 'luxon';
import { MedicationDisplay } from './MedicationDisplay/MedicationDisplay';
import { DoctorDisplay } from './DoctorDisplay/DoctorDisplay';
import { HealthEventDisplay } from './HealthNoteDisplay/HealthNoteDisplay';
import { ErrorPage } from '../ErrorPage/ErrorPage';
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
  if (loading) return (<h1 className='nav-spacing loading'>Loading...</h1>);
  if (error) return (<ErrorPage error={error.message}/>);

  const {name, medications, doctors, healthEvents} = data.condition;

  const medDisplay = medications.length ? 
    medications
      .slice(0)
      .sort((a : Medication, b: Medication) => Date.parse(b.datePrescribed) - Date.parse(a.datePrescribed))
      .map((med: Medication) => {
        return (
          <MedicationDisplay key={med.id} med={med} formatDate={formatDate}/>
        );
      }) : (<p className='condition-info'>No Medications Added</p>);

  const docDisplay = doctors.length ? 
    doctors
      .slice(0)
      .sort((a: Doctor, b: Doctor) => Date.parse(b.createdAt) - Date.parse(a.createdAt)) 
      .map((doc: Doctor) => {
        return (
          <DoctorDisplay key={doc.id} doc={doc}/>
        );
      }) : (<p className='condition-info'>No Doctors Added</p>);

  const healthEventDisplay = healthEvents.length ? 
    healthEvents
      .slice(0)
      .sort((a: HealthEvent, b: HealthEvent) => Date.parse(b.date) - Date.parse(a.date))
      .map((event: HealthEvent) => {
        return (
          <HealthEventDisplay key={event.id} event={event} formatDate={formatDate} formatEventCategory={formatEventCategory}/>
        );
      }) : (<p className='condition-info'>No Notes Added</p>);

  return (
    <section className='condition-page nav-spacing'>
      <h1>{name}</h1>
      <h2 className='condition-heading'>Medications</h2>
      <div className='info-block'>
        {medDisplay}
      </div>
      <h2 className='condition-heading'>Doctors</h2>
      <div className='info-block'>
        {docDisplay}
      </div>
      <h2 className='condition-heading'>Health Events</h2>
      <div className='info-block'>
        {healthEventDisplay}
      </div>
      <Link to='/user-dashboard'>
        <button className='nav-btn'>Return To Dashboard</button>
      </Link>
    </section>
  );
}