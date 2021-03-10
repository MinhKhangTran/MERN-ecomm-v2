import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaChevronCircleRight } from "react-icons/fa";

const CheckoutBreadcrumb = ({
  versand,
  checkout,
  bezahlen,
}: {
  versand: boolean;
  checkout: boolean;
  bezahlen: boolean;
}) => {
  return (
    <Breadcrumb separator={<FaChevronCircleRight />} color="orange.400">
      {versand ? (
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={Link} to="/shipping">
            Versand
          </BreadcrumbLink>
        </BreadcrumbItem>
      ) : (
        <BreadcrumbItem>
          <Text>Versand</Text>
        </BreadcrumbItem>
      )}

      {checkout ? (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/checkout">
            Checkout
          </BreadcrumbLink>
        </BreadcrumbItem>
      ) : (
        <BreadcrumbItem>
          <Text>Checkout</Text>
        </BreadcrumbItem>
      )}

      {bezahlen ? (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/bezahlen">
            Bezahlen
          </BreadcrumbLink>
        </BreadcrumbItem>
      ) : (
        <BreadcrumbItem>
          <Text>Bezahlen</Text>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};

export default CheckoutBreadcrumb;
