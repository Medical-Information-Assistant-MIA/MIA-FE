import { Users } from './gql/graphql';

export type MatchParams = {
 id: string;
}

export type Medication = { 
  id: string,
  name: string,
  datePrescribed: string,
  dosage: string,
  frequency: string,
  prescribedBy: string
}

export type Doctor = {
  id: string,
  address: string,
  category: string,
  name: string,
  phone: string,
  createdAt: string
}

export type HealthEvent = {
  id: string,
  date: string,
  category: string,
  note: string
}

export type UserID = {
  setUserId: Function
}

// Component Prop Types -------------------------------------
export type ConditionProps = {
  condition: {
    id: number,
    name: string,
    createdAt: string
  }
}

export type DoctorPageProps = {
  user: Users
}

export type DashboardProps = {
  user: Users
}

export type NewConditionProps = {
  userId: number,
}

export type NewDoctorProps = {
  conditionId: number,
  userId: number
}

export type NewEventProps = {
  conditionId: number
}

export type NewMedicationProps = {
  conditionId: number
}

export type TitleFormProps = {
  userId: number,
  setConditionId: Function
}

export type ErrorProps = {
  error: string
}

// Condition Display Component Props -------------------------
export type MedicationDisplayProps = {
  med: Medication,
  formatDate: Function
}

export type DoctorDisplayProps = {
  doc: Doctor
}

export type HealthEventDisplayProps = {
  event: HealthEvent,
  formatDate: Function,
  formatEventCategory: Function
}