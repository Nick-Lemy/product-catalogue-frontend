"use client";
import {
  Box,
  Button,
  Card,
  HStack,
  Link,
  Separator,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { BsArrowRight } from "react-icons/bs";
import { useGetStats } from "../_hooks/useStats";
import BarListUI from "./ui/BarList";

function ProductsByBrand() {
  const { data: stats, isLoading, error } = useGetStats();

  if (error) throw error;

  const productsByBrand = stats?.productsByBrand || [];

  return (
    <Card.Root variant="outline" size="sm">
      <Card.Header>
        <HStack justify="space-between" align="flex-start">
          <Box>
            <Text fontWeight="semibold" fontSize="sm">
              Products by Brand
            </Text>
            <Text fontSize="xs" color="fg.muted" mt={0.5}>
              Distribution across all brands
            </Text>
          </Box>
          <Button asChild variant="ghost" size="xs" colorPalette="blue.700">
            <Link href="/products">
              <BsArrowRight size={20} />
            </Link>
          </Button>
        </HStack>
      </Card.Header>
      <Separator />
      <Card.Body pt={4}>
        {isLoading ? (
          <Spinner color="brand.700" size="sm" />
        ) : (
          <BarListUI
            data={productsByBrand}
            title="Brand"
            titleLabel1="Products"
          />
        )}
      </Card.Body>
    </Card.Root>
  );
}

export default ProductsByBrand;
