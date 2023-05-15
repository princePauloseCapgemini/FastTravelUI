import React from "react";
import { useQuery } from "@apollo/client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import {
  GET_BOOKIN_DETAILS,
  GET_ALL_BOOKINGS,
} from "../../graphqlOperation/queries";

export default function Bookings({
  isOpen,
  onClose,
  onOpen,
  bookingId,
  rideDetails = [],
}) {
  //   const { isOpen = openModal, onOpen, onClose } = useDisclosure();
  console.log(bookingId);
  const { loading, error, data } = useQuery(GET_BOOKIN_DETAILS, {
    variables: { bookingId },
  });

  if (data) console.log(data.getBookingById);
  const convertDate = (date) => {
    console.log(date);
    return new Date(date).toUTCString().split(" ").slice(0, 5).join(" ");
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Booking Details</ModalHeader>
        {loading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </div>
        )}
        <ModalCloseButton />
        <ModalBody>
          <TableContainer>
            <Table>
              <Tbody>
              <Tr>
                  <Td>
                    <Box>Status: </Box>
                  </Td>
                  <Td>
                    <Box>{data?.getBookingById?.status === "COMPLETED"
                          ? "Completed"
                          : "On-going Ride"}</Box>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Box>Pick Up Time: </Box>
                  </Td>
                  <Td>
                    <Box>{convertDate(Number(data?.getBookingById?.createdAt))}</Box>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Box>Origin </Box>
                  </Td>
                  <Td>
                    <Box>{data?.getBookingById?.origin}</Box>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Box>Destination</Box>
                  </Td>
                  <Td>
                    <Box>{data?.getBookingById?.destination}</Box>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Box>Fare:</Box>
                  </Td>
                  <Td>
                    <Box> {data?.getBookingById.fare}</Box>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Box>Vehicle Number:</Box>
                  </Td>
                  <Td>
                    <Box> {data?.getBookingById.vehicleId}</Box>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Box>Drop Time: </Box>
                  </Td>
                  <Td>
                    <Box>{convertDate(Number(data?.getBookingById?.completedAt))}</Box>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
