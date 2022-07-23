import {
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import React from "react";

const NewProject = () => {
  return (
    <Container mt={10}>
      <h1>New Project</h1>

      <Flex spacing={4}>
        <FormControl>
          <Input type="text" placeholder="Project name" />
          <FormLabel>Hellooo</FormLabel>
        </FormControl>
      </Flex>
    </Container>
  );
};

export default NewProject;
