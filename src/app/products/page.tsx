"use client";

import { Box } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import type { ProductReadiness, ProductStatus } from "@/types/product";
import { useGetProducts } from "../_hooks/useProducts";
import FiltersSection from "./_components/section/FiltersSection";
import HeaderSection from "./_components/section/HeaderSection";
import ProductsTableSection from "./_components/section/ProductsTableSection";

export default function ProductsPage() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const brand = searchParams.get("brand") ?? "";
  const category = searchParams.get("category") ?? "";
  const status = (searchParams.get("status") as ProductStatus) ?? "";
  const readiness = (searchParams.get("readiness") as ProductReadiness) ?? "";

  const { data: products = [], error } = useGetProducts({
    name: search || undefined,
    brand: brand || undefined,
    category: category || undefined,
    status: (status as ProductStatus) || undefined,
    readiness: (readiness as ProductReadiness) || undefined,
  });

  if (error) throw error;

  return (
    <Box px={6} pb={10}>
      <HeaderSection filteredProductsCount={products.length} />
      <FiltersSection
        search={search}
        brand={brand}
        category={category}
        status={status}
        readiness={readiness}
      />

      <ProductsTableSection
        filteredProducts={products}
        paginatedProducts={products}
      />
    </Box>
  );
}
