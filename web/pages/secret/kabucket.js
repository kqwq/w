import {
  Heading,
  Spacer,
  Container,
  Box,
  Text,
  Input,
  Select,
  Progress,
  ProgressLabel,
  Divider,
  Button,
  InputGroup,
  HStack,
  Icon,
  Tooltip,
  Flex,
} from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import { IoInformation, IoInformationCircleOutline } from "react-icons/io5";
import NavBar from "../../components/NavBar";
import io from "socket.io-client";
import moment from "moment";

const KABucketPage = () => {
  const [agent, setAgent] = useState("shared");
  const fileRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [buckets, setBuckets] = useState([]);

  const beginWrite = async () => {
    // Upload file to web server
    let fileList = fileRef.current.files;
    if (fileList.length === 0) alert("No file selected in step 2");
    let file = fileList[0];
    const body = new FormData();
    body.append("myfile", file);
    body.append("agent", agent);
    if (agent === "personal") {
      body.append("username", usernameRef.current.value);
      body.append("password", usernameRef.current.value);
    }
    await fetch("/api/kabucket/file_upload", {
      method: "POST",
      body,
    });
  };

  // socketio
  let socket;
  let isSocketConnected = false;
  useEffect(() => {
    fetch("/api/kabucket/socketio").finally(() => {
      socket = io();

      socket.on("connect", () => {
        console.log("connect");
      });

      socket.on("a user connected", () => {
        console.log("a user connected");
        isSocketConnected = true;
        document.getElementById("write-msg").textContent =
          "Connected to server";
      });

      socket.on("disconnect", () => {
        console.log("disconnect");
        isSocketConnected = false;
      });

      socket.on("update", (progress) => {
        console.log("update", progress);
        let { msg, percent } = progress;
        document.getElementById("write-msg").textContent = msg;
        document.getElementById("write-percent").textContent = percent;
        document.getElementById("write-progress").value = Number(percent);
      });
    });

    fetchBuckets();
  }, []); // Added [] as useEffect filter so it will be executed only once, when component is mounted

  const fetchBuckets = async () => {
    const response = await fetch("/api/kabucket");
    const _buckets = await response.json();
    setBuckets(_buckets.data);
  };

  return (
    <>
      <NavBar />
      <Box bgRepeat="repeat" bgImage="/bucket.png" bgSize="100px">
        <Spacer pt={12} />
        <Container
          bgColor="rgba(255,255,255,.8)"
          backdropFilter="blur(4px);"
          m="0 auto"
          borderRadius={10}
          maxWidth="2xl"
          p={6}
        >
          <Heading fontSize="5xl" textAlign="center">
            Khan Academy Bucket
          </Heading>
          <Text mt={2}>
            File storage via Khan Academy. Why has nobody done this before?
          </Text>
          <Box minH="600px">
            <Heading fontSize="3xl" className="about-header" textAlign="center">
              Upload
            </Heading>

            {/* Step 1 */}
            <Spacer mt={6} />
            <Heading fontSize="xl">Step 1: Choose agent</Heading>
            <select
              onChange={(e) => setAgent(e.target.value)}
              style={{
                fontSize: "16px",
                padding: "6px",
                border: "1px solid gray",
                margin: "9px",
              }}
            >
              <option value="shared">Shared account</option>
              <option value="personal">Personal account</option>
            </select>
            <label>User agent</label>
            <Box
              bgColor="black"
              p={4}
              color="white"
              display={agent === "personal" ? "block" : "none"}
            >
              <Tooltip label="KA Bucket deletes your user credentials as soon as the upload process is complete. Credentials are not stored on any database. Be careful giving out this type of information.">
                <Text float="right" h={6}>
                  <Icon as={IoInformationCircleOutline} boxSize={8} />
                </Text>
              </Tooltip>
              <Text>Khan Academy login credentials</Text>
              <Spacer mt={3} />
              <HStack spacing={3}>
                <Input
                  ref={usernameRef}
                  type="text"
                  placeholder="Username"
                ></Input>
                <Input
                  ref={passwordRef}
                  type="text"
                  placeholder="Password"
                ></Input>
              </HStack>
            </Box>

            {/* Step 2 */}
            <Spacer mt={6} />
            <Heading fontSize="xl">Step 2: Select file</Heading>
            <input
              name="choosefile"
              ref={fileRef}
              type="file"
              multiple={false}
              style={{
                margin: "9px",
              }}
            />

            {/* Step 3 */}
            <Spacer mt={6} />
            <Heading fontSize="xl">Step 3: Confirm</Heading>
            <Button m={2} colorScheme="green" onClick={beginWrite}>
              Upload
            </Button>
            <br />
            <Text float="right">
              <span id="write-percent">0</span>%
            </Text>
            <Text id="write-msg">Connecting to server...</Text>
            <Progress
              id="write-progress"
              hasStripe
              colorScheme="whatsapp"
              size="xs"
              value={0}
              min={0}
              max={100}
            />

            <Heading fontSize="3xl" className="about-header" textAlign="center">
              Browse
            </Heading>
            <Flex>
              {buckets.map((buck) => {
                return (
                  <Box m={2} p={2} key={buck._id} border="black dashed 2px">
                    <Text>{buck.filename}</Text>
                    <Text>
                      {buck.programIds.map((id) => {
                        return (
                          <span key={id}>
                            <a
                              target="_blank"
                              href={
                                "https://www.khanacademy.org/cs/bucket/" + id
                              }
                            >
                              {id}
                            </a>
                            <br />
                          </span>
                        );
                      })}
                    </Text>
                    <Text>{moment(buck.date).calendar()}</Text>
                    <Text>{buck?.contentsLength}</Text>
                    <Button>Download</Button>
                  </Box>
                );
              })}
            </Flex>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default KABucketPage;
