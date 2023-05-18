import './ConditionPage.css'
import { useRouteMatch } from 'react-router-dom';

type matchObj = {
  id: string | null
}

export const ConditionPage = () => {
  const match = useRouteMatch('/conditions/:id');
  const thing: matchObj = match?.params.id
    console.log(thing)


  return (
    <section className='condition-page nav-spacing'>
      <h2>Condition title</h2>
      <h3>Medications</h3>
      <p>Your meds here</p>
      <h3>Doctors</h3>
      <p>Your docs here</p>
      <h3>Health Events</h3>
      <div 
        className='site-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    </section>
  )
}