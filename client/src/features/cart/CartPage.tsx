import {
  Box,
  Image,
  Select,
  Text,
  Heading,
  Flex,
  IconButton,
  Button,
} from "@chakra-ui/react";
import * as React from "react";
import { useLocation, useParams, Link } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { addToCart, removeFromCart } from "./cartSlice";
import { FaTrash } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";

const CartPage = () => {
  interface IParams {
    id: string;
  }
  const dispatch = useDispatch();
  const { id } = useParams<IParams>();
  const location = useLocation();
  const qty: number = parseInt(location.search.split("=")[1]);
  //   console.log(typeof qty, id);
  React.useEffect(() => {
    if (id) {
      dispatch(addToCart({ id, qty }));
    }
  }, [id, qty, dispatch]);
  const { cartInfo } = useSelector((state: RootState) => state.cart);
  const { userInfo } = useSelector((state: RootState) => state.users);
  if (cartInfo.length === 0) {
    return (
      <Box>
        <Button
          leftIcon={<RiArrowGoBackFill />}
          colorScheme="orange"
          variant="ghost"
          mb={4}
        >
          <Link to="/">Zurück</Link>
        </Button>
        <Heading color="orange.500" mb={8}>
          Dein Warenkorb
        </Heading>
        <Text>Dein Einkaufskorb ist leider leer</Text>
      </Box>
    );
  }
  return (
    <Box>
      <Button
        leftIcon={<RiArrowGoBackFill />}
        colorScheme="orange"
        variant="ghost"
        mb={4}
      >
        <Link to="/">Zurück</Link>
      </Button>
      <Heading color="orange.500" mb={8}>
        Dein Warenkorb
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
              <Select
                size="md"
                w="20%"
                colorScheme="orange"
                variant="flushed"
                mt={2}
                value={item.qty}
                onChange={(e) =>
                  dispatch(
                    addToCart({ id: item._id, qty: Number(e.target.value) })
                  )
                }
              >
                {Array.from({ length: item.countInStock }, (_, index) => {
                  return (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  );
                })}
              </Select>
              <Text>{(item.price * item.qty).toFixed(2)} €</Text>
              <IconButton
                icon={<FaTrash />}
                aria-label="delete"
                colorScheme="red"
                variant="ghost"
                onClick={() => {
                  dispatch(removeFromCart({ id: item._id }));
                }}
              ></IconButton>
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
          <Link to={userInfo?._id.length !== 0 ? "/shipping" : "/login"}>
            Jetzt kaufen
          </Link>
        </Button>
      </Flex>
    </Box>
  );
};

export default CartPage;
