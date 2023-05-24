import { Link } from 'react-router-dom';
import { ErrorProps } from '../../types';
import './ErrorPage.css';

export const ErrorPage = ({error}: ErrorProps) => {
  return (
    <section className='error-page nav-spacing'>
      <h2>{error}</h2>
      <Link to='/'><button className='submit-button'>Return home</button></Link>
    </section>
  );
}