import { HStack, Stat } from "@chakra-ui/react";
import { LuDollarSign } from "react-icons/lu";

interface StatCardProps {
  title: string;
  value: number;
  Icon: React.ElementType;
}

function StatCard({ title, value, Icon }: StatCardProps) {
  return (
    <Stat.Root
      maxW="300px"
      height="150px"
      justifyContent={"space-between"}
      borderWidth="1px"
      _hover={{ shadow: "sm" }}
      transition="box-shadow 0.2s ease-in-out"
      p="4"
      rounded="md"
    >
      <HStack justify="space-between">
        <Stat.Label>{title}</Stat.Label>
        <Icon color="fg.muted">
          <LuDollarSign />
        </Icon>
      </HStack>
      <Stat.ValueText fontSize={34}>{value}</Stat.ValueText>
    </Stat.Root>
  );
}

export default StatCard;
