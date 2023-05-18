import './DoctorForm.css';
import { useState } from 'react';

export const DoctorForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [specialty, setSpecialty] = useState('');

  
  return (
    <section className='add-doctor'>
      <h2>Add a Doctor</h2>
      <form>
          <div>
          <label>
            Add your doctor's name:
            <input 
              type='text'
              value={name}
              name='doctors name'
              placeholder='name'
              onChange={e => setName(e.target.value)}
              />
          </label>
          <label>
            Add your doctor's phone number:
            <input 
              type='text'
              value={phone}
              name='doctors phone number'
              placeholder='phone number'
              onChange={e => setPhone(e.target.value)}
              />
          </label>
          <label>
            Add your doctor's address here:
            <input 
              type='text'
              value={address}
              name='doctors address'
              placeholder='address'
              onChange={e => setAddress(e.target.value)}
              />
          </label>
          <label>
            Add your doctor's specialty:
            <input 
              type='text'
              value={specialty}
              name='doctors specialty'
              placeholder='specialty'
              onChange={e => setSpecialty(e.target.value)}
              />
          </label>
        </div>
        <button className='submit-button' type='submit'>Go to health events</button>
      </form>
    </section>
  )
}