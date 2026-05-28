import { type Asset, AssetStatus, AssetType } from "@/types/asset";

export const mockAssets: Asset[] = [
  {
    id: "a1",
    productId: "p1",
    variantId: undefined,
    fileName: "oxford-shirt-front.jpg",
    fileUrl:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600",
    assetType: AssetType.IMAGE,
    title: "Oxford Shirt Front View",
    description: "Clean front-facing product shot on white background.",
    tags: ["front", "studio", "white-bg"],
    status: AssetStatus.APPROVED,
    rejectionReason: undefined,
    statusHistory: [
      { status: AssetStatus.PENDING_REVIEW, changedAt: "2025-02-10T09:00:00Z" },
      { status: AssetStatus.APPROVED, changedAt: "2025-02-11T10:00:00Z" },
    ],
    uploadedAt: "2025-02-10T09:00:00Z",
  },
  {
    id: "a2",
    productId: "p1",
    variantId: undefined,
    fileName: "oxford-shirt-back.jpg",
    fileUrl:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600",
    assetType: AssetType.IMAGE,
    title: "Oxford Shirt Back View",
    description: "Back view on white background.",
    tags: ["back", "studio", "white-bg"],
    status: AssetStatus.APPROVED,
    rejectionReason: undefined,
    statusHistory: [
      { status: AssetStatus.PENDING_REVIEW, changedAt: "2025-02-10T09:05:00Z" },
      { status: AssetStatus.APPROVED, changedAt: "2025-02-11T10:05:00Z" },
    ],
    uploadedAt: "2025-02-10T09:05:00Z",
  },

  {
    id: "a3",
    productId: "p1",
    variantId: "v1",
    fileName: "oxford-white-s-detail.jpg",
    fileUrl:
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600",
    assetType: AssetType.IMAGE,
    title: "White S - Collar Detail",
    description: "Close-up of collar and button detail.",
    tags: ["detail", "collar", "white"],
    status: AssetStatus.PENDING_REVIEW,
    rejectionReason: undefined,
    statusHistory: [
      { status: AssetStatus.PENDING_REVIEW, changedAt: "2025-03-15T08:00:00Z" },
    ],
    uploadedAt: "2025-03-15T08:00:00Z",
  },

  {
    id: "a4",
    productId: "p2",
    variantId: undefined,
    fileName: "chinos-front.jpg",
    fileUrl:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600",
    assetType: AssetType.IMAGE,
    title: "Chinos Front View",
    description: "Front product shot on neutral background.",
    tags: ["front", "studio"],
    status: AssetStatus.PENDING_REVIEW,
    rejectionReason: undefined,
    statusHistory: [
      { status: AssetStatus.PENDING_REVIEW, changedAt: "2025-03-12T11:00:00Z" },
    ],
    uploadedAt: "2025-03-12T11:00:00Z",
  },

  {
    id: "a5",
    productId: "p2",
    variantId: "v4",
    fileName: "chinos-khaki-lifestyle.jpg",
    fileUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600",
    assetType: AssetType.IMAGE,
    title: "Khaki 32 - Lifestyle Shot",
    description: "Lifestyle shot in urban setting.",
    tags: ["lifestyle", "outdoor", "khaki"],
    status: AssetStatus.REJECTED,
    rejectionReason: "Image is too dark and out of focus. Please reshoot.",
    statusHistory: [
      { status: AssetStatus.PENDING_REVIEW, changedAt: "2025-03-13T09:00:00Z" },
      {
        status: AssetStatus.REJECTED,
        changedAt: "2025-03-14T14:00:00Z",
        reason: "Image is too dark and out of focus. Please reshoot.",
      },
    ],
    uploadedAt: "2025-03-13T09:00:00Z",
  },

  {
    id: "a6",
    productId: "p3",
    variantId: undefined,
    fileName: "overcoat-mood.jpg",
    fileUrl:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600",
    assetType: AssetType.IMAGE,
    title: "Overcoat Mood Shot",
    description: "Editorial mood shot for AW25 campaign.",
    tags: ["mood", "editorial", "aw25"],
    status: AssetStatus.PENDING_REVIEW,
    rejectionReason: undefined,
    statusHistory: [
      { status: AssetStatus.PENDING_REVIEW, changedAt: "2025-03-18T10:00:00Z" },
    ],
    uploadedAt: "2025-03-18T10:00:00Z",
  },

  {
    id: "a7",
    productId: "p5",
    variantId: undefined,
    fileName: "floral-dress-front.jpg",
    fileUrl:
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600",
    assetType: AssetType.IMAGE,
    title: "Floral Dress Front View",
    description: "Front view on white background.",
    tags: ["front", "studio", "white-bg"],
    status: AssetStatus.APPROVED,
    rejectionReason: undefined,
    statusHistory: [
      { status: AssetStatus.PENDING_REVIEW, changedAt: "2025-03-05T09:00:00Z" },
      { status: AssetStatus.APPROVED, changedAt: "2025-03-06T11:00:00Z" },
    ],
    uploadedAt: "2025-03-05T09:00:00Z",
  },

  {
    id: "a8",
    productId: "p5",
    variantId: "v6",
    fileName: "floral-dress-xs-detail.jpg",
    fileUrl:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
    assetType: AssetType.IMAGE,
    title: "Blue Floral XS - Fabric Detail",
    description: "Close-up of fabric print and texture.",
    tags: ["detail", "fabric", "print"],
    status: AssetStatus.PENDING_REVIEW,
    rejectionReason: undefined,
    statusHistory: [
      { status: AssetStatus.PENDING_REVIEW, changedAt: "2025-03-19T08:30:00Z" },
    ],
    uploadedAt: "2025-03-19T08:30:00Z",
  },
];
