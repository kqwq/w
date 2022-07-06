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
import React, { useRef, useState } from "react";
import NavBar from "../../components/NavBar";
import NextLink from "next/link";

const AdminPage = () => {
  const destinationRef = useRef();
  const [destValue, setDestValue] = React.useState("none");
  const titleRef = useRef();
  const bodyRef = useRef();
  const tagsRef = useRef();

  const val = (ref) => {
    return ref.current.value;
  };

  const clearVal = (ref, override = "") => {
    ref.current.value = override;
  };

  const onSubmitBlogPost = async () => {
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
      },
    };

    await fetch("./api/blog_post", {
      method: "POST",
      body: JSON.stringify(blogPost),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    alert("success!");
    console.log(blogPost);

    clearVal(titleRef);
    clearVal(bodyRef);
    clearVal(tagsRef);
  };

  return (
    <>
      <NavBar />
      <Box pt="40px">AdminPage</Box>
      <Container>
        <Heading>New blog post</Heading>
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
                twitter (external)
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
          <Button colorScheme="blue" onClick={onSubmitBlogPost}>
            Submit
          </Button>
        </Stack>

        <Heading mt={10}>Live stats</Heading>

        <Heading mt={10}>Accumulative stats</Heading>
      </Container>
    </>
  );
};

export default AdminPage;
