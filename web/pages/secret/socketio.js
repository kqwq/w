import { useInterval } from "@chakra-ui/react";
import { useEffect } from "react";
import io from "socket.io-client";

export default () => {
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
        socket.emit("write-progress");
        isSocketConnected = true;
      });

      socket.on("disconnect", () => {
        console.log("disconnect");
        isSocketConnected = false;
      });

      socket.on("write-progress", (progress) => {
        console.log("write-progress", progress);
      });
    });
  }, []); // Added [] as useEffect filter so it will be executed only once, when component is mounted

  useInterval(() => {
    console.log("yes", isSocketConnected);
    if (isSocketConnected) {
      socket.emit("write-progress");
    }
  }, 1000);

  return (
    <>
      <h1>Socket.io</h1>;<button></button>
    </>
  );
};
