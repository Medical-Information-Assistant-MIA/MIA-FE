import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import './TitleForm.css';


type TitleFormProps = {
  userId: number
}

export const TitleForm = ({ userId }: TitleFormProps) => {
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
            onChange={e => setConditionName(e.target.value)}/>
        </label>
        <button className='submit-button' >Submit condition</button>
      </form>
    </section>
  )
}