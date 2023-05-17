import { UserDashboard } from '../UserDashboard/UserDashboard';
import { HomePage } from '../HomePage/HomePage';
import { NavBar } from '../NavBar/NavBar';
import './App.css';
import { ConditionPage } from '../ConditionPage/ConditionPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { NewConditionPage } from '../NewConditionPage/NewConditionPage';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import { Users } from '../../gql/graphql';

export const App = () => {

  return (
    <main>
      <NavBar />
      <Switch>
        <Route exact path='/' render={() => <HomePage/>} />
        <Route exact path='/user-dashboard' render={() => <UserDashboard />} />
        <Route exact path='/conditions/:condition' render={({match}) => <ConditionPage key={match.params.condition}/>} />
        <Route exact path='/add-condition'render={() => <NewConditionPage />} />
        <Route exact path='/404' render={() => <ErrorPage /> } />
        <Redirect from='*' to='/404'/>
      </Switch>
    </main>
  )
}