import { Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

interface HeaderSectionProps {
  productId: string;
  productName: string;
}

function HeaderSection({ productId, productName }: HeaderSectionProps) {
  return (
    <HStack gap={3} align="flex-start" mb={6}>
      <Link href={`/products/${productId}`} style={{ marginTop: 6 }}>
        <MdArrowBack size={20} />
      </Link>
      <Box>
        <Text fontSize="2xl" fontWeight="bold">
          Edit Product
        </Text>
        <Text fontSize="sm" color="fg.muted" mt={0.5}>
          {productName}
        </Text>
      </Box>
    </HStack>
  );
}

export default HeaderSection;
