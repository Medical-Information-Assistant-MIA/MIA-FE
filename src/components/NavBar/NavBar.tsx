import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../routes/routes';
import './NavBar.css';

export const NavBar =  () => {
  const location = useLocation();
  const logoRoute = location.pathname !== (routes.login || routes.base) 
    ? 
    (<Link to={routes.userDash}>
      <img 
      className='logo' 
      src={require('../../Mia-logo.png')} 
      alt='Mia: Medical Information Assistant'
      />
    </Link>) 
    : 
    (<Link to={routes.base}>
      <img 
      className='logo' 
      src={require('../../Mia-logo.png')} 
      alt='Mia: Medical Information Assistant' />
    </Link>);
  const showLogin = location.pathname === routes.base;
  const showLogOut = location.pathname !== (routes.base || routes.login);
  const showDashboard = location.pathname !== (routes.base || routes.login || routes.userDash);
  const showDoctors = location.pathname !== (routes.base || routes.doctors || routes.login);
  const showAddCondition = location.pathname === (routes.userDash || routes.doctors);
  
  return (
    <nav className='nav-bar'>
      {logoRoute}
      {showLogin ? (<Link to={routes.login} className='nav-btn btn'>Login</Link>) : null}
      {showLogOut ? (<Link to={routes.base} className='nav-btn btn'>Logout</Link>) : null}
      {showDashboard ? (<Link to={routes.userDash} className='nav-btn btn'>Dashboard</Link>) : null}
      {showDoctors ? (<Link to={routes.doctors} className='nav-btn btn'>Your Doctors</Link>) : null}
      {showAddCondition ? (<Link to='/add-condition' className='nav-btn btn'>Create New Condition</Link>) : null}
    </nav>
  );
}