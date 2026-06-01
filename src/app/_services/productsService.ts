import type {
  CreateProductPayload,
  Product,
  ProductFilters,
  UpdateProductPayload,
} from "@/types/product";
import { Axios } from "@/utils/api";

export async function findProducts(
  filters?: ProductFilters,
): Promise<Product[]> {
  const response = await Axios.get<Product[]>("/api/products", {
    params: filters,
  });
  return response.data;
}

export async function findProductById(id: string): Promise<Product | null> {
  const response = await Axios.get<Product>(`/api/products/${id}`);
  return response.data;
}

export async function createProduct(payload: CreateProductPayload) {
  const response = await Axios.post<Product>("/api/products", {
    id: crypto.randomUUID(),
    ...payload,
  });
  return response.data;
}

export async function updateProduct(id: string, payload: UpdateProductPayload) {
  const response = await Axios.put<Product>(`/api/products/${id}`, payload);
  return response.data;
}

export async function deleteProduct(id: string) {
  const response = await Axios.delete<null>(`/api/products/${id}`);
  return response.data;
}
