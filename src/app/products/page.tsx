"use client";

import { Box } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { mockProducts } from "@/mocks/products";
import FiltersSection from "./_components/section/FiltersSection";
import HeaderSection from "./_components/section/HeaderSection";
import PaginationSection from "./_components/section/PaginationSection";
import ProductsTableSection from "./_components/section/ProductsTableSection";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [readiness, setReadiness] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const filtered = useMemo(() => {
    setPage(1);
    return mockProducts.filter((p) => {
      const q = search.toLowerCase();
      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !p.productCode.toLowerCase().includes(q)
      )
        return false;
      if (brand && p.brand !== brand) return false;
      if (category && p.category !== category) return false;
      if (status && p.status !== status) return false;
      if (readiness && p.readiness !== readiness) return false;
      return true;
    });
  }, [search, brand, category, status, readiness]);

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Box px={6} pb={10}>
      <HeaderSection filteredProductsCount={filtered.length} />
      <FiltersSection
        search={search}
        setSearch={setSearch}
        brand={brand}
        setBrand={setBrand}
        category={category}
        setCategory={setCategory}
        status={status}
        setStatus={setStatus}
        readiness={readiness}
        setReadiness={setReadiness}
      />

      <ProductsTableSection
        filteredProducts={filtered}
        paginatedProducts={paginated}
      />

      {filtered.length > pageSize && (
        <PaginationSection
          filteredProductsCount={filtered.length}
          pageSize={pageSize}
          page={page}
          setPage={setPage}
        />
      )}
    </Box>
  );
}
