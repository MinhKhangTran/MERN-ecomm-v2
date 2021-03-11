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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { getAllProfiles, deleteProfile, clearÄnderung } from "./userSlice";
import { RootState } from "../../store";
// icons
import { FaTrash, FaEdit } from "react-icons/fa";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { users, änderung } = useSelector((state: RootState) => state.users);
  React.useEffect(() => {
    dispatch(getAllProfiles());
    dispatch(clearÄnderung());
  }, [dispatch, änderung]);
  return (
    <Box>
      <Heading color="blue.500">Das ist dein Admin Profil</Heading>
      <Text color="blue.400">
        Es ist was besonders, deswegen verdient es einen fancy desing
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
    </Box>
  );
};

export default AdminPage;
