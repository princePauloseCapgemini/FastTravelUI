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
      firstName
      emailAddress
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation logoutUser($userData: UserLogoutInputType) {
    logoutUser(userData: $userData) {
      userId
    }
  }
`;

export const BOOK_TRIP = gql`
  mutation createBooking($bookingData: BookingDataInputType) {
    createBooking(bookingData: $bookingData) {
      bookingId
      createdAt
    }
  }
`;
