import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Course } from "../types/Course";
import { api } from "../api";

import Layout from "../components/Layout";
import { Header } from "../components/Header";

const CourseDetails: React.FC = () => {
  const [course, setCourse] = useState<Course>({} as Course);

  const router = useRouter();
  const toast = useToast();
  const { course_id } = router.query;

  useEffect(() => {
    api
      .get(`/courses/${course_id}`)
      .then(({ data }) => {
        setCourse(data);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "An error occurred while fetching the course",
        });
        console.log(error);
        router.push("/");
      });
  }, [course_id]);

  return (
    <Layout title="Course Details | Adx Full">
      <Header />
      <Box
        w={{ base: "100%", md: "100%" }}
        h={{ base: "60px", md: "60px" }}
      ></Box>
      <Box p="6">
        <Flex mb="4" bg={"white"} p={6} rounded={"md"}>
          <Image
            src={course.image_url || "/devcourse.png"}
            alt={course.name}
            w="100px"
            h="100px"
            p={2}
          />
          <Stack spacing="2">
            <Heading as="h1" size="lg">
              {course.name}
            </Heading>

            <Text>{course.synopsis}</Text>
            <Box mt="10">
              <Text fontWeight="bold" mb="2">
                Sobre o curso
              </Text>
              <Text>{course.synopsis}</Text>
              {course.video_url && (
                <Box mt="6">
                  {
                    <div
                      dangerouslySetInnerHTML={{ __html: course.video_url }}
                    />
                  }
                </Box>
              )}
            </Box>
          </Stack>
        </Flex>
      </Box>
    </Layout>
  );
};

export default CourseDetails;
