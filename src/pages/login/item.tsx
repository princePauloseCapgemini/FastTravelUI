import { Box, Container, Text } from "@chakra-ui/react";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <Container
      maxW="container.sm"
      p="8"
      justifyContent="center"
      h="calc(100vh - 72px)"
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
          Login with Email Address
        </Text>
        <LoginForm />
      </Box>
    </Container>
  );
}
