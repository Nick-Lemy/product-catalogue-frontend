"use client";

import {
  Box,
  Field,
  Input,
  NativeSelect,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useGetProducts } from "@/app/_hooks/useProducts";
import { useGetVariants } from "@/app/_hooks/useVariants";
import { AssetType, type UploadAssetPayload } from "@/types/asset";

interface UploadFormValues {
  productId: string;
  variantId: string;
  title: string;
  description: string;
  assetType: AssetType;
  tags: string;
}

interface AssetUploadFieldsProps {
  formId: string;
  onSubmit: (payload: UploadAssetPayload) => void;
}

function AssetUploadFields({ formId, onSubmit }: AssetUploadFieldsProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UploadFormValues>({
    defaultValues: { assetType: AssetType.IMAGE },
  });

  const { data: products } = useGetProducts();
  const selectedProductId = watch("productId");
  const { data: variants } = useGetVariants(selectedProductId ?? "");

  function handleFormSubmit(data: UploadFormValues) {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    onSubmit({
      file,
      productId: data.productId,
      variantId: data.variantId || undefined,
      assetType: data.assetType,
      title: data.title,
      description: data.description,
      tags: data.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  }

  return (
    <form id={formId} onSubmit={handleSubmit(handleFormSubmit)}>
      <Box display="flex" flexDirection="column" gap={4}>
        <Field.Root invalid={!!errors.productId} required>
          <Field.Label>Product</Field.Label>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field {...register("productId", { required: "Required" })}>
              <option value="">Select a product</option>
              {products?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Field.ErrorText>{errors.productId?.message}</Field.ErrorText>
        </Field.Root>

        {selectedProductId && variants && variants.length > 0 && (
          <Field.Root>
            <Field.Label>Variant (optional)</Field.Label>
            <NativeSelect.Root size="sm">
              <NativeSelect.Field {...register("variantId")}>
                <option value="">Product-level asset</option>
                {variants.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>
        )}

        <Field.Root required>
          <Field.Label>File</Field.Label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*,video/*,.pdf"
            required
            style={{ fontSize: "0.875rem" }}
          />
        </Field.Root>

        <Field.Root invalid={!!errors.title} required>
          <Field.Label>Title</Field.Label>
          <Input
            size="sm"
            placeholder="e.g. Front View"
            {...register("title", { required: "Required" })}
          />
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

        <Field.Root>
          <Field.Label>Description</Field.Label>
          <Textarea
            size="sm"
            rows={3}
            placeholder="Brief description"
            {...register("description")}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Tags</Field.Label>
          <Input
            size="sm"
            placeholder="front, studio, white-bg"
            {...register("tags")}
          />
          <Text fontSize="xs" color="fg.muted" mt={1}>
            Separate with commas
          </Text>
        </Field.Root>
      </Box>
    </form>
  );
}

export default AssetUploadFields;
