import useSWR from "swr";
import { getReadiness } from "../_services/readinessService";

export function useGetReadiness(productId: string) {
  const { data, isLoading, error } = useSWR(
    productId ? ["readiness", productId] : null,
    () => getReadiness(productId),
  );
  return { data, isLoading, error };
}
