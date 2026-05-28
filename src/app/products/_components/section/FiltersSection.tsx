import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { mockProducts } from "@/mocks/products";
import { ProductReadiness, ProductStatus } from "@/types/product";
import SelectFilter from "../SelectFilter";

interface FiltersSectionProps {
  search: string;
  setSearch: (value: string) => void;
  brand: string;
  setBrand: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  readiness: string;
  setReadiness: (value: string) => void;
}

function FiltersSection({
  search,
  setSearch,
  brand,
  setBrand,
  category,
  setCategory,
  status,
  setStatus,
  readiness,
  setReadiness,
}: FiltersSectionProps) {
  const brands = [...new Set(mockProducts.map((p) => p.brand))];
  const categories = [...new Set(mockProducts.map((p) => p.category))];
  const statusOptions: ProductStatus[] = Object.values(ProductStatus);
  const readinessOptions: ProductReadiness[] = Object.values(ProductReadiness);

  const hasFilters = search || brand || category || status || readiness;

  const clearFilters = () => {
    setSearch("");
    setBrand("");
    setCategory("");
    setStatus("");
    setReadiness("");
  };

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
        <SelectFilter
          title="Brand"
          value={brand}
          setOption={setBrand}
          options={brands}
        />
        <SelectFilter
          title="Category"
          value={category}
          setOption={setCategory}
          options={categories}
        />
        <SelectFilter
          title="Status"
          value={status}
          setOption={setStatus}
          options={statusOptions}
        />
        <SelectFilter
          title="Readiness"
          value={readiness}
          setOption={setReadiness}
          options={readinessOptions}
        />
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            color="fg.muted"
          >
            Clear
          </Button>
        )}
      </Flex>
    </Box>
  );
}

export default FiltersSection;
