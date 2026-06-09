"use client";

import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useGetProductById, useUpdateProduct } from "@/app/_hooks/useProducts";
import type { CreateProductPayload } from "@/types/product";
import HeaderSection from "./_components/section/HeaderSection";
import ProductFormSection from "./_components/section/ProductFormSection";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: product, error } = useGetProductById(id);
  const { trigger: updateProduct, isMutating } = useUpdateProduct(id);

  if (error) throw error;

  if (!product) {
    return (
      <Flex flex="1" justify="center" align="center" minH="60vh">
        <Spinner color="brand.700" size="lg" />
      </Flex>
    );
  }

  async function handleSubmit(data: CreateProductPayload) {
    await updateProduct(data);
    router.push(`/products/${id}`);
  }

  return (
    <Box px={6} pb={10}>
      <HeaderSection productId={id} productName={product.name} />
      <ProductFormSection
        product={product}
        isSubmitting={isMutating}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
