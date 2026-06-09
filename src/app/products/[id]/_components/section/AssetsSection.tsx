"use client";

import {
  Badge,
  Box,
  Button,
  Card,
  Grid,
  HStack,
  Image,
  Separator,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { MdUpload } from "react-icons/md";
import { useUploadAsset } from "@/app/_hooks/useAssets";
import type { Asset, AssetType } from "@/types/asset";
import type { Variant } from "@/types/variant";
import AssetUploadDialog from "../AssetUploadDialog";

const assetStatusConfig = {
  PENDING_REVIEW: { label: "Pending", colorPalette: "orange" },
  APPROVED: { label: "Approved", colorPalette: "green" },
  REJECTED: { label: "Rejected", colorPalette: "red" },
} as const;

interface AssetsSectionProps {
  productId: string;
  assets: Asset[];
  variants: Variant[];
  isLoading: boolean;
}

function AssetsSection({
  productId,
  assets,
  variants,
  isLoading,
}: AssetsSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { trigger: upload, isMutating } = useUploadAsset();

  const productAssets = assets.filter((a) => !a.variantId);
  const variantAssets = assets.filter((a) => !!a.variantId);

  async function handleUpload(data: {
    file: File;
    title: string;
    description: string;
    assetType: AssetType;
    variantId: string;
    tags: string;
  }) {
    await upload({
      file: data.file,
      productId,
      variantId: data.variantId || undefined,
      assetType: data.assetType,
      title: data.title,
      description: data.description,
      tags: data.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
    setDialogOpen(false);
  }

  function AssetGrid({ items }: { items: Asset[] }) {
    return (
      <Grid templateColumns="repeat(auto-fill, minmax(130px, 1fr))" gap={3}>
        {items.map((asset) => {
          const asc =
            assetStatusConfig[asset.status as keyof typeof assetStatusConfig];
          const variant = variants.find((v) => v.id === asset.variantId);
          return (
            <Link key={asset.id} href={`/assets/${asset.id}`}>
              <Box
                borderWidth="1px"
                rounded="md"
                overflow="hidden"
                _hover={{ shadow: "sm" }}
                transition="box-shadow 0.15s"
              >
                <Box w="full" h="80px" bg="bg.muted" overflow="hidden">
                  <Image
                    src={asset.fileUrl}
                    alt={asset.title}
                    w="full"
                    h="full"
                    objectFit="cover"
                  />
                </Box>
                <Box p={2}>
                  <Text
                    fontSize="xs"
                    fontWeight="medium"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {asset.title}
                  </Text>
                  {variant && (
                    <Text fontSize="2xs" color="fg.muted">
                      {variant.name}
                    </Text>
                  )}
                  <Badge
                    colorPalette={asc.colorPalette}
                    variant="subtle"
                    size="xs"
                    mt={1}
                  >
                    {asc.label}
                  </Badge>
                </Box>
              </Box>
            </Link>
          );
        })}
      </Grid>
    );
  }

  return (
    <>
      <Card.Root variant="outline" size="sm">
        <Card.Header>
          <HStack justify="space-between">
            <Text fontWeight="semibold" fontSize="sm">
              Assets ({assets.length})
            </Text>
            <Button
              size="xs"
              variant="outline"
              onClick={() => setDialogOpen(true)}
            >
              <MdUpload size={14} /> Upload Asset
            </Button>
          </HStack>
        </Card.Header>
        <Separator />
        <Card.Body>
          {isLoading ? (
            <Spinner size="sm" color="brand.700" />
          ) : assets.length === 0 ? (
            <Text fontSize="sm" color="fg.muted" textAlign="center" py={6}>
              No assets uploaded yet.
            </Text>
          ) : (
            <Box display="flex" flexDirection="column" gap={6}>
              {productAssets.length > 0 && (
                <Box>
                  <Text
                    fontSize="xs"
                    fontWeight="medium"
                    color="fg.muted"
                    textTransform="uppercase"
                    letterSpacing="wide"
                    mb={3}
                  >
                    Product Level ({productAssets.length})
                  </Text>
                  <AssetGrid items={productAssets} />
                </Box>
              )}
              {variantAssets.length > 0 && (
                <Box>
                  <Text
                    fontSize="xs"
                    fontWeight="medium"
                    color="fg.muted"
                    textTransform="uppercase"
                    letterSpacing="wide"
                    mb={3}
                  >
                    Variant Level ({variantAssets.length})
                  </Text>
                  <AssetGrid items={variantAssets} />
                </Box>
              )}
            </Box>
          )}
        </Card.Body>
      </Card.Root>

      <AssetUploadDialog
        open={dialogOpen}
        productId={productId}
        variants={variants}
        isSubmitting={isMutating}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleUpload}
      />
    </>
  );
}

export default AssetsSection;
