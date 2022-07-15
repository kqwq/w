import React, { useRef, useState } from "react";
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
  const [showFace, setShowFace] = useState(false);

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
          Personal thoughts. Inspired from Matthias's{" "}
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
            <SmallerAndSmallerText
              txt={"Sheeeeeeeeeeeeeeeeesh"}
              startSize={14}
              endSize={80}
            />
            {/* . My reaction to that information:
            😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐😐.
            <br />
            Hey, you need to focus and stop messing around.{" "}
            <SmallerAndSmallerText
              txt={"Noooooooooooooooooooooo..."}
              startSize={16}
              endSize={1}
            />
            <br /> I feel like I am going clinicly insane. */}
          </Box>
          <Spacer mt={3} />
          <Box display="none">
            Here I'll introduce myself. I'm a software developer who creates
            mobile apps, websites, automation scripts,
            {
              "the actual metaverse, blockchain technology, NFTs, IoT, C8H10N4O2"
            }
            || Ok but these buzzwords 🤔🤔🤔. How the f am I supposed to
            implement{" "}
            <b style={{ fontStyle: "italic" }}>blockchain technology</b> on a
            simple chat app for instance? Imagine someone deletes an old
            message... the entire log of chat messages becomes invalid. This is
            like,,, not cool along with most other tech buzzwords. Here, I will
            un-buzzword-ify the following terms. Metaverse? VR meetings and
            games. NFTs? Expensive receipts. Edge computing? A server close to
            an ISP near you. Buzzwords are ultimately for investors, not
            developers.|| As some of you guys know I've been IP banned from the
            #1 HIT GAME Khan Academy dot org slash computing for creating a
            working dating app. This meant I could no longer create and share{" "}
            <i>any</i> of my projects (rest of my projects were erased on a
            flash drive but that's another story). I did what any sensible
            person would do and decided to enrolled at University away from
            home. I did this to assign my computer a brand new IP address. Now I
            can log into Khan Academy undetected... and if they dare to ban my
            account now... they subsequently ban the entire University.
          </Box>
          <Spacer mt={3} />
          <Box></Box>
          <Heading fontSize="xl" className="about-header">
            Why the password?
          </Heading>
          I'm less likely to get in trouble for posting PDF links to college
          textbooks. And why not lol
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
          </Stack>
          <Flex justify="space-between" mt={2}>
            <small>
              postId: thot
              <Link cursor="pointer" onClick={() => setShowFace(true)}>
                s_c
              </Link>
              ontact
            </small>
            <Link
              href="https://www.youtube.com/watch?v=_nH0xv_oCiw"
              display={showFace ? "block" : "none"}
            >
              s_c
            </Link>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default ThotsAboutPage;
