import { Box, Text } from "@chakra-ui/react";

interface HeaderSectionProps {
  assetCount: number;
}

function HeaderSection({ assetCount }: HeaderSectionProps) {
  return (
    <Box mb={6}>
      <Text fontSize="2xl" fontWeight="bold">
        Asset Library
      </Text>
      <Text fontSize="sm" color="fg.muted" mt={1}>
        {assetCount} {assetCount === 1 ? "asset" : "assets"}
      </Text>
    </Box>
  );
}

export default HeaderSection;
