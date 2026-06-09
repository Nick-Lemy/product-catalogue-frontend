import { Table } from "@chakra-ui/react";
import type { Variant } from "@/types/variant";
import VariantRow from "./VariantRow";

const columnHeaders = ["Name", "Code", "Colour", "Size", "Material", "Barcode", ""];

interface VariantsTableProps {
  variants: Variant[];
  deletingId: string | null;
  onEdit: (variant: Variant) => void;
  onDelete: (id: string) => void;
}

function VariantsTable({ variants, deletingId, onEdit, onDelete }: VariantsTableProps) {
  return (
    <Table.Root size="sm" variant="outline" striped>
      <Table.Header>
        <Table.Row>
          {columnHeaders.map((header) => (
            <Table.ColumnHeader key={header} py={2} px={4}>
              {header}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {variants.map((variant) => (
          <VariantRow
            key={variant.id}
            variant={variant}
            isDeleting={deletingId === variant.id}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default VariantsTable;
