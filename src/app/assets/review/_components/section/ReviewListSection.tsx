import { Box, Center, Icon, Stack, Text } from "@chakra-ui/react";
import { MdInbox } from "react-icons/md";
import { useGetProducts } from "@/app/_hooks/useProducts";
import type { Asset } from "@/types/asset";
import ReviewItem from "../ReviewItem";

interface ReviewListSectionProps {
  assets: Asset[];
}

function ReviewListSection({ assets }: ReviewListSectionProps) {
  const { data: products } = useGetProducts();
  const productName = (id: string) => products?.find((p) => p.id === id)?.name;

  if (assets.length === 0) {
    return (
      <Center
        flexDirection="column"
        gap={3}
        py={16}
        borderWidth="1px"
        borderStyle="dashed"
        rounded="lg"
        color="fg.muted"
      >
        <Icon size="lg">
          <MdInbox />
        </Icon>
        <Box textAlign="center">
          <Text fontWeight="medium">All caught up</Text>
          <Text fontSize="sm">No assets are waiting for review.</Text>
        </Box>
      </Center>
    );
  }

  return (
    <Stack gap={4}>
      {assets.map((asset) => (
        <ReviewItem
          key={asset.id}
          asset={asset}
          productName={productName(asset.productId)}
        />
      ))}
    </Stack>
  );
}

export default ReviewListSection;
