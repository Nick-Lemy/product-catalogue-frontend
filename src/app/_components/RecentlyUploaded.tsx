"use client";
import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Link,
  Separator,
  Text,
} from "@chakra-ui/react";
import { BsArrowRight } from "react-icons/bs";
import { useGetStats } from "../_hooks/useStats";
import Loading from "../loading";
import AssetCard from "./AssetCard";

function RecentlyUploaded() {
  const { data: dashboardStats, isLoading, error } = useGetStats();
  if (error) throw error;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Card.Root variant="outline" size="sm">
      <Card.Header>
        <HStack justify="space-between" align="flex-start">
          <Box>
            <Text fontWeight="semibold" fontSize="sm">
              Recently Uploaded
            </Text>
            <Text fontSize="xs" color="fg.muted" mt={0.5}>
              Latest asset uploads.
            </Text>
          </Box>
          <Button asChild variant="ghost" size="xs" colorPalette="blue.700">
            <Link href="/assets">
              <BsArrowRight size={20} />
            </Link>
          </Button>
        </HStack>
      </Card.Header>
      <Separator />
      <Card.Body pt={3} px={3}>
        <Flex direction="column" gap={1}>
          {dashboardStats?.recentAssets.map((asset) => {
            return (
              <AssetCard
                key={asset.id}
                asset={{
                  id: asset.id,
                  title: asset.title,
                  fileUrl: asset.fileUrl,
                  uploadedAt: asset.uploadedAt,
                  status: asset.status as
                    | "APPROVED"
                    | "PENDING_REVIEW"
                    | "REJECTED",
                }}
              />
            );
          })}
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}

export default RecentlyUploaded;
