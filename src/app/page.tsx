import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  HStack,
  Separator,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import {
  MdAddBox,
  MdCloudDone,
  MdCloudUpload,
  MdInventory2,
  MdPendingActions,
  MdRateReview,
  MdRocketLaunch,
} from "react-icons/md";
import { mockDashboardStats } from "@/mocks/stats";
import BarListUI from "./_components/BarList";
import StatCard from "./_components/StatCard";

const statusBadge = {
  APPROVED: { label: "Approved", colorPalette: "green" },
  PENDING_REVIEW: { label: "Pending", colorPalette: "orange" },
  REJECTED: { label: "Rejected", colorPalette: "red" },
} as const;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Home() {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Box px={6} pb={10}>
      {/* Header */}
      <HStack justify="space-between" align="flex-start" mb={8}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            Welcome back,{" "}
            <Text as="span" color="blue.800">
              Nick!
            </Text>
          </Text>
          <Text fontSize="sm" color="fg.muted" mt={1}>
            {today}
          </Text>
        </Box>
        <Button
          size="sm"
          bg="brand.700"
          _hover={{ bg: "brand.700", color: "white" }}
        >
          <Link href="/products/new">+ Add Product</Link>
        </Button>
      </HStack>

      {/* Stat Cards */}
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

      {/* Middle grid */}
      <Grid templateColumns="1fr 1fr" gap={6} mb={6}>
        {/* Products by Brand */}
        <Card.Root variant="outline" size="sm">
          <Card.Header>
            <HStack justify="space-between" align="flex-start">
              <Box>
                <Text fontWeight="semibold" fontSize="sm">
                  Products by Brand
                </Text>
                <Text fontSize="xs" color="fg.muted" mt={0.5}>
                  Distribution across all brands
                </Text>
              </Box>
              <Button asChild variant="ghost" size="xs" colorPalette="blue.700">
                <Link href="/products">
                  <BsArrowRight size={20} />
                </Link>
              </Button>
            </HStack>
          </Card.Header>
          <Separator />
          <Card.Body pt={4}>
            <BarListUI
              data={mockDashboardStats.productsByBrand}
              title="Brand"
              titleLabel1="Products"
            />
          </Card.Body>
        </Card.Root>

        {/* Recently Uploaded */}
        <Card.Root variant="outline" size="sm">
          <Card.Header>
            <HStack justify="space-between" align="flex-start">
              <Box>
                <Text fontWeight="semibold" fontSize="sm">
                  Recently Uploaded
                </Text>
                <Text fontSize="xs" color="fg.muted" mt={0.5}>
                  Latest asset uploads
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
              {mockDashboardStats.recentAssets.map((asset) => {
                const badge =
                  statusBadge[asset.status as keyof typeof statusBadge];
                return (
                  <HStack
                    key={asset.id}
                    px={2}
                    py={2}
                    rounded="md"
                    _hover={{ bg: "bg.subtle" }}
                    transition="background 0.15s"
                    gap={3}
                    cursor="pointer"
                  >
                    <Box
                      w="40px"
                      h="40px"
                      rounded="md"
                      overflow="hidden"
                      flexShrink={0}
                      bg="bg.muted"
                    >
                      <Image
                        src={asset.fileUrl}
                        alt={asset.title}
                        width={40}
                        height={40}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                    <Box flex="1" minW={0}>
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {asset.title}
                      </Text>
                      <Text fontSize="xs" color="fg.muted">
                        {formatDate(asset.uploadedAt)}
                      </Text>
                    </Box>
                    <Badge
                      colorPalette={badge.colorPalette}
                      variant="subtle"
                      size="xs"
                      flexShrink={0}
                    >
                      {badge.label}
                    </Badge>
                  </HStack>
                );
              })}
            </Flex>
          </Card.Body>
        </Card.Root>
      </Grid>

      {/* Quick Actions */}
      <Card.Root variant="outline" size="sm">
        <Card.Header>
          <Text fontWeight="semibold" fontSize="sm">
            Quick Actions
          </Text>
          <Text fontSize="xs" color="fg.muted" mt={0.5}>
            Common tasks you might want to do
          </Text>
        </Card.Header>
        <Separator />
        <Card.Body>
          <Grid templateColumns="1fr 1fr 1fr" gap={4}>
            <Button
              asChild
              _hover={{ bg: "brand.700", color: "white" }}
              variant="outline"
              h="24"
              flexDirection="column"
              gap={2}
            >
              <Link href="/products/new">
                <MdAddBox size={24} />
                New Product
              </Link>
            </Button>
            <Button
              asChild
              _hover={{ bg: "brand.700", color: "white" }}
              variant="outline"
              h="24"
              flexDirection="column"
              gap={2}
            >
              <Link href="/assets/upload">
                <MdCloudUpload size={24} />
                Upload Asset
              </Link>
            </Button>
            <Button
              asChild
              _hover={{ bg: "brand.700", color: "white" }}
              variant="outline"
              h="24"
              flexDirection="column"
              gap={2}
            >
              <Link href="/assets/review">
                <MdRateReview size={24} />
                Review Queue
              </Link>
            </Button>
          </Grid>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
