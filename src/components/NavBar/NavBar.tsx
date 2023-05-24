import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

export const NavBar =  () => {
  const location = useLocation();
  const showLogin = location.pathname === '/' ? <button className='nav-btn go-back-btn'>Login</button> : <button className='nav-btn go-back-btn hidden'>Login</button>
  const showLogOut = location.pathname !== '/' ? <button className='nav-btn go-back-btn'>Logout</button> : <button className='nav-btn go-back-btn hidden'>Logout</button>
  const logoRoute = location.pathname !== '/login' && location.pathname !== '/' ? <Link to='/user-dashboard'><img className='logo' src={require('../../Mia-logo.png')} alt='Mia: Medical Information Assistant' /></Link> : <Link to='/'><img className='logo' src={require('../../Mia-logo.png')} alt='Mia: Medical Information Assistant' /></Link>
  const showDoctors = location.pathname !== '/' && location.pathname !== '/your-doctors' && location.pathname !== '/login' ? <button className='nav-btn go-back-btn'>Your Doctors</button> : <button className='nav-btn go-back-btn hidden'>Your Doctors</button>
  const showAddCondition = location.pathname !== '/' && location.pathname !== '/add-condition' && location.pathname !== '/login' ? <button className='submit-button create-condition-btn'>Create New Condition</button> : <button className='submit-button create-condition-btn hidden'>Create New Condition</button> 
  
  return (
    <nav className='nav-bar'>
      {logoRoute}
      <Link to='/login'>{showLogin}</Link>
      <Link to='/'>{showLogOut}</Link>
      <Link to='/your-doctors'>{showDoctors}</Link>
      <Link to='/add-condition'>{showAddCondition}</Link>
    </nav>
  );
}