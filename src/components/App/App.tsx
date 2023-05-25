import { Redirect, Route, Switch } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../../queries/user-queries'; 
import { useState } from 'react';
import { HomePage } from '../HomePage/HomePage';
import { NavBar } from '../NavBar/NavBar';
import { LoginPage } from '../LoginPage/LoginPage';
import { UserDashboard } from '../UserDashboard/UserDashboard';
import { ConditionPage } from '../ConditionPage/ConditionPage';
import { NewConditionPage } from '../NewConditionPage/NewConditionPage';
import { DoctorPage } from '../DoctorPage/DoctorPage';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import './App.css';

export const App = () => {
  const [userId, setUserId] = useState(1);

  const { loading, error, data } = useQuery(GET_USERS, {
    variables: { userId }
  });
  if (loading) return (<h1 className='nav-spacing loading'>Loading...</h1>);
  if (error) return (<ErrorPage error={error.message}/>);

  return (
    <main>
      <NavBar />
      <Switch>
        <Route 
        exact path={routes.base} 
        render={() => <HomePage />} 
        />
        <Route 
        exact path={routes.login} 
        render={() => <LoginPage setUserId={setUserId} />} 
        />
        <Route 
        exact path={routes.userDash} 
        render={() => <UserDashboard user={data.user}/>} 
        />
        <Route 
        exact path={routes.doctors} 
        render={() => <DoctorPage user={data.user}/>} 
        />
        <Route 
        exact path={routes.condition} 
        render={({match}) => <ConditionPage key={match.params.id}/>} 
        />
        <Route 
        path={routes.addCondition} 
        render={() => <NewConditionPage userId={userId} />} 
        />
        <Route 
        exact path={routes.error} 
        render={() => <ErrorPage error={'Whoops, This Page does not exist'}/>} 
        />
        <Redirect from='*' to={routes.error}/>
      </Switch>
    </main>
  )
}