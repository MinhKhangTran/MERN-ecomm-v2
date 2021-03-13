import React from "react";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Stars from "../../components/Stars";
import Moment from "react-moment";
import "moment/locale/de";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import ReviewForm from "./ReviewForm";
import { clearProductÄnderung, getProductById } from "./productSlice";

const ReviewList = () => {
  const dispatch = useDispatch();
  const { singleProduct, änderung } = useSelector(
    (state: RootState) => state.products
  );
  const { userInfo } = useSelector((state: RootState) => state.users);

  if (singleProduct?.reviews.length === 0) {
    return (
      <Box mt={8}>
        <Text color="orange.500" fontSize={"xl"} fontWeight="semibold">
          Es gibt noch keine Reviews!
        </Text>
        {userInfo?._id.length === 0 ? (
          <Box>
            <Text>
              Du musst dich anmelden um zu bewerten!{" "}
              <Link to="/login">Hier klicken</Link>
            </Text>
          </Box>
        ) : (
          <ReviewForm />
        )}
      </Box>
    );
  }
  return (
    <Box mt={8}>
      {singleProduct?.reviews.map((review) => {
        return (
          <Box
            mb={4}
            borderTop="1px"
            borderColor="gray.200"
            key={review._id!}
            mt={6}
          >
            <Stars rating={review.rating} />
            <Flex align="center">
              <Text casing="capitalize" fontWeight="bold" fontSize="lg">
                {review.name}
              </Text>
              <Spacer />
              <Text>
                <Moment locale="de" to={review.createdAt}></Moment>
              </Text>
            </Flex>
            <Text>{review.comment}</Text>
          </Box>
        );
      })}
      {userInfo?._id.length === 0 ? (
        <Box>
          <Text>
            Du musst dich anmelden um zu bewerten!{" "}
            <Link to="/login">Hier klicken</Link>
          </Text>
        </Box>
      ) : (
        <ReviewForm />
      )}
    </Box>
  );
};

export default ReviewList;
