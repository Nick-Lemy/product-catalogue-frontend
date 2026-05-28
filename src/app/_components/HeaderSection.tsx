import { Box, Button, HStack, Link, Text } from "@chakra-ui/react";
import { formatDate } from "@/utils/helpers";

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
      <Button size="sm" bg="brand.700">
        <Link color="white" href="/products/new">
          + Add Product
        </Link>
      </Button>
    </HStack>
  );
}

export default HeaderSection;
