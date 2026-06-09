import { Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

function HeaderSection() {
  return (
    <HStack gap={3} align="flex-start" mb={6}>
      <Link href="/assets" style={{ marginTop: 6 }}>
        <MdArrowBack size={20} />
      </Link>
      <Box>
        <Text fontSize="2xl" fontWeight="bold">
          Upload Asset
        </Text>
        <Text fontSize="sm" color="fg.muted" mt={0.5}>
          Add an image, video, or document to a product.
        </Text>
      </Box>
    </HStack>
  );
}

export default HeaderSection;
