import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import type {
  CreateProductPayload,
  Product,
  ProductFilters,
  UpdateProductPayload,
} from "@/types/product";
import {
  createProduct,
  deleteProduct,
  findProductById,
  findProducts,
  updateProduct,
} from "../_services/productsService";

export function useGetProducts(filters?: ProductFilters) {
  const { data, isLoading, error } = useSWR(["products", filters], () =>
    findProducts(filters),
  );
  return { data, isLoading, error };
}

export function useGetProductById(id: string) {
  const { data, isLoading, error } = useSWR(id ? ["products", id] : null, () =>
    findProductById(id),
  );
  return { data, isLoading, error };
}

export function useAddProduct() {
  return useSWRMutation<Product, Error, string, CreateProductPayload>(
    "products",
    (_, { arg }) => createProduct(arg),
    {
      onSuccess: async () => {
        await mutate((key) => Array.isArray(key) && key[0] === "products");
      },
    },
  );
}

export function useUpdateProduct(id: string) {
  return useSWRMutation<Product, Error, string[] | null, UpdateProductPayload>(
    id ? ["products", id] : null,
    (_, { arg }) => updateProduct(id, arg),
    {
      onSuccess: async () => {
        await mutate((key) => Array.isArray(key) && key[0] === "products");
      },
    },
  );
}

export function useDeleteProduct(id: string) {
  return useSWRMutation<null, Error, string[] | null>(
    id ? ["products", id] : null,
    () => deleteProduct(id),
    {
      onSuccess: async () => {
        await mutate((key) => Array.isArray(key) && key[0] === "products");
      },
    },
  );
}
