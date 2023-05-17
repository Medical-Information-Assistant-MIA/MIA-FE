import { Link } from 'react-router-dom'
import './HomePage.css'
import { useQuery, gql } from '@apollo/client';
import { useState, useEffect } from 'react';
import { Users } from '../../gql/graphql';
// import { Users } from '../../gql/graphql'
// type HomeProps = {
//   display: string | Users
// }
export const HomePage = () => {
  const [user, setUser] = useState({});

  const GET_USERS = gql`
  query User {
    user(id:1) {
      id
      name    
    }
  }
`

function DisplayUser() {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) console.log(loading, 'loading')
  if (error) console.log(error, 'error')
  console.log(data)
  return data
}
// useEffect(() => )

  return (
    <section className='home-page nav-spacing'>
      <h2>Welcome to Mia <span className='small-title'>(Medical Information Assistant)</span></h2>
      <div 
        className='site-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
      <Link to='/user-dashboard'><button>To Dashboard</button></Link>
    </section>
  )
}