import type { DashboardStats } from "@/types/stats";
import { Axios } from "@/utils/api";

export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await Axios.get<DashboardStats>("/api/stats");
  return response.data;
}
