import './ErrorPage.css';
import { Link } from 'react-router-dom';
import { ErrorProps } from '../../types';

export const ErrorPage = ({error}: ErrorProps) => {
  console.log('error page',error)
  return (
    <section className='error-page nav-spacing'>
      <h2>{error}</h2>
      <Link to='/'><button className='submit-button'>Return home</button></Link>
    </section>
  )
}