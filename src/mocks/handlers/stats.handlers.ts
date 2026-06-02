import { HttpResponse, http } from "msw";
import { mockDashboardStats } from "../data/stats";

export const statsHandlers = [
  http.get("/api/stats", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    return HttpResponse.json(mockDashboardStats);
  }),
];
