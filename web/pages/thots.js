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
import ReactMarkdown from "react-markdown";

import React, { useState, useEffect, useRef } from "react";
import PasswordProtected from "../components/PasswordProtected";
import moment from "moment";
import { IoHeart, IoHeartDislikeOutline } from "react-icons/io5";
import Comments from "../components/ThotsComments";
import ThotsAboutPage from "../components/ThotsAboutPage";

const ThotsPage = () => {
  const failToFetch = () => {};
  const fetchThots = async () => {
    let res = await fetch("../api/blog_post");
    if (!res.ok) {
      failToFetch();
      return;
    }
    let json = await res.json();
    let d = json.data.filter((post) => post.isThot);
    let out = [...d];
    setPosts(out);
    console.log(json);
  };
  const openComments = (id) => {
    setPostId(id);
    setPostBody(posts.find((post) => post._id === id).body);
    onCommentsOpen();
  };

  useEffect(() => {
    // fetchThots();
    document.body.style.backgroundColor = "#3c4099";
  }, []);

  const {
    isOpen: isCommentsOpen,
    onOpen: onCommentsOpen,
    onClose: onCommentsClose,
  } = useDisclosure();
  const [subPage, setSubPage] = useState("thots");
  const [hidden, setHidden] = useState(true);

  let [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState("");
  const [postBody, setPostBody] = useState("");

  return (
    <>
      <Comments
        isOpen={isCommentsOpen}
        onOpen={onCommentsOpen}
        onClose={onCommentsClose}
        postId={postId}
        postBody={postBody}
      />
      <Box bgColor="#3c4099" id="bg-box">
        <Box
          borderRadius="0 0 8px 8px"
          mb={10}
          ml={4}
          mr={4}
          padding={8}
          bgImage={`linear-gradient(
          45deg,
          hsl(180deg 89% 7%) 0%,
          hsl(188deg 100% 8%) 10%,
          hsl(195deg 100% 8%) 20%,
          hsl(201deg 100% 9%) 30%,
          hsl(209deg 79% 10%) 40%,
          hsl(227deg 46% 12%) 50%,
          hsl(243deg 37% 13%) 60%,
          hsl(262deg 43% 13%) 70%,
          hsl(282deg 50% 12%) 80%,
          hsl(301deg 61% 11%) 90%,
          hsl(315deg 82% 11%) 100%
)`}
          pb={10}
        >
          <Spacer pb={8} />
          <Heading fontSize="4xl" color="lavender">
            <Text
              as="a"
              style={
                subPage === "thots"
                  ? {
                      textDecorationLine: "underline",
                      textDecorationColor: "red.100",
                    }
                  : {}
              }
              cursor="pointer"
              onClick={() => setSubPage("thots")}
            >
              Thots
            </Text>
            &nbsp;&nbsp;
            <Text
              as="a"
              style={
                subPage === "about"
                  ? {
                      textDecorationLine: "underline",
                      textDecorationColor: "red.100",
                    }
                  : {}
              }
              cursor="pointer"
              onClick={() => setSubPage("about")}
            >
              About
            </Text>
          </Heading>
          <Spacer pb={10} />

          {subPage === "thots" &&
            posts.map((post) => (
              <Box key={post._id} color="lavender">
                <Text fontWeight="bold" color="rgba(255,255,255,0.4)">
                  {post.title}
                </Text>
                <Box mb={1.5}>
                  <ReactMarkdown>{post.body}</ReactMarkdown>
                </Box>
                <HStack
                  className="hearts"
                  float="left"
                  cursor="pointer"
                  spacing={3}
                  onClick={() => openComments(post._id)}
                >
                  {post.meta?.comments > 0 ? (
                    <>
                      <Icon as={IoHeart} boxSize={5} />
                      <Box as="span" fontSize="14px">
                        <Text as="span">{post.meta.positiveComments}</Text>
                        {" - "}
                        <Text as="span">{post.meta.negativeComments}</Text>
                      </Box>
                      <Icon as={IoHeartDislikeOutline} boxSize={5} />
                    </>
                  ) : (
                    <Text fontSize="14px">Comment</Text>
                  )}
                </HStack>

                <Text textAlign="right">
                  <Tooltip label={moment(post.date).calendar()}>
                    {moment(post.date).fromNow()}
                  </Tooltip>
                </Text>
                <Divider pt={2} mb={10} />
              </Box>
            ))}

          {hidden && <Box color="lavender"></Box>}

          {subPage === "about" && <ThotsAboutPage />}
        </Box>
      </Box>

      <PasswordProtected initOpen={true} handleUnlock={fetchThots} />
    </>
  );
};

export default ThotsPage;
