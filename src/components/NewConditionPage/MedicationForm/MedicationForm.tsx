import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import './MedicationForm.css';

export const MedicationForm = () => {
  const [medObj, setMedObj] = useState({
    name : '',
    datePrescribed: '',
    dosage: '',
    frequency: '',
    prescribedBy: ''
  })

  const CREATE_MEDICATION = gql`
    mutation {
      createMedication(input: {
        conditionId: 1
        name: "Acetaminophen"
        datePrescribed: null
        dosage: "1000mg"
        frequency: "as needed for pain"
        prescribedBy: null
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
  `

  return (
    <section className='medication-form nav-spacing'>
      <h3> Add New Medications</h3>
      <form className='med-form' onSubmit={e => {
        e.preventDefault()
        console.log(medObj)
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
        <button className='submit-button' >Add New Medication</button>
        <button className='submit-button' >Go to Doctor form</button>
      </form>
    </section>
  )
}