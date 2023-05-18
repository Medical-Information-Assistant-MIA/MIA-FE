import { UserDashboard } from '../UserDashboard/UserDashboard';
import { HomePage } from '../HomePage/HomePage';
import { NavBar } from '../NavBar/NavBar';
import './App.css';
import { ConditionPage } from '../ConditionPage/ConditionPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { NewConditionPage } from '../NewConditionPage/NewConditionPage';
import { MedicationForm } from '../NewConditionPage/MedicationForm/MedicationForm';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import { Users } from '../../gql/graphql';

export const App = () => {
  const [userId, setUserId] = useState(1);

  const GET_USERS = gql`
    query User {
      user(id: ${userId}) {
        id
        name
        conditions {
          id
          name
        } 
      }
    }
  `
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) console.log(loading, 'loading')
  if (error) console.log(error, 'error')
  console.log(data)


  return (
    <main>
      <NavBar />
      <Switch>
        <Route exact path='/' render={() => <HomePage />} />
        <Route exact path='/user-dashboard' render={() => <UserDashboard user={data.user}/>} />
        <Route exact path='/conditions/:id' render={({match}) => <ConditionPage key={match.params.id}/>} />
        <Route exact path='/add-condition'render={() => <NewConditionPage userId={userId}/>} />
        <Route exact path='/add-condition/add-medication' render={() => <MedicationForm />}/>
        <Route exact path='/404' render={() => <ErrorPage /> } />
        <Redirect from='*' to='/404'/>
      </Switch>
    </main>
  )
}