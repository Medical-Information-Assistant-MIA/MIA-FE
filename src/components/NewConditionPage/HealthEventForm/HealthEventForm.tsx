import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { NewEventProps } from '../../../types';
import './HealthEventForm.css';
import { CREATE_NOTE } from '../../../gql-queries';
import { DateTime } from 'luxon';

export const HealthEventForm = ({conditionId}: NewEventProps) => {
  const history = useHistory();
  const [eventObj, setEventObj] = useState({
    category: '',
    date: '',
    note: ''
  });
  const [success, setSuccess] = useState(false);

  const handleClick = async() => {
    const formIsDirty = Object.values(eventObj).filter(Boolean).length > 0;
    if (formIsDirty) {
      try { 
        const input = {
          conditionId: conditionId,
          note: eventObj.note,
          date: eventObj.date,
          category: eventObj.category
        }
        const data = await mutateFunction({
          variables: { input },
        })
        if (data?.data?.createHealthEvent.errors.length) {
          return;
        }
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

  const currentDate = DateTime.now().toISODate() as string
  const [mutateFunction, {data, loading, error}] = useMutation(CREATE_NOTE);
  const mutateErrors = data?.createHealthEvent.errors;
  
  return (
    <section className='condition-form'>
      <h3>Add a health event</h3>
      <form onSubmit={async e => {
        e.preventDefault();
        try { 
          const input = {
            conditionId: conditionId,
            note: eventObj.note,
            date: eventObj.date,
            category: eventObj.category
          }
          const data = await mutateFunction({
            variables: { input },
          });
          if (data?.data?.createHealthEvent.errors.length) {
            return;
          }
        } catch(error) {
          return;
        }
        setEventObj({
          category: '',
          date: '',
          note: ''
        });
        setSuccess(true);
        setTimeout(setSuccess, 4000, false);
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
            max={currentDate}
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
        <button className='submit-button'>Add Another Note</button>
      </form>
      <button className='submit-button' type='button' onClick={handleClick} disabled={loading}>Finish and Return to Dash</button>
      {loading ? <p>Loading...</p> : null}
      {error ? <p>Sorry, there was an error when submitting your form, please try again</p> : null}
      {mutateErrors?.length ? <p>Please fill out all fields</p> : null}
      {success ? <p>Your health event was successfully added, you can now add another one.</p> : null}
    </section>
  );
}
