import './ConditionCard.css'
import { Link } from 'react-router-dom'

type ConditionProps = {
  condition: {
    id: number,
    name: string
  }
}

export const ConditionCard = ({condition}: ConditionProps) => {
  return (
    <Link to={`/conditions/${condition.name}`}>
      <div className='condition-card'>
        <p>{condition.name}</p>
      </div>
    </Link>
  )
}