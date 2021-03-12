import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import ReviewForm from "./ReviewForm";

const ReviewList = () => {
  const { singleProduct } = useSelector((state: RootState) => state.products);
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
        return <Box>Review</Box>;
      })}
      <ReviewForm />
    </Box>
  );
};

export default ReviewList;
