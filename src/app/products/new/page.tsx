"use client";

import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useAddProduct } from "@/app/_hooks/useProducts";
import type { CreateProductPayload } from "@/types/product";
import HeaderSection from "./_components/section/HeaderSection";
import ProductFormSection from "./_components/section/ProductFormSection";

export default function NewProductPage() {
  const router = useRouter();
  const { trigger: addProduct, isMutating, error } = useAddProduct();

  if (error) throw error;

  async function handleSubmit(data: CreateProductPayload) {
    const product = await addProduct(data);
    router.push(`/products/${product.id}`);
  }

  return (
    <Box px={6} pb={10}>
      <HeaderSection />
      <ProductFormSection isSubmitting={isMutating} onSubmit={handleSubmit} />
    </Box>
  );
}
