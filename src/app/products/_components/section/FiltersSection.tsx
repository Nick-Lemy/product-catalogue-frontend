import { Box, Button, Flex, Input, NativeSelect, Text } from "@chakra-ui/react";
import { mockProducts } from "@/mocks/products";

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
        <Box flex="1" minW="130px">
          <Text fontSize="xs" fontWeight="medium" color="fg.muted" mb={1}>
            Brand
          </Text>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="">All brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Box>
        <Box flex="1" minW="130px">
          <Text fontSize="xs" fontWeight="medium" color="fg.muted" mb={1}>
            Category
          </Text>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Box>
        <Box flex="1" minW="130px">
          <Text fontSize="xs" fontWeight="medium" color="fg.muted" mb={1}>
            Status
          </Text>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All statuses</option>
              <option value="DRAFT">Draft</option>
              <option value="IN_REVIEW">In Review</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Box>
        <Box flex="1" minW="130px">
          <Text fontSize="xs" fontWeight="medium" color="fg.muted" mb={1}>
            Readiness
          </Text>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field
              value={readiness}
              onChange={(e) => setReadiness(e.target.value)}
            >
              <option value="">All</option>
              <option value="READY">Ready</option>
              <option value="NOT_READY">Not Ready</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Box>
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
