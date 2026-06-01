import { Box, HStack, Text } from "@chakra-ui/react";
import { formatDate } from "@/utils/helpers";
import AddProductButton from "../AddProductButton";

function HeaderSection() {
  const today = formatDate(new Date(), true);
  return (
    <HStack justify="space-between" align="flex-start" mb={8}>
      <Box>
        <Text fontSize="2xl" fontWeight="bold">
          Welcome back,{" "}
          <Text as="span" color="blue.800">
            Nick!
          </Text>
        </Text>
        <Text fontSize="sm" color="fg.muted" mt={1}>
          {today}
        </Text>
      </Box>
      <AddProductButton />
    </HStack>
  );
}

export default HeaderSection;
