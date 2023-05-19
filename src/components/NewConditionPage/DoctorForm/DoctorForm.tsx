import './DoctorForm.css';
import { useState } from 'react';

type NewDoctorProps = {
  conditionId: number,
}

export const DoctorForm = ({conditionId}: NewDoctorProps) => {

  const [doctorInfo, setDoctorInfo] = useState({
    name: '',
    phone: '',
    address: '',
    category: ''
  })
  
  return (
    <section className='add-doctor'>
      <h2>Add a Doctor</h2>
      <form onSubmit={e => {
        e.preventDefault();
        setDoctorInfo({name: '', phone: '', address: '', category: ''})
        console.log(doctorInfo)
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
        <button className='submit-button' type='submit'>Go to health events</button>
      </form>
    </section>
  )
}