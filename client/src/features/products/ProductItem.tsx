import * as React from "react";
import {
  Box,
  Spinner,
  Button,
  Image,
  Text,
  Heading,
  Badge,
  Flex,
  Spacer,
} from "@chakra-ui/react";
// components
import Stars from "../../components/Stars";
// types
import { IProducts } from "./productSlice";

const ProductItem = ({
  _id,
  brand,
  category,
  countInStock,
  createdAt,
  desc,
  image,
  name,
  numReviews,
  price,
  rating,
  reviews,
}: IProducts) => {
  return (
    <Box p={4} borderRadius="xl" boxShadow="lg" bg="gray.100">
      <Heading fontSize="2xl" color="orange.600" mb={4}>
        {name}
      </Heading>
      <Image src={image} alt={name} />
      <Flex mt={2} mb={2}>
        <Flex>
          <Stars rating={rating} />
          <Text ml={1}>({numReviews} Reviews)</Text>
        </Flex>
        <Spacer />
        <Text fontSize="lg" color="orange.400">
          Preis: {price} €
        </Text>
      </Flex>
      <Text>{desc.substring(0, 100)}...</Text>

      <Badge colorScheme="orange">{brand}</Badge>
      <Button mt={6} display="block" colorScheme="orange">
        Mehr Infos
      </Button>
    </Box>
  );
};

export default ProductItem;
