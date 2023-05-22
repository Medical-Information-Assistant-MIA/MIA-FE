import { useRouteMatch, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Doctor, HealthEvent, MatchParams, Medication } from '../../types';
import { DateTime } from 'luxon';
import './ConditionPage.css';

const formatDate = (date: string) => {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
}

export const ConditionPage = () => {
  const match = useRouteMatch<MatchParams>('/conditions/:id');

  const GET_CONDITION = gql`
    query Condition {
      condition(id: ${match?.params.id}) {
        id
        name
        medications {
          id
          name
          datePrescribed
          dosage
          frequency
          prescribedBy
        }  
        doctors {
          id
          name
          createdAt
          phone
          address
          category
        }
        healthEvents {
          id
          date
          note
          category
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_CONDITION);
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  const {name, medications, doctors, healthEvents} = data.condition

  const medDisplay = medications.length ? 
    medications
      .slice(0)
      .sort((a : Medication, b: Medication) => Date.parse(b.datePrescribed) - Date.parse(a.datePrescribed))
      .map((med: Medication) => {
        return (
          <div key={med.id} className='condition-info'>
            <p>Medication Name: {med.name}</p>
            <p>Date Prescribed: {formatDate(med.datePrescribed)}</p>
            <p>Dosage: {med.dosage}</p>
            <p>Frequency: {med.frequency}</p>
            <p>Prescribed By: {med.prescribedBy}</p>
          </div>
        );
  }) : <p>No Medications Added</p>

  const docDisplay = doctors.length ? 
    doctors
      .slice(0)
      .sort((a: Doctor, b: Doctor) => Date.parse(b.createdAt) - Date.parse(a.createdAt)) 
      .map((doc: Doctor) => {
        return (
          <div key={doc.id} className='condition-info'>
            <p>{doc.name}</p>
            <p>{doc.category}</p>
            <p>{doc.address}</p>
            <p>{doc.phone}</p>
          </div>
        );
  }) : <p>No Doctors Added</p>

  const formatEventCategory = (category: string) => {
    return category.split('_').join(' ');
  }

  const healthEventDisplay = healthEvents.length ? 
    healthEvents
      .slice(0)
      .sort((a: HealthEvent, b: HealthEvent) => Date.parse(b.date) - Date.parse(a.date))
      .map((event: HealthEvent) => {
        return (
          <div key={event.id} className='condition-info'>
            <p>Date: {formatDate(event.date)}</p>
            <p>Category: {formatEventCategory(event.category)}</p>
            <p>Note: {event.note}</p>
          </div>
        )
  }) : <p>No Notes Added</p>

  return (
    <section className='condition-page nav-spacing'>
      <h2>{name}</h2>
      <h3 className='condition-heading'>Medications</h3>
      <div className='info-block'>
        {medDisplay}
      </div>
      <h3 className='condition-heading'>Doctors</h3>
      <div className='info-block'>
        {docDisplay}
      </div>
      <h3 className='condition-heading'>Health Events</h3>
      <div className='info-block'>
        {healthEventDisplay}
      </div>
      <Link to='/user-dashboard'>
        <button className='submit-button go-back-btn'>Return To Dashnoard</button>
      </Link>
    </section>
  );
}