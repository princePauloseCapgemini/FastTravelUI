import { gql } from "@apollo/client";

export const GET_ALL_BOOKINGS = gql`
query getBookings($userId: ID!){
    getBookings(userId:$userId){
        bookingId,
        origin,
        destination,
        fare,
        riderId
        createdAt
        completedAt
    }
}
`;

export const GET_BOOKIN_DETAILS = gql`
  query getBookingById($bookingId: ID!) {
    getBookingById(bookingId: $bookingId) {
      bookingId
      origin
      destination
      fare
      riderId
      status
      vehicleId
      completedAt
    }
  }
`;

console.log(GET_BOOKIN_DETAILS, "_______");
