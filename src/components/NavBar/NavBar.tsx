import './NavBar.css';
import { Link } from 'react-router-dom';


export const NavBar =  () => {
  return (
    <nav className='nav-bar'>
      <Link to='/'><img className='logo' src={require('../../Mia-logo.png')} alt='Mia: Medical Information Assistant' /></Link>
      <Link to='/login'><button className='nav-btn'>Login</button></Link>
    </nav>
  );
}