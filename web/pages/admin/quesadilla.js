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
  HStack,
  Spacer,
  Text,
  Divider,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import NavBar from "../../components/NavBar";
import NextLink from "next/link";
import { validateContentPassword } from "../../lib/contentPassword";
import crypto from "crypto";
import Head from "next/head";

const AdminPage = () => {
  const destinationRef = useRef();
  const [destValue, setDestValue] = React.useState("none");
  const titleRef = useRef();
  const bodyRef = useRef();
  const tagsRef = useRef();
  const contentPassRef = useRef();
  const adminPassRef = useRef();
  const [feedback, setFeedback] = useState([]);

  const val = (ref) => {
    return ref.current.value;
  };

  const clearVal = (ref, override = "") => {
    ref.current.value = override;
  };

  const onSubmitBlogPost = async () => {
    if (destValue === "none") {
      let isOk = confirm("Are you sure you want to submit to 'none'?");
      if (!isOk) {
        return;
      }
    }
    let blogPost = {
      title: val(titleRef),
      body: val(bodyRef),
      tags: val(tagsRef)
        .split(",")
        .map((tag) => tag.trim()),
      comments: [],
      date: new Date(),
      isPublic: destValue === "blogs",
      isThot: destValue === "thots",
      meta: {
        votes: 0,
        views: 0,
        comments: 0,
      },
    };

    let isValid = await validateContentPassword(val(contentPassRef));
    if (!isValid) {
      alert("Something went wrong");
      return;
    }

    let hashed = crypto
      .createHash("sha256")
      .update("kqwq_website_salt_" + val(adminPassRef))
      .digest("hex");

    let res = await fetch("../api/blog_post", {
      method: "POST",
      body: JSON.stringify(blogPost),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: hashed,
      },
    });

    alert(res.ok ? "success!" : "error");
    if (!res.ok) return;

    clearVal(titleRef);
    clearVal(bodyRef);
    clearVal(tagsRef);
  };

  const onLoadFeedback = async () => {
    let hashed = crypto
      .createHash("sha256")
      .update("kqwq_website_salt_" + val(adminPassRef))
      .digest("hex");

    let res = await fetch(
      "../api/comment/thots_contact",

      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: hashed,
        },
        mode: "cors",
        cache: "default",
      }
    );
    if (!res.ok) return alert("Error: " + res.statusText);
    let json = await res.json();
    setFeedback(json.data);
  };

  return (
    <>
      <Head>
        <title>New Thots Post</title>
      </Head>
      <NavBar />
      <Spacer pt={16}></Spacer>
      <Container>
        <Heading
          size="3xl"
          bgClip="text"
          bgGradient={`
          linear-gradient(
            45deg,
            hsl(96deg 40% 66%) 0%,
            hsl(132deg 41% 66%) 11%,
            hsl(157deg 51% 58%) 22%,
            hsl(173deg 68% 47%) 33%,
            hsl(181deg 100% 39%) 44%,
            hsl(188deg 100% 43%) 56%,
            hsl(193deg 100% 46%) 67%,
            hsl(197deg 100% 49%) 78%,
            hsl(205deg 98% 58%) 89%,
            hsl(221deg 92% 70%) 100%
          );`}
        >
          quesadilla
        </Heading>
        <Heading mt={4} size="lg">
          New post
        </Heading>
        <Stack spacing={4}>
          <FormLabel mt={5} htmlFor="radio-in">
            Post to...
          </FormLabel>
          <RadioGroup
            id="radio-in"
            value={destValue}
            onChange={setDestValue}
            ref={destinationRef}
            mb={6}
          >
            <Stack direction="row" spacing={5}>
              <Radio value="none" className="dest-item">
                none
              </Radio>
              <Radio value="blogs" className="dest-item">
                blogs
              </Radio>
              <Radio value="thots" className="dest-item">
                thots
              </Radio>
              <Radio value="twitter" className="dest-item">
                twitter
              </Radio>
              <Radio value="unsolved" className="dest-item">
                unsolved problem
              </Radio>
            </Stack>
          </RadioGroup>
          <Link href="https://stackedit.io/app#" target="_blank">
            <Button colorScheme="linkedin">Markdown Editor</Button>
          </Link>
          <InputGroup>
            <InputLeftAddon children="Title" />
            <Input type="text" placeholder="post title" ref={titleRef} />
          </InputGroup>
          <Textarea
            placeholder="Blog content in .md markdown format"
            size="sm"
            resize="both"
            ref={bodyRef}
          />
          <InputGroup>
            <InputLeftAddon children="Tags" />
            <Input
              ref={tagsRef}
              type="text"
              placeholder="add tags (comma separated) e.g. javascript,meta,web"
            />
          </InputGroup>
          <HStack>
            <Input
              ref={contentPassRef}
              variant="flushed"
              placeholder="Content password"
              type="password"
            ></Input>
            <Input
              ref={adminPassRef}
              variant="flushed"
              placeholder="Admin password"
              type="password"
            ></Input>
            <Button w={48} colorScheme="blue" onClick={onSubmitBlogPost}>
              Submit
            </Button>
            <Button w={96} colorScheme="purple" onClick={onLoadFeedback}>
              Thots feedback
            </Button>
          </HStack>

          {feedback.map((f) => {
            return (
              <Box>
                <Text>{f.author}</Text>
                <Text>{f.body}</Text>
                <Text>{f.date}</Text>
                <Divider />
              </Box>
            );
          })}
        </Stack>

        <Heading size="lg" mt={10}>
          Live stats
        </Heading>

        <Heading size="lg" mt={10}>
          Accumulative stats
        </Heading>
      </Container>
    </>
  );
};

export default AdminPage;
