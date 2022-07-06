import {
  Box,
  Container,
  Divider,
  Heading,
  Icon,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

import React, { useState, useEffect } from "react";
import PasswordProtected from "../../components/PasswordProtected";
import moment from "moment";
import { GoComment } from "react-icons/go";

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

  useEffect(() => {
    // fetchThots();
    document.body.style.backgroundColor = "#3c4099";
  }, []);

  const [subPage, setSubPage] = useState("thots");
  const [hidden, setHidden] = useState(true);

  let [posts, setPosts] = useState([]);

  return (
    <>
      <Box bgColor="#3c4099" id="bg-box">
        <Box
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
                <Box>
                  <ReactMarkdown>{post.body}</ReactMarkdown>
                </Box>
                <Box float="left" cursor="pointer" p={1.5}>
                  <Icon as={GoComment} boxSize={6} />
                  <Text ml={2} as="span">
                    0
                  </Text>
                </Box>

                <Text textAlign="right">
                  <Tooltip label={moment(post.date).calendar()}>
                    {moment(post.date).fromNow()}
                  </Tooltip>
                </Text>
                <Divider pt={3} mb={10} />
              </Box>
            ))}

          {hidden && <Box color="lavender"></Box>}
          <PasswordProtected initOpen={true} handleUnlock={fetchThots} />

          {subPage === "about" && (
            <>
              <Box color="lavender">
                <Heading>Welcome!</Heading>
                <Box>
                  This is a personal blog where I talk about anything. Heavily
                  inspired by Matthias's Thoughts blog. 12345.
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ThotsPage;