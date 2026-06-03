import { Badge, Box, Button, HStack, Spinner, Steps, Text } from "@chakra-ui/react";
import Link from "next/link";
import { MdArrowBack, MdEdit } from "react-icons/md";
import type { Product, ProductStatus } from "@/types/product";
import type { ReadinessReport } from "@/types/readiness";

const statusConfig = {
  DRAFT:     { label: "Draft",      colorPalette: "gray"   },
  IN_REVIEW: { label: "In Review",  colorPalette: "orange" },
  PUBLISHED: { label: "Published",  colorPalette: "green"  },
  ARCHIVED:  { label: "Archived",   colorPalette: "red"    },
} as const;

const statusStep: Record<string, number> = {
  DRAFT:     0,
  IN_REVIEW: 1,
  PUBLISHED: 3,
  ARCHIVED:  3,
};

interface HeaderSectionProps {
  product: Product;
  readiness: ReadinessReport | undefined;
  isUpdating: boolean;
  onStatusChange: (status: ProductStatus) => void;
}

function HeaderSection({ product, readiness, isUpdating, onStatusChange }: HeaderSectionProps) {
  const st = statusConfig[product.status];
  const isArchived = product.status === "ARCHIVED";

  return (
    <Box mb={6}>
      <HStack justify="space-between" align="flex-start" mb={5}>
        <HStack gap={3} align="flex-start">
          <Link href="/products" style={{ marginTop: 6 }}>
            <MdArrowBack size={20} />
          </Link>
          <Box>
            <HStack gap={3}>
              <Text fontSize="2xl" fontWeight="bold">{product.name}</Text>
              <Badge colorPalette={st.colorPalette} variant="subtle">{st.label}</Badge>
              {isArchived && <Badge colorPalette="gray" variant="outline">Archived</Badge>}
            </HStack>
            <Text fontSize="sm" color="fg.muted" mt={0.5}>{product.productCode}</Text>
          </Box>
        </HStack>

        <HStack gap={2}>
          {isUpdating && <Spinner size="sm" color="brand.700" />}
          <Button asChild variant="outline" size="sm">
            <Link href={`/products/${product.id}/edit`}>
              <MdEdit size={14} /> Edit
            </Link>
          </Button>
          {product.status === "DRAFT" && (
            <Button size="sm" variant="outline" colorPalette="orange"
              disabled={isUpdating}
              onClick={() => onStatusChange("IN_REVIEW" as ProductStatus)}>
              Submit for Review
            </Button>
          )}
          {product.status === "IN_REVIEW" && readiness?.canPublish && (
            <Button size="sm" bg="green.600" color="white" _hover={{ bg: "green.700" }}
              disabled={isUpdating}
              onClick={() => onStatusChange("PUBLISHED" as ProductStatus)}>
              Publish
            </Button>
          )}
          {!isArchived && (
            <Button size="sm" variant="outline" colorPalette="red"
              disabled={isUpdating}
              onClick={() => onStatusChange("ARCHIVED" as ProductStatus)}>
              Archive
            </Button>
          )}
        </HStack>
      </HStack>

      {!isArchived && (
        <Steps.Root
          step={statusStep[product.status]}
          count={3}
          size="sm"
          colorPalette="amber"
          linear
        >
          <Steps.List>
            {["Draft", "In Review", "Published"].map((label, i) => (
              <Steps.Item key={label} index={i}>
                <Steps.Trigger>
                  <Steps.Indicator />
                  <Steps.Title fontSize="xs">{label}</Steps.Title>
                </Steps.Trigger>
                {i < 2 && <Steps.Separator />}
              </Steps.Item>
            ))}
          </Steps.List>
        </Steps.Root>
      )}
    </Box>
  );
}

export default HeaderSection;
