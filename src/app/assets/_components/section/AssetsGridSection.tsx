import { Box, Grid, Spinner, Text } from "@chakra-ui/react";
import { useGetProducts } from "@/app/_hooks/useProducts";
import type { Asset } from "@/types/asset";
import AssetGridCard from "../AssetGridCard";

interface AssetsGridSectionProps {
  assets: Asset[];
  isLoading: boolean;
}

function AssetsGridSection({ assets, isLoading }: AssetsGridSectionProps) {
  const { data: products } = useGetProducts();
  const productName = (id: string) => products?.find((p) => p.id === id)?.name;

  if (isLoading) {
    return (
      <Box textAlign="center" py={12}>
        <Spinner size="sm" color="brand.700" />
      </Box>
    );
  }

  if (assets.length === 0) {
    return (
      <Box borderWidth="1px" rounded="lg" py={12}>
        <Text fontSize="sm" color="fg.muted" textAlign="center">
          No assets match your filters.
        </Text>
      </Box>
    );
  }

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(220px, 1fr))"
      gap={4}
    >
      {assets.map((asset) => (
        <AssetGridCard
          key={asset.id}
          asset={asset}
          productName={productName(asset.productId)}
        />
      ))}
    </Grid>
  );
}

export default AssetsGridSection;
