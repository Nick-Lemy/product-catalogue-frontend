import { HttpResponse, http } from "msw";
import type { Variant } from "@/types/variant";
import { mockVariants } from "../data/variants";

export const variantsHandlers = [
  http.get("/api/variants", ({ request }) => {
    const url = new URL(request.url);
    const productId = url.searchParams.get("productId");

    const result = productId
      ? mockVariants.filter((v) => v.productId === productId)
      : mockVariants;

    return HttpResponse.json(result);
  }),

  http.get("/api/variants/:id", ({ params }) => {
    const variant = mockVariants.find((v) => v.id === params.id);
    if (!variant)
      return HttpResponse.json(
        { message: "Variant not found" },
        { status: 404 },
      );
    return HttpResponse.json(variant);
  }),

  http.post("/api/variants", async ({ request }) => {
    const body = (await request.json()) as Omit<Variant, "id">;
    const newVariant: Variant = { id: crypto.randomUUID(), ...body };
    mockVariants.push(newVariant);
    return HttpResponse.json(newVariant, { status: 201 });
  }),

  http.put("/api/variants/:id", async ({ params, request }) => {
    const idx = mockVariants.findIndex((v) => v.id === params.id);
    if (idx === -1)
      return HttpResponse.json(
        { message: "Variant not found" },
        { status: 404 },
      );

    const body = (await request.json()) as Partial<Variant>;
    mockVariants[idx] = { ...mockVariants[idx], ...body };
    return HttpResponse.json(mockVariants[idx]);
  }),

  http.delete("/api/variants/:id", ({ params }) => {
    const idx = mockVariants.findIndex((v) => v.id === params.id);
    if (idx === -1)
      return HttpResponse.json(
        { message: "Variant not found" },
        { status: 404 },
      );

    mockVariants.splice(idx, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
