import React, { useEffect, useState } from "react";
import { Container, Grid, useToast, Box, Input, Flex } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { api } from "../api";
import { Course } from "../types/Course";

import Layout from "../components/Layout";
import { CourseCard } from "../components/CourseCard";
import { CourseCardSkeleton } from "../components/CourseCardSkeleton";
import { Cart } from "../components/Cart";
import { Pagination } from "../components/Pagination";

const IndexPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const toast = useToast();

  useEffect(() => {
    toast({
      title: "Welcome to Adx Full",
      description: "We're glad you're here",
    });
    api
      .get(`/courses/page/${currentPage}`)
      .then(({ data }) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  const filterCourses = search
    ? courses.filter((course) => {
        return course.name.toLowerCase().includes(search.toLowerCase().trim());
      })
    : courses;

  return (
    <Layout title="Home | Adx Full">
      <Header />
      <Box
        w={{ base: "100%", md: "100%" }}
        h={{ base: "50px", md: "250px" }}
        display={{ base: "none", md: "block" }}
      >
        <img
          src="https://mentorama.com.br/blog/wp-content/uploads/2022/06/capa-blog-coding-iniciante.jpg"
          alt="teste"
        />
      </Box>
      <Flex justifyContent={"center"} p={4}>
        <Input
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          bg={{ base: "white", md: "gray.800" }}
          color={{ base: "black", md: "white" }}
          border={"none"}
          boxShadow={"md"}
          mt={{ base: "100", md: "0" }}
          w={{ base: "100%", md: "40%" }}
        />
      </Flex>
      <Container maxW="1400px" py="8">
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="6">
          {loading
            ? Array(8)
                .fill("")
                .map((_, index) => <CourseCardSkeleton key={index} />)
            : filterCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
        </Grid>
        {!loading && (
          <Flex mt="8" justifyContent="center">
            <Pagination
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={5}
            />
          </Flex>
        )}
      </Container>
      <Cart />
    </Layout>
  );
};

export default IndexPage;
