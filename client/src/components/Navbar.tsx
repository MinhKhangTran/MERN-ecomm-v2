import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { Link } from "react-router-dom";
// icnos
import { MdStoreMallDirectory } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { logoutUser } from "../features/users/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.users);
  const { cartInfo } = useSelector((state: RootState) => state.cart);
  return (
    <Box bg="blackAlpha.200">
      <Flex p={4} align="center" w="90%" mx="auto">
        <Link to="/">
          <Flex align="center">
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
              Gönner-Shop
            </Text>
          </Flex>
        </Link>
        <Spacer />
        {userInfo?._id.length !== 0 ? (
          <>
            <Box position="relative">
              <Link to="/cart">
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
                  {cartInfo.length}
                </Center>
              </Link>
            </Box>
            <Box>
              <Avatar size="md" ml={8} name={userInfo?.username} />
              <Menu>
                <MenuButton ml={2} variant="ghost" as={Button}>
                  <Text casing="capitalize">{userInfo?.username}</Text>
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link to="/profile">Dein Profil</Link>
                  </MenuItem>
                  {userInfo?.role === "admin" && (
                    <MenuItem>
                      <Link to="/admin/profile">Admin Profil</Link>
                    </MenuItem>
                  )}

                  <MenuDivider />
                  <MenuItem
                    cursor="pointer"
                    onClick={() => {
                      dispatch(logoutUser());
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </>
        ) : (
          <>
            <Box position="relative" mr={6}>
              <Link to="/cart">
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
                  {cartInfo.length}
                </Center>
              </Link>
            </Box>

            <Box>
              <Button colorScheme="orange" variant="outline">
                <Link to="/login">Login</Link>
              </Button>
            </Box>
          </>
        )}
      </Flex>
    </Box>
  );
};
export default Navbar;
