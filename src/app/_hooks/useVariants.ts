import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import type {
  CreateVariantPayload,
  UpdateVariantPayload,
} from "@/types/variant";
import {
  createVariant,
  deleteVariant,
  findVariantsByProductId,
  updateVariant,
} from "../_services/variantService";

export function useGetVariants(productId: string) {
  const { data, isLoading, error } = useSWR(
    productId ? ["variants", productId] : null,
    () => findVariantsByProductId(productId),
  );
  return { data, isLoading, error };
}

export function useAddVariant(productId: string) {
  return useSWRMutation(
    ["variants", productId],
    (_, { arg }: { arg: CreateVariantPayload }) => createVariant(arg),
    {
      onSuccess: async () => {
        await mutate(["variants", productId]);
      },
    },
  );
}

export function useUpdateVariant(productId: string, id: string) {
  return useSWRMutation(
    id ? ["variants", id] : null,
    (_, { arg }: { arg: UpdateVariantPayload }) => updateVariant(id, arg),
    {
      onSuccess: async () => {
        await mutate(["variants", productId]);
      },
    },
  );
}

export function useDeleteVariant(productId: string) {
  return useSWRMutation(
    productId ? ["variants", productId, "delete"] : null,
    (_, { arg }: { arg: string }) => deleteVariant(arg),
    {
      onSuccess: async () => {
        await mutate(["variants", productId]);
      },
    },
  );
}
