import { Box, Button, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { MdUpload } from "react-icons/md";

interface HeaderSectionProps {
  assetCount: number;
}

function HeaderSection({ assetCount }: HeaderSectionProps) {
  return (
    <HStack justify="space-between" align="flex-start" mb={6}>
      <Box>
        <Text fontSize="2xl" fontWeight="bold">
          Asset Library
        </Text>
        <Text fontSize="sm" color="fg.muted" mt={1}>
          {assetCount} {assetCount === 1 ? "asset" : "assets"}
        </Text>
      </Box>
      <Button
        asChild
        size="sm"
        bg="amber.500"
        color="white"
        _hover={{ bg: "amber.600" }}
      >
        <Link href="/assets/upload">
          <MdUpload size={16} /> Upload Asset
        </Link>
      </Button>
    </HStack>
  );
}

export default HeaderSection;
