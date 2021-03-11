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
  Select,
} from "@chakra-ui/react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
// Formik
import { useFormik } from "formik";
import * as Yup from "yup";
// Icons
import { FaEye, FaEyeSlash } from "react-icons/fa";
// toast
import { toastError } from "../toast/toastSlice";
import { getProfileById, updateProfileAsAdmin } from "./userSlice";
import { useParams } from "react-router";

const AdminUserPage = () => {
  interface IParams {
    id: string;
  }
  const { id } = useParams<IParams>();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getProfileById({ id }));
  }, [dispatch]);

  const [formData, setFormData] = React.useState({
    email: "",
    username: "",
    role: "",
  });
  const { user } = useSelector((state: RootState) => state.users);

  //   const { username, email, role } = user!;
  React.useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        username: user.username,
        role: user.role,
      });
    }
  }, [user]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: Yup.object({
      username: Yup.string().required("Ein Benutzername ist nötig!"),
      email: Yup.string().email().required("Eine Email ist nötig!"),
      role: Yup.string()
        .oneOf(["benutzer", "admin"])
        .required("Eine Rolle ist nötig"),
    }),
    onSubmit: (daten, { resetForm }) => {
      //   dispatch(register(daten));

      console.log(daten);
      dispatch(
        updateProfileAsAdmin({
          email: daten.email,
          username: daten.username,
          // @ts-expect-error
          role: daten.role,
        })
      );

      resetForm();
    },
  });
  return (
    <Box>
      <Heading color="orange.400">User</Heading>

      <Box mt={8}>
        <form onSubmit={formik.handleSubmit}>
          {/* Username */}
          <FormControl
            isInvalid={!!formik.errors.username && formik.touched.username}
            id="username"
            mt={4}
          >
            <FormLabel
              bgGradient="linear(to-l,orange.400,orange.600)"
              bgClip="text"
            >
              Benutzername
            </FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="E-Mail Adresse"
              {...formik.getFieldProps("username")}
            />

            <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
          </FormControl>
          {/* Email */}
          <FormControl
            isInvalid={!!formik.errors.email && formik.touched.email}
            id="email"
            mt={4}
          >
            <FormLabel
              bgGradient="linear(to-l,orange.400,orange.600)"
              bgClip="text"
            >
              E-Mail
            </FormLabel>
            <Input
              variant="flushed"
              type="email"
              placeholder="E-Mail Adresse"
              {...formik.getFieldProps("email")}
            />

            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
          {/* Rolle */}
          <FormControl
            isInvalid={!!formik.errors.role && formik.touched.role}
            id="role"
            mt={4}
          >
            <FormLabel
              bgGradient="linear(to-l,orange.400,orange.600)"
              bgClip="text"
            >
              Rolle
            </FormLabel>
            <Select
              variant="flushed"
              type="role"
              placeholder="Rolle"
              {...formik.getFieldProps("role")}
            >
              <option value="benutzer">Benutzer</option>
              <option value="admin">Admin</option>
            </Select>

            <FormErrorMessage>{formik.errors.role}</FormErrorMessage>
          </FormControl>

          <Button mt={8} colorScheme="orange" type="submit">
            Ändern
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AdminUserPage;
