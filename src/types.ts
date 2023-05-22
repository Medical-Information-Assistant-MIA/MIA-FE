import { Users } from "./gql/graphql";

export type MatchParams = {
  id: string;
}

export type Medication = { 
  name: string,
  datePrescribed: string,
  dosage: string,
  frequency: string,
  prescribedBy: string
}

export type Doctor = {
  address: string,
  category: string,
  name: string,
  phone: string
}

export type HealthEvent = {
  date: string,
  category: string,
  note: string
}

export type UserID = {
  setUserId: Function
}

export type NewDoctorProps = {
  conditionId: number
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

export type NewConditionProps = {
  userId: number,
}

export type ConditionProps = {
  condition: {
    id: number,
    name: string,
    createdAt: string
  }
}

export type DashProps = {
  user: Users
}