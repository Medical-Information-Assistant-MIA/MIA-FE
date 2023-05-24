import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

export const NavBar =  () => {
  const location = useLocation();
  const logoRoute = location.pathname !== '/login' && location.pathname !== '/' ? (<Link to='/user-dashboard'><img className='logo' src={require('../../Mia-logo.png')} alt='Mia: Medical Information Assistant' /></Link>) : (<Link to='/'><img className='logo' src={require('../../Mia-logo.png')} alt='Mia: Medical Information Assistant' /></Link>);
  const showLogin = location.pathname === '/' ? (<button className='nav-btn'>Login</button>) : (<button className='hidden'>Login</button>);
  const showLogOut = location.pathname !== '/' &&  location.pathname !== '/login' ? (<button className='nav-btn'>Logout</button>) : (<button className='hidden'>Logout</button>);
  const showDashboard = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/user-dashboard' ? (<button className='nav-btn'>To Dashboard</button>) : (<button className='hidden'>Create New Condition</button>)
  const showDoctors = location.pathname !== '/' && location.pathname !== '/your-doctors' && location.pathname !== '/login' ? (<button className='nav-btn'>Your Doctors</button>) : (<button className='hidden'>Your Doctors</button>);
  const showAddCondition = location.pathname !== '/' && location.pathname !== '/add-condition' && location.pathname !== '/login' ? (<button className='nav-btn got-back-btn'>Create New Condition</button>) : (<button className='hidden'>Create New Condition</button>);

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