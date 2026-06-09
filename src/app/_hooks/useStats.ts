import useSWR from "swr";
import type { DashboardStats } from "@/types/stats";
import { getDashboardStats } from "../_services/statsService";

export function useGetStats() {
  const { data, isLoading, error } = useSWR<DashboardStats>(
    "stats",
    getDashboardStats,
  );
  return { data, isLoading, error };
}
