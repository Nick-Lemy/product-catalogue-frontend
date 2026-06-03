import { Box, HStack, Text } from "@chakra-ui/react";
import UploadAssetButton from "../UploadAssetButton";

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
      <UploadAssetButton />
    </HStack>
  );
}

export default HeaderSection;
