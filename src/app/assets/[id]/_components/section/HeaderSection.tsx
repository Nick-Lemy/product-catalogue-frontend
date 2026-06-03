import { Badge, Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import type { Asset } from "@/types/asset";
import { assetStatusConfig } from "../assetStatus";

interface HeaderSectionProps {
  asset: Asset;
}

function HeaderSection({ asset }: HeaderSectionProps) {
  const st = assetStatusConfig[asset.status];

  return (
    <HStack gap={3} align="flex-start" mb={6}>
      <Link href="/assets" style={{ marginTop: 6 }}>
        <MdArrowBack size={20} />
      </Link>
      <Box>
        <HStack gap={3}>
          <Text fontSize="2xl" fontWeight="bold">
            {asset.title}
          </Text>
          <Badge colorPalette={st.colorPalette} variant="subtle">
            {st.label}
          </Badge>
        </HStack>
        <Text fontSize="sm" color="fg.muted" mt={0.5}>
          {asset.fileName}
        </Text>
      </Box>
    </HStack>
  );
}

export default HeaderSection;
