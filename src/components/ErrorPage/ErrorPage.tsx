import { Link } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { ErrorProps } from '../../types';
import './ErrorPage.css';

export const ErrorPage = ({error}: ErrorProps) => {
  return (
    <section className='error-page nav-spacing'>
      <h2>{error}</h2>
      <Link to={routes.base} className='submit-button btn'>Return home</Link>
    </section>
  );
}