import { UserDashboard } from '../UserDashboard/UserDashboard';
import { HomePage } from '../HomePage/HomePage';
import { NavBar } from '../NavBar/NavBar';
import './App.css';
import { ConditionPage } from '../ConditionPage/ConditionPage';
import { Route, Switch } from 'react-router-dom';

export const App = () => {
  return (
  <main>
    <NavBar />
    <Switch>
      <Route exact path='/' render={() => <HomePage />} />
      <Route exact path='/user-dashboard' render={() => <UserDashboard />} />
      <Route exact path='/conditions/:condition' render={({match}) => <ConditionPage key={match.params.condition}/>} />
    </Switch>
  </main>
  )
}