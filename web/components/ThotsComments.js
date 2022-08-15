import React, { useEffect, useMemo } from "react";
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Spacer,
  Text,
  Tooltip,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  Input,
  Textarea,
  VStack,
  Spinner,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from "@chakra-ui/react";
import moment from "moment";
import interpolate from "color-interpolate";

const Comments = ({ isOpen, onOpen, onClose, postId, postBody }) => {
  const btnRef = React.useRef();
  const postComment = async () => {
    const newComment = {
      body: commentBodyRef.current.value,
      date: new Date(),
      author: commentAuthorRef.current.value,
      postId: postId,
    };
    if (!postId) {
      return alert(
        "There was a problem creating this comment... Error code 1001"
      );
    }

    let res = await fetch("../api/comment", {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.error("error", newComment);
      alert("There was a problem posting that comment... Error code 1002");
    } else {
      let commentCollection = [...comments, newComment];
      commentCollection.sort(sortActions[sortName]);
      setComments(commentCollection);
      commentBodyRef.current.value = "";
      commentAuthorRef.current.value = "";
    }
  };
  const commentBodyRef = React.useRef();
  const commentAuthorRef = React.useRef();
  const [loaded, setLoaded] = React.useState(false);
  const [comments, setComments] = React.useState([]);

  let sortActions = {
    old: (a, b) => new Date(a.date) - new Date(b.date),
    new: (a, b) => new Date(b.date) - new Date(a.date),
    sentiment: (a, b) =>
      (b?.meta?.sentimentComparative || 0) - a?.meta?.sentimentComparative,
  };
  const [sortName, setSortName] = React.useState("old");

  const onTabChange = (index) => {
    let indexToAction = ["old", "new", "sentiment"];
    let sortBy = indexToAction[index];
    setSortName(sortBy);
  };

  const loadComments = async (postId) => {
    if (!postId) return;
    setLoaded(false);
    let res = await fetch(`./api/comment/${postId}`);
    if (!res.ok) {
      return alert("Error fetching comments");
    }
    let json = await res.json();
    let comments = json.data;
    comments.sort(sortActions[sortName]);
    setComments(json.data);
    setLoaded(true);
  };

  useEffect(() => {
    // When postId changes, fetch new comments
    loadComments(postId);
  }, [postId]);

  useEffect(() => {
    setComments((c) => [...c].sort(sortActions[sortName]));
  }, [sortName]);

  const colormap = useMemo(() =>
    interpolate(["red", "rgb(230,230,230)", "lime"])
  );
  const formatSentiment = (sentiment) => {
    if (sentiment === null || sentiment === undefined)
      return (
        <Box as="a" cursor="pointer" onClick={() => loadComments(postId)}>
          Calculate now
        </Box>
      );
    return sentiment === 0
      ? "Neutral"
      : Math.abs(sentiment * 100).toFixed(0) +
          "% " +
          (sentiment > 0 ? "Positive" : "Negative");
  };

  const displayMaxChars = 66;

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bgColor="white">
          <DrawerCloseButton />
          <DrawerHeader pb={0}>Comments</DrawerHeader>

          <DrawerBody>
            <Text>
              "
              {postBody.length > displayMaxChars
                ? postBody.slice(0, displayMaxChars - 3) + "..."
                : postBody}
              "
            </Text>
            <Tabs
              mb={2}
              isFitted
              onChange={onTabChange}
              defaultIndex={Object.keys(sortActions).indexOf(sortName)}
            >
              <TabList>
                <Tab>Oldest</Tab>
                <Tab>Newest</Tab>
                <Tab>Sentiment</Tab>
              </TabList>
            </Tabs>

            {loaded ? (
              comments.map((c) => (
                <Box
                  key={c._id}
                  border="invisible 2px black"
                  mb={2}
                  fontSize="14px"
                  bgColor={
                    sortName !== "sentiment"
                      ? "#FFC300"
                      : colormap(((c?.meta?.sentimentComparative || 0) + 1) / 2)
                  }
                  borderRadius="6px"
                  p={2}
                >
                  {sortName === "sentiment" && (
                    <Text
                      float="right"
                      fontSize="xs"
                      color="black"
                      fontWeight="bold"
                      textDecorationLine="underline"
                      p={0.5}
                    >
                      {formatSentiment(c?.meta?.sentimentComparative)}
                    </Text>
                  )}
                  <Text>{c.body}</Text>

                  <Text mt={1} fontFamily="Garamond">
                    -{c.author} ({moment(c.date).calendar()})
                  </Text>
                </Box>
              ))
            ) : (
              <Spinner />
            )}
          </DrawerBody>

          <DrawerFooter>
            <VStack>
              <Textarea ref={commentBodyRef} placeholder="comment"></Textarea>
              <HStack spacing={2}>
                <Input ref={commentAuthorRef} placeholder="name or alias..." />
                <Button colorScheme="blue" onClick={postComment}>
                  Send
                </Button>
              </HStack>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Comments;
