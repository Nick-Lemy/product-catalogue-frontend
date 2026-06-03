"use client";

import { Box, Button, HStack } from "@chakra-ui/react";
import Link from "next/link";
import AssetUploadFields from "@/app/assets/_components/AssetUploadFields";
import type { UploadAssetPayload } from "@/types/asset";

interface FormSectionProps {
  isSubmitting: boolean;
  onSubmit: (payload: UploadAssetPayload) => void;
}

function FormSection({ isSubmitting, onSubmit }: FormSectionProps) {
  return (
    <Box maxW="640px">
      <AssetUploadFields formId="asset-upload-page-form" onSubmit={onSubmit} />

      <HStack justify="flex-end" gap={2} mt={8}>
        <Button asChild variant="outline" size="sm">
          <Link href="/assets">Cancel</Link>
        </Button>
        <Button
          type="submit"
          form="asset-upload-page-form"
          size="sm"
          bg="amber.500"
          color="white"
          _hover={{ bg: "amber.600" }}
          loading={isSubmitting}
        >
          Upload Asset
        </Button>
      </HStack>
    </Box>
  );
}

export default FormSection;
