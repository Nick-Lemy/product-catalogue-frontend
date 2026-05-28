import { Box, Table } from "@chakra-ui/react";
import type { Product } from "@/types/product";
import ProductRow from "../ProductRow";

interface ProductsTableSectionProps {
  filteredProducts: Product[];
  paginatedProducts: Product[];
}

const columHeaders = [
  "Product",
  "Brand",
  "Category",
  "Market",
  "Season",
  "Status",
  "Readiness",
];
function ProductsTableSection({
  filteredProducts,
  paginatedProducts,
}: ProductsTableSectionProps) {
  return (
    <Box borderWidth="1px" rounded="lg" overflow="hidden">
      <Table.Root size="sm" variant="outline" striped>
        <Table.Header bg="bg.subtle">
          <Table.Row>
            {columHeaders.map((header) => (
              <Table.ColumnHeader py={3} px={4} key={header}>
                {header}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredProducts.length === 0 ? (
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
            paginatedProducts.map((product) => {
              return <ProductRow key={product.id} product={{ ...product }} />;
            })
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

export default ProductsTableSection;
