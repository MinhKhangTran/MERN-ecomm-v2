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
import { updateProfile } from "./userSlice";

const UserUpdate = () => {
  const { userInfo } = useSelector((state: RootState) => state.users);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [showPW, setShowPW] = React.useState(false);
  const [showConfirmPW, setShowConfirmPW] = React.useState(false);

  const { username, email } = userInfo!;

  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { email, username, password: "", confirmPW: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Ein Benutzername ist nötig!"),
      email: Yup.string().email().required("Eine Email ist nötig!"),
      password: Yup.string()
        .required("Ein Passwort ist nötig!")
        .min(6, "mindestens 6 Zeichen!"),
      confirmPW: Yup.string()
        .required("Ein Passwort ist nötig!")
        .min(6, "mindestens 6 Zeichen!"),
    }),
    onSubmit: (daten, { resetForm }) => {
      //   dispatch(register(daten));
      if (daten.password !== daten.confirmPW) {
        dispatch(toastError("Die Passwörter sind nicht identisch!"));
      } else {
        console.log(daten);
        dispatch(
          updateProfile({
            email: daten.email,
            username: daten.username,
            password: daten.password,
          })
        );
      }
      resetForm();
    },
  });
  return (
    <Box>
      <Heading color="orange.400">Dein Profil</Heading>
      <Text mt={8} color="orange.500">
        Benutzername: {userInfo?.username}
      </Text>
      <Text color="orange.500">Email: {userInfo?.email}</Text>
      <Text color="orange.500">Passwort: ******</Text>
      <Button
        onClick={() => setIsUpdate(!isUpdate)}
        mt={8}
        colorScheme="red"
        variant="outline"
      >
        {isUpdate ? "Doch nicht mehr aktualisieren?" : "Profil aktualisieren?"}
      </Button>
      {isUpdate && (
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

            {/* Password */}
            <FormControl
              isInvalid={!!formik.errors.password && formik.touched.password}
              id="password"
              mt={4}
            >
              <FormLabel
                bgGradient="linear(to-l,orange.400,orange.600)"
                bgClip="text"
              >
                Passwort
              </FormLabel>
              <InputGroup>
                <Input
                  variant="flushed"
                  type={showPW ? "text" : "password"}
                  placeholder="******"
                  {...formik.getFieldProps("password")}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    aria-label="hide/show password"
                    onClick={() => setShowPW(!showPW)}
                    variant="ghost"
                    colorScheme="orange"
                    h="1.75rem"
                  >
                    {showPW ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            {/* confirm Password */}
            <FormControl
              isInvalid={!!formik.errors.confirmPW && formik.touched.confirmPW}
              id="confirmPW"
              mt={4}
            >
              <FormLabel
                bgGradient="linear(to-l,orange.400,orange.600)"
                bgClip="text"
              >
                Passwort bestätigen
              </FormLabel>
              <InputGroup>
                <Input
                  variant="flushed"
                  type={showConfirmPW ? "text" : "password"}
                  placeholder="******"
                  {...formik.getFieldProps("confirmPW")}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    aria-label="hide/show password"
                    onClick={() => setShowConfirmPW(!showConfirmPW)}
                    variant="ghost"
                    colorScheme="orange"
                    h="1.75rem"
                  >
                    {showConfirmPW ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <Button mt={8} colorScheme="orange" type="submit">
              Ändern
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default UserUpdate;
