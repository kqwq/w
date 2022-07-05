import {
  Box,
  Center,
  Flex,
  Link,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar";
import { Sketch } from "../components/Sketch";
import NextLink from "next/link";

export default function Home() {
  return (
    <>
      <NavBar />
      <Box
        w="100%"
        h="100vh"
        style={{
          backgroundColor: "white",
          background: `llinear-gradient(
            95deg,
            hsl(0deg 0% 0%) 0%,
            hsl(144deg 1% 46%) 9%,
            hsl(144deg 45% 98%) 12%,
            hsl(259deg 97% 77%) 15%,
            hsl(241deg 98% 50%) 17%,
            hsl(264deg 72% 69%) 21%,
            hsl(0deg 21% 85%) 28%,
            hsl(0deg 3% 40%) 42%,
            hsl(0deg 0% 0%) 99%
          )`,
        }}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          w="100%"
          h="100vh"
          color="brown"
        >
          <Text color="black" fontSize="72px">
            Kyle .
          </Text>
        </Flex>
      </Box>

      <Box pos="absolute" bottom="0" left="0" right="0" overflow="hidden">
        <Sketch />
      </Box>

      <Flex
        pos="absolute"
        top="60vh"
        width="100%"
        justifyContent="space-around"
        color="blue"
        fontSize="2xl"
      >
        <NextLink href={"/blog"} passHref>
          <Link>Blog</Link>
        </NextLink>

        <NextLink href={"/projects"} passHref>
          <Link>Projects</Link>
        </NextLink>

        <NextLink href={"/secret"} passHref>
          <Link>???</Link>
        </NextLink>
      </Flex>
    </>
  );
}
