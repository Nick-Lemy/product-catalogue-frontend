"use client";

import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  NativeSelect,
  Portal,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { AssetType } from "@/types/asset";
import type { Variant } from "@/types/variant";

interface AssetUploadFormValues {
  title: string;
  description: string;
  assetType: AssetType;
  variantId: string;
  tags: string;
}

interface AssetUploadDialogProps {
  open: boolean;
  productId: string;
  variants: Variant[];
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: AssetUploadFormValues & { file: File }) => void;
}

function AssetUploadDialog({
  open,
  variants,
  isSubmitting,
  onClose,
  onSubmit,
}: AssetUploadDialogProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssetUploadFormValues>({
    defaultValues: { assetType: AssetType.IMAGE },
  });

  function handleClose() {
    reset();
    onClose();
  }

  function handleFormSubmit(data: AssetUploadFormValues) {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    onSubmit({ ...data, file });
  }

  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && handleClose()} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Upload Asset</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" position="absolute" top={3} right={3} />
            </Dialog.CloseTrigger>
            <Dialog.Body>
              <form id="asset-upload-form" onSubmit={handleSubmit(handleFormSubmit)}>
                <Box display="flex" flexDirection="column" gap={4}>
                  <Field.Root required>
                    <Field.Label>File</Field.Label>
                    <input ref={fileRef} type="file" accept="image/*,video/*,.pdf" required
                      style={{ fontSize: "0.875rem" }} />
                  </Field.Root>

                  <Field.Root invalid={!!errors.title} required>
                    <Field.Label>Title</Field.Label>
                    <Input size="sm" placeholder="e.g. Front View"
                      {...register("title", { required: "Required" })} />
                    <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Asset Type</Field.Label>
                    <NativeSelect.Root size="sm">
                      <NativeSelect.Field {...register("assetType")}>
                        <option value={AssetType.IMAGE}>Image</option>
                        <option value={AssetType.VIDEO}>Video</option>
                        <option value={AssetType.DOCUMENT}>Document</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>

                  {variants.length > 0 && (
                    <Field.Root>
                      <Field.Label>Variant (optional)</Field.Label>
                      <NativeSelect.Root size="sm">
                        <NativeSelect.Field {...register("variantId")}>
                          <option value="">Product-level asset</option>
                          {variants.map((v) => (
                            <option key={v.id} value={v.id}>{v.name}</option>
                          ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    </Field.Root>
                  )}

                  <Field.Root>
                    <Field.Label>Description</Field.Label>
                    <Textarea size="sm" rows={2} placeholder="Brief description"
                      {...register("description")} />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Tags</Field.Label>
                    <Input size="sm" placeholder="front, studio, white-bg"
                      {...register("tags")} />
                    <Text fontSize="xs" color="fg.muted" mt={1}>Separate with commas</Text>
                  </Field.Root>
                </Box>
              </form>
            </Dialog.Body>
            <Dialog.Footer gap={2}>
              <Button variant="outline" size="sm" onClick={handleClose}>Cancel</Button>
              <Button
                type="submit" form="asset-upload-form" size="sm"
                bg="amber.500" color="white" _hover={{ bg: "amber.600" }}
                loading={isSubmitting}
              >
                Upload
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default AssetUploadDialog;
