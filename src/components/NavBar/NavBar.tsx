import { Link, Route, useLocation } from 'react-router-dom';
import './NavBar.css';

export const NavBar =  () => {
  const location = useLocation();
  const logoRoute = location.pathname !== '/login' && location.pathname !== '/' ? (<Link to='/user-dashboard'><img className='logo' src={require('../../Mia-logo.png')} alt='Mia: Medical Information Assistant' /></Link>) : (<Link to='/'><img className='logo' src={require('../../Mia-logo.png')} alt='Mia: Medical Information Assistant' /></Link>);
  const showLogin = location.pathname === '/';
  const showLogOut = location.pathname !== '/' &&  location.pathname !== '/login' ? (<button className='nav-btn btn'>Logout</button>) : null;
  const showDashboard = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/user-dashboard';
  const showDoctors = location.pathname !== '/' && location.pathname !== '/your-doctors' && location.pathname !== '/login';
  const showAddCondition = location.pathname === '/user-dashboard' || location.pathname === '/your-doctors';
  
  return (
    <nav className='nav-bar'>
      {logoRoute}
      {showLogin ? (<Link to='/login' className='nav-btn btn'>Login</Link>) : null}
      {showLogOut ? (<Link to='/' className='nav-btn btn'>Logout</Link>) : null}
      {showDashboard ? (<Link to='/user-dashboard' className='nav-btn btn'>Dashboard</Link>) : null}
      {showDoctors ? (<Link to='/your-doctors' className='nav-btn btn'>Your Doctors</Link>) : null}
      {showAddCondition ? (<Link to='/add-condition' className='nav-btn btn'>Create New Condition</Link>) : null}
    </nav>
  );
}
