"use client";

import ProductForm from "@/app/products/_components/ProductForm";
import type { CreateProductPayload, Product } from "@/types/product";

interface ProductFormSectionProps {
  product: Product;
  isSubmitting: boolean;
  onSubmit: (data: CreateProductPayload) => void;
}

function ProductFormSection({
  product,
  isSubmitting,
  onSubmit,
}: ProductFormSectionProps) {
  return (
    <ProductForm
      defaultValues={{
        name: product.name,
        productCode: product.productCode,
        description: product.description,
        brand: product.brand,
        category: product.category,
        targetMarket: product.targetMarket,
        season: product.season,
      }}
      isSubmitting={isSubmitting}
      submitLabel="Save Changes"
      onSubmit={onSubmit}
    />
  );
}

export default ProductFormSection;
