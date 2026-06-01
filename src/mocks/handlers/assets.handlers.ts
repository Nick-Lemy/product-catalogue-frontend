import { HttpResponse, http } from "msw";
import { type Asset, AssetStatus, type AssetType } from "@/types/asset";
import { mockAssets } from "../data/assets";

export const assetsHandlers = [
  http.get("/api/assets", () => {
    return HttpResponse.json(mockAssets);
  }),

  http.get("/api/assets/:id", ({ params }) => {
    const asset = mockAssets.find((a) => a.id === params.id);
    if (!asset)
      return HttpResponse.json({ message: "Asset not found" }, { status: 404 });
    return HttpResponse.json(asset);
  }),

  http.post("/api/assets", async ({ request }) => {
    const formData = await request.formData();

    const file = formData.get("file") as File;
    const productId = formData.get("productId") as string;
    const variantId = formData.get("variantId") as string | null;
    const assetType = formData.get("assetType") as AssetType;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const tags = JSON.parse(formData.get("tags") as string) as string[];

    const newAsset: Asset = {
      id: crypto.randomUUID(),
      productId,
      variantId: variantId ?? undefined,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      assetType,
      title,
      description,
      tags,
      status: AssetStatus.PENDING_REVIEW,
      statusHistory: [
        {
          status: AssetStatus.PENDING_REVIEW,
          changedAt: new Date().toISOString(),
        },
      ],
      uploadedAt: new Date().toISOString(),
    };

    mockAssets.push(newAsset);
    return HttpResponse.json(newAsset, { status: 201 });
  }),

  http.put("/api/assets/:id", async ({ params, request }) => {
    const idx = mockAssets.findIndex((a) => a.id === params.id);
    if (idx === -1)
      return HttpResponse.json({ message: "Asset not found" }, { status: 404 });

    const body = (await request.json()) as Asset;
    mockAssets[idx] = body;
    return HttpResponse.json(mockAssets[idx]);
  }),

  http.delete("/api/assets/:id", ({ params }) => {
    const idx = mockAssets.findIndex((a) => a.id === params.id);
    if (idx === -1)
      return HttpResponse.json({ message: "Asset not found" }, { status: 404 });

    mockAssets.splice(idx, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
