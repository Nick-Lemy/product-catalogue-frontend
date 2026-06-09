import { HttpResponse, http } from "msw";
import {
  type CreateProductPayload,
  type Product,
  ProductReadiness,
  ProductStatus,
} from "@/types/product";
import { mockProducts } from "../data/products";

export const productsHandlers = [
  http.get("/api/products", ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get("name")?.toLowerCase();
    const productCode = url.searchParams.get("productCode")?.toLowerCase();
    const brand = url.searchParams.get("brand");
    const category = url.searchParams.get("category");
    const status = url.searchParams.get("status");
    const readiness = url.searchParams.get("readiness");

    let results = [...mockProducts];

    if (name)
      results = results.filter((p) => p.name.toLowerCase().includes(name));
    if (productCode)
      results = results.filter((p) =>
        p.productCode.toLowerCase().includes(productCode),
      );
    if (brand) results = results.filter((p) => p.brand === brand);
    if (category) results = results.filter((p) => p.category === category);
    if (status) results = results.filter((p) => p.status === status);
    if (readiness) results = results.filter((p) => p.readiness === readiness);

    return HttpResponse.json(results);
  }),

  http.get("/api/products/:id", ({ params }) => {
    const product = mockProducts.find((p) => p.id === params.id);
    if (!product)
      return HttpResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    return HttpResponse.json(product);
  }),

  http.post("/api/products", async ({ request }) => {
    const body = (await request.json()) as CreateProductPayload;
    const now = new Date().toISOString();
    const newProduct: Product = {
      ...body,
      id: crypto.randomUUID(),
      status: ProductStatus.DRAFT,
      readiness: ProductReadiness.NOT_READY,
      createdAt: now,
      updatedAt: now,
    };
    mockProducts.push(newProduct);
    return HttpResponse.json(newProduct, { status: 201 });
  }),

  http.put("/api/products/:id", async ({ params, request }) => {
    const idx = mockProducts.findIndex((p) => p.id === params.id);
    if (idx === -1)
      return HttpResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );

    const body = (await request.json()) as Partial<Product>;
    mockProducts[idx] = { ...mockProducts[idx], ...body };
    return HttpResponse.json(mockProducts[idx]);
  }),

  http.delete("/api/products/:id", ({ params }) => {
    const idx = mockProducts.findIndex((p) => p.id === params.id);
    if (idx === -1)
      return HttpResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );

    mockProducts.splice(idx, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
