import React from "react";
import {
  Box,
  Button,
  Code,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  Link,
  Select,
  SelectField,
  Spacer,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import NavBar from "../../components/NavBar";

const HundredProblems = () => {
  return (
    <>
      <NavBar />
      <Spacer pt={16} />
      <Container>
        <Heading>Kyle's List of 100 Unsolved Problems</Heading>
        <Text>
          About the list. Nisi sit ipsum irure anim elit nisi excepteur.
          Adipisicing nostrud do duis ex anim. Nisi velit nisi fugiat anim
          officia ea velit.
        </Text>
      </Container>
    </>
  );
};

export default HundredProblems;
