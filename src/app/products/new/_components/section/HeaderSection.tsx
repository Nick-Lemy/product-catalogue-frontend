import { Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

function HeaderSection() {
  return (
    <HStack gap={3} align="flex-start" mb={6}>
      <Link href="/products" style={{ marginTop: 6 }}>
        <MdArrowBack size={20} />
      </Link>
      <Box>
        <Text fontSize="2xl" fontWeight="bold">
          New Product
        </Text>
        <Text fontSize="sm" color="fg.muted" mt={0.5}>
          Create a product to start adding variants and assets
        </Text>
      </Box>
    </HStack>
  );
}

export default HeaderSection;
