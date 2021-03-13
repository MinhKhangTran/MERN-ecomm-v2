import * as React from "react";
import {
  Box,
  ButtonGroup,
  Heading,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Image,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { getAllProfiles, deleteProfile, clearÄnderung } from "./userSlice";
import {
  deleteProductById,
  clearProductÄnderung,
  getAllProducts,
} from "../products/productSlice";
import { RootState } from "../../store";
// icons
import { FaTrash, FaEdit } from "react-icons/fa";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { users, änderung } = useSelector((state: RootState) => state.users);
  const { productInfo, änderung: productÄnderung } = useSelector(
    (state: RootState) => state.products
  );
  React.useEffect(() => {
    dispatch(getAllProfiles());
    dispatch(getAllProducts());
    dispatch(clearÄnderung());
    dispatch(clearProductÄnderung);
  }, [dispatch, änderung, productÄnderung]);
  return (
    <Box>
      <Heading color="blue.500">Das ist dein Admin Profil</Heading>
      <Text color="blue.400">
        Es ist was besonders, deswegen verdient es einen fancy desing
      </Text>
      {/* User Stuff */}
      <Text mt={6} fontSize="xl" color="blue.400">
        Das sind die User
      </Text>

      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Rolle</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((user) => {
              return (
                <Tr key={user._id}>
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>
                    <ButtonGroup>
                      <Link to={`/admin/users/update/${user._id}`}>
                        <IconButton
                          icon={<FaEdit />}
                          aria-label="Edit"
                          colorScheme="blue"
                        ></IconButton>
                      </Link>
                      <IconButton
                        icon={<FaTrash />}
                        aria-label="Delete"
                        colorScheme="red"
                        onClick={() => {
                          dispatch(deleteProfile({ id: user._id }));
                        }}
                      ></IconButton>
                    </ButtonGroup>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
      {/* User Stuff */}
      <Text mt={6} fontSize="xl" color="blue.400">
        Das sind die Produkte
      </Text>

      <Button my={6} colorScheme="blue">
        <Link to="/admin/createProduct">Neues Produkt hinzufügen</Link>
      </Button>

      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Bild</Th>
              <Th>Anzahl</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {productInfo?.docs?.map((product) => {
              return (
                <Tr key={product._id}>
                  <Td>{product.name}</Td>
                  <Td>
                    <Image
                      boxSize="100px"
                      objectFit="cover"
                      src={product.image}
                      alt={product.name}
                    />
                  </Td>
                  <Td>{product.countInStock}</Td>
                  <Td>
                    <ButtonGroup>
                      <Link to={`/admin/products/update/${product._id}`}>
                        <IconButton
                          icon={<FaEdit />}
                          aria-label="Edit"
                          colorScheme="blue"
                        ></IconButton>
                      </Link>
                      <IconButton
                        icon={<FaTrash />}
                        aria-label="Delete"
                        colorScheme="red"
                        onClick={() => {
                          dispatch(deleteProductById({ id: product._id }));
                        }}
                      ></IconButton>
                    </ButtonGroup>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default AdminPage;
