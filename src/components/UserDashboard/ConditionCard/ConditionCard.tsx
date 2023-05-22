import { Link } from 'react-router-dom';
import { ConditionProps } from '../../../types';
import './ConditionCard.css';

export const ConditionCard = ({condition}: ConditionProps) => {
  return (
    <Link to={`/conditions/${condition.id}`}>
      <div className='condition-card'>
        <p>{condition.name}</p>
        <p>Added on {condition.createdAt}</p>
      </div>
    </Link>
  )
}