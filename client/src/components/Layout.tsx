import { Box } from "@chakra-ui/react";
import * as React from "react";
// import Navbar
import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
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
