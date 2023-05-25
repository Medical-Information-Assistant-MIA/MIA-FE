import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { GET_DOCTORS, CREATE_DOCTOR } from '../../../queries/doctor-queries';
import { NewDoctorProps } from '../../../types';
import './DoctorForm.css';



export const DoctorForm = ({conditionId , userId}: NewDoctorProps) => {
  const history = useHistory();
  const id = userId;
  const [doctorInfo, setDoctorInfo] = useState({
    name: '',
    phone: '',
    address: '',
    category: ''
  });
  const [success, setSuccess] = useState(false);

  const handleClick = async () => {
    const formIsDirty = Object.values(doctorInfo).filter(Boolean).length;
    if (formIsDirty) {
      try { 
        const input = {
          name: doctorInfo.name,
          conditionId: conditionId,
          phone: doctorInfo.phone,
          address: doctorInfo.address,
          category: doctorInfo.category
        }
        const data = await mutateFunction({
          variables: { input }
        });
        if (data?.data?.createDoctor?.errors?.length) {
          return;
        }
      } catch(error) {
        return;
      }
      setDoctorInfo({name: '',
        phone: '',
        address: '',
        category: ''
      });
    }
    history.push('/add-condition/add-health-event');
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try { 
      const input = {
        name: doctorInfo.name,
        conditionId: conditionId,
        phone: doctorInfo.phone,
        address: doctorInfo.address,
        category: doctorInfo.category
      }
      const data = await mutateFunction({
        variables: { input }
      });
      if (data?.data?.createDoctor?.errors?.length) {
        return;
      }
    } catch(error) {
      return;
    }
    setDoctorInfo({
      name: '',
      phone: '',
      address: '',
      category: ''
    });
    setSuccess(true);
    setTimeout(setSuccess, 4000, false);
  }

  const [mutateFunction, {data, loading, error}] = useMutation(CREATE_DOCTOR, {
    refetchQueries: [
      {
        query: GET_DOCTORS,
        variables: { id }
      },
    ],
  });
  const mutateErrors = data?.createDoctor?.errors;

  return (
    <section className='condition-form'>
      <h2>Add a Doctor</h2>
      <form onSubmit={e => {handleSubmit(e)}}>
        <div>
          <label>
            What is your doctor's name?
            <input 
              type='text'
              value={doctorInfo.name}
              name='name'
              placeholder='name'
              onChange={e => setDoctorInfo({...doctorInfo, [e.target.name]: e.target.value})}
              />
          </label>
          <label>
            What is your doctor's phone number?
            <input 
              type='text'
              value={doctorInfo.phone}
              name='phone'
              placeholder='phone number'
              onChange={e => setDoctorInfo({...doctorInfo, [e.target.name]: e.target.value})}
              />
          </label>
          <label>
            What is your doctor's address?
            <input 
              type='text'
              value={doctorInfo.address}
              name='address'
              placeholder='address'
              onChange={e => setDoctorInfo({...doctorInfo, [e.target.name]: e.target.value})}
              />
          </label>
          <label>
            What kind of doctor are they?
            <input 
              type='text'
              value={doctorInfo.category}
              name='category'
              placeholder='specialty'
              onChange={e => setDoctorInfo({...doctorInfo, [e.target.name]: e.target.value})}
              />
          </label>
        </div>
        <button className='submit-button' type='submit'>Add Another Doctor</button>
      </form>
      <button className='to-next-button' type='button' onClick={handleClick} disabled={loading}>Go to health events</button>
      {loading ? (<p>Loading...</p>) : null}
      {error ? (<p>Sorry, there was an error when submitting your form, please try again</p>) : null}
      {mutateErrors?.length ? (<p>{mutateErrors}</p>) : null}
      {success ? (<p>Your doctor was successfully added, you can now add another one.</p>) : null}
    </section>
  );
}