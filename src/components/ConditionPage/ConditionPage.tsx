import { useRouteMatch, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import './ConditionPage.css';

type MatchParams = {
  id: string;
}

type Medication = {
  id: number, 
  name: string,
  datePrescribed: string,
  dosage: string,
  frequency: string,
  prescribedBy: string
}

type Doctor = {
  id: number,
  createdAt: string,
  address: string,
  category: string,
  name: string,
  phone: string
}

type HealthEvent = {
  id: number,
  date: string,
  category: string,
  note: string
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
  `

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
          <div key={med.id} className='medication'>
            <p>Medication Name: {med.name}</p>
            <p>Date Prescribed: {med.datePrescribed}</p>
            <p>Dosage: {med.dosage}</p>
            <p>Frequency: {med.prescribedBy}</p>
            <p>Prescribed By: {med.prescribedBy}</p>
          </div>
        )
  }) : <p>No Medications Added</p>

  const docDisplay = doctors.length ? 
    doctors
      .slice(0)
      .sort((a: Doctor, b: Doctor) => Date.parse(b.createdAt) - Date.parse(a.createdAt)) 
      .map((doc: Doctor) => {
        return (
          <div key={doc.id} className='doctor'>
            <p>{doc.name}</p>
            <p>{doc.category}</p>
            <p>{doc.address}</p>
            <p>{doc.phone}</p>
          </div>
        )
  }) : <p>No Doctors Added</p>

  const healthEventDisplay = healthEvents.length ? 
    healthEvents
      .slice(0)
      .sort((a: HealthEvent, b: HealthEvent) => Date.parse(b.date) - Date.parse(a.date))
      .map((event: HealthEvent) => {
        return (
          <div key={event.id} className='health-event'>
            <p>{event.date}</p>
            <p>{event.category}</p>
            <p>{event.note}</p>
          </div>
        )
  }) : <p>No Notes Added</p>

  return (
    <section className='condition-page nav-spacing'>
      <h2>{name}</h2>
      <h3>Medications</h3>
      {medDisplay}
      <h3>Doctors</h3>
      <div className='all-doctors'>
        {docDisplay}
      </div>
      <h3>Health Events</h3>
      {healthEventDisplay}
      <Link to='/user-dashboard'>
        <button>To DashBoard</button>
      </Link>
    </section>
  )
}