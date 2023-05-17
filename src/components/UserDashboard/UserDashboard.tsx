import { Link } from 'react-router-dom'
import './UserDashboard.css'
import { Users } from '../../gql/graphql'

type DashProps = {
    data: Users
  }

export const UserDashboard = ({data}: DashProps) => {
 console.log('User Dash',data.name)
  return (
    <section className='user-dashboard nav-spacing'>
      <h2>{data.name}'s Dashboard</h2>
      <div 
        className='site-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
      <div>
        <Link to='/conditions/c'><p>Condition Card 1</p></Link>
      </div>
      <Link to='/add-condition'><button>Create New Condition</button></Link>
    </section>
  )
}