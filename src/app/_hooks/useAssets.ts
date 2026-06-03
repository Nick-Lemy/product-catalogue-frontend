import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import type { Asset, AssetFilters, UploadAssetPayload } from "@/types/asset";
import {
  approveAsset,
  getAssetById,
  getAssets,
  rejectAsset,
  uploadAsset,
} from "../_services/assetsService";

export function useGetAssets(filters?: AssetFilters) {
  const { data, isLoading, error } = useSWR(["assets", filters], () =>
    getAssets(filters),
  );
  return { data, isLoading, error };
}

export function useGetAssetById(id: string) {
  const { data, isLoading, error } = useSWR(id ? ["assets", id] : null, () =>
    getAssetById(id),
  );
  return { data, isLoading, error };
}

export function useUploadAsset() {
  return useSWRMutation<Asset, Error, string, UploadAssetPayload>(
    "assets",
    (_, { arg }) => uploadAsset(arg),
    {
      onSuccess: async () => {
        await mutate((key) => Array.isArray(key) && key[0] === "assets");
        await mutate("stats");
      },
    },
  );
}

export function useApproveAsset(id: string) {
  return useSWRMutation(["approve-assets", id], () => approveAsset(id), {
    onSuccess: async () => {
      await mutate((key) => Array.isArray(key) && key[0] === "assets");
      await mutate("stats");
    },
  });
}

export function useRejectAsset(id: string) {
  return useSWRMutation(
    ["reject-assets", id],
    (_, { arg }) => rejectAsset(id, arg),
    {
      onSuccess: async () => {
        await mutate((key) => Array.isArray(key) && key[0] === "assets");
        await mutate("stats");
      },
    },
  );
}
