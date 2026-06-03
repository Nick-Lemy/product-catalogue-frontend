import { Card, DataList, Separator, Text } from "@chakra-ui/react";
import type { Product } from "@/types/product";

interface InfoSectionProps {
  product: Product;
}

function InfoSection({ product }: InfoSectionProps) {
  const fields = [
    { label: "Brand",         value: product.brand },
    { label: "Category",      value: product.category },
    { label: "Target Market", value: product.targetMarket },
    { label: "Season",        value: product.season },
    { label: "Description",   value: product.description },
  ];

  return (
    <Card.Root variant="outline" size="sm">
      <Card.Header>
        <Text fontWeight="semibold" fontSize="sm">Product Information</Text>
      </Card.Header>
      <Separator />
      <Card.Body>
        <DataList.Root orientation="horizontal" gap={3}>
          {fields.map(({ label, value }) => (
            <DataList.Item key={label}>
              <DataList.ItemLabel
                fontSize="xs"
                color="fg.muted"
                fontWeight="medium"
                textTransform="uppercase"
                letterSpacing="wide"
                minW="120px"
              >
                {label}
              </DataList.ItemLabel>
              <DataList.ItemValue fontSize="sm">{value}</DataList.ItemValue>
            </DataList.Item>
          ))}
        </DataList.Root>
      </Card.Body>
    </Card.Root>
  );
}

export default InfoSection;
