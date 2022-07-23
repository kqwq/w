import React, { useEffect, useState } from "react";
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
  const [problems, setProblems] = useState([]);

  const fetchProblems = async () => {
    let json = await fetch("/api/unsolved").then((r) => r.json());

    setProblems(json.data);
  };

  useEffect(() => {
    fetchProblems();
  });

  return (
    <>
      <NavBar />
      <Spacer pt={16} />
      <Container>
        <Heading>Kyle's List of 100 Unsolved Problems</Heading>
        <Text color="#333" mt={2}>
          On the internet, lists of unsolved math problems use hundreds of
          strange mathematical symbols and notations when explaining the
          question. Most people—including myself—do not have an advanced
          understanding of number theory or topology, making it hard to
          communicate the problem to the rest of the world. This list was
          created to challenge the idea that the most difficult problems must be
          crude, sophisticated, and obscure. Allow me to present my list of one
          hundred (100) unsolved math problems.
        </Text>
        <Text color="#f00" mt={2}>
          If you manage to solve any of these problems, please email the
          solution to @example.com. Follow{" "}
          <Link color="red.700">this guide</Link> before sending.
        </Text>

        <Spacer mt={6} />
        <HStack>
          {problems.map((p) => {
            return (
              <>
                <Box>
                  <Heading size="lg">{p.title}</Heading>
                  <Text>{p.body}</Text>
                  <Text size="sm" color="blue">
                    {p.tags}
                  </Text>
                  <Divider />
                </Box>
              </>
            );
          })}
        </HStack>
        <Spacer mt={20} />
      </Container>
    </>
  );
};

export default HundredProblems;
