import {
  Box,
  Button,
  Card,
  HStack,
  Link,
  Separator,
  Text,
} from "@chakra-ui/react";
import { BsArrowRight } from "react-icons/bs";
import { mockDashboardStats } from "@/mocks/stats";
import BarListUI from "./ui/BarList";

function ProductsByBrand() {
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
        <BarListUI
          data={mockDashboardStats.productsByBrand}
          title="Brand"
          titleLabel1="Products"
        />
      </Card.Body>
    </Card.Root>
  );
}

export default ProductsByBrand;
