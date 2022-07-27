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
          <Text
            fontWeight="extrabold"
            fontSize="6xl"
            color="black"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
          >
            Kyle Wells
          </Text>
        </Flex>
      </Box>

      <Sketch name="trees" />

      <Flex
        pos="absolute"
        top="60vh"
        width="100%"
        justifyContent="space-around"
        color="blue"
        fontSize="2xl"
      >
        <NextLink href={"/projects"} passHref>
          <Link>projects</Link>
        </NextLink>
        <NextLink href={"/about"} passHref>
          <Link>about me</Link>
        </NextLink>

        <NextLink href={"/blog"} passHref>
          <Link>blog</Link>
        </NextLink>
      </Flex>
    </>
  );
}
