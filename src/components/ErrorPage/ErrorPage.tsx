import { Link } from 'react-router-dom';
import { ErrorProps } from '../../types';
import './ErrorPage.css';

export const ErrorPage = ({error}: ErrorProps) => {
  return (
    <section className='error-page nav-spacing'>
      <h2>{error}</h2>
      <Link to='/' className='submit-button btn'>Return home</Link>
    </section>
  );
}