import { UserDashboard } from '../UserDashboard/UserDashboard';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { HomePage } from '../HomePage/HomePage';
import { NavBar } from '../NavBar/NavBar';
import { ConditionPage } from '../ConditionPage/ConditionPage';
import { NewConditionPage } from '../NewConditionPage/NewConditionPage';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { LoginPage } from '../LoginPage/LoginPage';
import { GET_USERS } from '../../gql-queries';
import './App.css';
import { DoctorPage } from '../DoctorPage/DoctorPage';

export const App = () => {
  const [userId, setUserId] = useState(1);

  const { loading, error, data } = useQuery(GET_USERS, {
    variables: { userId }
  });
  if (loading) return <p>Loading...</p>
  if (error) return <ErrorPage error={error.message}/>

  return (
    <main>
      <NavBar />
      <Switch>
        <Route exact path='/' render={() => <HomePage />} />
        <Route exact path='/login' render={() => <LoginPage setUserId={setUserId} />} />
        <Route exact path='/user-dashboard' render={() => <UserDashboard user={data.user}/>} />
        <Route exact path='/your-doctors' render={() => <DoctorPage user={data.user}/>} />
        <Route exact path='/conditions/:id' render={({match}) => <ConditionPage key={match.params.id}/>} />
        <Route path='/add-condition' render={() => <NewConditionPage userId={userId} />} />
        <Route exact path='/404' render={() => <ErrorPage error={'Whoops, This Page does not exist'}/> } />
        <Redirect from='*' to='/404'/>
      </Switch>
    </main>
  )
}