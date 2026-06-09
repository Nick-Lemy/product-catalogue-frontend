import { assetsHandlers } from "./assets.handlers";
import { productsHandlers } from "./products.handlers";
import { readinessHandlers } from "./readiness.handlers";
import { statsHandlers } from "./stats.handlers";
import { variantsHandlers } from "./variants.handlers";

export const handlers = [
  ...productsHandlers,
  ...variantsHandlers,
  ...assetsHandlers,
  ...readinessHandlers,
  ...statsHandlers,
];
