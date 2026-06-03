"use client";

import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Grid,
  GridItem,
  Input,
  Portal,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { CreateVariantPayload, Variant } from "@/types/variant";

interface VariantFormDialogProps {
  open: boolean;
  productId: string;
  variant: Variant | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: CreateVariantPayload) => void;
}

function VariantFormDialog({
  open,
  productId,
  variant,
  isSubmitting,
  onClose,
  onSubmit,
}: VariantFormDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateVariantPayload>();

  useEffect(() => {
    reset(variant ?? { productId });
  }, [variant, productId, reset]);

  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{variant ? "Edit Variant" : "Add Variant"}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" position="absolute" top={3} right={3} />
            </Dialog.CloseTrigger>
            <Dialog.Body>
              <form id="variant-form" onSubmit={handleSubmit(onSubmit)}>
                <Grid templateColumns="1fr 1fr" gap={4}>
                  <Field.Root invalid={!!errors.name} required>
                    <Field.Label>Name</Field.Label>
                    <Input size="sm" placeholder="e.g. White / Small"
                      {...register("name", { required: "Required" })} />
                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.variantCode} required>
                    <Field.Label>Variant Code</Field.Label>
                    <Input size="sm" placeholder="e.g. SHT-001-WHT-S"
                      {...register("variantCode", { required: "Required" })} />
                    <Field.ErrorText>{errors.variantCode?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.colour} required>
                    <Field.Label>Colour</Field.Label>
                    <Input size="sm" placeholder="e.g. White"
                      {...register("colour", { required: "Required" })} />
                    <Field.ErrorText>{errors.colour?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.size} required>
                    <Field.Label>Size</Field.Label>
                    <Input size="sm" placeholder="e.g. S, M, 32"
                      {...register("size", { required: "Required" })} />
                    <Field.ErrorText>{errors.size?.message}</Field.ErrorText>
                  </Field.Root>

                  <GridItem colSpan={2}>
                    <Field.Root invalid={!!errors.material} required>
                      <Field.Label>Material</Field.Label>
                      <Input size="sm" placeholder="e.g. 100% Cotton"
                        {...register("material", { required: "Required" })} />
                      <Field.ErrorText>{errors.material?.message}</Field.ErrorText>
                    </Field.Root>
                  </GridItem>

                  <GridItem colSpan={2}>
                    <Field.Root>
                      <Field.Label>Barcode (optional)</Field.Label>
                      <Input size="sm" placeholder="e.g. 5901234123457"
                        {...register("barcode")} />
                    </Field.Root>
                  </GridItem>
                </Grid>
              </form>
            </Dialog.Body>
            <Dialog.Footer gap={2}>
              <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
              <Button
                type="submit" form="variant-form" size="sm"
                bg="amber.500" color="white" _hover={{ bg: "amber.600" }}
                loading={isSubmitting}
              >
                {variant ? "Save Changes" : "Add Variant"}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default VariantFormDialog;
