import * as React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Stars = ({ rating }: { rating: number }) => {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <Icon
        key={index}
        color="orange.400"
        as={rating > number ? BsStarFill : rating > index ? BsStarHalf : BsStar}
      ></Icon>
    );
  });
  return <Box>{tempStars}</Box>;
};

export default Stars;
