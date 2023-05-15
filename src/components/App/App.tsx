import { UserDashboard } from '../UserDashboard/UserDashboard';
import { HomePage } from '../HomePage/HomePage';
import { NavBar } from '../NavBar/NavBar';
import './App.css';

export const App = () => {
  return (
  <main>
    <NavBar />
    <HomePage />
  </main>
  )
}