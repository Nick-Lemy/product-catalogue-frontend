import { mockVariants } from "@/mocks/variants";
import type {
  CreateVariantPayload,
  UpdateVariantPayload,
  Variant,
} from "@/types/variant";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

async function findByProductId(productId: string): Promise<Variant[]> {
  await delay();
  return mockVariants.filter((v) => v.productId === productId);
}

async function create(payload: CreateVariantPayload): Promise<Variant> {
  await delay();
  const newVariant: Variant = {
    id: `v${Date.now()}`,
    ...payload,
  };
  mockVariants.push(newVariant);
  return newVariant;
}

async function update(
  id: string,
  payload: UpdateVariantPayload,
): Promise<Variant> {
  await delay();
  const idx = mockVariants.findIndex((v) => v.id === id);
  if (idx === -1) throw new Error("Variant not found");
  mockVariants[idx] = { ...mockVariants[idx], ...payload };
  return mockVariants[idx];
}

async function remove(id: string): Promise<void> {
  await delay();
  const idx = mockVariants.findIndex((v) => v.id === id);
  if (idx === -1) throw new Error("Variant not found");
  mockVariants.splice(idx, 1);
}

const variantService = { findByProductId, create, update, remove };
export default variantService;
