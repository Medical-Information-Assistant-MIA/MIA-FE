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
      <div 
        className='site-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
      <div className='condition-cards'>
        {conditionCards}
      </div>
      <Link to='/add-condition'><button>Create New Condition</button></Link>
    </section>
  )
}