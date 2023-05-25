import { Link } from 'react-router-dom';
import { DashboardProps } from '../../types';
import { ConditionCard } from './ConditionCard/ConditionCard';
import './UserDashboard.css';

export const UserDashboard = ({user}: DashboardProps) => {
  let conditionCards;
  
  if(user?.conditions?.length) {
    conditionCards = user.conditions
      .slice(0)
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      .map(condition =>
        <ConditionCard key={condition.id} condition={condition}/>);
  }

  return (
    <section className='user-dashboard nav-spacing'>
      <h1>{user.name}'s Dashboard</h1>
      <p>This is your Dashboard! You can see all your current conditions and create new ones from here.</p>
      <Link to='/add-condition' className='submit-button create-condition-btn btn'>Create New Condition</Link>
      <div className='condition-cards'>
        {conditionCards}
      </div>
    </section>
  );
}