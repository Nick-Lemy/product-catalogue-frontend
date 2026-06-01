import { HttpResponse, http } from "msw";
import { AssetStatus } from "@/types/asset";
import type { ReadinessReport } from "@/types/readiness";
import { mockAssets } from "../data/assets";
import { mockProducts } from "../data/products";
import { mockVariants } from "../data/variants";

export const readinessHandlers = [
  http.get("/api/readiness/:productId", ({ params }) => {
    const product = mockProducts.find((p) => p.id === params.productId);
    if (!product)
      return HttpResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );

    const variants = mockVariants.filter(
      (v) => v.productId === params.productId,
    );
    const assets = mockAssets.filter((a) => a.productId === params.productId);
    const approvedAssets = assets.filter(
      (a) => a.status === AssetStatus.APPROVED,
    );

    const checks = [
      { requirement: "Product has a name", met: !!product.name },
      { requirement: "Product has a description", met: !!product.description },
      { requirement: "Product has a brand", met: !!product.brand },
      { requirement: "Product has a category", met: !!product.category },
      {
        requirement: "Product has a target market",
        met: !!product.targetMarket,
      },
      { requirement: "Product has a season", met: !!product.season },
      { requirement: "At least one variant added", met: variants.length > 0 },
      {
        requirement: "At least one approved asset",
        met: approvedAssets.length > 0,
      },
    ];

    const report: ReadinessReport = {
      productId: product.id,
      checks,
      canPublish: checks.every((c) => c.met),
    };

    return HttpResponse.json(report);
  }),
];
