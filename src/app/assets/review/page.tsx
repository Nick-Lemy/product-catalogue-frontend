"use client";

import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useGetAssets } from "@/app/_hooks/useAssets";
import { AssetStatus } from "@/types/asset";
import HeaderSection from "./_components/section/HeaderSection";
import ReviewListSection from "./_components/section/ReviewListSection";

export default function ReviewQueuePage() {
  const {
    data: assets = [],
    isLoading,
    error,
  } = useGetAssets({ status: AssetStatus.PENDING_REVIEW });

  if (error) throw error;

  return (
    <Box px={6} pb={10}>
      <HeaderSection pendingCount={assets.length} />
      {isLoading ? (
        <Flex justify="center" py={16}>
          <Spinner color="brand.700" size="lg" />
        </Flex>
      ) : (
        <ReviewListSection assets={assets} />
      )}
    </Box>
  );
}
