import { HealthEventDisplayProps } from '../../../types';

export const HealthEventDisplay = ({event, formatDate,formatEventCategory}: HealthEventDisplayProps) => {
  return (
    <div className='condition-info'>
      <p>Date: {formatDate(event.date)}</p>
      <p>Category: {formatEventCategory(event.category)}</p>
      <p>Note: {event.note}</p>
    </div>
  );
}