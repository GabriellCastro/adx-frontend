import React from "react";
import { Box, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";

export const CourseCardSkeleton: React.FC = () => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
      <Skeleton width={300} height={200} />
      <Box p="4">
        <SkeletonText noOfLines={2} mb="2" />
        <Flex justify="space-between">
          <Skeleton width="40%" height="24px" />
          <Skeleton width="20%" height="24px" />
        </Flex>
      </Box>
    </Box>
  );
};
