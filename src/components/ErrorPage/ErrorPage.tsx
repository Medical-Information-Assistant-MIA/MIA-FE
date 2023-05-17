import './ErrorPage.css';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <section className='error-page nav-spacing'>
      <h2>whoops, can't find that page</h2>
      <Link to='/user-dashboard'><button>Return home</button></Link>
    </section>
  )
}