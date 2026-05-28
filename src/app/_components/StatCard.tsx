import { Box, HStack, Stat } from "@chakra-ui/react";

interface StatCardProps {
  title: string;
  value: number;
  Icon: React.ElementType;
  helpText?: string;
  colorPalette?: string;
}

function StatCard({
  title,
  value,
  Icon,
  helpText,
  colorPalette = "blue",
}: StatCardProps) {
  return (
    <Stat.Root
      flex="1"
      height="160px"
      justifyContent="space-between"
      borderWidth="1px"
      _hover={{ shadow: "sm" }}
      transition="box-shadow 0.2s ease-in-out"
      p="5"
      rounded="md"
    >
      <HStack justify="space-between">
        <Stat.Label fontWeight="medium">{title}</Stat.Label>
        <Box
          bg={`${colorPalette}.100`}
          color={`${colorPalette}.600`}
          p={2}
          rounded="lg"
          flexShrink={0}
        >
          <Icon size={18} />
        </Box>
      </HStack>
      <Stat.ValueText fontSize={36}>{value}</Stat.ValueText>
      {helpText && (
        <Stat.HelpText mb={0} color="fg.muted" fontSize="xs">
          {helpText}
        </Stat.HelpText>
      )}
    </Stat.Root>
  );
}

export default StatCard;
