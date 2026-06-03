"use client";

import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { MdUpload } from "react-icons/md";
import { useUploadAsset } from "@/app/_hooks/useAssets";
import type { UploadAssetPayload } from "@/types/asset";
import UploadAssetDialog from "./UploadAssetDialog";

function UploadAssetButton() {
  const [open, setOpen] = useState(false);
  const { trigger: upload, isMutating } = useUploadAsset();

  async function handleSubmit(payload: UploadAssetPayload) {
    await upload(payload);
    setOpen(false);
  }

  return (
    <>
      <Button
        size="sm"
        bg="amber.500"
        color="white"
        _hover={{ bg: "amber.600" }}
        onClick={() => setOpen(true)}
      >
        <MdUpload size={16} /> Upload Asset
      </Button>
      <UploadAssetDialog
        open={open}
        isSubmitting={isMutating}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default UploadAssetButton;
