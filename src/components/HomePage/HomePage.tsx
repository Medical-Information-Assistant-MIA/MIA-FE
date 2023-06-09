import { Link } from 'react-router-dom';
import { routes } from '../../routes/routes';
import './HomePage.css';

export const HomePage = () => {
    return (
      <section className='home-page nav-spacing'>
        <div className='headers'>
          <h1>Introducing Mia</h1>
          <h2>Your All-in-One Medical Information Assistant</h2>
        </div>
        <div className='site-description'>
          <p>Mia simplifies your healthcare journey by consolidating all your vital medical information in one place. Keep track of conditions, medications, doctors, and health events effortlessly. Access a centralized doctor directory. Maintain a personal health log to record important events and notes. Take control of your health with Mia.</p>
        </div>
        <Link to={routes.login} className='submit-button btn'>Login</Link>
      </section>
    );
}