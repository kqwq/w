import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Box } from "@chakra-ui/react";

const ReactP5Wrapper = dynamic(
  () => import("react-p5-wrapper").then((mod) => mod.ReactP5Wrapper),
  { ssr: false }
);

export function Sketch({ name }) {
  const boxRef = useRef(); // Prevents duplicate canvases for some reason
  const [sketch, setSketch] = useState(false);
  useEffect(() => {
    if (!name.endsWith(".js")) name += ".js";
    import("../comSketches/" + name).then((mod) => {
      setSketch(() => mod.default);
    });
  }, []);
  return (
    <Box pos="absolute" top="0" left="0" zIndex={-2} ref={boxRef}>
      {sketch && <ReactP5Wrapper sketch={sketch} />}
    </Box>
  );
}
