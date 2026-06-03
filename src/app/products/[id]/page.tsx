"use client";

import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useGetAssets } from "@/app/_hooks/useAssets";
import { useGetProductById, useUpdateProduct } from "@/app/_hooks/useProducts";
import { revalidateReadiness, useGetReadiness } from "@/app/_hooks/useReadiness";
import { useGetVariants } from "@/app/_hooks/useVariants";
import type { ProductStatus } from "@/types/product";
import ContentSection from "./_components/section/ContentSection";
import HeaderSection from "./_components/section/HeaderSection";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: product,  error: productError              } = useGetProductById(id);
  const { data: variants, isLoading: variantsLoading       } = useGetVariants(id);
  const { data: assets,   isLoading: assetsLoading         } = useGetAssets({ productId: id });
  const { data: readiness, isLoading: readinessLoading     } = useGetReadiness(id);
  const { trigger: updateProduct, isMutating: isUpdating   } = useUpdateProduct(id);

  if (productError) throw productError;

  if (!product) {
    return (
      <Flex flex="1" justify="center" align="center" minH="60vh">
        <Spinner color="brand.700" size="lg" />
      </Flex>
    );
  }

  async function handleStatusChange(status: ProductStatus) {
    await updateProduct({ status });
    await revalidateReadiness(id);
  }

  return (
    <Box px={6} pb={10}>
      <HeaderSection
        product={product}
        readiness={readiness}
        isUpdating={isUpdating}
        onStatusChange={handleStatusChange}
      />
      <ContentSection
        product={product}
        variants={variants ?? []}
        assets={assets ?? []}
        readiness={readiness}
        variantsLoading={variantsLoading}
        assetsLoading={assetsLoading}
        readinessLoading={readinessLoading}
      />
    </Box>
  );
}
