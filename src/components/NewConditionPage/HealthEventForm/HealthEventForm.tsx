import { useState } from 'react'
import './HealthEventForm.css'

export const HealthEventForm = () => {
  // const [type, setType] = useState('')
  // const [date, setDate] = useState('')
  // const [note, setNote] = useState('')
  const [eventObj, setEventObj] = useState({
    type: '',
    date: '',
    note: ''
  })

  return (
    <section>
      <form onSubmit={e => {
        e.preventDefault()
        console.log(eventObj)
      }}>
        <label>Select the event type:</label>
        <h2>Create Event Notes</h2>
        <select value={eventObj.type} name='type' onChange={e => setEventObj({...eventObj, [e.target.name]: e.target.value })}>
          <option value='symptom'>Symptom</option>
          <option value='doctor-visit'>Doctor's Visit</option>
          <option value='other-note'>Other Note</option>
        </select>
        <label>Select date:</label>
        <input value={eventObj.date} type='date' name='date' onChange={e => setEventObj({...eventObj, [e.target.name]: e.target.value })} />
        <label>Describe the event:</label>
        <input value={eventObj.note} type='input' name='note' onChange={e => setEventObj({...eventObj, [e.target.name]: e.target.value })} />
        <button>Add New Note</button>
        <button>Submit Condition</button>
      </form>
    </section>
  )
}