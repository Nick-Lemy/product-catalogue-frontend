import { mockAssets } from "@/mocks/data/assets";
import {
  type Asset,
  type AssetFilters,
  AssetStatus,
  type UploadAssetPayload,
} from "@/types/asset";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

async function find(filters?: AssetFilters): Promise<Asset[]> {
  await delay();
  let results = [...mockAssets] as Asset[];
  if (filters?.productId)
    results = results.filter((a) => a.productId === filters.productId);
  if (filters?.variantId)
    results = results.filter((a) => a.variantId === filters.variantId);
  if (filters?.assetType)
    results = results.filter((a) => a.assetType === filters.assetType);
  if (filters?.status)
    results = results.filter((a) => a.status === filters.status);
  if (filters?.fileName)
    results = results.filter((a) =>
      a.fileName.toLowerCase().includes(filters.fileName!.toLowerCase()),
    );
  if (filters?.tags?.length)
    results = results.filter((a) =>
      filters.tags!.some((t) => a.tags.includes(t)),
    );
  if (filters?.uploadedAfter)
    results = results.filter(
      (a) => new Date(a.uploadedAt) >= new Date(filters.uploadedAfter!),
    );
  if (filters?.uploadedBefore)
    results = results.filter(
      (a) => new Date(a.uploadedAt) <= new Date(filters.uploadedBefore!),
    );
  return results;
}

async function findById(id: string): Promise<Asset | null> {
  await delay();
  return (mockAssets.find((a) => a.id === id) as Asset) ?? null;
}

async function upload(payload: UploadAssetPayload): Promise<Asset> {
  await delay();
  const newAsset: Asset = {
    id: `a${Date.now()}`,
    productId: payload.productId,
    variantId: payload.variantId,
    fileName: payload.file.name,
    fileUrl: URL.createObjectURL(payload.file),
    assetType: payload.assetType,
    title: payload.title,
    description: payload.description,
    tags: payload.tags,
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
  return newAsset;
}

async function approve(id: string): Promise<Asset> {
  await delay();
  const idx = mockAssets.findIndex((a) => a.id === id);
  if (idx === -1) throw new Error("Asset not found");
  mockAssets[idx] = {
    ...mockAssets[idx],
    status: AssetStatus.APPROVED,
    statusHistory: [
      ...mockAssets[idx].statusHistory,
      { status: AssetStatus.APPROVED, changedAt: new Date().toISOString() },
    ],
  };
  return mockAssets[idx] as Asset;
}

async function reject(id: string, reason: string): Promise<Asset> {
  await delay();
  const idx = mockAssets.findIndex((a) => a.id === id);
  if (idx === -1) throw new Error("Asset not found");
  mockAssets[idx] = {
    ...mockAssets[idx],
    status: AssetStatus.REJECTED,
    rejectionReason: reason,
    statusHistory: [
      ...mockAssets[idx].statusHistory,
      {
        status: AssetStatus.REJECTED,
        changedAt: new Date().toISOString(),
        reason,
      },
    ],
  };
  return mockAssets[idx] as Asset;
}

const assetsService = { find, findById, upload, approve, reject };
export default assetsService;
