import { Button, Link } from "@chakra-ui/react";

function AddProductButton() {
  return (
    <Button size="sm" bg="brand.700">
      <Link color="white" href="/products/new">
        Add Product
      </Link>
    </Button>
  );
}

export default AddProductButton;
