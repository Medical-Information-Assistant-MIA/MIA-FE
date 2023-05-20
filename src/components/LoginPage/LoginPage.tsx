import { useState } from 'react'
import './LoginPage.css'
import { useHistory } from 'react-router-dom'

type UserID = {
  setUserId: Function
}

export const LoginPage = ({setUserId}: UserID) =>  {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory()

  return (
    <section className='nav-spacing login'>
      <form onSubmit={ e => {
        e.preventDefault()
        setUserId(username)
        history.push('/user-dashboard')
      }}>
        <input type='text' value={username} name='username' placeholder='username' onChange={(e) => setUsername(e.target.value)} />
        <input type='text' value={password} name='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Login</button>
      </form>
    </section>
  )
}