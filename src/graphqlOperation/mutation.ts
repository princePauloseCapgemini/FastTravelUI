import {gql} from '@apollo/client';

export const REGISTER_USER = gql`
mutation createUser($userData: UserDataInputType){
  registerUser(userData:$userData) {
    dob
    createdAt
    userId
    jwt
    userType
  }
}`