import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface PaginationSectionProps {
  filteredProductsCount: number;
  pageSize: number;
  page: number;
  setPage: (page: number) => void;
}

function PaginationSection({
  filteredProductsCount,
  pageSize,
  page,
  setPage,
}: PaginationSectionProps) {
  return (
    <Pagination.Root
      count={filteredProductsCount}
      pageSize={pageSize}
      page={page}
      onPageChange={(e) => setPage(e.page)}
      mt={4}
    >
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton aria-label="Previous page">
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>
        <Pagination.Items
          render={(p) => (
            <IconButton
              aria-label={`Page ${p.value}`}
              variant={p.type === "page" ? "outline" : "ghost"}
              onClick={() => setPage(p.value)}
            >
              {p.value}
            </IconButton>
          )}
        />
        <Pagination.NextTrigger asChild>
          <IconButton aria-label="Next page">
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
}
export default PaginationSection;
