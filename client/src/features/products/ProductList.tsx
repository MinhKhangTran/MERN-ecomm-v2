import * as React from "react";
import {
  Box,
  Grid,
  Spinner,
  Heading,
  ButtonGroup,
  Button,
  IconButton,
} from "@chakra-ui/react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, paginateProducts } from "./productSlice";
import { RootState } from "../../store";
// components
import ProductItem from "./ProductItem";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const ProductList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  React.useEffect(() => {
    // dispatch(getAllProducts());
    dispatch(paginateProducts({ page, limit: 3 }));
  }, [dispatch, page]);
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
        {productInfo?.docs?.map((product) => {
          return <ProductItem key={product._id} {...product} single={false} />;
        })}
      </Grid>
      <ButtonGroup>
        <IconButton
          colorScheme="orange"
          aria-label="prev button"
          icon={<BsChevronLeft />}
          isDisabled={!productInfo.hasPrevPage}
          onClick={() => {
            setPage((oldValue) => {
              return oldValue - 1;
            });
          }}
        ></IconButton>
        {productInfo?.totalPages !== null &&
          Array.from({ length: productInfo?.totalPages }, (_, index) => {
            return (
              <Button
                colorScheme="orange"
                isActive={productInfo.page === index + 1}
                key={index + 1}
                onClick={() => {
                  setPage(index + 1);
                }}
              >
                {index + 1}
              </Button>
            );
          })}
        <IconButton
          colorScheme="orange"
          aria-label="next button"
          icon={<BsChevronRight />}
          isDisabled={!productInfo.hasNextPage}
          onClick={() => {
            setPage((oldValue) => {
              return oldValue + 1;
            });
          }}
        ></IconButton>
      </ButtonGroup>
    </Box>
  );
};

export default ProductList;
