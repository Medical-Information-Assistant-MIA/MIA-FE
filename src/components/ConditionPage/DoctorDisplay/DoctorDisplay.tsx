import { DoctorDisplayProps } from "../../../types"

export const DoctorDisplay = ({doc}: DoctorDisplayProps) => {
  return (
    <div className='condition-info'>
      <p>{doc.name}</p>
      {doc.category ? <p>{doc.category}</p> : null}
      {doc.address ? <p>{doc.address}</p> : null} 
      {doc.phone ? <p>{doc.phone}</p> : null}
    </div>
  )
}