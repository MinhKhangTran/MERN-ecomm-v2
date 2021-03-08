import * as React from "react";
import ProductItem from "./ProductItem";
import { useParams } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "./productSlice";
import { RootState } from "../../store";
import { Box } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

const SingleProduct = () => {
  interface IParams {
    id: string;
  }
  const { id } = useParams<IParams>();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getProductById({ id }));
  }, [dispatch]);
  const { singleProduct, loading } = useSelector(
    (state: RootState) => state.products
  );
  if (loading) {
    return (
      <Box>
        <Spinner color="orange.400" />
      </Box>
    );
  }
  return (
    <Box>
      {singleProduct?.rating !== undefined && (
        <ProductItem {...singleProduct} single={true} />
      )}
    </Box>
  );
};

export default SingleProduct;
