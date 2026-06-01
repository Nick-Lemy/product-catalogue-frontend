import useSWR from "swr";
import { fetcher } from "@/utils/api";

export function useGetAssets() {
  const { data, isLoading, error } = useSWR("/api/assets", fetcher);
  return { data, isLoading, error };
}

export function useGetAssetById(id: string) {
  const { data, isLoading, error } = useSWR(`/api/assets/${id}`, fetcher);
  return { data, isLoading, error };
}
