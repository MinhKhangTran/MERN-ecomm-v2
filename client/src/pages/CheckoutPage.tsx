import {
  Box,
  Image,
  Select,
  Text,
  Heading,
  Flex,
  IconButton,
  Button,
  Table,
  Thead,
  Tbody,
  Th,
  Td,
  Tr,
} from "@chakra-ui/react";
import * as React from "react";
import { useLocation, useParams, Link, useHistory } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

import { FaTrash } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { cartInfo, shipingAddress } = useSelector(
    (state: RootState) => state.cart
  );
  const { userInfo } = useSelector((state: RootState) => state.users);
  React.useEffect(() => {
    if (cartInfo.length === 0) {
      history.push("/");
    }
  }, [cartInfo]);
  return (
    <Box>
      <Heading color="orange.500" mb={8}>
        Versandadresse
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>Adresse</Th>
            <Th>Stadt</Th>
            <Th>PLZ</Th>
            <Th>Land</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{shipingAddress?.address}</Td>
            <Td>{shipingAddress?.city}</Td>
            <Td>{shipingAddress?.plz}</Td>
            <Td>{shipingAddress?.country}</Td>
          </Tr>
        </Tbody>
      </Table>
      <Heading color="orange.500" mb={8}>
        Zusammenfassung deiner Bestellung
      </Heading>

      {cartInfo.map((item) => {
        return (
          <Box
            border="1px"
            borderColor="orange.300"
            borderRadius="xl"
            key={item._id}
            p={3}
            my={2}
          >
            <Heading fontSize="lg" color="orange.500">
              {item.name}
            </Heading>
            <Flex align="center" justify="space-between">
              <Image
                boxSize="100px"
                objectFit="cover"
                src={item.image}
                alt={item.name}
              />
              <Text>{item.brand}</Text>
              <Text>{item.qty}</Text>

              <Text>{(item.price * item.qty).toFixed(2)} €</Text>
            </Flex>
          </Box>
        );
      })}
      <Flex justify="flex-end" mt={14}>
        <Text
          display="inline-block"
          borderTop="2px"
          borderColor="orange.600"
          pl={4}
          fontSize="xl"
          fontWeight="semibold"
        >
          Deine Zwischensumme:{" "}
          <Text as="span" color="orange.400">
            {cartInfo.reduce((total, curr) => {
              return parseFloat((total + curr.price * curr.qty).toFixed(2));
            }, 0)}{" "}
            €
          </Text>
        </Text>
      </Flex>
      <Flex justify="flex-end" mt={8}>
        <Button
          isDisabled={cartInfo.length === 0}
          colorScheme="orange"
          variant="outline"
        >
          <Link to="/bezahlen">Jetzt bezahlen</Link>
        </Button>
      </Flex>
    </Box>
  );
};

export default CheckoutPage;
