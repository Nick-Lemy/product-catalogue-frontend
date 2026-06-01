export interface Product {
  id: string;
  name: string;
  description: string;
  productCode: string;
  brand: string;
  category: string;
  targetMarket: string;
  season: string;

  status: ProductStatus;
  readiness: ProductReadiness;

  createdAt: string;
  updatedAt: string;
}

export enum ProductStatus {
  DRAFT = "DRAFT",
  IN_REVIEW = "IN_REVIEW",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum ProductReadiness {
  READY = "READY",
  NOT_READY = "NOT_READY",
}

export type ProductFilters = Partial<
  Pick<
    Product,
    "name" | "productCode" | "brand" | "category" | "status" | "readiness"
  >
>;

export type CreateProductPayload = Omit<
  Product,
  "id" | "status" | "readiness" | "createdAt" | "updatedAt"
>;

export interface UpdateProductPayload extends Partial<Product> {}
