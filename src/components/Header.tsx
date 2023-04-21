import React, { useContext } from "react";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";

export const Header: React.FC = () => {
  const router = useRouter();
  const { user, signOut } = useContext(AuthContext);
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      py="4"
      px="8"
      position="fixed"
      w={"full"}
      zIndex={2}
      boxShadow={"md"}
      bg="gray.800"
    >
      <Box
        as="a"
        href="/"
        w="40px"
        h="40px"
        onClick={() => router.push("/")}
        cursor={"pointer"}
        display="flex"
        alignItems="center"
      >
        <img src="/logo.png" alt="Logo" />
      </Box>
      <Flex
        align="center"
        display={{
          base: "none",
          md: "flex",
        }}
      >
        <Text
          mr="4"
          color="gray.50"
          onClick={() => router.push("/")}
          cursor={"pointer"}
          _hover={{
            borderBottom: "2px",
            borderBottomColor: "gray.50",
          }}
        >
          Home
        </Text>
        <Text
          mr="4"
          color="gray.50"
          cursor={"pointer"}
          _hover={{
            borderBottom: "2px",
            borderBottomColor: "gray.50",
          }}
        >
          Cursos
        </Text>
        <Text
          mr="4"
          color="gray.50"
          cursor={"pointer"}
          _hover={{
            borderBottom: "2px",
            borderBottomColor: "gray.50",
          }}
        >
          Sobre
        </Text>
      </Flex>
      <Flex
        align="center"
        onClick={() => (user.name ? router.push("/") : router.push("/login"))}
        cursor={"pointer"}
        bg={user.name ? "green.500" : "purple.500"}
        borderRadius="md"
        p="2"
        height={"40px"}
        _hover={{
          bg: user.name ? "green.600" : "purple.600",
        }}
      >
        <Text color="gray.50">{user.name ? user.name : "Login"}</Text>
        <IconButton
          icon={
            user.name ? (
              <BiLogOut
                size={20}
                color={"gray.50"}
                onClick={() => {
                  signOut();
                  router.push("/");
                }}
              />
            ) : (
              <FaUserCircle size={20} color={"gray.50"} />
            )
          }
          aria-label="Login"
          variant="ghost"
          color="gray.50"
          _hover={{
            bg: "transparent",
          }}
        />
      </Flex>
    </Flex>
  );
};
