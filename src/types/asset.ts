export interface Variant {
  id: string;
  productId: string;
  variantId?: string;
  fileName: string;
  fileUrl: string;
  assetType: AssetType;
  title: string;
  description: string;
  tags: string[];

  status: AssetStatus;
  rejectionReason?: string;

  statusHistory: {
    status: AssetStatus;
    changedAt: string;
    reason?: string;
  }[];

  uploadedAt: string;
}

enum AssetType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  DOCUMENT = "DOCUMENT",
}

enum AssetStatus {
  PENDING_REVIEW = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
