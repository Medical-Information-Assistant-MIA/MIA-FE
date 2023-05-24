import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserID } from '../../types';
import './LoginPage.css';

export const LoginPage = ({setUserId}: UserID) =>  {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const history = useHistory();

  const checkLogin= () => {
    if((username === '1' || username === '2') && password === 'mia123') {
      const id = parseInt(username);
      setUserId(id);
      history.push('/user-dashboard');
    } else {
      setError(true);
    }
  }

  return (
    <div className='nav-spacing login-page'>
      <section className='login'>
        <form onSubmit={ e => {
          e.preventDefault();
          checkLogin();
        }}>
          <h1>Please Log In</h1>
          <input type='text' value={username} name='username' placeholder='username' required onChange={(e) => setUsername(e.target.value)} />
          <input type='password' value={password} name='password' placeholder='password' required onChange={(e) => setPassword(e.target.value)} />
          <button type='submit' className='submit-button'>Login</button>
        </form>
        <Link to='/'><button className='nav-btn'>Exit</button></Link>
        {error ? (<p>Incorrect login, please try again.</p>) : null}
      </section>
    </div>
  );
}