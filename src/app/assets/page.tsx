"use client";

import { Box } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import type { AssetStatus, AssetType } from "@/types/asset";
import { useGetAssets } from "../_hooks/useAssets";
import AssetsGridSection from "./_components/section/AssetsGridSection";
import FiltersSection from "./_components/section/FiltersSection";
import HeaderSection from "./_components/section/HeaderSection";

export default function AssetsPage() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const productId = searchParams.get("productId") ?? "";
  const assetType = (searchParams.get("assetType") as AssetType) ?? "";
  const status = (searchParams.get("status") as AssetStatus) ?? "";

  const {
    data: assets = [],
    isLoading,
    error,
  } = useGetAssets({
    fileName: search || undefined,
    productId: productId || undefined,
    assetType: (assetType as AssetType) || undefined,
    status: (status as AssetStatus) || undefined,
  });

  if (error) throw error;

  return (
    <Box px={6} pb={10}>
      <HeaderSection assetCount={assets.length} />
      <FiltersSection
        search={search}
        productId={productId}
        assetType={assetType}
        status={status}
      />
      <AssetsGridSection assets={assets} isLoading={isLoading} />
    </Box>
  );
}
