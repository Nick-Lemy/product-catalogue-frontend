import { Box, HStack, Text } from "@chakra-ui/react";
import { MdCheck } from "react-icons/md";
import type { ProductStatus } from "@/types/product";

const steps = [
  { key: "DRAFT",     label: "Draft",      palette: "gray"   },
  { key: "IN_REVIEW", label: "In Review",  palette: "orange" },
  { key: "PUBLISHED", label: "Published",  palette: "green"  },
] as const;

const statusIndex: Record<string, number> = {
  DRAFT: 0,
  IN_REVIEW: 1,
  PUBLISHED: 2,
};

interface StatusStepperProps {
  status: ProductStatus;
}

function StatusStepper({ status }: StatusStepperProps) {
  const current = statusIndex[status] ?? 0;

  return (
    <HStack gap={0} align="center">
      {steps.map((step, i) => {
        const isDone    = i < current;
        const isCurrent = i === current;
        const isActive  = isDone || isCurrent;

        return (
          <HStack key={step.key} gap={0} flex={i < steps.length - 1 ? 1 : "0"}>
            <HStack gap={2} flexShrink={0}>
              <Box
                w={7}
                h={7}
                rounded="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xs"
                fontWeight="bold"
                bg={isActive ? `${step.palette}.100` : "bg.muted"}
                color={isActive ? `${step.palette}.700` : "fg.muted"}
                borderWidth="1px"
                borderColor={isCurrent ? `${step.palette}.300` : "transparent"}
                transition="all 0.2s"
              >
                {isDone ? <MdCheck size={14} /> : i + 1}
              </Box>
              <Text
                fontSize="xs"
                fontWeight={isCurrent ? "semibold" : "medium"}
                color={isActive ? `${step.palette}.700` : "fg.muted"}
              >
                {step.label}
              </Text>
            </HStack>

            {i < steps.length - 1 && (
              <Box
                flex="1"
                h="2px"
                mx={3}
                rounded="full"
                bg={i < current ? `${steps[i].palette}.300` : "bg.muted"}
                transition="all 0.2s"
              />
            )}
          </HStack>
        );
      })}
    </HStack>
  );
}

export default StatusStepper;
