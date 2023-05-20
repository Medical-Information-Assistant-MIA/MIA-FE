import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import './DoctorForm.css';

type NewDoctorProps = {
  conditionId: number
}

export const DoctorForm = ({conditionId}: NewDoctorProps) => {
  const history = useHistory();
  const [doctorInfo, setDoctorInfo] = useState({
    name: '',
    phone: '',
    address: '',
    category: ''
  });


  const handleClick = () => {
    if (Object.keys(doctorInfo).filter(Boolean).length) {
      mutateFunction();
      setDoctorInfo({name: '',
      phone: '',
      address: '',
      category: ''
      });
    }
    history.push('/add-condition/add-health-event');
  }

  const CREATE_DOCTOR = gql`
    mutation {
      createDoctor(input:{
        name: "${doctorInfo.name}",
        conditionId: ${conditionId},
        phone: "${doctorInfo.phone}",
        address: "${doctorInfo.address}",
        category: "${doctorInfo.category}"
      }) {
        doctor {
          id
          name
          phone
          address
          category
        }
        errors
      }
    }
  `;

  const [mutateFunction, {data, loading, error}] = useMutation(CREATE_DOCTOR);
  if (loading) return (<p>Loading...</p>);
  if (error) return (<p>Error: {error.message}</p>);
  
  return (
    <section className='add-doctor'>
      <h2>Add a Doctor</h2>
      <form onSubmit={async e => {
        e.preventDefault();
        await mutateFunction();
        setDoctorInfo({name: '', phone: '', address: '', category: ''});
      }}>
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
      <button className='submit-button' onClick={handleClick}>Go to health events</button>
    </section>
  );
}