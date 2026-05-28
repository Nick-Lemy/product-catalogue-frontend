import { Box, Flex, Spinner, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100%"
      flex="1"
      gap={4}
      minH="60vh"
    >
      <Spinner color="brand.700" size="lg" />
      <Box textAlign="center">
        <Text fontWeight="medium" fontSize="sm">
          Loading
        </Text>
        <Text fontSize="xs" color="fg.muted" mt={0.5}>
          Please wait a moment
        </Text>
      </Box>
    </Flex>
  );
}
