import { HttpResponse, http } from "msw";
import type { Product } from "@/types/product";
import { mockProducts } from "../data/products";

export const productsHandlers = [
  http.get("/api/products", () => {
    return HttpResponse.json(mockProducts);
  }),

  http.get("/api/products/:id", ({ params }) => {
    const { id } = params;
    const product = mockProducts.find((p) => p.id === id);
    if (!product) {
      return HttpResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return HttpResponse.json(product);
  }),

  http.post("/api/products", async ({ request }) => {
    const body = await request.json();
    const newProduct = {
      id: crypto.randomUUID(),
      ...(body as Omit<typeof body, "id">),
    } as Product;
    mockProducts.push(newProduct);
    return HttpResponse.json(newProduct, { status: 201 });
  }),

  http.put("/api/products/:id", async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      return HttpResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const updatedProduct = {
      ...mockProducts[index],
      ...(body as Partial<Product>),
    };
    mockProducts[index] = updatedProduct;
    return HttpResponse.json(updatedProduct);
  }),

  http.delete("/api/products/:id", ({ params }) => {
    const { id } = params;
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      return HttpResponse.json({ error: "Product not found" }, { status: 404 });
    }
    mockProducts.splice(index, 1);
    return HttpResponse.json({ message: "Product deleted" });
  }),
];
