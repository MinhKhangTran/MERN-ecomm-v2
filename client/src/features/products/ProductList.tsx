import * as React from "react";
import { Box, Grid, Spinner } from "@chakra-ui/react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "./productSlice";
import { RootState } from "../../store";
// components
import ProductItem from "./ProductItem";

const ProductList = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const { productInfo, loading } = useSelector(
    (state: RootState) => state.products
  );
  if (loading) {
    <Box>
      <Spinner color="gray.500" />
    </Box>;
  }
  return (
    <Grid
      my={8}
      templateColumns={{ base: "repeat(1,1fr)", md: "repeat(3,1fr)" }}
      gap={6}
    >
      {productInfo?.map((product) => {
        return <ProductItem key={product._id} {...product} />;
      })}
    </Grid>
  );
};

export default ProductList;
