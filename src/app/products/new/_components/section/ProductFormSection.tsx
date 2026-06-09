"use client";

import ProductForm from "@/app/products/_components/ProductForm";
import type { CreateProductPayload } from "@/types/product";

interface ProductFormSectionProps {
  isSubmitting: boolean;
  onSubmit: (data: CreateProductPayload) => void;
}

function ProductFormSection({ isSubmitting, onSubmit }: ProductFormSectionProps) {
  return (
    <ProductForm
      isSubmitting={isSubmitting}
      submitLabel="Create Product"
      onSubmit={onSubmit}
    />
  );
}

export default ProductFormSection;
