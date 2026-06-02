import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import type { ProductFilters } from "@/types/product";
import {
  createProduct,
  deleteProduct,
  findProductById,
  findProducts,
  updateProduct,
} from "../_services/productsService";

export function useGetProducts(filters?: ProductFilters) {
  const { data, isLoading, error } = useSWR(
    ["products", filters],
    () => findProducts(filters),
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
  return useSWRMutation("products", (_, { arg }) => createProduct(arg), {
    onSuccess: async () => {
      await mutate("products");
    },
  });
}

export function useUpdateProduct(id: string) {
  return useSWRMutation(
    id ? ["products", id] : null,
    (_, { arg }) => updateProduct(id, arg),
    {
      onSuccess: async () => {
        await mutate("products");
        await mutate(["products", id]);
      },
    },
  );
}

export function useDeleteProduct(id: string) {
  return useSWRMutation(id ? ["products", id] : null, () => deleteProduct(id), {
    onSuccess: async () => {
      await mutate("products");
      await mutate(["products", id]);
    },
  });
}
