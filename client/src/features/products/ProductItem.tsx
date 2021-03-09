import * as React from "react";
import {
  Box,
  Grid,
  Button,
  Image,
  Text,
  Heading,
  Badge,
  Flex,
  Spacer,
  Select,
} from "@chakra-ui/react";
// components
import Stars from "../../components/Stars";
// types
import { IProducts } from "./productSlice";
import { Link } from "react-router-dom";

interface IProductItem extends IProducts {
  single: boolean;
}

const ProductItem = ({
  _id,
  brand,
  category,
  countInStock,
  desc,
  image,
  name,
  numReviews,
  price,
  rating,
  reviews,
  single,
}: IProductItem) => {
  const [qty, setQty] = React.useState(0);

  if (single) {
    return (
      <Box p={4}>
        <Grid
          templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }}
          gap={4}
        >
          <Image borderRadius="lg" src={image} alt={name} />
          <Box>
            <Heading fontSize="2xl" color="orange.600" mb={4}>
              {name}
            </Heading>
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
            <Text fontSize="lg" mt={2} color="orange.700" fontWeight="semibold">
              Beschreibung:
            </Text>
            <Text fontSize="lg" mt={2} color="orange.600">
              {desc}
            </Text>
            <Text fontSize="lg" mt={2} color="orange.700" fontWeight="semibold">
              Marke:
              <Badge ml={1} colorScheme="orange">
                {brand}
              </Badge>
            </Text>
            <Text fontSize="lg" color="orange.700" fontWeight="semibold">
              Kategorie:
              <Badge variant="solid" ml={1} colorScheme="orange">
                {category}
              </Badge>
            </Text>
            {/* Dropdown */}
            {countInStock === 0 ? (
              <Select
                colorScheme="orange"
                variant="flushed"
                placeholder="Produkt zurzeit nicht verfügbar"
                isDisabled={true}
                mt={2}
              ></Select>
            ) : (
              <Select
                colorScheme="orange"
                variant="flushed"
                placeholder="Menge"
                mt={2}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setQty(parseInt(e.target.value));
                }}
              >
                {Array.from({ length: countInStock }, (_, index) => {
                  return (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  );
                })}
              </Select>
            )}

            <Button
              mt={6}
              display="block"
              colorScheme="orange"
              isDisabled={countInStock === 0 || qty < 1}
            >
              <Link to={`/cart/${_id}?qty=${qty}`}>In den Warenkorb</Link>
            </Button>
          </Box>
        </Grid>
        <Box>REVIEWS kommen hier her</Box>
      </Box>
    );
  }
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
        <Link to={`/products/${_id}`}>Mehr Infos</Link>
      </Button>
    </Box>
  );
};

export default ProductItem;
