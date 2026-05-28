import { mockProducts } from "@/mocks/products";
import {
  type CreateProductPayload,
  type Product,
  type ProductFilters,
  ProductReadiness,
  ProductStatus,
  type UpdateProductPayload,
} from "@/types/product";

const delay = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

async function find(filters?: ProductFilters): Promise<Product[]> {
  await delay();
  let results = [...mockProducts];
  if (filters?.name)
    results = results.filter((p) =>
      p.name.toLowerCase().includes(filters.name!.toLowerCase()),
    );
  if (filters?.productCode)
    results = results.filter((p) =>
      p.productCode.toLowerCase().includes(filters.productCode!.toLowerCase()),
    );
  if (filters?.brand)
    results = results.filter((p) => p.brand === filters.brand);
  if (filters?.category)
    results = results.filter((p) => p.category === filters.category);
  if (filters?.status)
    results = results.filter((p) => p.status === filters.status);
  if (filters?.readiness)
    results = results.filter((p) => p.readiness === filters.readiness);
  return results;
}

async function findById(id: string): Promise<Product | null> {
  await delay();
  return mockProducts.find((p) => p.id === id) ?? null;
}

async function create(payload: CreateProductPayload): Promise<Product> {
  await delay();
  const newProduct = {
    id: `p${Date.now()}`,
    ...payload,
    status: ProductStatus.DRAFT,
    readiness: ProductReadiness.NOT_READY,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockProducts.push(newProduct);
  return newProduct;
}

async function update(
  id: string,
  payload: UpdateProductPayload,
): Promise<Product> {
  await delay();
  const idx = mockProducts.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Product not found");
  mockProducts[idx] = {
    ...mockProducts[idx],
    ...payload,
    updatedAt: new Date().toISOString(),
  };
  return mockProducts[idx];
}

const productsService = { find, findById, create, update };
export default productsService;
