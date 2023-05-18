import './ConditionPage.css'
import { useRouteMatch, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

type MatchParams = {
  id: string;
}

type Medication = { 
  name: string,
  datePrescribed: string,
  dosage: string,
  frequency: string,
  prescribedBy: string
}

type Doctor = {
  address: string,
  category: string,
  name: string,
  phone: string
}

type HealthEvent = {
  date: string,
  category: string,
  note: string
}

export const ConditionPage = () => {
  const match = useRouteMatch<MatchParams>('/conditions/:id');
  console.log(match?.params.id)

  const GET_CONDITION = gql`
    query Condition{
      condition(id: ${match?.params.id}) {
          name
          medications {
              name
              datePrescribed
              dosage
              frequency
              prescribedBy
          }  
          doctors {
              name
              phone
              address
              category
          }
          healthEvents {
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
  if(data) {
    const {name, medications, doctors, healthEvents} = data.condition
    console.log('condition query', healthEvents)

    const medDisplay = medications.length ? 
      medications.map((med: Medication) => {
      return (
        <div className='medication'>
          <p>Medication Name: {med.name}</p>
          <p>Date Prescribed: {med.datePrescribed}</p>
          <p>Dosage: {med.dosage}</p>
          <p>Frequency: {med.prescribedBy}</p>
          <p>Prescribed By: {med.prescribedBy}</p>
        </div>
      )
    }) : <p>No Medications Added</p>

    const docDisplay = doctors.length ? 
      doctors.map((doc: Doctor) => {
      return (
        <div className='doctor'>
          <p>{doc.name}</p>
          <p>{doc.category}</p>
          <p>{doc.address}</p>
          <p>{doc.phone}</p>
        </div>
      )
    }) : <p>No Doctors Added</p>

    const healthEventDisplay = healthEvents.length ? 
      healthEvents.map((event: HealthEvent) => {
      return (
        <div className='health-event'>
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
  return (
    <></>
  )
}