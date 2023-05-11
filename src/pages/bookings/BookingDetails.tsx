import React from "react";

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

export default function Bookings({ isOpen, onClose, onOpen, rideDetails }) {
  //   const { isOpen = openModal, onOpen, onClose } = useDisclosure();
  console.log(rideDetails);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Booking Details</ModalHeader>
        {!rideDetails && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
        <ModalCloseButton />
        <ModalBody>
          <TableContainer>
            <Table>
              <Tbody>
                <Tr>
                  <Td>
                    <Box>Travel Date: </Box>
                  </Td>
                  <Td>
                    <Box>{`${new Date(rideDetails.createAt)}`}</Box>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Box>Started At: </Box>
                  </Td>
                  <Td>
                    <Box>{`${new Date(rideDetails.startTime)}`}</Box>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Box>Completed At:</Box>
                  </Td>
                  <Td>
                    <Box>{`${new Date(rideDetails.bookingEndTime)}`}</Box>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Box>Fare:</Box>
                  </Td>
                  <Td>
                    <Box> {`${new Date(rideDetails.fare)}`}</Box>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Box>Rider:</Box>
                  </Td>
                  <Td>
                    <Box> {`${new Date(rideDetails.partnerId)}`}</Box>
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
