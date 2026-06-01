import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";

import {
  createProducts,
  findProducts,
  findProductsById,
  updateProducts,
} from "../_services/productsService";

export function useGetProducts() {
  const { data, isLoading, error } = useSWR("products", findProducts);
  return { data, isLoading, error };
}

export function useGetProductById(id: string) {
  const { data, isLoading, error } = useSWR(id ? ["products", id] : null, () =>
    findProductsById(id),
  );
  return { data, isLoading, error };
}

export function useAddProduct() {
  return useSWRMutation(
    "products",
    async (_, { arg }) => {
      return createProducts(arg);
    },
    {
      onSuccess: async () => {
        await mutate("products");
      },
    },
  );
}

export function useUpdateProduct(id: string) {
  const mutation = useSWRMutation(
    id ? ["products", id] : null,
    async (_, { arg }) => {
      return updateProducts(id, arg);
    },
    {
      onSuccess: async () => {
        await mutate("products");
        await mutate(["products", id]);
      },
    },
  );
  return mutation;
}
