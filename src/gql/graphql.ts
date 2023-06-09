/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
};

export type Conditions = {
  __typename?: 'Conditions';
  createdAt: Scalars['String'];
  doctors: Array<Doctors>;
  healthEvents: Array<HealthEvents>;
  id: Scalars['Int'];
  medications: Array<Medications>;
  name: Scalars['String'];
};

/** Autogenerated input type of CreateCondition */
export type CreateConditionInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  userId: Scalars['Int'];
};

/** Autogenerated return type of CreateCondition. */
export type CreateConditionPayload = {
  __typename?: 'CreateConditionPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  condition?: Maybe<Conditions>;
  errors?: Maybe<Array<Scalars['String']>>;
};

/** Autogenerated input type of CreateDoctor */
export type CreateDoctorInput = {
  address?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  conditionId: Scalars['Int'];
  name: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of CreateDoctor. */
export type CreateDoctorPayload = {
  __typename?: 'CreateDoctorPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  doctor?: Maybe<Doctors>;
  errors?: Maybe<Array<Scalars['String']>>;
};

/** Autogenerated input type of CreateHealthEvent */
export type CreateHealthEventInput = {
  category: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  conditionId: Scalars['Int'];
  date: Scalars['String'];
  note: Scalars['String'];
};

/** Autogenerated return type of CreateHealthEvent. */
export type CreateHealthEventPayload = {
  __typename?: 'CreateHealthEventPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
  healthEvent?: Maybe<HealthEvents>;
};

/** Autogenerated input type of CreateMedication */
export type CreateMedicationInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  conditionId: Scalars['Int'];
  datePrescribed?: InputMaybe<Scalars['String']>;
  dosage?: InputMaybe<Scalars['String']>;
  frequency?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  prescribedBy?: InputMaybe<Scalars['String']>;
};

/** Autogenerated return type of CreateMedication. */
export type CreateMedicationPayload = {
  __typename?: 'CreateMedicationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
  medication?: Maybe<Medications>;
};

/** Autogenerated input type of CreateUser */
export type CreateUserInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
};

/** Autogenerated return type of CreateUser. */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Scalars['String']>>;
  user?: Maybe<Users>;
};

export type Doctors = {
  __typename?: 'Doctors';
  address?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  condition: Conditions;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type HealthEvents = {
  __typename?: 'HealthEvents';
  category?: Maybe<Scalars['String']>;
  condition: Conditions;
  createdAt: Scalars['ISO8601DateTime'];
  date: Scalars['String'];
  id: Scalars['Int'];
  note: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
};

export type Medications = {
  __typename?: 'Medications';
  condition: Conditions;
  conditionId: Scalars['Int'];
  datePrescribed?: Maybe<Scalars['ISO8601DateTime']>;
  dosage?: Maybe<Scalars['String']>;
  frequency?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  prescribedBy?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCondition?: Maybe<CreateConditionPayload>;
  createDoctor?: Maybe<CreateDoctorPayload>;
  createHealthEvent?: Maybe<CreateHealthEventPayload>;
  createMedication?: Maybe<CreateMedicationPayload>;
  createUser?: Maybe<CreateUserPayload>;
};


export type MutationCreateConditionArgs = {
  input: CreateConditionInput;
};


export type MutationCreateDoctorArgs = {
  input: CreateDoctorInput;
};


export type MutationCreateHealthEventArgs = {
  input: CreateHealthEventInput;
};


export type MutationCreateMedicationArgs = {
  input: CreateMedicationInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type Query = {
  __typename?: 'Query';
  condition: Conditions;
  conditionDoctors: Array<Doctors>;
  conditionHealthEvents: Array<HealthEvents>;
  conditionMedications: Array<Medications>;
  /** An example field added by the generator */
  testField: Scalars['String'];
  user: Users;
  userConditions: Array<Conditions>;
  users: Array<Users>;
};


export type QueryConditionArgs = {
  id: Scalars['Int'];
};


export type QueryConditionDoctorsArgs = {
  conditionId: Scalars['Int'];
};


export type QueryConditionHealthEventsArgs = {
  conditionId: Scalars['Int'];
};


export type QueryConditionMedicationsArgs = {
  conditionId: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUserConditionsArgs = {
  userId: Scalars['Int'];
};

export type Users = {
  __typename?: 'Users';
  conditions?: Maybe<Array<Conditions>>;
  createdAt: Scalars['ISO8601DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
};
