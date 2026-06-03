import { Card, Center, Image, Text } from "@chakra-ui/react";
import { MdDescription } from "react-icons/md";
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
        ) : asset.assetType === AssetType.VIDEO ? (
          <video
            src={asset.fileUrl}
            controls
            style={{ width: "100%", maxHeight: "480px" }}
          >
            <track kind="captions" />
          </video>
        ) : (
          <Center flexDirection="column" gap={2} color="fg.muted" py={12}>
            <MdDescription size={48} />
            <Text fontSize="sm">{asset.fileName}</Text>
            <Text fontSize="xs">No preview available</Text>
          </Center>
        )}
      </Center>
    </Card.Root>
  );
}

export default PreviewSection;
