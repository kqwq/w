import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Code,
  Container,
  Divider,
  Editable,
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
  EditablePreview,
  EditableTextarea,
  VStack,
} from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import { MdEdit } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";

import crypto from "crypto";

const val = (ref) => {
  return ref.current.value;
};

const HundredProblems = () => {
  const [problems, setProblems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [bodyPreview, setBodyPreview] = useState("");
  const adminPassRef = useRef();
  const editProblemNumberRef = useRef();
  const editTitleRef = useRef();
  const editBodyRef = useRef();
  const editTagsRef = useRef();

  const onEditSubmit = async () => {
    let postBody = {
      _id: editingId,
      problemNumber: val(editProblemNumberRef),
      title: val(editTitleRef),
      body: val(editBodyRef),
      tags: val(editTagsRef)
        .split(",")
        .map((tag) => tag.trim()),
      lastEdited: new Date(),
    };
    let hashed = crypto
      .createHash("sha256")
      .update("kqwq_website_salt_" + val(adminPassRef))
      .digest("hex");
    let res = await fetch("../api/unsolved", {
      method: "PATCH",
      body: JSON.stringify(postBody),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: hashed,
      },
    });
    console.log(res);
    if (res.ok) {
      const data = await res.json().then((json) => json.data);
      console.log(data);
      // change local problem based on server response, without fetching again
      setProblems((problems) => {
        let ps = [...problems];
        let p = ps.find((x) => x._id === editingId);
        p.problemNumber = data.problemNumber;
        p.title = data.title;
        p.body = data.body;
        p.tags = data.tags;
        return ps;
      });
    } else {
      alert("Failed to patch data");
    }

    setIsEditing(false);
    setEditingId(null);
  };

  const addProblem = async () => {
    setIsEditing(true);
    const nextProblemNumber = problems.at(-1).problemNumber + 1;

    let postBody = {
      _id: "temp_" + Math.random().toString(),
      problemNumber: nextProblemNumber,
      title: "New problem",
      body: "Problem description",
      tags: [],
      meta: {
        votes: 0,
        views: 0,
        comments: 0,
      },
    };

    const hashed = crypto
      .createHash("sha256")
      .update("kqwq_website_salt_" + val(adminPassRef))
      .digest("hex");

    let fetchUrl = destValue === "unsolved" ? "unsolved" : "blog_post";
    let res = await fetch("../api/" + fetchUrl, {
      method: "POST",
      body: JSON.stringify(postBody),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: hashed,
      },
    });
    const data = await res.json().then((json) => json.data);
    console.log(data);
    setProblems((problems) => {
      let ps = [...problems];

      ps.push(data);
      return ps;
    });

    setEditingId(nextProblemNumber);
  };

  const fetchProblems = async () => {
    console.log("fetch all");
    let json = await fetch("/api/unsolved").then((r) => r.json());

    setProblems(json.data);
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <>
      <NavBar />
      <Spacer pt={16} />
      <Container>
        <Heading>Kyle's List of 100 Unsolved Problems</Heading>
        <Text color="#333" mt={2}>
          Normally, lists of unsolved math and computer sicence problems use
          obscure mathematical notation to describe even a simple problem
          statement. Most people—including myself—are not familiar with this
          syntax. As of such, this list was created to challenge the notion that
          difficult problems are crude, sophisticated, and obscure. Allow me to
          present my list of one hundred (100) unsolved math and computer
          science problems.
        </Text>
        <Text mt={2}>
          Use the tags as a guide to how difficult these problems are to
          understand. For example, if a problem has the #calculus tag, it
          assumes some knowledge on basic calculus. The tags do not reflect how
          difficult a problem is to solve. As far as I know, none of these
          problems have been solved before!
        </Text>
        <Text color="#f00" mt={2}>
          If you have any insight on these problems or have a possible solution,
          please send me a message on Discord (kqwq#6389) or over email
          (@example.com).
        </Text>

        <Spacer mt={6} />
        <VStack>
          {problems.map((p) => {
            return (
              <Box key={p._id} w="100%" pt={5}>
                {editingId === p._id ? (
                  <>
                    <Editable defaultValue={p.problemNumber.toString()}>
                      <HStack spacing={0}>
                        <Text>#</Text>
                        <EditablePreview bgColor="#ff000033" />
                      </HStack>
                      <EditableTextarea ref={editProblemNumberRef} w="100px" />
                    </Editable>
                    <Editable defaultValue={p.title}>
                      <EditablePreview fontSize="3xl" fontWeight="bold" />
                      <EditableTextarea ref={editTitleRef} />
                    </Editable>
                    <Editable defaultValue={p.body} onChange={setBodyPreview}>
                      <Code w="100%">
                        <EditableTextarea ref={editBodyRef} h="75vh" />
                        <EditablePreview />
                      </Code>
                      <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
                        {bodyPreview}
                      </ReactMarkdown>
                    </Editable>
                    <Text color="gray" fontWeight="bold">
                      tags
                    </Text>
                    <Editable
                      defaultValue={p.tags.join(", ") || "new tag"}
                      color="blue"
                    >
                      <EditablePreview />
                      <EditableTextarea ref={editTagsRef} />
                    </Editable>
                    <Flex justify="center">
                      <Input
                        placeholder="Admin password"
                        w="200px"
                        type="password"
                        ref={adminPassRef}
                      ></Input>
                      <Button colorScheme="green" onClick={onEditSubmit}>
                        Save changes
                      </Button>
                      <Button
                        colorScheme="gray"
                        onClick={() => {
                          setIsEditing(false);
                          setEditingId(-1);
                        }}
                      >
                        Cancel
                      </Button>
                    </Flex>
                  </>
                ) : (
                  <>
                    <HStack w="100%" justify="space-between">
                      <Heading size="lg">
                        #{p.problemNumber} {p.title}
                      </Heading>
                      <Icon
                        as={MdEdit}
                        boxSize={4}
                        color="black"
                        cursor="pointer"
                        onClick={() => {
                          setIsEditing(true);
                          setEditingId(p._id);
                        }}
                      />
                    </HStack>
                    <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
                      {p.body}
                    </ReactMarkdown>
                    <Box>
                      <Text color="gray" fontWeight="bold">
                        tags
                      </Text>
                      <Text size="sm" color="blue">
                        {p.tags.map((tag) => `#${tag}`).join(" ")}
                      </Text>
                    </Box>
                  </>
                )}

                <Divider />
              </Box>
            );
          })}
        </VStack>
        <Spacer mt={10} />
        <Button onClick={addProblem}>Add problem</Button>
        <Spacer mt={10} />
      </Container>
    </>
  );
};

export default HundredProblems;
