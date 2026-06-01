import useSWR from "swr";
import type { DashboardStats } from "@/types/stats";
import { fetcher } from "@/utils/api";

export function useGetStats() {
  const { data, isLoading, error } = useSWR<DashboardStats>(
    "/api/stats",
    fetcher,
  );
  return { data, isLoading, error };
}
