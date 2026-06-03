import { AssetStatus } from "@/types/asset";

export const assetStatusConfig: Record<
  AssetStatus,
  { label: string; colorPalette: string }
> = {
  [AssetStatus.PENDING_REVIEW]: { label: "Pending Review", colorPalette: "orange" },
  [AssetStatus.APPROVED]:       { label: "Approved",       colorPalette: "green" },
  [AssetStatus.REJECTED]:       { label: "Rejected",       colorPalette: "red" },
};
