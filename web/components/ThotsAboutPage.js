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
          This is a personal blog where I talk about anything. It's pretty much
          a parody of Matthias's{" "}
          <a href="https://thoughts.learnerpages.com/" target="_blank">
            Thoughts
          </a>{" "}
          page, but without the{" "}
          <Box
            as="span"
            color="#53929B"
            bgColor="#2E2A39"
            fontFamily="Helvetica, Arial, sans-serif"
          >
            8:46 p.m. Jun 13, 2022, UTC-10
          </Box>{" "}
          ultra-precise timezone-sensitive nonsense. Big inspiration came from
          Matthias's page and it's totally not like I just copied his page
          layout and changed the colors.
          <Spacer mt={3} />
          <Box display="none">
            Here I will tell you about myself as a programmer. I am a web,
            fullstack, mobile, and game developer who works with client-side
            code, especially JavaScript and Dart. More than half of my smaller
            projects were deleted after I installed Raspian on a flash drive
            containing all my old projects. I then got IP banned from Khan
            Academy for creating a functional dating app. This meant I could no
            longer create and share <i>any</i> of my projects. I was utterly
            defeated. Seeking revenge, I enrolled at University so I could be
            assigned a new IP address and log on to Khan Academy... and if they
            dare to ban my account now... they subsequently ban the entire
            University.
          </Box>
          <Heading fontSize="xl" className="about-header">
            Why the password?
          </Heading>
          I'm less likely to get in trouble for posting PDF links to college
          textbooks. Also it's fun.
          <Heading fontSize="xl" className="about-header">
            Comment Guidelines
          </Heading>
          <Box as="ol" pl={10}>
            <li>Don't</li>
            <li>be</li>
            <li>a</li>
            <li>thot</li>
          </Box>
          Also don't hack this site without permission. If you impersonate
          someone else I will ban you.
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
