import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { ConditionProps } from '../../../types';
import './ConditionCard.css';

const formatDate = (date: string) => {
  return DateTime.fromSQL(date).toLocaleString(DateTime.DATE_MED);
}


export const ConditionCard = ({condition}: ConditionProps) => {
  return (
    <Link to={`/conditions/${condition.id}`}>
      <div className='condition-card'>
        <p>{condition.name}</p>
        <p>Added on {formatDate(condition.createdAt)}</p>
      </div>
    </Link>
  )
}