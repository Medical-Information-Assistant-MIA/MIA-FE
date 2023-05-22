import { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import './TitleForm.css';

type TitleFormProps = {
  userId: number,
  setConditionId: Function
};

export const TitleForm = ({ userId, setConditionId }: TitleFormProps) => {
  const [conditionName, setConditionName] = useState('');
  const history = useHistory();

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
  `;

  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_CONDITION, {
    refetchQueries: [
      'User'
    ],
  });
  const condId = data?.createCondition.condition.id;

  useEffect(() => {
    setConditionId(condId);
  }, [condId, setConditionId]);

  useEffect(() => {
    if (condId) history.push('/add-condition/add-medication');
  }, [condId]);

  return (
    <section className='condition-form nav-spacing'>
      <h3> Add Your Condition</h3>
      <form className='condition-form' onSubmit={async e => {
        e.preventDefault();
        try { 
          await mutateFunction();
        } catch(error) {
          return;
        }
        setConditionName('');
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
          <button className='submit-button' type='submit'>Submit condition</button>
          {loading ? <p>Loading...</p> : null}
          {error ? <p>Sorry, there was an error when submitting your form, please try again</p> : null}
      </form>
    </section>
  );
}