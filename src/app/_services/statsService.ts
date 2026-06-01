import { mockAssets } from "@/mocks/data/assets";
import { mockProducts } from "@/mocks/data/products";
import type { Asset } from "@/types/asset";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export interface DashboardStats {
  totalProducts: number;
  publishedProducts: number;
  readyToPublish: number;
  assetsPendingReview: number;
  rejectedAssets: number;
  recentAssets: Asset[];
  productsByBrand: { name: string; value: number }[];
}

async function getDashboardStats(): Promise<DashboardStats> {
  await delay();

  const recentAssets = [...mockAssets]
    .sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
    )
    .slice(0, 5) as Asset[];

  const productsByBrand = Object.entries(
    mockProducts.reduce<Record<string, number>>((acc, p) => {
      acc[p.brand] = (acc[p.brand] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return {
    totalProducts: mockProducts.length,
    publishedProducts: mockProducts.filter((p) => p.status === "PUBLISHED")
      .length,
    readyToPublish: mockProducts.filter(
      (p) =>
        p.readiness === "READY" &&
        p.status !== "PUBLISHED" &&
        p.status !== "ARCHIVED",
    ).length,
    assetsPendingReview: mockAssets.filter((a) => a.status === "PENDING_REVIEW")
      .length,
    rejectedAssets: mockAssets.filter((a) => a.status === "REJECTED").length,
    recentAssets,
    productsByBrand,
  };
}

const statsService = { getDashboardStats };
export default statsService;
