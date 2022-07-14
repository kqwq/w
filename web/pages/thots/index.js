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
  Skeleton,
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
import PasswordProtected from "../../components/PasswordProtected";
import moment from "moment";
import { IoHeart, IoHeartDislikeOutline, IoDiceOutline } from "react-icons/io5";
import { MdOutlineRefresh } from "react-icons/md";
import Comments from "../../components/ThotsComments";
import ThotsAboutPage from "../../components/ThotsAboutPage";
import NavBar from "../../components/NavBar";

const ThotsPage = () => {
  const failToFetch = (res) => {
    console.log(res);
    alert("There was a problem fetching the data. Error code 10060");
  };
  const fetchRandomThots = async () => {
    setPosts([]);
    let res = await fetch(
      `../api/blog_post?sort=random&isThot=true&content_pw=${content_pw}`
    );
    if (!res.ok) return failToFetch(res);
    let json = await res.json();
    setPosts([...json.data]);
  };
  const fetchRecentThots = async () => {
    setPosts([]);
    let res = await fetch(
      `../api/blog_post?sort=recent&isThot=true&content_pw=${content_pw}`
    );
    if (!res.ok) return failToFetch(res);
    let json = await res.json();
    setPosts([...json.data]);
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
  const [loaded, setLoaded] = useState(false);

  let [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState("");
  const [postBody, setPostBody] = useState("");
  const [content_pw, setContent_pw] = useState("default");

  return (
    <>
      <NavBar showBackToMainSite={true} />
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
          // ml="4 !important"
          // mr="4 !important"
          margin={{
            base: "0 12px",
            lg: "0 auto;",
          }}
          maxW="4xl"
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
            <Tooltip label="refresh recent">
              <Text float="right">
                <Icon
                  boxSize={10}
                  ml={5}
                  as={MdOutlineRefresh}
                  cursor="pointer"
                  onClick={fetchRecentThots}
                />
              </Text>
            </Tooltip>
            <Tooltip label="random">
              <Text float="right">
                <Icon
                  boxSize={10}
                  ml={5}
                  as={IoDiceOutline}
                  cursor="pointer"
                  onClick={fetchRandomThots}
                />
              </Text>
            </Tooltip>
          </Heading>
          <Text fontSize="sm" color="orange.400">
            Last 10 thoughts shown | all opinions are solely my own
          </Text>
          <Spacer pb={5} />

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

          {!loaded && (
            <Stack spacing={6}>
              <Skeleton height="70px" />
              <Divider pt={2} mb={10} />
              <Skeleton height="70px" />
              <Divider pt={2} mb={10} />
              <Skeleton height="70px" />
              <Divider pt={2} mb={10} />
            </Stack>
          )}

          {subPage === "about" && <ThotsAboutPage />}
        </Box>
      </Box>

      <PasswordProtected
        initOpen={true}
        handleUnlock={(pw) => {
          setLoaded(true);
          setContent_pw(pw);
          fetchRecentThots();
        }}
      />
    </>
  );
};

export default ThotsPage;
