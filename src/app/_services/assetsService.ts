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
  const formData = new FormData();
  formData.append("file", payload.file);
  formData.append("productId", payload.productId);
  formData.append("assetType", payload.assetType);
  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("tags", JSON.stringify(payload.tags));
  if (payload.variantId) formData.append("variantId", payload.variantId);

  const response = await Axios.post<Asset>("/api/assets", formData);
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
