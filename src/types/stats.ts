import type { Asset } from "./asset";

export interface DashboardStats {
  totalProducts: number;
  readyToPublish: number;
  publishedProducts: number;
  assetsPendingReview: number;
  rejectedAssets: number;
  recentAssets: Asset[];
  productsByBrand: {
    name: string;
    value: number;
  }[];
}
