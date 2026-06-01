import {
  type Asset,
  type AssetFilters,
  AssetStatus,
  type UploadAssetPayload,
} from "@/types/asset";
import { Axios } from "@/utils/api";

export async function getAssets(filters?: AssetFilters) {
  const response = await Axios.get<Asset[]>("/api/assets", { params: filters });
  return response.data;
}

export async function getAssetById(id: string) {
  const response = await Axios.get<Asset>(`/api/assets/${id}`);
  return response.data;
}

export async function uploadAsset(payload: UploadAssetPayload) {
  const newAsset: Asset = {
    id: crypto.randomUUID(),
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
  const response = await Axios.post<Asset>("/api/assets", newAsset);
  return response.data;
}

export async function approveAsset(id: string) {
  const asset = await getAssetById(id);
  const approvedAsset: Asset = {
    ...asset,
    status: AssetStatus.APPROVED,
    statusHistory: [
      ...asset.statusHistory,
      { status: AssetStatus.APPROVED, changedAt: new Date().toISOString() },
    ],
  };
  const response = await Axios.put<Asset>(`/api/assets/${id}`, approvedAsset);
  return response.data;
}

export async function rejectAsset(id: string, reason: string) {
  const asset = await getAssetById(id);
  const rejectedAsset: Asset = {
    ...asset,
    status: AssetStatus.REJECTED,
    rejectionReason: reason,
    statusHistory: [
      ...asset.statusHistory,
      {
        status: AssetStatus.REJECTED,
        changedAt: new Date().toISOString(),
        reason,
      },
    ],
  };
  const response = await Axios.put<Asset>(`/api/assets/${id}`, rejectedAsset);
  return response.data;
}

export async function deleteAsset(id: string) {
  const response = await Axios.delete(`/api/assets/${id}`);
  return response.data;
}
