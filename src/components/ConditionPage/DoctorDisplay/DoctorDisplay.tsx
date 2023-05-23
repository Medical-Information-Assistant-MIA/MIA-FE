import { DoctorDisplayProps } from "../../../types"

export const DoctorDisplay = ({doc}: DoctorDisplayProps) => {
  return (
    <div className='condition-info'>
      <p>{doc.name}</p>
      <p>{doc.category}</p>
      <p>{doc.address}</p>
      <p>{doc.phone}</p>
    </div>
  )
}