import { Box, Image, Select, Text, Heading } from "@chakra-ui/react";
import * as React from "react";
import { useLocation, useParams } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { addToCart } from "./cartSlice";

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
  return (
    <Box>
      {cartInfo.map((item) => {
        return (
          <Box key={item._id}>
            <Heading fontSize="lg" color="orange.500">
              {item.name}
            </Heading>
            <Image src={item.image} alt={item.name} />
          </Box>
        );
      })}
    </Box>
  );
};

export default CartPage;
