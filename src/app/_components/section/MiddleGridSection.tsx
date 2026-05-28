import { Grid } from "@chakra-ui/react";
import ProductsByBrand from "../ProductsByBrand";
import RecentlyUploaded from "../RecentlyUploaded";

function MiddleGridSection() {
  return (
    <Grid templateColumns="1fr 1fr" gap={6} mb={6}>
      <ProductsByBrand />
      <RecentlyUploaded />
    </Grid>
  );
}
export default MiddleGridSection;
