import { Box, Button, HStack, Link, Text } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { mockProducts } from "@/mocks/products";

interface HeaderSectionProps {
  filteredProductsCount: number;
}

function HeaderSection({ filteredProductsCount }: HeaderSectionProps) {
  return (
    <HStack justify="space-between" align="flex-start" mb={6}>
      <Box>
        <Text fontSize="2xl" fontWeight="bold">
          Products
        </Text>
        <Text fontSize="sm" color="fg.muted" mt={1}>
          {filteredProductsCount} of {mockProducts.length} products
        </Text>
      </Box>
      <Button
        asChild
        size="sm"
        bg="amber.500"
        color="white"
        _hover={{ bg: "amber.600" }}
      >
        <Link href="/products/new">
          <MdAdd size={18} />
          Add Product
        </Link>
      </Button>
    </HStack>
  );
}

export default HeaderSection;
