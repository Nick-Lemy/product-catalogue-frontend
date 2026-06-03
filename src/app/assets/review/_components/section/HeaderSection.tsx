import { Badge, Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

interface HeaderSectionProps {
  pendingCount: number;
}

function HeaderSection({ pendingCount }: HeaderSectionProps) {
  return (
    <HStack gap={3} align="flex-start" mb={6}>
      <Link href="/assets" style={{ marginTop: 6 }}>
        <MdArrowBack size={20} />
      </Link>
      <Box>
        <HStack gap={3}>
          <Text fontSize="2xl" fontWeight="bold">
            Review Queue
          </Text>
          {pendingCount > 0 && (
            <Badge colorPalette="orange" variant="subtle">
              {pendingCount} pending
            </Badge>
          )}
        </HStack>
        <Text fontSize="sm" color="fg.muted" mt={0.5}>
          Approve or reject assets awaiting review.
        </Text>
      </Box>
    </HStack>
  );
}

export default HeaderSection;
