import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_CONDITION } from '../../../gql-queries';
import { TitleFormProps } from '../../../types';
import './TitleForm.css';

export const TitleForm = ({ userId, setConditionId }: TitleFormProps) => {
  const [conditionName, setConditionName] = useState('');
  const history = useHistory();

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
  }, [condId, history]);

  return (
    <section className='condition-form'>
      <h3> Add Your Condition</h3>
      <form onSubmit={async e => {
        e.preventDefault();
        try { 
          const input = {
            name: conditionName,
            userId: userId
          }
          await mutateFunction({
            variables: { input }
          });
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
      </form>
      <Link to='/user-dashboard'>
        <button className='nav-btn' type='submit'>Go Back</button>
      </Link>
      {loading ? (<p>Loading...</p>) : null}
      {error ? (<p>Sorry, there was an error when submitting your form, please try again</p>) : null}
    </section>
  );
}