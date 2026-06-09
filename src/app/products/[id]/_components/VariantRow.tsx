import { Button, HStack, Table } from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import type { Variant } from "@/types/variant";

interface VariantRowProps {
  variant: Variant;
  isDeleting: boolean;
  onEdit: (variant: Variant) => void;
  onDelete: (id: string) => void;
}

function VariantRow({ variant, isDeleting, onEdit, onDelete }: VariantRowProps) {
  return (
    <Table.Row _hover={{ bg: "bg.subtle" }}>
      <Table.Cell py={2} px={4} fontSize="sm">
        {variant.name}
      </Table.Cell>
      <Table.Cell py={2} px={4} fontSize="sm">
        {variant.variantCode}
      </Table.Cell>
      <Table.Cell py={2} px={4} fontSize="sm">
        {variant.colour}
      </Table.Cell>
      <Table.Cell py={2} px={4} fontSize="sm">
        {variant.size}
      </Table.Cell>
      <Table.Cell py={2} px={4} fontSize="sm">
        {variant.material}
      </Table.Cell>
      <Table.Cell py={2} px={4} fontSize="sm">
        {variant.barcode ?? "—"}
      </Table.Cell>
      <Table.Cell py={2} px={4}>
        <HStack gap={1} justify="flex-end">
          <Button variant="ghost" size="xs" onClick={() => onEdit(variant)}>
            <MdEdit size={13} /> Edit
          </Button>
          <Button
            variant="ghost"
            size="xs"
            colorPalette="red"
            loading={isDeleting}
            onClick={() => onDelete(variant.id)}
          >
            <MdDelete size={13} />
          </Button>
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
}

export default VariantRow;
