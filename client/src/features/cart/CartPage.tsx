import {
  Box,
  Image,
  Select,
  Text,
  Heading,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import * as React from "react";
import { useLocation, useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { addToCart, removeFromCart } from "./cartSlice";
import { FaTrash } from "react-icons/fa";

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
  if (cartInfo.length === 0) {
    return (
      <Box>
        <Text>Dein Einkaufskorb ist leider leer</Text>
      </Box>
    );
  }
  return (
    <Box>
      {cartInfo.map((item) => {
        return (
          <Box key={item._id}>
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
    </Box>
  );
};

export default CartPage;
