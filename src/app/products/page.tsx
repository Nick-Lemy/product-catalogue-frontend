"use client";

import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  NativeSelect,
  Pagination,
  Separator,
  Table,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { MdEdit, MdOpenInNew } from "react-icons/md";
import { mockProducts } from "@/mocks/products";
import HeaderSection from "./_components/section/HeaderSection";

const statusConfig: Record<string, { label: string; colorPalette: string }> = {
  DRAFT: { label: "Draft", colorPalette: "gray" },
  IN_REVIEW: { label: "In Review", colorPalette: "orange" },
  PUBLISHED: { label: "Published", colorPalette: "green" },
  ARCHIVED: { label: "Archived", colorPalette: "red" },
};

const readinessConfig: Record<string, { label: string; colorPalette: string }> =
  {
    READY: { label: "Ready", colorPalette: "teal" },
    NOT_READY: { label: "Not Ready", colorPalette: "gray" },
  };

const brands = [...new Set(mockProducts.map((p) => p.brand))];
const categories = [...new Set(mockProducts.map((p) => p.category))];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [readiness, setReadiness] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

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

  const clearFilters = () => {
    setSearch("");
    setBrand("");
    setCategory("");
    setStatus("");
    setReadiness("");
  };

  const hasFilters = search || brand || category || status || readiness;

  return (
    <Box px={6} pb={10}>
      <HeaderSection filteredProductsCount={filtered.length} />

      {/* Filters */}
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

      {/* Table */}
      <Box borderWidth="1px" rounded="lg" overflow="hidden">
        <Table.Root size="sm" variant="outline" striped>
          <Table.Header bg="bg.subtle">
            <Table.Row>
              <Table.ColumnHeader py={3} px={4}>
                Product
              </Table.ColumnHeader>
              <Table.ColumnHeader py={3} px={4}>
                Brand
              </Table.ColumnHeader>
              <Table.ColumnHeader py={3} px={4}>
                Category
              </Table.ColumnHeader>
              <Table.ColumnHeader py={3} px={4}>
                Market
              </Table.ColumnHeader>
              <Table.ColumnHeader py={3} px={4}>
                Season
              </Table.ColumnHeader>
              <Table.ColumnHeader py={3} px={4}>
                Status
              </Table.ColumnHeader>
              <Table.ColumnHeader py={3} px={4}>
                Readiness
              </Table.ColumnHeader>
              <Table.ColumnHeader py={3} px={4} />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filtered.length === 0 ? (
              <Table.Row>
                <Table.Cell
                  colSpan={8}
                  textAlign="center"
                  py={12}
                  color="fg.muted"
                >
                  No products match your filters.
                </Table.Cell>
              </Table.Row>
            ) : (
              paginated.map((product) => {
                const st = statusConfig[product.status];
                const rd = readinessConfig[product.readiness];
                return (
                  <Table.Row
                    key={product.id}
                    _hover={{ bg: "bg.subtle" }}
                    transition="background 0.15s"
                  >
                    <Table.Cell py={3} px={4}>
                      <Text fontWeight="medium" fontSize="sm">
                        {product.name}
                      </Text>
                      <Text fontSize="xs" color="fg.muted">
                        {product.productCode}
                      </Text>
                    </Table.Cell>
                    <Table.Cell py={3} px={4} fontSize="sm">
                      {product.brand}
                    </Table.Cell>
                    <Table.Cell py={3} px={4} fontSize="sm">
                      {product.category}
                    </Table.Cell>
                    <Table.Cell py={3} px={4} fontSize="sm">
                      {product.targetMarket}
                    </Table.Cell>
                    <Table.Cell py={3} px={4} fontSize="sm">
                      {product.season}
                    </Table.Cell>
                    <Table.Cell py={3} px={4}>
                      <Badge
                        colorPalette={st.colorPalette}
                        variant="subtle"
                        size="sm"
                      >
                        {st.label}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell py={3} px={4}>
                      <Badge
                        colorPalette={rd.colorPalette}
                        variant="subtle"
                        size="sm"
                      >
                        {rd.label}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell py={3} px={4}>
                      <HStack gap={1} justify="flex-end">
                        <Button asChild variant="ghost" size="xs">
                          <Link href={`/products/${product.id}`}>
                            <MdOpenInNew size={14} />
                            View
                          </Link>
                        </Button>
                        <Separator orientation="vertical" h="4" />
                        <Button asChild variant="ghost" size="xs">
                          <Link href={`/products/${product.id}/edit`}>
                            <MdEdit size={14} />
                            Edit
                          </Link>
                        </Button>
                      </HStack>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            )}
          </Table.Body>
        </Table.Root>
      </Box>

      {/* Pagination */}
      {filtered.length > pageSize && (
        <Pagination.Root
          count={filtered.length}
          pageSize={pageSize}
          page={page}
          onPageChange={(e) => setPage(e.page)}
          mt={4}
        >
          <ButtonGroup variant="ghost" size="sm">
            <Pagination.PrevTrigger asChild>
              <IconButton aria-label="Previous page">
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>
            <Pagination.Items
              render={(p) => (
                <IconButton
                  aria-label={`Page ${p.value}`}
                  variant={p.type === "page" ? "outline" : "ghost"}
                  onClick={() => setPage(p.value)}
                >
                  {p.value}
                </IconButton>
              )}
            />
            <Pagination.NextTrigger asChild>
              <IconButton aria-label="Next page">
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      )}
    </Box>
  );
}
