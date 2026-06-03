import {
  Badge,
  Box,
  Card,
  HStack,
  Progress,
  Separator,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdCheck, MdClose } from "react-icons/md";
import type { ReadinessReport } from "@/types/readiness";

interface ReadinessSectionProps {
  readiness: ReadinessReport | undefined;
  isLoading: boolean;
}

function ReadinessSection({ readiness, isLoading }: ReadinessSectionProps) {
  const metCount = readiness?.checks.filter((c) => c.met).length ?? 0;
  const total    = readiness?.checks.length ?? 0;
  const pct      = total > 0 ? Math.round((metCount / total) * 100) : 0;
  const isReady  = readiness?.canPublish ?? false;

  return (
    <Card.Root variant="outline" size="sm">
      <Card.Header>
        <HStack justify="space-between">
          <Text fontWeight="semibold" fontSize="sm">Readiness</Text>
          {readiness && (
            <Badge colorPalette={isReady ? "green" : "orange"} variant="subtle">
              {isReady ? "Ready to publish" : "Not ready"}
            </Badge>
          )}
        </HStack>
      </Card.Header>
      <Separator />
      <Card.Body>
        {isLoading ? (
          <Spinner size="sm" color="brand.700" />
        ) : (
          <VStack align="stretch" gap={4}>
            <Box>
              <HStack justify="space-between" mb={1.5}>
                <Text fontSize="xs" color="fg.muted">{metCount} of {total} requirements met</Text>
                <Text fontSize="xs" fontWeight="semibold" color={isReady ? "green.600" : "orange.500"}>
                  {pct}%
                </Text>
              </HStack>
              <Progress.Root
                value={pct}
                size="sm"
                colorPalette={isReady ? "green" : "orange"}
                shape="full"
              >
                <Progress.Track>
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
            </Box>

            <VStack align="stretch" gap={1.5}>
              {readiness?.checks.map((check) => (
                <HStack
                  key={check.requirement}
                  gap={3}
                  px={3}
                  py={2}
                  rounded="md"
                  bg={check.met ? "green.50" : "gray.50"}
                >
                  <Box
                    color={check.met ? "green.500" : "gray.400"}
                    flexShrink={0}
                  >
                    {check.met
                      ? <MdCheck size={15} />
                      : <MdClose size={15} />
                    }
                  </Box>
                  <Text
                    fontSize="xs"
                    fontWeight={check.met ? "medium" : "normal"}
                    color={check.met ? "green.700" : "fg.muted"}
                  >
                    {check.requirement}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </VStack>
        )}
      </Card.Body>
    </Card.Root>
  );
}

export default ReadinessSection;
