"use client";

import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useUploadAsset } from "@/app/_hooks/useAssets";
import type { UploadAssetPayload } from "@/types/asset";
import FormSection from "./_components/section/FormSection";
import HeaderSection from "./_components/section/HeaderSection";

export default function UploadAssetPage() {
  const router = useRouter();
  const { trigger: upload, isMutating, error } = useUploadAsset();

  if (error) throw error;

  async function handleSubmit(payload: UploadAssetPayload) {
    const asset = await upload(payload);
    router.push(`/assets/${asset.id}`);
  }

  return (
    <Box px={6} pb={10}>
      <HeaderSection />
      <FormSection isSubmitting={isMutating} onSubmit={handleSubmit} />
    </Box>
  );
}
