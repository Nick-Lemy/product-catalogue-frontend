import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Link,
  Separator,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import { mockDashboardStats } from "@/mocks/stats";
import { formatDate } from "@/utils/helpers";

const statusBadge = {
  APPROVED: { label: "Approved", colorPalette: "green" },
  PENDING_REVIEW: { label: "Pending", colorPalette: "orange" },
  REJECTED: { label: "Rejected", colorPalette: "red" },
} as const;

function RecentlyUploaded() {
  return (
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
            const badge = statusBadge[asset.status as keyof typeof statusBadge];
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
                    {formatDate(new Date(asset.uploadedAt), false)}
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
  );
}

export default RecentlyUploaded;
