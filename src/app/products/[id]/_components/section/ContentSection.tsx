import { Grid, Tabs } from "@chakra-ui/react";
import type { Asset } from "@/types/asset";
import type { Product } from "@/types/product";
import type { ReadinessReport } from "@/types/readiness";
import type { Variant } from "@/types/variant";
import AssetsSection from "./AssetsSection";
import InfoSection from "./InfoSection";
import ReadinessSection from "./ReadinessSection";
import VariantsSection from "./VariantsSection";

interface ContentSectionProps {
  product: Product;
  variants: Variant[];
  assets: Asset[];
  readiness: ReadinessReport | undefined;
  variantsLoading: boolean;
  assetsLoading: boolean;
  readinessLoading: boolean;
}

function ContentSection({
  product,
  variants,
  assets,
  readiness,
  variantsLoading,
  assetsLoading,
  readinessLoading,
}: ContentSectionProps) {
  return (
    <Tabs.Root defaultValue="overview" variant="enclosed" size="sm">
      <Tabs.List mb={4}>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="variants">Variants ({variants.length})</Tabs.Trigger>
        <Tabs.Trigger value="assets">Assets ({assets.length})</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="overview">
        <Grid templateColumns="1.4fr 1fr" gap={6}>
          <InfoSection product={product} />
          <ReadinessSection readiness={readiness} isLoading={readinessLoading} />
        </Grid>
      </Tabs.Content>

      <Tabs.Content value="variants">
        <VariantsSection
          productId={product.id}
          variants={variants}
          isLoading={variantsLoading}
        />
      </Tabs.Content>

      <Tabs.Content value="assets">
        <AssetsSection
          productId={product.id}
          assets={assets}
          variants={variants}
          isLoading={assetsLoading}
        />
      </Tabs.Content>
    </Tabs.Root>
  );
}

export default ContentSection;
