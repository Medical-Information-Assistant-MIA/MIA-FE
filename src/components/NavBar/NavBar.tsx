import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

export const NavBar =  () => {
  const location = useLocation();
  const logoRoute = location.pathname !== '/login' && location.pathname !== '/' ? (<Link to='/user-dashboard'><img className='logo' src={require('../../Mia-logo.png')} alt='Mia: Medical Information Assistant' /></Link>) : (<Link to='/'><img className='logo' src={require('../../Mia-logo.png')} alt='Mia: Medical Information Assistant' /></Link>);
  const showLogin = location.pathname === '/' ? (<button className='nav-btn'>Login</button>) : null;
  const showLogOut = location.pathname !== '/' &&  location.pathname !== '/login' ? (<button className='nav-btn'>Logout</button>) : null;
  const showDashboard = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/user-dashboard' ? (<button className='nav-btn'>Dashboard</button>) : null;
  const showDoctors = location.pathname !== '/' && location.pathname !== '/your-doctors' && location.pathname !== '/login' ? (<button className='nav-btn'>Your Doctors</button>) : null;
  const showAddCondition = location.pathname === '/user-dashboard' || location.pathname === '/your-doctors' ? (<button className='nav-btn got-back-btn'>Create New Condition</button>) : null;

  return (
    <nav className='nav-bar'>
      {logoRoute}
      <Link to='/login'>{showLogin}</Link>
      <Link to='/'>{showLogOut}</Link>
      <Link to='/user-dashboard'>{showDashboard}</Link>
      <Link to='/your-doctors'>{showDoctors}</Link>
      <Link to='/add-condition'>{showAddCondition}</Link>
    </nav>
  );
}