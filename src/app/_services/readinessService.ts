import type { ReadinessReport } from "@/types/readiness";
import { Axios } from "@/utils/api";

export async function getReadiness(
  productId: string,
): Promise<ReadinessReport> {
  const response = await Axios.get<ReadinessReport>(
    `/api/readiness/${productId}`,
  );
  return response.data;
}
