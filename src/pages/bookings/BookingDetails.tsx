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
  useDisclosure,
} from "@chakra-ui/react";

export default function Bookings({ isOpen, onClose, onOpen, rideDetails }) {
  //   const { isOpen = openModal, onOpen, onClose } = useDisclosure();
  console.log(rideDetails);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
          <Flex>
            <Box>Travel Date: </Box>
            <Spacer />
            <Box>{`${new Date(rideDetails.createAt)}`}</Box>
          </Flex>{" "}
          <Flex>
            <Box>Started At:</Box>
            <Spacer />
            <Box> {`${new Date(rideDetails.startTime)}`}</Box>
          </Flex>{" "}
          <Flex>
            <Box    >Completed At:</Box>
            <Spacer />
            <Box> {`${new Date(rideDetails.bookingEndTime)}`}</Box>
          </Flex>{" "}
          <Flex>
            <Box>Fare:</Box>
            <Spacer />
            <Box> {`${new Date(rideDetails.fare)}`}</Box>
          </Flex>
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
