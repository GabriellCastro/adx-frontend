import React, { useContext } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../components/Layout";
import { LoginCredentials, loginSchema } from "../utils/LoginValidation";
import { AuthContext } from "../context/AuthContext";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import { api } from "../api";
import Image from "next/image";

const Login: React.FC = () => {
  const { setUser } = useContext(AuthContext);
  const { push } = useRouter();
  const toast = useToast();

  const handleLogin: SubmitHandler<LoginCredentials> = async (dataForm) => {
    try {
      const { data } = await api.post("/auth/login", dataForm);
      setUser(data.user);
      setCookie(null, "token", data.token);
      push("/");
    } catch (error) {
      console.log(error);
      let message = "An error occurred while logging in";
      toast({
        title: "Error",
        description: message,
        status: "error",
      });
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <Layout title="Login | Adx Full">
      <Container
        maxW="600px"
        minH="100vh"
        px="6"
        display="flex"
        flexDir="column"
        justifyContent="center"
      >
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
        <Box bg="white" p="6" borderRadius="md">
          <Heading mb="4" fontSize="2xl">
            Login | Adx Full
          </Heading>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Stack spacing="4">
              <FormControl isInvalid={!!errors.email}>
                <Input
                  type="email"
                  placeholder="E-mail"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <Input
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
              </FormControl>
              <Button type="submit" colorScheme="blue">
                Login
              </Button>
            </Stack>
          </form>
          <Text mt="4" textAlign="center">
            Don't have an account?{" "}
            <Link href="/register" color="blue.500">
              Register
            </Link>
          </Text>
        </Box>
      </Container>
    </Layout>
  );
};

export default Login;
