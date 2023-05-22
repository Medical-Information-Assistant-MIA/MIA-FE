import { UserDashboard } from '../UserDashboard/UserDashboard';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import { HomePage } from '../HomePage/HomePage';
import { NavBar } from '../NavBar/NavBar';
import { ConditionPage } from '../ConditionPage/ConditionPage';
import { NewConditionPage } from '../NewConditionPage/NewConditionPage';
import { Users } from '../../gql/graphql';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import './App.css';
import { LoginPage } from '../LoginPage/LoginPage';

export const App = () => {
  const [userId, setUserId] = useState(1);
  console.log(userId)

  const GET_USERS = gql`
    query User {
      user(id: ${userId}) {
        id
        name
        conditions {
          id
          name
          createdAt
        } 
      }
    }
  `
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>
  if (error) return <ErrorPage />

  return (
    <main>
      <NavBar />
      <Switch>
        <Route exact path='/' render={() => <HomePage />} />
        <Route exact path='/login' render={() => <LoginPage setUserId={setUserId} />} />
        <Route exact path='/user-dashboard' render={() => <UserDashboard user={data.user}/>} />
        <Route exact path='/conditions/:id' render={({match}) => <ConditionPage key={match.params.id}/>} />
        <Route path='/add-condition' render={() => <NewConditionPage userId={userId} />} />
        <Route exact path='/404' render={() => <ErrorPage /> } />
        <Redirect from='*' to='/404'/>
      </Switch>
    </main>
  )
}