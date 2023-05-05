import { Box, Text } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontWeight="bold" fontSize="lg">
        Page Not Found!
      </Text>
    </Box>
  );
}
