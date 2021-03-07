import * as React from "react";
import { Box, Heading } from "@chakra-ui/react";

// Components
import ProductList from "../features/products/ProductList";

const Home = () => {
  return (
    <Box>
      <Heading color="orange.400">Unsere Produkte</Heading>
      <ProductList />
    </Box>
  );
};
export default Home;
