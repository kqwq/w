import React, { useEffect } from "react";
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
} from "@chakra-ui/react";

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
      alert("There was a problem posting that comment... Error code 1002");
    } else {
      // setComments([...comments, newComment]);
      alert("success");
    }
  };
  const commentBodyRef = React.useRef();
  const commentAuthorRef = React.useRef();
  const [loaded, setLoaded] = React.useState(false);
  const [comments, setComments] = React.useState([]);

  useEffect(() => {
    // When postId changes, fetch new comments
    (async () => {
      let res = await fetch(`./api/comment/${postId}`);
      if (!res.ok) {
        return alert("Error fetching comments");
      }
      let json = await res.json();
      setComments(json.data);
    })();
  }, [postId]);

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
          <DrawerHeader>Comments</DrawerHeader>

          <DrawerBody>
            "{postBody.slice(0, 100)}..."
            {comments.map((c) => (
              <Box border="dotted 2px pink" mb={4}>
                <Text>{c.author}</Text>
                <Text>{c.body}</Text>
                <Text>{c.date}</Text>
              </Box>
            ))}
          </DrawerBody>

          <DrawerFooter>
            <VStack>
              <Textarea
                ref={commentBodyRef}
                placeholder="My comment"
              ></Textarea>
              <HStack spacing={2}>
                <Input
                  ref={commentAuthorRef}
                  placeholder="My name or alias..."
                />
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
