import { Button, Card, Grid, Link, Separator, Text } from "@chakra-ui/react";
import { MdAddBox, MdCloudUpload, MdRateReview } from "react-icons/md";

function QuickActionsSection() {
  return (
    <Card.Root variant="outline" size="sm">
      <Card.Header>
        <Text fontWeight="semibold" fontSize="sm">
          Quick Actions
        </Text>
        <Text fontSize="xs" color="fg.muted" mt={0.5}>
          Common tasks you might want to do
        </Text>
      </Card.Header>
      <Separator />
      <Card.Body>
        <Grid templateColumns="1fr 1fr 1fr" gap={4}>
          <Button
            asChild
            _hover={{ bg: "brand.700", color: "white" }}
            variant="outline"
            h="24"
            flexDirection="column"
            gap={2}
          >
            <Link href="/products/new">
              <MdAddBox size={24} />
              New Product
            </Link>
          </Button>
          <Button
            asChild
            _hover={{ bg: "brand.700", color: "white" }}
            variant="outline"
            h="24"
            flexDirection="column"
            gap={2}
          >
            <Link href="/assets/upload">
              <MdCloudUpload size={24} />
              Upload Asset
            </Link>
          </Button>
          <Button
            asChild
            _hover={{ bg: "brand.700", color: "white" }}
            variant="outline"
            h="24"
            flexDirection="column"
            gap={2}
          >
            <Link href="/assets/review">
              <MdRateReview size={24} />
              Review Queue
            </Link>
          </Button>
        </Grid>
      </Card.Body>
    </Card.Root>
  );
}
export default QuickActionsSection;
