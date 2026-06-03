"use client";

import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  HStack,
  Image,
  Text,
  Wrap,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { MdCheck, MdClose, MdDescription, MdOpenInNew } from "react-icons/md";
import { useApproveAsset, useRejectAsset } from "@/app/_hooks/useAssets";
import { AssetType, type Asset } from "@/types/asset";
import RejectDialog from "./RejectDialog";

interface ReviewItemProps {
  asset: Asset;
  productName?: string;
}

function ReviewItem({ asset, productName }: ReviewItemProps) {
  const [rejectOpen, setRejectOpen] = useState(false);
  const { trigger: approve, isMutating: isApproving } = useApproveAsset(asset.id);
  const { trigger: reject, isMutating: isRejecting } = useRejectAsset(asset.id);

  async function handleReject(reason: string) {
    await reject(reason);
    setRejectOpen(false);
  }

  return (
    <Card.Root variant="outline" size="sm" overflow="hidden">
      <HStack align="stretch" gap={0}>
        {/* Thumbnail */}
        <Box w="140px" flexShrink={0} bg="bg.muted">
          {asset.assetType === AssetType.IMAGE ? (
            <Image src={asset.fileUrl} alt={asset.title} w="full" h="full" objectFit="cover" />
          ) : asset.assetType === AssetType.VIDEO ? (
            <video
              src={asset.fileUrl}
              muted
              preload="metadata"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Center h="full" color="fg.muted">
              <MdDescription size={36} />
            </Center>
          )}
        </Box>

        {/* Details */}
        <Box flex="1" p={4}>
          <HStack justify="space-between" align="flex-start">
            <Box>
              <Text fontWeight="semibold" fontSize="sm">
                {asset.title}
              </Text>
              <Text fontSize="xs" color="fg.muted">
                {asset.fileName}
                {productName ? ` · ${productName}` : ""}
              </Text>
            </Box>
            <Badge variant="subtle" colorPalette="gray">
              {asset.assetType}
            </Badge>
          </HStack>

          {asset.description && (
            <Text fontSize="sm" color="fg.muted" mt={2} lineClamp={2}>
              {asset.description}
            </Text>
          )}

          {asset.tags.length > 0 && (
            <Wrap gap={1} mt={2}>
              {asset.tags.map((tag) => (
                <Badge key={tag} variant="surface" colorPalette="gray" size="xs">
                  {tag}
                </Badge>
              ))}
            </Wrap>
          )}

          <HStack mt={4} gap={2}>
            <Button asChild variant="ghost" size="xs">
              <Link href={`/assets/${asset.id}`}>
                <MdOpenInNew size={14} /> View
              </Link>
            </Button>
            <Box flex="1" />
            <Button
              size="xs"
              colorPalette="red"
              variant="outline"
              loading={isRejecting}
              onClick={() => setRejectOpen(true)}
            >
              <MdClose size={14} /> Reject
            </Button>
            <Button
              size="xs"
              colorPalette="green"
              loading={isApproving}
              onClick={() => approve()}
            >
              <MdCheck size={14} /> Approve
            </Button>
          </HStack>
        </Box>
      </HStack>

      <RejectDialog
        open={rejectOpen}
        assetTitle={asset.title}
        isSubmitting={isRejecting}
        onClose={() => setRejectOpen(false)}
        onConfirm={handleReject}
      />
    </Card.Root>
  );
}

export default ReviewItem;
