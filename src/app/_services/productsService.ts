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

export async function findProductsById(id: string): Promise<Product | null> {
  const response = await Axios.get<Product>(`/api/products/${id}`);
  return response.data;
}

export async function createProducts(payload: CreateProductPayload) {
  const response = await Axios.post<Product>("/api/products", payload);
  return response.data;
}

export async function updateProducts(
  id: string,
  payload: UpdateProductPayload,
): Promise<Product> {
  const response = await Axios.put<Product>(`/api/products/${id}`, payload);
  return response.data;
}
