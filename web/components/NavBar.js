import { Box, Flex, Link, Icon, FormHelperText } from "@chakra-ui/react";
import React, { useState } from "react";
import NextLink from "next/link";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { NavBarSketch } from "./NarBarSketch";
import { Sketch } from "./Sketch";

const NavBar = ({ showBackToMainSite = false }) => {
  return (
    <Flex
      pos={showBackToMainSite ? "inline" : "fixed"}
      width="100%"
      height="50px"
      p="5px"
      pl="15px"
      pr="15px"
      justifyContent="space-between"
      alignItems="center"
      // bgImage={`linear-gradient(
      //   70deg,
      //   hsl(0deg 0% 0%) 0%,
      //   hsl(202deg 100% 3%) 14%,
      //   hsl(194deg 88% 4%) 29%,
      //   hsl(194deg 50% 6%) 43%,
      //   hsl(203deg 38% 7%) 57%,
      //   hsl(245deg 20% 9%) 71%,
      //   hsl(319deg 28% 9%) 86%,
      //   hsl(0deg 38% 10%) 100%
      //   )`}
      color="white"
    >
      <Sketch name={"dragonCurve"} />
      {showBackToMainSite ? (
        <>
          <NextLink href={"/"} passHref>
            <Flex>
              <Icon
                as={IoReturnUpBackOutline}
                boxSize={5}
                mr={2}
                color="gray"
              />
              <Link color="gray">Back to main site</Link>
            </Flex>
          </NextLink>
        </>
      ) : (
        <>
          <NextLink href={"/"} passHref>
            <Link color="orange.500">Home</Link>
          </NextLink>
          <NextLink href={"/projects"} passHref>
            <Link color="green.500">Projects</Link>
          </NextLink>
          <NextLink href={"/blog"} passHref>
            <Link color="blue.500">Blog</Link>
          </NextLink>
          <NextLink href={"/x/metaverse"} passHref>
            <Link color="pink.500">Meta</Link>
          </NextLink>
        </>
      )}
    </Flex>
  );
};

export default NavBar;
