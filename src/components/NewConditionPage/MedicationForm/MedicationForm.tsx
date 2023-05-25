import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_MEDICATION } from '../../../gql-queries';
import { NewMedicationProps } from '../../../types';
import { DateTime } from 'luxon';
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
  const [success, setSuccess] = useState(false);
  
  const handleClick = async () => {
    const formIsDirty = Object.values(medObj).filter(Boolean).length;
    if (formIsDirty) {
      try { 
        const input = {
          conditionId: conditionId,
          name: medObj.name,
          datePrescribed: medObj.datePrescribed,
          dosage: medObj.dosage,
          frequency: medObj.frequency,
          prescribedBy: medObj.prescribedBy
        }
        const data = await mutateFunction({
          variables: { input }
        });
        if (data?.data?.createMedication?.errors?.length) {
          return;
        }
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

  const currentDate = DateTime.now().toISODate() as string;

  const [mutateFunction, {data, loading, error}] = useMutation(CREATE_MEDICATION);
  const mutateErrors = data?.createMedication?.errors;

  if (!conditionId) return (<p>Loading...</p>);

  return (
    <section className='condition-form'>
      <h3>Add New Medications</h3>
      <form className='med-form' onSubmit={async e => {
        e.preventDefault();
        try { 
          const input = {
            conditionId: conditionId,
            name: medObj.name,
            datePrescribed: medObj.datePrescribed,
            dosage: medObj.dosage,
            frequency: medObj.frequency,
            prescribedBy: medObj.prescribedBy
          }
          const data = await mutateFunction({
            variables: { input }
          });
          if (data?.data?.createMedication?.error?.length) {
            return;
          }
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
        setSuccess(true);
        setTimeout(setSuccess, 4000, false);
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
            max={currentDate}
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
        <button className='submit-button' type='submit' >Add Another Medication</button>
      </form>
      <button className='to-next-button' type='button' onClick={handleClick} disabled={loading}>Go to Doctor form</button>
        {loading ? (<p className='util'>Loading...</p>) : null}
        {error ? (<p className='util'>Sorry, there was an error when submitting your form, please try again</p>) : null}
        {mutateErrors?.length ? (<p className='util'>{mutateErrors}</p>) : null}
        {success ? (<p className='util'>Your medication was successfully added, you can now add another one.</p>) : null}
    </section>
  );
}