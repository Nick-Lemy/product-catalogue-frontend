import { Box, HStack, Text } from "@chakra-ui/react";
import AddProductButton from "@/app/_components/AddProductButton";
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
      <AddProductButton />
    </HStack>
  );
}

export default HeaderSection;
