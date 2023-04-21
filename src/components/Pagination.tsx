import { Button, HStack } from "@chakra-ui/react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <HStack spacing="2" mt="6">
      {pages.map((page) => (
        <Button
          key={page}
          colorScheme={currentPage === page ? "blue" : undefined}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      ))}
    </HStack>
  );
};
