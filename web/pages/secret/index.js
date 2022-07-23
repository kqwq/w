import {
  Box,
  Container,
  Heading,
  ListItem,
  Spacer,
  UnorderedList,
  Text,
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
  const adminPages = [
    {
      url: "https://www.youtube.com/watch?v=aYsgsSo1aow",
      name: "Admin page (full control panel)",
    },
    {
      url: "/projects/new",
      name: "Post new project",
    },
  ];

  return (
    <>
      <NavBar />
      <Container>
        <Spacer pt={16} />
        <Heading>Secret directories</Heading>
        <Spacer pt={10} />

        <Heading size="md">Secret</Heading>
        <Text fontStyle={"italic"}>
          Some or all of these pages require an access code.
        </Text>
        <UnorderedList>
          {secretPages.map((secretPage) => (
            <ListItem key={secretPage.url}>
              <NextLink href={secretPage.url} passHref>
                <Link>{secretPage.name}</Link>
              </NextLink>
            </ListItem>
          ))}
        </UnorderedList>

        <Spacer pt={8} />
        <Heading size="md">Admin only</Heading>
        <UnorderedList>
          {adminPages.map((adminPage) => (
            <ListItem key={adminPage.url}>
              <NextLink href={adminPage.url} passHref>
                <Link>{adminPage.name}</Link>
              </NextLink>
            </ListItem>
          ))}
        </UnorderedList>
      </Container>
    </>
  );
};

export default SecretPage;
