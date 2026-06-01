import { mockAssets } from "./assets";
import { mockProducts } from "./products";

const recentAssets = [...mockAssets]
  .sort(
    (a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
  )
  .slice(0, 5);

export const mockDashboardStats = {
  totalProducts: mockProducts.length,
  readyToPublish: mockProducts.filter(
    (p) =>
      p.readiness === "READY" &&
      p.status !== "PUBLISHED" &&
      p.status !== "ARCHIVED",
  ).length,
  publishedProducts: mockProducts.filter((p) => p.status === "PUBLISHED")
    .length,
  assetsPendingReview: mockAssets.filter((a) => a.status === "PENDING_REVIEW")
    .length,
  rejectedAssets: mockAssets.filter((a) => a.status === "REJECTED").length,
  recentAssets,
  productsByBrand: Object.entries(
    mockProducts.reduce<Record<string, number>>((acc, p) => {
      acc[p.brand] = (acc[p.brand] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value),
};
