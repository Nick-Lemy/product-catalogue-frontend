"use client";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { MdErrorOutline, MdRefresh } from "react-icons/md";

export default function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="60vh"
      gap={5}
      px={6}
      flex="1"
    >
      <Box bg="red.50" color="red.500" p={4} rounded="full">
        <MdErrorOutline size={36} />
      </Box>

      <Box textAlign="center">
        <Text fontSize="lg" fontWeight="semibold" mb={1}>
          Something went wrong
        </Text>
        <Text fontSize="sm" color="fg.muted" maxW="400px">
          {error.message || "An unexpected error occurred. Please try again."}
        </Text>
      </Box>

      <Button
        onClick={reset}
        size="sm"
        bg="amber.500"
        color="white"
        _hover={{ bg: "amber.600" }}
      >
        <MdRefresh size={16} />
        Try again
      </Button>
    </Flex>
  );
}
