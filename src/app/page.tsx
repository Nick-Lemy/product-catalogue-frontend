import { Box, Flex, Text } from "@chakra-ui/react";
import { AiOutlineProduct } from "react-icons/ai";
import { MdInventory } from "react-icons/md";
import { mockDashboardStats } from "@/mocks/stats";
import BarListUI from "./_components/BarList";
import StatCard from "./_components/StatCard";

export default function Home() {
  return (
    <>
      <Box>
        <Text fontSize="2xl" fontWeight="bold">
          Welcome Back,{" "}
          <Text as="span" color="blue.700">
            Nick!
          </Text>
        </Text>
        <Text my={2}>Here's what's happening with your products today</Text>
      </Box>
      <Flex mt={4} gap={4} w="full" rounded="md">
        <StatCard
          title="Total Products"
          Icon={AiOutlineProduct}
          value={mockDashboardStats.totalProducts}
        />
        <StatCard
          title="Published Products"
          Icon={MdInventory}
          value={mockDashboardStats.publishedProducts}
        />
        <StatCard
          Icon={AiOutlineProduct}
          title="Ready to Publish"
          value={mockDashboardStats.readyToPublish}
        />
        <StatCard
          Icon={AiOutlineProduct}
          title="Assets Pending Review"
          value={mockDashboardStats.assetsPendingReview}
        />
      </Flex>
      <Flex mt={4} gap={4} w="full" rounded="md">
        <BarListUI
          data={mockDashboardStats.productsByBrand}
          title="Top Brands"
          titleLabel1="Product"
        />
      </Flex>
    </>
  );
}
