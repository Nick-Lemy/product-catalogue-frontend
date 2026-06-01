export interface Variant {
  id: string;
  productId: string;
  name: string;
  variantCode: string;
  colour: string;
  size: string;
  material: string;
  barcode?: string;
}

export type CreateVariantPayload = Omit<Variant, "id">;
export type UpdateVariantPayload = Partial<CreateVariantPayload>;
