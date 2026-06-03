import { HttpResponse, http } from "msw";
import { type Asset, AssetStatus, type AssetType } from "@/types/asset";
import { mockAssets } from "../data/assets";

export const assetsHandlers = [
  http.get("/api/assets", ({ request }) => {
    const url = new URL(request.url);
    const productId = url.searchParams.get("productId");
    const variantId = url.searchParams.get("variantId");
    const assetType = url.searchParams.get("assetType");
    const status = url.searchParams.get("status");
    const fileName = url.searchParams.get("fileName")?.toLowerCase();
    const uploadedAfter = url.searchParams.get("uploadedAfter");
    const uploadedBefore = url.searchParams.get("uploadedBefore");
    const tags = url.searchParams.getAll("tags");

    let results = [...mockAssets] as Asset[];

    if (productId) results = results.filter((a) => a.productId === productId);
    if (variantId) results = results.filter((a) => a.variantId === variantId);
    if (assetType) results = results.filter((a) => a.assetType === assetType);
    if (status) results = results.filter((a) => a.status === status);
    if (fileName)
      results = results.filter((a) =>
        a.fileName.toLowerCase().includes(fileName),
      );
    if (tags.length > 0)
      results = results.filter((a) => tags.some((t) => a.tags.includes(t)));
    if (uploadedAfter)
      results = results.filter(
        (a) => new Date(a.uploadedAt) >= new Date(uploadedAfter),
      );
    if (uploadedBefore)
      results = results.filter(
        (a) => new Date(a.uploadedAt) <= new Date(uploadedBefore),
      );

    return HttpResponse.json(results);
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
