import React, { useRef } from "react";
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

const ThotsAboutPage = () => {
  const val = (ref) => {
    return ref.current.value;
  };
  const clearVal = (ref, override = "") => {
    ref.current.value = override;
  };
  const submitContact = async () => {
    const newComment = {
      body: `${val(contactTypeRef)}::${contactBodyRef.current.value}`,
      date: new Date(),
      author: val(contactNameRef),
      postId: "thots_contact",
    };

    let res = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.error("error", newComment);
      alert("There was a problem posting that comment... Error code 1052");
    } else {
      alert("Sent");
      clearVal(contactBodyRef);
      clearVal(contactTypeRef);
      clearVal(contactNameRef);
    }
  };
  const contactBodyRef = useRef();
  const contactTypeRef = useRef();
  const contactNameRef = useRef();

  return (
    <>
      <Box color="lavender">
        <Heading fontSize="xl" className="about-header">
          Hola!
        </Heading>
        <Box>
          This is a personal blog where I talk about anything. Heavily inspired
          by Matthias's{" "}
          <a href="https://thoughts.learnerpages.com/" target="_blank">
            Thoughts
          </a>
          . It's like Twitter but without the flow of notifications. I post here
          a few times daily.
          <Heading fontSize="xl" className="about-header">
            Why the password?
          </Heading>
          I'm less likely to get in trouble for posting PDF links to college
          textbooks. And do I really want my future employer reading this?
          <Heading fontSize="xl" className="about-header">
            Comment Guidelines
          </Heading>
          Even though comments are anonymous, this site doesn't allow you to
          willingly harm other users or myself.
          <Box as="ol" pl={10}>
            <li>Don't be a jerk</li>
            <li>Don't impersonate other users</li>
            <li>Don't hack this site without permission</li>
          </Box>
          <Heading fontSize="xl" className="about-header">
            Contact
          </Heading>
          Feel free to message me on Discord <Code>kqwq#6389</Code> or send me a
          message below:
          <Stack spacing={3} mt={3} maxW="md">
            <Textarea
              placeholder="feedback / questions / concerns"
              ref={contactBodyRef}
            ></Textarea>
            <HStack spacing={3}>
              <Input placeholder="name" ref={contactNameRef}></Input>
              <Select ref={contactTypeRef}>
                <option>General</option>
                <option>Delete a comment</option>
                <option>Report spam/malicious activity</option>
              </Select>
              <Button
                w={40}
                variant="solid"
                colorScheme="telegram"
                onClick={submitContact}
              >
                Submit
              </Button>
            </HStack>
            <small>postId: thots_contact</small>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default ThotsAboutPage;
