export interface Product {
  id: string;
  name: string;
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

enum ProductStatus {
  DRAFT = "DRAFT",
  IN_REVIEW = "IN_REVIEW",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

enum ProductReadiness {
  READY = "READY",
  NOT_READY = "NOT_READY",
}
