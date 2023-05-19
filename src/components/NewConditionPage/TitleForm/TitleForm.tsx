import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import './TitleForm.css';


type TitleFormProps = {
  userId: number,
  setConditionId: Function
}


export const TitleForm = ({ userId, setConditionId }: TitleFormProps) => {
  const [conditionName, setConditionName] = useState('');

  const CREATE_CONDITION = gql`
  mutation {
    createCondition(input: {
      name: "${conditionName}"
      userId: ${userId}
    }) {
      condition {
        id
        name 
      }
    }
  }
  `
  
  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_CONDITION)
  if (loading) console.log(loading, 'loading')
  if (error) console.log(error, 'error')

  console.log(data)

  return (
    <section className='condition-form nav-spacing'>
      <h3> Add Your Condition</h3>
      <form className='condition-form' onSubmit={e => {
        e.preventDefault()
        console.log(conditionName)
        setConditionName('')
        mutateFunction()
      }}>
        <label className='med-label'>
          What is the name of your Condition?
          <input 
            type='text'
            value={conditionName} 
            name='condition name' 
            placeholder='Condition Name'
            required
            onChange={e => setConditionName(e.target.value)}/>
        </label>
        <Link to='/add-condition/add-medication'>
          <button className='submit-button' >Submit condition</button>
        </Link>
      </form>
    </section>
  )
}