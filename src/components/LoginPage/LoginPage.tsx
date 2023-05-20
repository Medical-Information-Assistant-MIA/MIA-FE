import { useState } from 'react'
import './LoginPage.css'
import { useHistory } from 'react-router-dom'

type UserID = {
  setUserId: Function
}

export const LoginPage = ({setUserId}: UserID) =>  {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)
  const history = useHistory()

  const checkLogin= () => {
    if((username === '1' || username === '2') && password === 'mia123') {
      setUserId(username)
      history.push('/user-dashboard')
    } else {
      setError(true)
    }
  }

  return (
    <section className='nav-spacing login'>
      <form onSubmit={ e => {
        e.preventDefault()
        checkLogin()
      }}>
        <input type='text' value={username} name='username' placeholder='username' required onChange={(e) => setUsername(e.target.value)} />
        <input type='password' value={password} name='password' placeholder='password' required onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Login</button>
      </form>
      {error ? <p>Incorrect login, please try again.</p> : null}
    </section>
  )
}