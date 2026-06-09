"use client";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/app/_hooks/useDebounce";
import { useGetProducts } from "@/app/_hooks/useProducts";
import { useQueryParams } from "@/app/_hooks/useQueryParams";
import { ProductReadiness, ProductStatus } from "@/types/product";
import SelectFilter from "../SelectFilter";

interface FiltersSectionProps {
  search: string;
  brand: string;
  category: string;
  status: string;
  readiness: string;
}

function FiltersSection({
  search,
  brand,
  category,
  status,
  readiness,
}: FiltersSectionProps) {
  const { setParam, clearParams } = useQueryParams();

  const [inputValue, setInputValue] = useState(search);
  const debouncedSearch = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedSearch.length === 0) {
      setParam("search", "");
      return;
    }
    if (debouncedSearch.length < 3) return;
    setParam("search", debouncedSearch);
  }, [debouncedSearch, setParam]);

  const { data: products, error } = useGetProducts();
  if (error) throw error;

  const brands = [...new Set(products?.map((p) => p.brand))];
  const categories = [...new Set(products?.map((p) => p.category))];
  const statusOptions: ProductStatus[] = Object.values(ProductStatus);
  const readinessOptions: ProductReadiness[] = Object.values(ProductReadiness);

  const hasFilters = search || brand || category || status || readiness;

  return (
    <Box borderWidth="1px" rounded="lg" mb={6}>
      <Flex gap={3} p={4} wrap="wrap" align="flex-end">
        <Box flex="2" minW="180px">
          <Text fontSize="xs" fontWeight="medium" color="fg.muted" mb={1}>
            Search
          </Text>
          <Input
            placeholder="Name or product code..."
            size="sm"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Box>
        <SelectFilter
          title="Brand"
          value={brand}
          setOption={(value) => setParam("brand", value)}
          options={brands}
        />
        <SelectFilter
          title="Category"
          value={category}
          setOption={(value) => setParam("category", value)}
          options={categories}
        />
        <SelectFilter
          title="Status"
          value={status}
          setOption={(value) => setParam("status", value)}
          options={statusOptions}
        />
        <SelectFilter
          title="Readiness"
          value={readiness}
          setOption={(value) => setParam("readiness", value)}
          options={readinessOptions}
        />
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setInputValue("");
              clearParams();
            }}
            color="red.500"
          >
            Clear
          </Button>
        )}
      </Flex>
    </Box>
  );
}

export default FiltersSection;
