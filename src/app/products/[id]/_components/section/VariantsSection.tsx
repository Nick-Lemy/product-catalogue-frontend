"use client";

import {
  Button,
  Card,
  HStack,
  Separator,
  Spinner,
  Table,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import {
  useAddVariant,
  useDeleteVariant,
  useUpdateVariant,
} from "@/app/_hooks/useVariants";
import type { CreateVariantPayload, Variant } from "@/types/variant";
import VariantFormDialog from "../VariantFormDialog";

interface VariantsSectionProps {
  productId: string;
  variants: Variant[];
  isLoading: boolean;
}

function VariantsSection({
  productId,
  variants,
  isLoading,
}: VariantsSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState<Variant | null>(null);

  const { trigger: addVariant, isMutating: isAdding } =
    useAddVariant(productId);
  const { trigger: updateVariant, isMutating: isUpdating } = useUpdateVariant(
    productId,
    editingVariant?.id ?? "",
  );
  const { trigger: deleteVariant, isMutating: isDeleting } = useDeleteVariant(
    productId,
    "",
  );

  const isSubmitting = isAdding || isUpdating;

  function openAdd() {
    setEditingVariant(null);
    setDialogOpen(true);
  }
  function openEdit(v: Variant) {
    setEditingVariant(v);
    setDialogOpen(true);
  }
  function handleClose() {
    setDialogOpen(false);
    setEditingVariant(null);
  }

  async function handleSubmit(data: CreateVariantPayload) {
    if (editingVariant) {
      await updateVariant(data);
    } else {
      await addVariant({ ...data, productId });
    }
    handleClose();
  }

  return (
    <>
      <Card.Root variant="outline" size="sm">
        <Card.Header>
          <HStack justify="space-between">
            <Text fontWeight="semibold" fontSize="sm">
              Variants ({variants.length})
            </Text>
            <Button
              size="xs"
              bg="amber.500"
              color="white"
              _hover={{ bg: "amber.600" }}
              onClick={openAdd}
            >
              <MdAdd size={14} /> Add Variant
            </Button>
          </HStack>
        </Card.Header>
        <Separator />
        {isLoading ? (
          <Card.Body>
            <Spinner size="sm" color="brand.700" />
          </Card.Body>
        ) : variants.length === 0 ? (
          <Card.Body>
            <Text fontSize="sm" color="fg.muted" textAlign="center" py={6}>
              No variants yet. Add one to get started.
            </Text>
          </Card.Body>
        ) : (
          <Table.Root size="sm" variant="outline" striped>
            <Table.Header>
              <Table.Row>
                {[
                  "Name",
                  "Code",
                  "Colour",
                  "Size",
                  "Material",
                  "Barcode",
                  "",
                ].map((h) => (
                  <Table.ColumnHeader key={h} py={2} px={4}>
                    {h}
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {variants.map((v) => (
                <Table.Row key={v.id} _hover={{ bg: "bg.subtle" }}>
                  <Table.Cell py={2} px={4} fontSize="sm">
                    {v.name}
                  </Table.Cell>
                  <Table.Cell py={2} px={4} fontSize="sm">
                    {v.variantCode}
                  </Table.Cell>
                  <Table.Cell py={2} px={4} fontSize="sm">
                    {v.colour}
                  </Table.Cell>
                  <Table.Cell py={2} px={4} fontSize="sm">
                    {v.size}
                  </Table.Cell>
                  <Table.Cell py={2} px={4} fontSize="sm">
                    {v.material}
                  </Table.Cell>
                  <Table.Cell py={2} px={4} fontSize="sm">
                    {v.barcode ?? "—"}
                  </Table.Cell>
                  <Table.Cell py={2} px={4}>
                    <HStack gap={1} justify="flex-end">
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => openEdit(v)}
                      >
                        <MdEdit size={13} /> Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        colorPalette="red"
                        loading={isDeleting}
                        onClick={() => deleteVariant()}
                      >
                        <MdDelete size={13} />
                      </Button>
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Card.Root>

      <VariantFormDialog
        open={dialogOpen}
        productId={productId}
        variant={editingVariant}
        isSubmitting={isSubmitting}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default VariantsSection;
