import { Box, Heading, Text, Button } from "@chakra-ui/react";
import * as React from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Box>
      <Heading color="orange.500">Error</Heading>
      <Text mt={4} fontSize="xl">
        Du kannst auf dieser Seite nichts kaufen :D. Ist nur ein Spaß Projekt.
      </Text>
      <Button
        leftIcon={<RiArrowGoBackFill />}
        colorScheme="orange"
        variant="outline"
        mt={4}
      >
        <Link to="/">Zurück zum Anfang</Link>
      </Button>
    </Box>
  );
};

export default ErrorPage;
