import { UserDashboard } from '../UserDashboard/UserDashboard';
import { HomePage } from '../HomePage/HomePage';
import { NavBar } from '../NavBar/NavBar';
import './App.css';
import { ConditionPage } from '../ConditionPage/ConditionPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { NewConditionPage } from '../NewConditionPage/NewConditionPage';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { useQuery, gql } from '@apollo/client';

export const App = () => {
  const GET_USERS = gql`
    query User {
      user(id:1) {
        id
        name
        conditions {
            id
            name
        }     
      }
    }
  `

  function DisplayUser() {
    const { loading, error, data } = useQuery(GET_USERS);
    if (loading) return console.log('Loading', loading)
    if (error) return console.log('Error', error);

    return data
  }

  DisplayUser()
  return (
    <main>
      <NavBar />
      <Switch>
        <Route exact path='/' render={() => <HomePage />} />
        <Route exact path='/user-dashboard' render={() => <UserDashboard />} />
        <Route exact path='/conditions/:condition' render={({match}) => <ConditionPage key={match.params.condition}/>} />
        <Route exact path='/add-condition'render={() => <NewConditionPage />} />
        <Route exact path='/404' render={() => <ErrorPage /> } />
        <Redirect from='*' to='/404'/>
      </Switch>
    </main>
  )
}