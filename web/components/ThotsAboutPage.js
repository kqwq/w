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

  const SmallerAndSmallerText = ({ txt, startSize, endSize }) => {
    return txt.split("").map((char, i) => (
      <span
        style={{
          fontSize: startSize + ((endSize - startSize) * i) / txt.length + "px",
        }}
      >
        {char}
      </span>
    ));
  };

  return (
    <>
      <Box color="lavender">
        <Heading fontSize="xl" className="about-header">
          Hola!
        </Heading>
        <Box>
          This is a microblog site where I talk about anything. Literally
          anything. Unethical programmer hacks to boring linguistic facts. I'll
          avoid political topics as honestly it's talked about way too often
          already. This idea came directly from Matthias's{" "}
          <Link
            color="teal"
            href="https://thoughts.learnerpages.com/"
            target="_blank"
          >
            Thoughts
          </Link>{" "}
          webpage (subdomain?)
          <Spacer mt={3} />
          <Box>
            Here I'll introduce myself. I'm a software developer who creates
            mobile apps, websites, automation scripts,{" "}
            <SmallerAndSmallerText
              txt={
                "the metaverse, blockchain technology, NFTs, cutting-edge You copy & pasted this."
              }
              startSize={16}
              endSize={1}
            />
          </Box>
          <Spacer mt={3} />
          <Box>
            Ok but these buzzwords 🤔🤔🤔. How the f am I supposed to implement{" "}
            <b style={{ fontStyle: "italic" }}>blockchain technologies</b> on a
            simple chat app? Imagine someone deletes an old message... the
            entire log of chat messages becomes invalid. This is like,,, not
            cool along with mostW other tech buzzwords. Metaverse? VR meetings
            and games. NFTs? Expensive receipts. Edge computing? I moved my
            server closer to your ISP. Buzzwords are ultimately for investors,
            not developers.
          </Box>
          <Spacer mt={3} />
          <Box>
            As some of you guys know I've been IP banned from the #1 HIT GAME
            Khan Academy dot org for creating a functional dating app. This
            meant I could no longer create and share <i>any</i> of my projects
            (rest of my projects were erased on a flash drive but that's another
            story). I did what any sensible person would do and decided to
            enrolled at University away from home. This move assigns my computer
            a new IP address so I can log into Khan Academy undetected... and if
            they dare to ban my account now... they subsequently ban the entire
            University.
          </Box>
          <Heading fontSize="xl" className="about-header">
            Why the password?
          </Heading>
          I'm less likely to get in trouble for posting PDF links to college
          textbooks. And why not :o
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
          short message below:
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
