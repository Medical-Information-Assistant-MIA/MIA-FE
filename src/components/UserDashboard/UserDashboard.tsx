import { Link } from 'react-router-dom'
import './UserDashboard.css'
import { Users } from '../../gql/graphql'
import { ConditionCard } from './ConditionCard/ConditionCard'

type DashProps = {
    user: Users
  }

export const UserDashboard = ({user}: DashProps) => {
  let conditionCards
  if(user?.conditions?.length) {
    conditionCards = user.conditions
      .slice(0)
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      .map(condition =>
        <ConditionCard key={condition.id} condition={condition}/>)
  }
  return (
    <section className='user-dashboard nav-spacing'>
      <h2>{user.name}'s Dashboard</h2>
      <p>This is your Dashboard! You can see all your current conditions and create new ones from here.</p>
      <Link to='/add-condition'><button className='submit-button create-condition-btn'>Create New Condition</button></Link>
      <div className='condition-cards'>
        {conditionCards}
      </div>
    </section>
  )
}