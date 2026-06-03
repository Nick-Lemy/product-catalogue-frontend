"use client";

import { Button, Card, HStack, Separator, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import {
  useAddVariant,
  useDeleteVariant,
  useUpdateVariant,
} from "@/app/_hooks/useVariants";
import type { CreateVariantPayload, Variant } from "@/types/variant";
import VariantFormDialog from "../VariantFormDialog";
import VariantsTable from "../VariantsTable";

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
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { trigger: addVariant, isMutating: isAdding } = useAddVariant(productId);
  const { trigger: updateVariant, isMutating: isUpdating } = useUpdateVariant(
    productId,
    editingVariant?.id ?? "",
  );
  const { trigger: deleteVariant } = useDeleteVariant(productId);

  const isSubmitting = isAdding || isUpdating;

  function openAdd() {
    setEditingVariant(null);
    setDialogOpen(true);
  }
  function openEdit(variant: Variant) {
    setEditingVariant(variant);
    setDialogOpen(true);
  }
  function handleClose() {
    setDialogOpen(false);
    setEditingVariant(null);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteVariant(id);
    } finally {
      setDeletingId(null);
    }
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
          <VariantsTable
            variants={variants}
            deletingId={deletingId}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
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
