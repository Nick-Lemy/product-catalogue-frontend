"use client";

import { Box, Flex, Grid, Spinner } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useGetAssetById } from "@/app/_hooks/useAssets";
import { useGetProductById } from "@/app/_hooks/useProducts";
import { useGetVariants } from "@/app/_hooks/useVariants";
import HeaderSection from "./_components/section/HeaderSection";
import MetadataSection from "./_components/section/MetadataSection";
import PreviewSection from "./_components/section/PreviewSection";
import StatusHistorySection from "./_components/section/StatusHistorySection";

export default function AssetDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: asset, isLoading, error } = useGetAssetById(id);
  const { data: product } = useGetProductById(asset?.productId ?? "");
  const { data: variants } = useGetVariants(asset?.productId ?? "");

  if (error) throw error;

  if (isLoading || !asset) {
    return (
      <Flex flex="1" justify="center" align="center" minH="60vh">
        <Spinner color="brand.700" size="lg" />
      </Flex>
    );
  }

  const variant = variants?.find((v) => v.id === asset.variantId);

  return (
    <Box px={6} pb={10}>
      <HeaderSection asset={asset} />
      <Grid templateColumns={{ base: "1fr", lg: "1.2fr 1fr" }} gap={6}>
        <PreviewSection asset={asset} />
        <Box display="flex" flexDirection="column" gap={6}>
          <MetadataSection
            asset={asset}
            productName={product?.name}
            variantName={variant?.name}
          />
          <StatusHistorySection asset={asset} />
        </Box>
      </Grid>
    </Box>
  );
}
