import { Flex } from "@chakra-ui/react";
import {
  MdCloudDone,
  MdInventory2,
  MdPendingActions,
  MdRocketLaunch,
} from "react-icons/md";
import { mockDashboardStats } from "@/mocks/data/stats";
import StatCard from "../ui/StatCard";

function StatCardsSection() {
  return (
    <Flex gap={4} mb={6}>
      <StatCard
        title="Total Products"
        value={mockDashboardStats.totalProducts}
        Icon={MdInventory2}
        helpText="across all brands"
        colorPalette="blue"
      />
      <StatCard
        title="Published"
        value={mockDashboardStats.publishedProducts}
        Icon={MdCloudDone}
        helpText="live in catalogue"
        colorPalette="green"
      />
      <StatCard
        title="Ready to Publish"
        value={mockDashboardStats.readyToPublish}
        Icon={MdRocketLaunch}
        helpText="awaiting sign-off"
        colorPalette="teal"
      />
      <StatCard
        title="Pending Review"
        value={mockDashboardStats.assetsPendingReview}
        Icon={MdPendingActions}
        helpText="assets in queue"
        colorPalette="orange"
      />
    </Flex>
  );
}
export default StatCardsSection;
