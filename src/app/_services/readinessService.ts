import { mockAssets } from "@/mocks/assets";
import { mockProducts } from "@/mocks/products";
import { mockVariants } from "@/mocks/variants";
import { AssetStatus } from "@/types/asset";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export interface ReadinessCheck {
  requirement: string;
  met: boolean;
}

export interface ReadinessReport {
  productId: string;
  checks: ReadinessCheck[];
  canPublish: boolean;
}

async function find(productId: string): Promise<ReadinessReport> {
  await delay();
  const product = mockProducts.find((p) => p.id === productId);
  if (!product) throw new Error("Product not found");

  const variants = mockVariants.filter((v) => v.productId === productId);
  const assets = mockAssets.filter((a) => a.productId === productId);
  const approvedAssets = assets.filter(
    (a) => a.status === AssetStatus.APPROVED,
  );

  const checks: ReadinessCheck[] = [
    { requirement: "Product has a name",          met: !!product.name },
    { requirement: "Product has a description",   met: !!product.description },
    { requirement: "Product has a brand",         met: !!product.brand },
    { requirement: "Product has a category",      met: !!product.category },
    { requirement: "Product has a target market", met: !!product.targetMarket },
    { requirement: "Product has a season",        met: !!product.season },
    { requirement: "At least one variant added",  met: variants.length > 0 },
    { requirement: "At least one approved asset", met: approvedAssets.length > 0 },
  ];

  const canPublish = checks.every((c) => c.met);

  return { productId, checks, canPublish };
}

const readinessService = { find };
export default readinessService;
