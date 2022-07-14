import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  Button,
  InputGroup,
  useDisclosure,
  Input,
  InputRightElement,
  Spacer,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { validateContentPassword } from "../lib/contentPassword";

const PasswordProtected = ({ initOpen, handleUnlock }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const router = useRouter();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const handleGoBack = () => router.back();

  const passwordRef = useRef();
  useEffect(() => {
    if (initOpen) {
      onOpen();
    }
  }, [initOpen]);

  const handleUnlockSubmit = async () => {
    let validated = await validateContentPassword(passwordRef.current.value);
    if (validated) {
      onClose();
      handleUnlock(passwordRef.current.value);
    } else {
      alert("Wrong password. Ask Kyle for the password to get access.");
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            <Alert status="warning">
              <AlertIcon />
              This content is password protected
            </Alert>
          </AlertDialogHeader>

          <AlertDialogBody>
            <InputGroup size="md">
              <Input
                ref={passwordRef}
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleUnlockSubmit();
                }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleGoBack}>
              Go back
            </Button>
            <Button colorScheme="blue" onClick={handleUnlockSubmit} ml={3}>
              Unlock
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default PasswordProtected;
