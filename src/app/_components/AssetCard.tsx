import { Badge, Box, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { formatDate } from "@/utils/helpers";

interface AssetCardProps {
  asset: {
    id: string;
    title: string;
    fileUrl: string;
    uploadedAt: string;
    status: "APPROVED" | "PENDING_REVIEW" | "REJECTED";
  };
}

const statusBadge = {
  APPROVED: { label: "Approved", colorPalette: "green" },
  PENDING_REVIEW: { label: "Pending", colorPalette: "orange" },
  REJECTED: { label: "Rejected", colorPalette: "red" },
} as const;

function AssetCard({ asset }: AssetCardProps) {
  const badge = statusBadge[asset.status as keyof typeof statusBadge];

  return (
    <HStack
      key={asset.id}
      px={2}
      py={2}
      rounded="md"
      _hover={{ bg: "bg.subtle" }}
      transition="background 0.15s"
      gap={3}
      cursor="pointer"
    >
      <Box
        w="40px"
        h="40px"
        rounded="md"
        overflow="hidden"
        flexShrink={0}
        bg="bg.muted"
      >
        <Image
          src={asset.fileUrl}
          alt={asset.title}
          width={40}
          height={40}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <Box flex="1" minW={0}>
        <Text
          fontSize="sm"
          fontWeight="medium"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {asset.title}
        </Text>
        <Text fontSize="xs" color="fg.muted">
          {formatDate(new Date(asset.uploadedAt), false)}
        </Text>
      </Box>
      <Badge
        colorPalette={badge.colorPalette}
        variant="subtle"
        size="xs"
        flexShrink={0}
      >
        {badge.label}
      </Badge>
    </HStack>
  );
}
export default AssetCard;
