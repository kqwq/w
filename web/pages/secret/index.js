import {
  Box,
  Container,
  Heading,
  ListItem,
  Spacer,
  UnorderedList,
  Link,
} from "@chakra-ui/react";
import React from "react";
import NavBar from "../../components/NavBar";
import NextLink from "next/link";

const SecretPage = () => {
  const secretPages = [
    {
      url: "/thots",
      name: "Thoughts by Kyle",
    },
    {
      url: "/secret/kabucket",
      name: "KA Bucket",
    },
  ];

  return (
    <>
      <NavBar />
      <Container>
        <Spacer pt={16} />
        <Heading>Secret directories</Heading>
        <Spacer pt={10} />

        <Box>Some or all of these pages require an access code.</Box>

        <UnorderedList>
          {secretPages.map((secretPage) => (
            <ListItem key={secretPage.url}>
              <NextLink href={secretPage.url} passHref>
                <Link>{secretPage.name}</Link>
              </NextLink>
            </ListItem>
          ))}
        </UnorderedList>
      </Container>
    </>
  );
};

export default SecretPage;
