import React from "react";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RegisterCredentials,
  registerSchema,
} from "../utils/RegisterValidation";
import Layout from "../components/Layout";
import Image from "next/image";
import { api } from "../api";
import { useRouter } from "next/router";

const Register: React.FC = () => {
  const toast = useToast();
  const { push } = useRouter();

  const handleRegister: SubmitHandler<RegisterCredentials> = async (
    dataForm
  ) => {
    try {
      const { name, email, password } = dataForm;
      await api.post("/auth/register", {
        name,
        email,
        password,
      });
      toast({
        title: "Success",
        description: "User created successfully",
        status: "success",
      });
      push("/login");
    } catch (error) {
      console.log(error);
      let message = "An error occurred while registering";
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
  } = useForm<RegisterCredentials>({
    resolver: yupResolver(registerSchema),
  });

  return (
    <Layout title="Register | Adx Full">
      <Container
        maxW="600px"
        px="6"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        minH="100vh"
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
          <Heading mb="4" fontSize={{ base: "1xl", md: "2xl" }}>
            Register | Adx Full
          </Heading>
          <form onSubmit={handleSubmit(handleRegister)}>
            <Stack spacing="4">
              <FormControl isInvalid={!!errors.email}>
                <Input {...register("name")} placeholder="Name" type="text" />
                {errors.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.email}>
                <Input {...register("email")} placeholder="Email" type="text" />
                {errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <Input
                  {...register("password")}
                  placeholder="Password"
                  type="password"
                />
                {errors.password && (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.confirmPassword}>
                <Input
                  {...register("confirmPassword")}
                  placeholder="Confirm Password"
                  type="password"
                />
                {errors.confirmPassword && (
                  <FormErrorMessage>
                    {errors.confirmPassword.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <Button type="submit" colorScheme="blue">
                Register
              </Button>
            </Stack>
            <Text mt="4" textAlign="center">
              Have an account?{" "}
              <Link href="/login" color="blue.500">
                Login
              </Link>
            </Text>
          </form>
        </Box>
      </Container>
    </Layout>
  );
};

export default Register;
