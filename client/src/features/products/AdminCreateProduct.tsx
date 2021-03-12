import * as React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
// Formik und yup
import { useFormik } from "formik";
import * as Yup from "yup";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { createProduct } from "./productSlice";

const AdminCreateProduct = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.products);
  const history = useHistory();
  //   Image
  const [uploading, setUploading] = React.useState(false);
  const [image, setImage] = React.useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      //   image: "",
      brand: "",
      desc: "",
      category: "",
      countInStock: 0,
      numReviews: 0,
      rating: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Erforderlich"),
      price: Yup.number().required("Erforderlich"),
      //   image: Yup.string().required("Erforderlich"),
      brand: Yup.string().required("Erforderlich"),
      desc: Yup.string().required("Erforderlich"),
      category: Yup.string().required("Erforderlich"),
      countInStock: Yup.number().required("Erforderlich"),
      numReviews: Yup.number().required("Erforderlich"),
      rating: Yup.number().required("Erforderlich"),
    }),
    onSubmit: (daten, { resetForm }) => {
      const {
        name,
        price,
        brand,
        desc,
        category,
        countInStock,
        numReviews,
        rating,
      } = daten;
      dispatch(
        createProduct({
          name,
          price,
          image,
          brand,
          desc,
          category,
          countInStock,
          numReviews,
          rating,
        })
      );
      //   console.log(daten, image);
      resetForm();
      history.push("/admin/profile");
    },
  });

  //   file uploader
  const uploadFileHandler = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/a1/uploads", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  return (
    <Box mt={16} w="90%" mx="auto">
      <Heading bgGradient="linear(to-l,blue.400,blue.600)" bgClip="text">
        Produkt hinzufügen
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        {/* Name */}
        <FormControl
          isInvalid={!!formik.errors.name && formik.touched.name}
          id="name"
          mt={4}
        >
          <FormLabel bgGradient="linear(to-l,blue.400,blue.600)" bgClip="text">
            Name
          </FormLabel>
          <Input
            variant="flushed"
            type="text"
            placeholder="Name"
            {...formik.getFieldProps("name")}
          />

          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>
        {/* Preis */}
        <FormControl
          isInvalid={!!formik.errors.price && formik.touched.price}
          id="price"
          mt={4}
        >
          <FormLabel bgGradient="linear(to-l,blue.400,blue.600)" bgClip="text">
            Preis
          </FormLabel>
          <Input
            variant="flushed"
            type="number"
            placeholder="Preis"
            {...formik.getFieldProps("price")}
          />

          <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
        </FormControl>
        {/* Bild */}
        <FormControl
          //   isInvalid={!!formik.errors.image && formik.touched.image}
          id="image"
          mt={4}
        >
          <FormLabel bgGradient="linear(to-l,blue.400,blue.600)" bgClip="text">
            Bild
          </FormLabel>
          <Input
            variant="flushed"
            type="file"
            placeholder="Bild"
            onChange={uploadFileHandler}
            // {...formik.getFieldProps("image")}
          />

          {/* <FormErrorMessage>{formik.errors.image}</FormErrorMessage> */}
        </FormControl>
        {/* Marke */}
        <FormControl
          isInvalid={!!formik.errors.brand && formik.touched.brand}
          id="brand"
          mt={4}
        >
          <FormLabel bgGradient="linear(to-l,blue.400,blue.600)" bgClip="text">
            Marke
          </FormLabel>
          <Input
            variant="flushed"
            type="text"
            placeholder="Marke"
            {...formik.getFieldProps("brand")}
          />

          <FormErrorMessage>{formik.errors.brand}</FormErrorMessage>
        </FormControl>
        {/* Beschreibung */}
        <FormControl
          isInvalid={!!formik.errors.desc && formik.touched.desc}
          id="desc"
          mt={4}
        >
          <FormLabel bgGradient="linear(to-l,blue.400,blue.600)" bgClip="text">
            Beschreibung
          </FormLabel>
          <Input
            variant="flushed"
            type="text"
            placeholder="Beschreibung"
            {...formik.getFieldProps("desc")}
          />

          <FormErrorMessage>{formik.errors.desc}</FormErrorMessage>
        </FormControl>
        {/* Kategorie */}
        <FormControl
          isInvalid={!!formik.errors.category && formik.touched.category}
          id="category"
          mt={4}
        >
          <FormLabel bgGradient="linear(to-l,blue.400,blue.600)" bgClip="text">
            Kategorie
          </FormLabel>
          <Input
            variant="flushed"
            type="text"
            placeholder="Kategorie"
            {...formik.getFieldProps("category")}
          />

          <FormErrorMessage>{formik.errors.category}</FormErrorMessage>
        </FormControl>
        {/* Anzahl */}
        <FormControl
          isInvalid={
            !!formik.errors.countInStock && formik.touched.countInStock
          }
          id="countInStock"
          mt={4}
        >
          <FormLabel bgGradient="linear(to-l,blue.400,blue.600)" bgClip="text">
            Anzahl
          </FormLabel>
          <Input
            variant="flushed"
            type="number"
            placeholder="Anzahl"
            {...formik.getFieldProps("countInStock")}
          />

          <FormErrorMessage>{formik.errors.countInStock}</FormErrorMessage>
        </FormControl>
        {/* Anzahl der Reviews */}
        <FormControl
          isInvalid={!!formik.errors.numReviews && formik.touched.numReviews}
          id="numReviews"
          mt={4}
        >
          <FormLabel bgGradient="linear(to-l,blue.400,blue.600)" bgClip="text">
            Anzahl der Reviews
          </FormLabel>
          <Input
            variant="flushed"
            type="number"
            placeholder="Anzahl der Reviews"
            {...formik.getFieldProps("numReviews")}
          />

          <FormErrorMessage>{formik.errors.numReviews}</FormErrorMessage>
        </FormControl>
        {/* Rating */}
        <FormControl
          isInvalid={!!formik.errors.rating && formik.touched.rating}
          id="rating"
          mt={4}
        >
          <FormLabel bgGradient="linear(to-l,blue.400,blue.600)" bgClip="text">
            Rating
          </FormLabel>
          <Input
            variant="flushed"
            type="number"
            placeholder="Rating"
            {...formik.getFieldProps("rating")}
          />

          <FormErrorMessage>{formik.errors.rating}</FormErrorMessage>
        </FormControl>

        <Button mt={8} colorScheme="blue" type="submit">
          Hinzufügen
        </Button>
      </form>
    </Box>
  );
};

export default AdminCreateProduct;
