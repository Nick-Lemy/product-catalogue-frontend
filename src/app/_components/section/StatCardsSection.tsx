"use client";
import { Flex } from "@chakra-ui/react";
import {
  MdCloudDone,
  MdInventory2,
  MdPendingActions,
  MdRocketLaunch,
} from "react-icons/md";
import { useGetStats } from "@/app/_hooks/useStats";
import StatCard from "../ui/StatCard";

function StatCardsSection() {
  const { data: stats, isLoading, error } = useGetStats();

  if (error) throw error;

  const {
    totalProducts,
    publishedProducts,
    readyToPublish,
    assetsPendingReview,
  } = stats! ?? {};

  return (
    <Flex gap={4} mb={6}>
      <StatCard
        title="Total Products"
        value={isLoading ? "..." : totalProducts}
        Icon={MdInventory2}
        helpText="across all brands"
        colorPalette="blue"
      />
      <StatCard
        title="Published"
        value={isLoading ? "..." : publishedProducts}
        Icon={MdCloudDone}
        helpText="live in catalogue"
        colorPalette="green"
      />
      <StatCard
        title="Ready to Publish"
        value={isLoading ? "..." : readyToPublish}
        Icon={MdRocketLaunch}
        helpText="awaiting sign-off"
        colorPalette="teal"
      />
      <StatCard
        title="Pending Review"
        value={isLoading ? "..." : assetsPendingReview}
        Icon={MdPendingActions}
        helpText="assets in queue"
        colorPalette="orange"
      />
    </Flex>
  );
}
export default StatCardsSection;
