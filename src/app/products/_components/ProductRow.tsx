import {
  Badge,
  Button,
  HStack,
  Link,
  Separator,
  Table,
  Text,
} from "@chakra-ui/react";
import { MdEdit, MdOpenInNew } from "react-icons/md";
import type { Product } from "@/types/product";

type ProductRowProps = Pick<
  Product,
  | "id"
  | "name"
  | "productCode"
  | "brand"
  | "category"
  | "targetMarket"
  | "season"
  | "status"
  | "readiness"
>;
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
function ProductRow({ product }: { product: ProductRowProps }) {
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
        <Badge colorPalette={st.colorPalette} variant="subtle" size="sm">
          {st.label}
        </Badge>
      </Table.Cell>
      <Table.Cell py={3} px={4}>
        <Badge colorPalette={rd.colorPalette} variant="subtle" size="sm">
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
}
export default ProductRow;
