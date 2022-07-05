import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";

const NavBar = () => {
  return (
    <Flex
      pos="absolute"
      top="0"
      left="0"
      width="100%"
      height="60px"
      justifyContent="space-between"
      alignItems="center"
      bgImage={`linear-gradient(
        70deg,
        hsl(0deg 0% 0%) 0%,
        hsl(202deg 100% 3%) 14%,
        hsl(194deg 88% 4%) 29%,
        hsl(194deg 50% 6%) 43%,
        hsl(203deg 38% 7%) 57%,
        hsl(245deg 20% 9%) 71%,
        hsl(319deg 28% 9%) 86%,
        hsl(0deg 38% 10%) 100%
        )`}
      color="white"
    >
      <Link>home</Link>
      <Link>meta</Link>
    </Flex>
  );
};

export default NavBar;
