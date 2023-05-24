import { DoctorProps } from '../../types';
import '/DoctorPage.css';

export const DoctorPage = ({user}: DoctorProps) => {

  

  // const docsDisp = doctors.map(doc => {
  //   return (
  //     <div className='doc-card'>

  //     </div>
  //   )
  // })

  return (
    <section className='nav-spacing'>
      <h1>Your Doctors</h1>
      {docsDisp}
    </section>
  )
}