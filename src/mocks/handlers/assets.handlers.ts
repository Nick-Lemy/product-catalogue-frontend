import { HttpResponse, http } from "msw";
import { mockAssets } from "../data/assets";

export const assetsHandlers = [
  http.get("/api/assets", () => {
    return HttpResponse.json(mockAssets);
  }),

  http.get("/api/assets/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json({ id, name: `Asset ${id}` });
  }),
];
