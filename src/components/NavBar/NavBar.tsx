import './NavBar.css';
import { Link } from 'react-router-dom';

export const NavBar =  () => {
  return (
    <nav className='nav-bar'>
      <Link to='/'><h1>Mia</h1></Link>
      <button>Login</button>
    </nav>
  );
}