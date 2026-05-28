import { mockProducts } from "@/mocks/products";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export interface ProductFilters {
  name?: string;
  productCode?: string;
  brand?: string;
  category?: string;
  status?: string;
  readiness?: string;
}

export interface CreateProductPayload {
  name: string;
  productCode: string;
  description: string;
  brand: string;
  category: string;
  targetMarket: string;
  season: string;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  status?: string;
}

export const productService = {
  find: async (filters?: ProductFilters) => {
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
  },

  findById: async (id: string) => {
    await delay();
    return mockProducts.find((p) => p.id === id) ?? null;
  },

  create: async (payload: CreateProductPayload) => {
    await delay();
    const newProduct = {
      id: `p${Date.now()}`,
      ...payload,
      status: "DRAFT",
      readiness: "NOT_READY",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockProducts.push(newProduct);
    return newProduct;
  },

  update: async (id: string, payload: UpdateProductPayload) => {
    await delay();
    const idx = mockProducts.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error("Product not found");
    mockProducts[idx] = {
      ...mockProducts[idx],
      ...payload,
      updatedAt: new Date().toISOString(),
    };
    return mockProducts[idx];
  },
};
