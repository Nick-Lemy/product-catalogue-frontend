import type {
  CreateVariantPayload,
  UpdateVariantPayload,
  Variant,
} from "@/types/variant";
import { Axios } from "@/utils/api";

export async function findVariantsByProductId(
  productId: string,
): Promise<Variant[]> {
  const response = await Axios.get<Variant[]>("/api/variants", {
    params: { productId },
  });
  return response.data;
}

export async function findVariantById(id: string): Promise<Variant> {
  const response = await Axios.get<Variant>(`/api/variants/${id}`);
  return response.data;
}

export async function createVariant(
  payload: CreateVariantPayload,
): Promise<Variant> {
  const response = await Axios.post<Variant>("/api/variants", payload);
  return response.data;
}

export async function updateVariant(
  id: string,
  payload: UpdateVariantPayload,
): Promise<Variant> {
  const response = await Axios.put<Variant>(`/api/variants/${id}`, payload);
  return response.data;
}

export async function deleteVariant(id: string): Promise<void> {
  await Axios.delete(`/api/variants/${id}`);
}
