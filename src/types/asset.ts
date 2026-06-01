export interface Asset {
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

export enum AssetType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  DOCUMENT = "DOCUMENT",
}

export enum AssetStatus {
  PENDING_REVIEW = "PENDING_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export type AssetFilters = {
  productId?: string;
  variantId?: string;
  assetType?: AssetType;
  status?: AssetStatus;
  fileName?: string;
  tags?: string[];
  uploadedAfter?: string;
  uploadedBefore?: string;
};

export type UploadAssetPayload = {
  file: File;
  productId: string;
  variantId?: string;
  assetType: AssetType;
  title: string;
  description: string;
  tags: string[];
};
