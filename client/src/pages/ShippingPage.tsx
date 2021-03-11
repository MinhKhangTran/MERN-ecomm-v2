import * as React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Heading,
  Button,
  Select,
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// Formik und yup
import { useFormik } from "formik";
import * as Yup from "yup";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { saveShipingAddress } from "../features/cart/cartSlice";
import CheckoutBreadcrumb from "../components/CheckoutBreadcrumb";
import { RootState } from "../store";

const ShippingPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      plz: "",
      country: "",
      //   paymentMethod: "",
    },
    validationSchema: Yup.object({
      address: Yup.string().required("Eine Adresse ist nötig!"),
      city: Yup.string().required("Eine Stadt ist nötig!"),
      plz: Yup.string().required("Eine Postleitzahl ist nötig!"),
      country: Yup.string().required("Ein Land ist nötig!"),
      //   paymentMehtod: Yup.string().required("Eine Methode ist nötig"),
    }),
    onSubmit: (daten, { resetForm }) => {
      // console.log(daten);
      dispatch(saveShipingAddress(daten));
      resetForm();
      history.push("/checkout");
    },
  });

  const { shipingAddress } = useSelector((state: RootState) => state.cart);
  React.useEffect(() => {
    if (shipingAddress !== null) {
      history.push("/checkout");
    }
  }, [shipingAddress, history]);
  return (
    <Box>
      <CheckoutBreadcrumb versand={true} checkout={false} bezahlen={false} />
      <Heading color="orange.500" mb={8}>
        Versand
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        {/* Address */}
        <FormControl
          isInvalid={!!formik.errors.address && formik.touched.address}
          id="address"
          mt={4}
        >
          <FormLabel
            bgGradient="linear(to-l,orange.400,orange.600)"
            bgClip="text"
          >
            Adresse
          </FormLabel>
          <Input
            variant="flushed"
            type="text"
            placeholder="Adresse"
            {...formik.getFieldProps("address")}
          />

          <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
        </FormControl>

        {/* city */}
        <FormControl
          isInvalid={!!formik.errors.city && formik.touched.city}
          id="city"
          mt={4}
        >
          <FormLabel
            bgGradient="linear(to-l,orange.400,orange.600)"
            bgClip="text"
          >
            Stadt
          </FormLabel>

          <Input
            variant="flushed"
            type="text"
            placeholder="Stadt"
            {...formik.getFieldProps("city")}
          />

          <FormErrorMessage>{formik.errors.city}</FormErrorMessage>
        </FormControl>
        {/* plz */}
        <FormControl
          isInvalid={!!formik.errors.plz && formik.touched.plz}
          id="plz"
          mt={4}
        >
          <FormLabel
            bgGradient="linear(to-l,orange.400,orange.600)"
            bgClip="text"
          >
            Postleitzahl
          </FormLabel>

          <Input
            variant="flushed"
            type="text"
            placeholder="Postleitzahl"
            {...formik.getFieldProps("plz")}
          />

          <FormErrorMessage>{formik.errors.plz}</FormErrorMessage>
        </FormControl>
        {/* country */}
        <FormControl
          isInvalid={!!formik.errors.country && formik.touched.country}
          id="country"
          mt={4}
        >
          <FormLabel
            bgGradient="linear(to-l,orange.400,orange.600)"
            bgClip="text"
          >
            Land
          </FormLabel>

          <Input
            variant="flushed"
            type="text"
            placeholder="Land"
            {...formik.getFieldProps("country")}
          />

          <FormErrorMessage>{formik.errors.country}</FormErrorMessage>
        </FormControl>
        {/* Bezahlmethode */}
        {/* <FormControl
          isInvalid={
            !!formik.errors.paymentMethod && formik.touched.paymentMethod
          }
          id="paymentMethod"
          mt={4}
        >
          <FormLabel
            bgGradient="linear(to-l,orange.400,orange.600)"
            bgClip="text"
          >
            Bezahlmethode
          </FormLabel>
          <Select
            variant="flushed"
            type="text"
            placeholder="Bezahlmethode"
            {...formik.getFieldProps("paymentMethod")}
          >
            <option value="paypal">PayPal</option>
            <option value="creditcard">Kreditkarte</option>
          </Select>
          <FormErrorMessage>{formik.errors.paymentMethod}</FormErrorMessage>
        </FormControl> */}

        <Button mt={8} colorScheme="orange" type="submit">
          Checkout
          {/* <Link to="/checkout">Checkout</Link> */}
        </Button>
      </form>
    </Box>
  );
};

export default ShippingPage;
