import { Box, Container, Text } from "@chakra-ui/react";
import SignUpForm from "./SignUpForm";

export default function Signup() {
  return (
    <Container
      maxW="container.sm"
      p="8"
      justifyContent="center"
      display="flex"
      alignItems="center"
    >
      <Box
        w="80%"
        boxShadow="md"
        borderRadius="md"
        px="8"
        py="4"
        data-testid="reg-form-wrapper"
        bgColor="#fff"
        borderTopLeftRadius="none"
        borderBottomRightRadius="none"
        borderTopRightRadius="xl"
        borderBottomLeftRadius="xl"
      >
        <Text fontSize="lg" fontWeight="500" mb="6" color="grey">
          New Account Sign Up
        </Text>
        <SignUpForm />
      </Box>
    </Container>
  );
}
