import { Card, Center, Image, Text } from "@chakra-ui/react";
import { MdDescription, MdVideocam } from "react-icons/md";
import { type Asset, AssetType } from "@/types/asset";

interface PreviewSectionProps {
  asset: Asset;
}

function PreviewSection({ asset }: PreviewSectionProps) {
  return (
    <Card.Root variant="outline" size="sm" overflow="hidden">
      <Center bg="bg.muted" minH="320px">
        {asset.assetType === AssetType.IMAGE ? (
          <Image
            src={asset.fileUrl}
            alt={asset.title}
            w="full"
            maxH="480px"
            objectFit="contain"
          />
        ) : (
          <Center flexDirection="column" gap={2} color="fg.muted" py={12}>
            {asset.assetType === AssetType.VIDEO ? (
              <MdVideocam size={48} />
            ) : (
              <MdDescription size={48} />
            )}
            <Text fontSize="sm">{asset.fileName}</Text>
            <Text fontSize="xs">No preview available</Text>
          </Center>
        )}
      </Center>
    </Card.Root>
  );
}

export default PreviewSection;
