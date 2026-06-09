"use client";
import { Box, Button, Flex, Input, NativeSelect, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/app/_hooks/useDebounce";
import { useGetProducts } from "@/app/_hooks/useProducts";
import { useQueryParams } from "@/app/_hooks/useQueryParams";
import SelectFilter from "@/app/products/_components/SelectFilter";
import { AssetStatus, AssetType } from "@/types/asset";

interface FiltersSectionProps {
  search: string;
  productId: string;
  assetType: string;
  status: string;
}

function FiltersSection({
  search,
  productId,
  assetType,
  status,
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

  const typeOptions: AssetType[] = Object.values(AssetType);
  const statusOptions: AssetStatus[] = Object.values(AssetStatus);

  const hasFilters = search || productId || assetType || status;

  return (
    <Box borderWidth="1px" rounded="lg" mb={6}>
      <Flex gap={3} p={4} wrap="wrap" align="flex-end">
        <Box flex="2" minW="180px">
          <Text fontSize="xs" fontWeight="medium" color="fg.muted" mb={1}>
            Search
          </Text>
          <Input
            placeholder="File name..."
            size="sm"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Box>

        <Box flex="1" minW="130px">
          <Text fontSize="xs" fontWeight="medium" color="fg.muted" mb={1}>
            Product
          </Text>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field
              value={productId}
              onChange={(e) => setParam("productId", e.target.value)}
            >
              <option value="">All Products</option>
              {products?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Box>

        <SelectFilter
          title="Type"
          value={assetType}
          setOption={(value) => setParam("assetType", value)}
          options={typeOptions}
        />
        <SelectFilter
          title="Status"
          value={status}
          setOption={(value) => setParam("status", value)}
          options={statusOptions}
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
