import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { NewEventProps } from '../../../types';
import './HealthEventForm.css';
import { CREATE_NOTE } from '../../../gql-queries';

export const HealthEventForm = ({conditionId}: NewEventProps) => {
  const history = useHistory();
  const [eventObj, setEventObj] = useState({
    category: '',
    date: '',
    note: ''
  });

  const handleClick = async() => {
    const formIsDirty = Object.keys(eventObj).filter(Boolean).length;
    if (formIsDirty) {
      try { 
        await mutateFunction();
      } catch(error) {
        return;
      }
      setEventObj({
        category: '',
        date: '',
        note: ''
      });
    }
    history.push('/user-dashboard');
  }

  // const CREATE_NOTE = gql `
  //   mutation CreateHealthEvent($input: CreateHealthEventInput!) {
  //     createHealthEvent(input: $input) {
  //       healthEvent {
  //         id
  //         note
  //         date
  //         category
  //       }
  //       errors
  //     }
  //   }
  // `;

  const [mutateFunction, {data, loading, error}] = useMutation(CREATE_NOTE);

  // onCompleted instead of async
  // fetchPolicy: "no-cache",

  return (
    <section className='condition-form'>
      <h3>Add a health event</h3>
      <form onSubmit={async e => {
        e.preventDefault()
        // try { 
          const input = {
            conditionId: conditionId,
            note: eventObj.note,
            date: eventObj.date,
            category: eventObj.category
          }
           mutateFunction({
            variables: { input },
          });
        // } catch(error) {
        //   return;
        // }
        setEventObj({
          category: '',
          date: '',
          note: ''
        });
      }}>
        <h2>Create Event Notes</h2>
        <label>
          Select the event type:
          <select 
            value={eventObj.category} 
            name='category' 
            onChange={e => setEventObj({...eventObj, [e.target.name]: e.target.value })}>
            <option disabled value=''>select the event type</option>
            <option value='symptom'>Symptom</option>
            <option value='doctor_visit'>Doctor's Visit</option>
            <option value='general_note'>Other Note</option>
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
        <button className='submit-button'>Add New Note</button>
      </form>
      <button className='submit-button' type='button' onClick={handleClick}>Finish and Return to Dash</button>
      {loading ? <p>Loading...</p> : null}
      {error ? <p>Sorry, there was an error when submitting your form, please try again</p> : null}
    </section>
  );
}
