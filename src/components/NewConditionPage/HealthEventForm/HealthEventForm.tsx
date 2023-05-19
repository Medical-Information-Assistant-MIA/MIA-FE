import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import './HealthEventForm.css'

type NewEventProps = {
  conditionId: number,
}

export const HealthEventForm = ({conditionId}: NewEventProps) => {
  const history = useHistory();
  const [eventObj, setEventObj] = useState({
    category: '',
    date: '',
    note: ''
  })

  const goToDashBoard = () => {
    // if(!Object.values(medObj).length) {
      history.push('/user-dashboard');
    // }
  }

  const CREATE_NOTE = gql `
    mutation {
      createHealthEvent(input: {
        conditionId: ${conditionId},
        note: "${eventObj.note}",
        date: "${eventObj.date}",
        category: "${eventObj.category}"
      }) {
        healthEvent {
          id
          note
          date
          category
        }
        errors
      }
    }
  `

  const [mutateFunction, {data, loading, error}] = useMutation(CREATE_NOTE);
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  console.log(eventObj)
  console.log('data for HE', data)

  return (
    <section>
      <form onSubmit={async e => {
        e.preventDefault()
        await mutateFunction();
        setEventObj({
          category: '',
          date: '',
          note: ''
        })
      }}>
        <h2>Create Event Notes</h2>
        <label>
          Select the event type:
          <select 
            value={eventObj.category} 
            name='category' 
            onChange={e => setEventObj({...eventObj, [e.target.name]: e.target.value })}>
            <option defaultValue='' hidden>Select health event type:</option>
            <option value='symptom'>Symptom</option>
            <option value='doctor-visit'>Doctor's Visit</option>
            <option value='other-note'>Other Note</option>
          </select>
        </label>
        <label>
          Select date:
          <input 
            type='date' 
            value={eventObj.date} 
            name='date' 
            onChange={e => setEventObj({...eventObj, [e.target.name]: e.target.value })} />
        </label>
        <label>
          Describe the event:
          <input 
            value={eventObj.note} 
            type='input' 
            name='note' 
            onChange={e => setEventObj({...eventObj, [e.target.name]: e.target.value })} />
        </label>
        <button>Add New Note</button>
      </form>
      <button onClick={() => goToDashBoard()}>Finish and Return to Dash</button>
    </section>
  )
}