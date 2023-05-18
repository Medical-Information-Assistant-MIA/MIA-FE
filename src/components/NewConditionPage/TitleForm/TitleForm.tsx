import { useState } from 'react';
import './TitleForm.css';

export const TitleForm = () => {
  const [conditionName, setConditionName] = useState('');

  return (
    <section className='condition-form nav-spacing'>
      <h3> Add Your Condition</h3>
      <form className='condition-form' onSubmit={e => {
        e.preventDefault()
        console.log(conditionName)
      }}>
        <label className='med-label'>
          What is the name of your Condition?
          <input 
            type='text'
            value={conditionName} 
            name='condition name' 
            placeholder='Condition Name'
            onChange={e => setConditionName(e.target.value)}/>
        </label>
        <button className='submit-button' >Submit condition</button>
      </form>
    </section>
  )
}