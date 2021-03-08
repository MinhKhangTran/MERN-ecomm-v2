import * as React from "react";
import { Box, Grid, Spinner, Heading } from "@chakra-ui/react";
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
    return (
      <Box>
        <Heading color="orange.400">Unsere Produkte</Heading>
        <Spinner color="orange.400" />
      </Box>
    );
  }
  return (
    <Box>
      <Heading color="orange.400">Unsere Produkte</Heading>
      <Grid
        my={8}
        templateColumns={{ base: "repeat(1,1fr)", md: "repeat(3,1fr)" }}
        gap={6}
      >
        {productInfo?.map((product) => {
          return <ProductItem key={product._id} {...product} single={false} />;
        })}
      </Grid>
    </Box>
  );
};

export default ProductList;
