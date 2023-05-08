import { Box, Container, Flex, Text } from "@chakra-ui/react";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <Container maxW="container.sm" p="8" justifyContent="center">
      <Box
        boxShadow="md"
        borderRadius="md"
        px="4"
        py="2"
        data-testid="reg-form-wrapper"
      >
        <Text fontSize="lg" fontWeight="500" mb="6" color="grey">
          Login with Mobile Number
        </Text>
        <LoginForm />
      </Box>
    </Container>
  );
}
