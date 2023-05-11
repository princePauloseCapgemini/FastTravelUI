import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation createUser($userData: UserDataInputType) {
    registerUser(userData: $userData) {
      dob
      createdAt
      userId
      jwt
      userType
    }
  }
`;

export const LOGIN_USER = gql`
  mutation signInUser($userData: UserSignInInputType) {
    signInUser(userData: $userData) {
      userId
      jwt
    }
  }
`;
