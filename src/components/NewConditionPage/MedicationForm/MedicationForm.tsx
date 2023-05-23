import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { NewMedicationProps } from '../../../types';
import './MedicationForm.css';

export const MedicationForm = ({conditionId}: NewMedicationProps) => {
  const history = useHistory();
  const [medObj, setMedObj] = useState({
    name : '',
    datePrescribed: '',
    dosage: '',
    frequency: '',
    prescribedBy: ''
  });

  
  const handleClick = async () => {
    const formIsDirty = Object.values(medObj).filter(Boolean).length;
    if (formIsDirty) {
      try { 
        await mutateFunction();
      } catch(error) {
        return;
      }
      setMedObj({
        name : '',
        datePrescribed: '',
        dosage: '',
        frequency: '',
        prescribedBy: ''
      });
    }
    history.push('/add-condition/add-doctor');
  }

  const CREATE_MEDICATION = gql`
    mutation {
      createMedication(input: {
        conditionId: ${conditionId}
        name: "${medObj.name}"
        datePrescribed: "${medObj.datePrescribed}"
        dosage: "${medObj.dosage}"
        frequency: "${medObj.frequency}"
        prescribedBy: "${medObj.prescribedBy}"
      }) {
        medication {
            id
            conditionId
            name
            datePrescribed
            dosage
            frequency
            prescribedBy
        }
      errors
      }
    }
  `;

  const [mutateFunction, {data, loading, error}] = useMutation(CREATE_MEDICATION);
  if (!conditionId) return (<p>Loading...</p>);

  return (
    <section className='condition-form'>
      <h3>Add New Medications</h3>
      <form className='med-form' onSubmit={async e => {
        e.preventDefault();
        try { 
          await mutateFunction();
        } catch(error) {
          return;
        }
        setMedObj({
          name : '',
          datePrescribed: '',
          dosage: '',
          frequency: '',
          prescribedBy: ''
        });
      }}>
        <label className='med-label'>
          What is your medication name?
          <input 
            type='text'
            value={medObj.name} 
            name='name' 
            placeholder='Medication Name'
            onChange={e => setMedObj({...medObj, [e.target.name]: e.target.value })}/>
        </label>
        <label className='med-label'>
          When was this prescribed to you?
          <input 
            type='date'
            value={medObj.datePrescribed}
            name='datePrescribed'
            onChange={e => setMedObj({...medObj, [e.target.name]: e.target.value })}/>
        </label>
        <label className='med-label'>
          What is your your suggested or required Dosage?
          <input 
            type='text' 
            value={medObj.dosage}
            name='dosage' 
            placeholder='Medication Dosage'
            onChange={e => setMedObj({...medObj, [e.target.name]: e.target.value })}/>
        </label>
        <label className='med-label'>
          How often do you take this medication?
          <input 
            type='text' 
            value={medObj.frequency}
            name='frequency' 
            placeholder='Medication Frequency'
            onChange={e => setMedObj({...medObj, [e.target.name]: e.target.value })}/>
        </label>
        <label className='med-label'>
          Who Prescribed this Medication?
          <input 
            type='text' 
            value={medObj.prescribedBy}
            name='prescribedBy' 
            placeholder='Prescribed by'
            onChange={e => setMedObj({...medObj, [e.target.name]: e.target.value })}/>
        </label>
        <button className='submit-button' type='submit' >Add New Medication</button>
      </form>
      <button className='submit-button' type='button' onClick={handleClick} disabled={loading}>Go to Doctor form</button>
        {loading ? <p>Loading...</p> : null}
        {error ? <p>Sorry, there was an error when submitting your form, please try again</p> : null}
    </section>
  );
}