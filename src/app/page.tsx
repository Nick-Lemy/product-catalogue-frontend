import { Box } from "@chakra-ui/react";
import HeaderSection from "./_components/section/HeaderSection";
import MiddleGridSection from "./_components/section/MiddleGridSection";
import QuickActionsSection from "./_components/section/QuickActionsSection";
import StatCardsSection from "./_components/section/StatCardsSection";

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
