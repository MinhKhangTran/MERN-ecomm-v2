import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Spacer,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { Link } from "react-router-dom";
// icnos
import { MdStoreMallDirectory } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <Box bg="blackAlpha.200">
      <Flex p={4} align="center" w="90%" mx="auto">
        <Icon
          boxSize={{ base: "10", md: "16" }}
          color="blackAlpha.600"
          as={MdStoreMallDirectory}
        ></Icon>
        <Text
          display={{ base: "none", md: "block" }}
          fontWeight="semibold"
          color="blackAlpha.700"
          ml={4}
          fontSize="2xl"
        >
          <Link to="/">Gönner-Shop</Link>
        </Text>
        <Spacer />
        <Box position="relative">
          <Icon
            boxSize={{ base: "6", md: "8" }}
            color="blackAlpha.600"
            as={FaShoppingCart}
          />
          <Center
            w="20px"
            h="20px"
            bg="orange.400"
            borderRadius="full"
            position="absolute"
            top="-2"
            right="-2"
          >
            1
          </Center>
        </Box>
        <Box>
          <Avatar
            size="md"
            ml={8}
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
          />
        </Box>
      </Flex>
    </Box>
  );
};
export default Navbar;
