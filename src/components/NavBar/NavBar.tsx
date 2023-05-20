import './NavBar.css';
import { Link } from 'react-router-dom';

export const NavBar =  () => {
  return (
    <nav className='nav-bar'>
      <Link to='/'><h1>Mia</h1></Link>
      <Link to='/login'><button>Login</button></Link>
    </nav>
  );
}