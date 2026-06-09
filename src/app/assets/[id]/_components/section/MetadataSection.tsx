import {
  Badge,
  Box,
  Card,
  DataList,
  HStack,
  Link as ChakraLink,
  Separator,
  Text,
  Wrap,
} from "@chakra-ui/react";
import Link from "next/link";
import type { Asset } from "@/types/asset";
import { formatDate } from "@/utils/helpers";

interface MetadataSectionProps {
  asset: Asset;
  productName?: string;
  variantName?: string;
}

function MetadataSection({ asset, productName, variantName }: MetadataSectionProps) {
  return (
    <Card.Root variant="outline" size="sm">
      <Card.Header>
        <Text fontWeight="semibold" fontSize="sm">
          Details
        </Text>
      </Card.Header>
      <Separator />
      <Card.Body display="flex" flexDirection="column" gap={4}>
        <DataList.Root orientation="horizontal" gap={3}>
          <DataList.Item>
            <DataList.ItemLabel>Type</DataList.ItemLabel>
            <DataList.ItemValue>{asset.assetType}</DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Uploaded</DataList.ItemLabel>
            <DataList.ItemValue>
              {formatDate(new Date(asset.uploadedAt))}
            </DataList.ItemValue>
          </DataList.Item>
          <DataList.Item>
            <DataList.ItemLabel>Product</DataList.ItemLabel>
            <DataList.ItemValue>
              <ChakraLink asChild color="brand.700">
                <Link href={`/products/${asset.productId}`}>
                  {productName ?? asset.productId}
                </Link>
              </ChakraLink>
            </DataList.ItemValue>
          </DataList.Item>
          {asset.variantId && (
            <DataList.Item>
              <DataList.ItemLabel>Variant</DataList.ItemLabel>
              <DataList.ItemValue>{variantName ?? asset.variantId}</DataList.ItemValue>
            </DataList.Item>
          )}
        </DataList.Root>

        {asset.description && (
          <Box>
            <Text fontSize="xs" fontWeight="medium" color="fg.muted" mb={1}>
              Description
            </Text>
            <Text fontSize="sm">{asset.description}</Text>
          </Box>
        )}

        {asset.tags.length > 0 && (
          <Box>
            <Text fontSize="xs" fontWeight="medium" color="fg.muted" mb={2}>
              Tags
            </Text>
            <Wrap gap={2}>
              {asset.tags.map((tag) => (
                <Badge key={tag} variant="subtle" colorPalette="gray">
                  {tag}
                </Badge>
              ))}
            </Wrap>
          </Box>
        )}

        {asset.rejectionReason && (
          <Box
            borderWidth="1px"
            borderColor="red.200"
            bg="red.50"
            rounded="md"
            p={3}
          >
            <HStack gap={2} mb={1}>
              <Badge colorPalette="red" variant="subtle">
                Rejected
              </Badge>
            </HStack>
            <Text fontSize="sm" color="red.700">
              {asset.rejectionReason}
            </Text>
          </Box>
        )}
      </Card.Body>
    </Card.Root>
  );
}

export default MetadataSection;
