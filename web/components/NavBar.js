import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

const NavBar = () => {
  return (
    <Flex
      pos="fixed"
      width="100%"
      height="30px"
      p="5px"
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
      zIndex={2}
    >
      <NextLink href={"/"} passHref>
        <Link>Home</Link>
      </NextLink>
      <NextLink href={"/"} passHref>
        <Link>meta</Link>
      </NextLink>
    </Flex>
  );
};

export default NavBar;
