import { Button } from "@chakra-ui/react";
import Link from "next/link";

function AddProductButton() {
  return (
    <Button
      asChild
      size="sm"
      bg="brand.500"
      color="white"
      _hover={{ bg: "amber.600" }}
    >
      <Link href="/products/new">+ Add Product</Link>
    </Button>
  );
}

export default AddProductButton;
