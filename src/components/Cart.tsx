import React, { useContext } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { Course } from "../types/Course";
import { AuthContext } from "../context/AuthContext";

export const Cart = () => {
  const { cartItems, removeFromCart } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        leftIcon={<Icon as={FiShoppingCart} />}
        onClick={onOpen}
        variant="ghost"
        size="lg"
        position="fixed"
        bottom="4"
        right="4"
        bg="white"
        _hover={{ bg: "gray.600" }}
        rounded={"full"}
        zIndex={2}
      >
        Cart {cartItems.length > 0 && cartItems.length}
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Cart ({cartItems.length})</DrawerHeader>
            <DrawerBody>
              {cartItems.length === 0 ? (
                <Text>No items in cart!</Text>
              ) : (
                cartItems.map((item: Course) => (
                  <Flex
                    key={item.id}
                    align="center"
                    justifyContent="space-between"
                    borderBottomWidth="1px"
                    py="2"
                  >
                    <Flex p={3}>
                      <Image
                        src="/devcourse.png"
                        alt="Course image"
                        width={10}
                        height={10}
                      />
                      <Text ml={3}>{item.name}</Text>
                    </Flex>
                    <Button size="sm" onClick={() => removeFromCart(item)}>
                      <Icon as={FiTrash2} />
                    </Button>
                  </Flex>
                ))
              )}
            </DrawerBody>
            <DrawerFooter
              borderTopWidth="1px"
              display="flex"
              justifyContent="space-between"
              bg="gray.800"
            >
              <Text color="white" fontWeight="bold">
                Total:{" "}
                {cartItems.length > 0 &&
                  cartItems
                    .reduce((acc, item) => acc + item.price, 0)
                    .toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
              </Text>
              <Button colorScheme="blue">Checkout</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
