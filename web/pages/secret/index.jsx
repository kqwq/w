import { Box } from "@chakra-ui/react";
import React from "react";
import NavBar from "../../components/NavBar";

const SecretPage = () => {
  return (
    <>
      <NavBar />

      <h1>Secret page</h1>
      <Box>This page does not exist.</Box>
    </>
  );
};

export default SecretPage;
