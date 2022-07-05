import {
  Box,
  Container,
  Textarea,
  RadioGroup,
  Radio,
  Heading,
  InputGroup,
  Input,
  InputLeftAddon,
  Stack,
  Link,
  Button,
  FormLabel,
} from "@chakra-ui/react";
import React from "react";
import NavBar from "../../components/NavBar";
import NextLink from "next/link";

const AdminPage = () => {
  const [destination, setDestination] = React.useState("none");

  return (
    <>
      <NavBar />
      <Box pt="40px">AdminPage</Box>
      <Container>
        <Heading>New blog post</Heading>
        <Stack spacing={4}>
          <FormLabel mt={5} for="radio-in">
            Post to...
          </FormLabel>
          <RadioGroup
            id="radio-in"
            defaultValue={destination}
            onChange={setDestination}
            mb={6}
          >
            <Stack direction="row" spacing={5}>
              <Radio value="none">none</Radio>
              <Radio value="blogs">blogs</Radio>
              <Radio value="thots">thots</Radio>
              <Radio value="thots">twitter (external)</Radio>
            </Stack>
          </RadioGroup>
          <Link href="https://stackedit.io/app#" target="_blank">
            <Button colorScheme="linkedin">Markdown Editor</Button>
          </Link>
          <InputGroup>
            <InputLeftAddon children="Title" />
            <Input type="text" placeholder="post title" />
          </InputGroup>
          <Textarea
            placeholder="Blog content in .md markdown format"
            size="sm"
            resize="both"
          />
          <InputGroup>
            <InputLeftAddon children="Tags" />
            <Input
              type="text"
              placeholder="add tags (comma separated) e.g. javascript,meta,web"
            />
          </InputGroup>
          <Button colorScheme="blue">Submit</Button>
        </Stack>

        <Heading mt={10}>Live stats</Heading>

        <Heading mt={10}>Accumulative stats</Heading>
      </Container>
    </>
  );
};

export default AdminPage;
