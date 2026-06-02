import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import {
  approveAsset,
  getAssetById,
  getAssets,
  rejectAsset,
  uploadAsset,
} from "../_services/assetsService";

export function useGetAssets() {
  const { data, isLoading, error } = useSWR("assets", getAssets);
  return { data, isLoading, error };
}

export function useGetAssetById(id: string) {
  const { data, isLoading, error } = useSWR(id ? ["assets", id] : null, () =>
    getAssetById(id),
  );
  return { data, isLoading, error };
}

export function useUploadAsset() {
  return useSWRMutation("assets", (_, { arg }) => uploadAsset(arg), {
    onSuccess: async () => {
      await mutate("assets");
      await mutate(["stats"]);
    },
  });
}

export function useApproveAsset(id: string) {
  return useSWRMutation(["approve-assets", id], () => approveAsset(id), {
    onSuccess: async () => {
      await mutate("assets");
      await mutate(["assets", id]);
      await mutate(["stats"]);
    },
  });
}

export function useRejectAsset(id: string) {
  return useSWRMutation(
    ["reject-assets", id],
    (_, { arg }) => rejectAsset(id, arg),
    {
      onSuccess: async () => {
        await mutate("assets");
        await mutate(["assets", id]);
        await mutate(["stats"]);
      },
    },
  );
}
