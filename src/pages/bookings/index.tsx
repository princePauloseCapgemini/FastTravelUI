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

export default function Bookings() {
  const [isBookingModal, handleBookingModal] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [rideDetails, setRideDetails] = useState({})

  const bookingList = [
    {
      bookingId: "2345676",
      createAt: 1683626061000,
      origin: "Rajiv Chowk",
      destination: "Cannaught Place",
      fare: "200",
      expectedEndTime: 1683626061000,
      bookingEndTime: 1683626061000,
      status: "INPROGRESS",
      riderId: "4567890",
      partnerId: "34567892",
      startTime: 1683626061000,
    },
    {
      bookingId: "2345677",
      createAt: 1683626061000,
      origin: "Rajiv Chowk",
      destination: "Cannaught Place",
      fare: "200",
      expectedEndTime: 1683626061000,
      bookingEndTime: 1683626061000,
      status: "OnGoing",
      riderId: "4567890",
      partnerId: "34567890",
      startTime: 1683626061000,
    },
    {
      bookingId: "2345678",
      createAt: 1683626061000,
      origin: "Rajiv Chowk",
      destination: "Cannaught Place",
      fare: "200",
      expectedEndTime: 1683626061000,
      bookingEndTime: 1683626061000,
      status: "OnGoing",
      riderId: "4567890",
      partnerId: "34567891",
      startTime: 1683626061000,
    },
  ];

  const handleRowClick = (bookingId: String) => {
    console.log("handleRowClick", bookingId);
    //fetch Booking Details
    const rideDetails = bookingList.find((data) => data.bookingId === bookingId);
    setRideDetails(rideDetails);
    handleBookingModal(true);
    onOpen();
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
              {bookingList?.map((bookingData) => {
                return (
                  <Tr
                    role={"button"}
                    onClick={() => handleRowClick(bookingData.bookingId)}
                    _hover={{ bg: "#ededed" }}
                  >
                    <Td>
                      <div>
                        Travel Date: {`${new Date(bookingData.createAt)}`}
                      </div>
                      <div>
                        {bookingData.status === "INPROGRESS"
                          ? "On-going Ride"
                          : "Completed"}
                      </div>
                    </Td>
                    <Td>
                      <div>Pick up: {bookingData.origin}</div>
                    </Td>
                    <Td>
                      <div>Drop: {bookingData.destination}</div>
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
          rideDetails={rideDetails}
        />
      )}
    </Box>
  );
}
