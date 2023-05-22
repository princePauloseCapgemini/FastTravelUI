import { Box, Heading, useDisclosure } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useState } from "react";
import BookingDetails from "./BookingDetails";
import { useQuery } from "@apollo/client";
import {
  GET_BOOKIN_DETAILS,
  GET_ALL_BOOKINGS,
} from "../../graphqlOperation/queries";
import moment from "moment";

export default function Bookings() {
  const [isBookingModal, handleBookingModal] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [rideDetails, setRideDetails] = useState({});
  const [bookingId, setBookingId] = useState("");

  const userId = "ruid_000001";
  // const { loading, error, data } = useQuery(GET_BOOKIN_DETAILS, { variables: { bookingId: "bid_9353" } });
  // const { loading, error, data } = useQuery(GET_BOOKIN_DETAILS, {
  //   variables: { bookingId },
  // });
  const { loading, error, data } = useQuery(GET_ALL_BOOKINGS, {
    variables: { userId },
  });

  const handleRowClick = (bookingId: String) => {
    console.log("handleRowClick", bookingId);
    //fetch Booking Details
    // const { loading, error, data } = useQuery(GET_BOOKIN_DETAILS, {
    //   variables: { bookingId },
    // });
    // console.log(data);
    setBookingId(bookingId);
    handleBookingModal(true);
    onOpen();
  };

  const convertDate = (date:Date) => {
    console.log(date);
    return new Date(date).toUTCString().split(" ").slice(0, 5).join(" ");
  };
  return (
    <Box bgColor="grey" h="100%">
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <Heading>Bookings List</Heading>
        <TableContainer>
          <Table>
            <Tbody>
              {data?.getBookings?.map((bookingData: Array<{}>) => {
                return (
                  <Tr
                    role={"button"}
                    onClick={() => handleRowClick(bookingData?.bookingId)}
                    _hover={{ bg: "#ededed" }}
                  >
                    <Td>
                      <div>
                        Pick up Time: {convertDate(Number(bookingData.createdAt))}
                      </div>
                      <div>
                        {bookingData.status === "COMPLETED"
                          ? "Completed"
                          : "On-going Ride"}
                      </div>
                    </Td>
                    <Td>
                      <div>Pick up: {bookingData.origin}</div>
                    </Td>
                    <Td>
                      <div>Drop: {bookingData.destination}</div>
                    </Td>
                    <Td>
                      <div>Fare: {bookingData.fare}</div>
                    </Td>
                    <Td>
                      <div>
                        Drop Time: {convertDate(Number(bookingData.completedAt))}
                      </div>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      {isBookingModal && (
        <BookingDetails
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          bookingId={bookingId}
        />
      )}
    </Box>
  );
}
