import { Badge, Box, Card, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import type { Asset } from "@/types/asset";

const statusBadge = {
  APPROVED: { label: "Approved", colorPalette: "green" },
  PENDING_REVIEW: { label: "Pending", colorPalette: "orange" },
  REJECTED: { label: "Rejected", colorPalette: "red" },
} as const;

interface AssetGridCardProps {
  asset: Asset;
  productName?: string;
}

function AssetGridCard({ asset, productName }: AssetGridCardProps) {
  const badge = statusBadge[asset.status];

  return (
    <Card.Root
      asChild
      variant="outline"
      size="sm"
      overflow="hidden"
      _hover={{ shadow: "md" }}
      transition="box-shadow 0.15s"
      cursor="pointer"
    >
      <Link href={`/assets/${asset.id}`}>
        <Box position="relative" h="160px" bg="bg.muted">
          <Image
            src={asset.fileUrl}
            alt={asset.title}
            w="full"
            h="full"
            objectFit="cover"
          />
          <Badge
            colorPalette={badge.colorPalette}
            variant="solid"
            size="xs"
            position="absolute"
            top={2}
            right={2}
          >
            {badge.label}
          </Badge>
        </Box>
        <Card.Body p={3}>
          <Text fontSize="sm" fontWeight="medium" lineClamp={1}>
            {asset.title}
          </Text>
          <Text fontSize="xs" color="fg.muted" lineClamp={1}>
            {productName ?? asset.fileName}
          </Text>
        </Card.Body>
      </Link>
    </Card.Root>
  );
}

export default AssetGridCard;
