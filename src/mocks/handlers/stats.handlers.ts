import { HttpResponse, http } from "msw";
import { mockDashboardStats } from "../data/stats";

export const statsHandlers = [
  http.get("/api/stats", () => {
    return HttpResponse.json(mockDashboardStats);
  }),
];
