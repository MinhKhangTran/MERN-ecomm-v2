import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { createReview } from "./productSlice";

const ReviewForm = () => {
  interface IParams {
    id: string;
  }
  const { id } = useParams<IParams>();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { comment: "", rating: 0 },
    validationSchema: Yup.object({
      comment: Yup.string().required("Bitte geben Sie einen Kommentar ein"),
      rating: Yup.number()
        .oneOf([1, 2, 3, 4, 5])
        .required("Eine Bewertung ist nötig!"),
    }),
    onSubmit: (daten, { resetForm }) => {
      // console.log(daten);
      dispatch(
        createReview({
          id,
          comment: daten.comment,
          rating: Number(daten.rating),
        })
      );
      resetForm();
      // console.log(typeof Number(daten.rating));
    },
  });
  return (
    <Box mt={8}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          isInvalid={!!formik.errors.comment && formik.touched.comment}
          id="comment"
        >
          <FormLabel>Kommentar</FormLabel>
          <Textarea
            {...formik.getFieldProps("comment")}
            type="text"
            placeholder="Kommentiere etwas ..."
          />
          <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!formik.errors.rating && formik.touched.rating}
          id="rating"
        >
          <FormLabel>Bewertung</FormLabel>
          <Select {...formik.getFieldProps("rating")} placeholder="Bewertung">
            <option value={1}>1 - Sehr schlecht</option>
            <option value={2}>2 - Schlecht</option>
            <option value={3}>3 - Es geht</option>
            <option value={4}>4 - Gut</option>
            <option value={5}>5 - Sehr gut</option>
          </Select>
          <FormErrorMessage>{formik.errors.rating}</FormErrorMessage>
        </FormControl>
        <Button colorScheme="orange" mt={6} type="submit">
          Bewerten
        </Button>
      </form>
    </Box>
  );
};

export default ReviewForm;
