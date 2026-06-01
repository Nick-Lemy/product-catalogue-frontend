import { assetsHandlers } from "./assets.handlers";
import { productsHandlers } from "./products.handlers";
import { statsHandlers } from "./stats.handlers";

export const handlers = [
  ...productsHandlers,
  ...assetsHandlers,
  ...statsHandlers,
];
