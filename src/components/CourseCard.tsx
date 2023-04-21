import { Box, Flex, Heading, Text, Button, Stack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { Course } from "../types/Course";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { addToCart } = useContext(AuthContext);
  return (
    <Flex flexDirection={"column"}>
      <Box p={3} mb={-10} zIndex={1}>
        <Flex justifyContent={"center"}>
          <Image
            src="/devcourse.png"
            alt="Course image"
            width={100}
            height={350}
          />
        </Flex>
      </Box>
      <Box
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        bg={"gray.200"}
        h={"300px"}
      >
        <Stack p="4" flexDirection={"column"} spacing={2}>
          <Heading as="h2" size="md" mb="2" mt={6}>
            {course.name}
          </Heading>
          <Text mb="2">{course.synopsis}</Text>
          <Text fontWeight="bold" p={1}>{`R$ ${course.price.toFixed(2)}`}</Text>
          <Flex align="center" justifyContent="space-between" mt={"2"}>
            <Button
              onClick={() => addToCart(course)}
              bg={"purple.500"}
              color={"white"}
              _hover={{
                bg: "purple.600",
              }}
            >
              Add to cart
            </Button>
            <Link href={`/${course.id}`}>See more</Link>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
};
