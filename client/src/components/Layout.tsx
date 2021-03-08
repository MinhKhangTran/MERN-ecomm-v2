import { Box, useToast } from "@chakra-ui/react";
import * as React from "react";
import { useHistory } from "react-router-dom";

import { clearToast } from "../features/toast/toastSlice";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

// component
import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  const { msg, type } = useSelector((state: RootState) => state.toast);
  const { userInfo } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const toast = useToast();
  const history = useHistory();
  React.useEffect(() => {
    if (type === "success") {
      toast({
        title: "Erfolg",
        description: msg,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      dispatch(clearToast());
    }
    if (type === "error") {
      toast({
        title: "Fehler",
        description: msg,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      dispatch(clearToast());
    }
    // eslint-disable-next-line
  }, [type, msg, dispatch]);

  React.useEffect(
    () => {
      if (userInfo?._id.length === 0) {
        history.push("/");
      }
    },
    // eslint-disable-next-line
    [dispatch, history]
  );
  return (
    <Box>
      <Navbar />
      <Box w="90%" mx="auto" mt={6}>
        {children}
      </Box>
    </Box>
  );
};
export default Layout;
