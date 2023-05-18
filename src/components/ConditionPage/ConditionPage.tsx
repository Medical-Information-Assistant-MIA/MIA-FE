import './ConditionPage.css'
import { useRouteMatch } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

type MatchParams = {
  id: string;
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
    console.log('condition query', medications)

    const medDisplay = medications.length ? 
      medications.map((med: { name: string,
      datePrescribed: string,
      dosage: string,
      frequency: string,
      prescribedBy: string
    })  =>{
      return (
        <div>
          <p>Medication Name: {med.name}</p>
          <p>Date Prescribed: {med.datePrescribed}</p>
          <p>Dosage: {med.dosage}</p>
          <p>Frequency: {med.prescribedBy}</p>
          <p>Prescribed By: {med.prescribedBy}</p>
        </div>
      )
    }) : <p>No Meds Added</p>

    return (
      <section className='condition-page nav-spacing'>
        <h2>{name}</h2>
        <h3>Medications</h3>
        {medDisplay}
        <h3>Doctors</h3>
        <p>blah</p>
        <h3>Health Events</h3>
        <div 
          className='site-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </section>
    )
  }
  return (
    <></>
  )
}