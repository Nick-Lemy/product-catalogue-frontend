"use client";

import {
  Box,
  Button,
  Field,
  Fieldset,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  Separator,
  Textarea,
} from "@chakra-ui/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  MdCalendarToday,
  MdCategory,
  MdGroups,
  MdQrCode2,
  MdShoppingBag,
  MdStorefront,
} from "react-icons/md";
import type { CreateProductPayload } from "@/types/product";

interface ProductFormSectionProps {
  isSubmitting: boolean;
  onSubmit: (data: CreateProductPayload) => void;
}

function ProductFormSection({ isSubmitting, onSubmit }: ProductFormSectionProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductPayload>();

  return (
    <Box maxW="760px">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* General */}
        <Fieldset.Root size="lg">
          <Fieldset.Legend fontSize="sm" fontWeight="semibold">
            General
          </Fieldset.Legend>
          <Fieldset.HelperText mb={2}>
            The core details shoppers and the brand team will see first.
          </Fieldset.HelperText>
          <Fieldset.Content>
            <Grid templateColumns="1fr 1fr" gap={4}>
              <GridItem colSpan={2}>
                <Field.Root invalid={!!errors.name} required>
                  <Field.Label>
                    Name <Field.RequiredIndicator />
                  </Field.Label>
                  <InputGroup startElement={<MdShoppingBag />}>
                    <Input
                      placeholder="Classic Oxford Shirt"
                      {...register("name", { required: "Name is required" })}
                    />
                  </InputGroup>
                  <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                </Field.Root>
              </GridItem>

              <Field.Root invalid={!!errors.productCode} required>
                <Field.Label>
                  Product Code <Field.RequiredIndicator />
                </Field.Label>
                <InputGroup startElement={<MdQrCode2 />}>
                  <Input
                    placeholder="SHT-001"
                    {...register("productCode", {
                      required: "Product code is required",
                    })}
                  />
                </InputGroup>
                <Field.ErrorText>{errors.productCode?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.season} required>
                <Field.Label>
                  Season / Collection <Field.RequiredIndicator />
                </Field.Label>
                <InputGroup startElement={<MdCalendarToday />}>
                  <Input
                    placeholder="SS25"
                    {...register("season", { required: "Season is required" })}
                  />
                </InputGroup>
                <Field.ErrorText>{errors.season?.message}</Field.ErrorText>
              </Field.Root>

              <GridItem colSpan={2}>
                <Field.Root invalid={!!errors.description} required>
                  <Field.Label>
                    Description <Field.RequiredIndicator />
                  </Field.Label>
                  <Textarea
                    rows={4}
                    resize="none"
                    placeholder="A timeless Oxford shirt crafted from premium cotton..."
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  <Field.HelperText>
                    A short, descriptive summary of the product.
                  </Field.HelperText>
                  <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
                </Field.Root>
              </GridItem>
            </Grid>
          </Fieldset.Content>
        </Fieldset.Root>

        <Separator my={6} />

        {/* Classification */}
        <Fieldset.Root size="lg">
          <Fieldset.Legend fontSize="sm" fontWeight="semibold">
            Classification
          </Fieldset.Legend>
          <Fieldset.HelperText mb={2}>
            How this product is organised in the catalogue.
          </Fieldset.HelperText>
          <Fieldset.Content>
            <Grid templateColumns="1fr 1fr" gap={4}>
              <Field.Root invalid={!!errors.brand} required>
                <Field.Label>
                  Brand <Field.RequiredIndicator />
                </Field.Label>
                <InputGroup startElement={<MdStorefront />}>
                  <Input
                    placeholder="Jack & Jones"
                    {...register("brand", { required: "Brand is required" })}
                  />
                </InputGroup>
                <Field.ErrorText>{errors.brand?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.category} required>
                <Field.Label>
                  Category <Field.RequiredIndicator />
                </Field.Label>
                <InputGroup startElement={<MdCategory />}>
                  <Input
                    placeholder="Shirts"
                    {...register("category", {
                      required: "Category is required",
                    })}
                  />
                </InputGroup>
                <Field.ErrorText>{errors.category?.message}</Field.ErrorText>
              </Field.Root>

              <GridItem colSpan={2}>
                <Field.Root invalid={!!errors.targetMarket} required>
                  <Field.Label>
                    Target Market <Field.RequiredIndicator />
                  </Field.Label>
                  <InputGroup startElement={<MdGroups />}>
                    <Input
                      placeholder="Men"
                      {...register("targetMarket", {
                        required: "Target market is required",
                      })}
                    />
                  </InputGroup>
                  <Field.ErrorText>{errors.targetMarket?.message}</Field.ErrorText>
                </Field.Root>
              </GridItem>
            </Grid>
          </Fieldset.Content>
        </Fieldset.Root>

        <HStack justify="flex-end" gap={2} mt={8}>
          <Button asChild variant="outline" size="sm">
            <Link href="/products">Cancel</Link>
          </Button>
          <Button
            type="submit"
            size="sm"
            bg="amber.500"
            color="white"
            _hover={{ bg: "amber.600" }}
            loading={isSubmitting}
          >
            Create Product
          </Button>
        </HStack>
      </form>
    </Box>
  );
}

export default ProductFormSection;
