import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import './MedicationForm.css';

type NewMedicationProps = {
  conditionId: number
}

export const MedicationForm = ({conditionId}: NewMedicationProps) => {
  const history = useHistory();
  const [medObj, setMedObj] = useState({
    name : '',
    datePrescribed: '',
    dosage: '',
    frequency: '',
    prescribedBy: ''
  });

  const handleClick = () => {
    if (Object.keys(medObj).filter(Boolean).length) {
      mutateFunction();
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
  if (loading || !conditionId) return (<p>Loading...</p>);
  if (error) return (<p>Error: {error.message}</p>);


  return (
    <section className='medication-form nav-spacing'>
      <h3>Add New Medications</h3>
      <form className='med-form' onSubmit={async e => {
        e.preventDefault();
        await mutateFunction();
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
        <button className='f' onClick={handleClick}>Go to Doctor form</button>
    </section>
  );
}