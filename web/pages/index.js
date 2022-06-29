import { Box, Center, Flex, Spacer, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { Sketch } from "../components/Sketch";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Box
        w="100%"
        h="100vh"
        style={{
          backgroundColor: "white",
          background: `linear-gradient(
            45deg,
            hsl(0deg 0% 100%) 0%,
            hsl(25deg 100% 95%) 11%,
            hsl(25deg 100% 90%) 22%,
            hsl(25deg 100% 85%) 33%,
            hsl(25deg 100% 80%) 44%,
            hsl(24deg 100% 76%) 56%,
            hsl(24deg 100% 71%) 67%,
            hsl(25deg 96% 65%) 78%,
            hsl(26deg 92% 59%) 89%,
            hsl(27deg 88% 52%) 100%
          )`,
        }}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          w="100%"
          h="100vh"
          color="darkgreen"
        >
          <Text fontSize="72px">Kyle Lastname</Text>
        </Flex>
      </Box>

      <Box pos="absolute" bottom="0" left="0" right="0">
        <Sketch />
      </Box>
    </>
  );
}
