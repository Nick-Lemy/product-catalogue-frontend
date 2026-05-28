import { Box } from "@chakra-ui/react";
import HeaderSection from "./_components/HeaderSection";
import MiddleGridSection from "./_components/MiddleGridSection";
import QuickActionsSection from "./_components/QuickActionsSection";
import StatCardsSection from "./_components/StatCardsSection";

export default function Home() {
  return (
    <Box px={6} pb={10}>
      <HeaderSection />
      <StatCardsSection />
      <MiddleGridSection />
      <QuickActionsSection />
    </Box>
  );
}
