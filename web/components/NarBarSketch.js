import React, { useEffect, useRef } from "react";

import dynamic from "next/dynamic";
import { Box } from "@chakra-ui/react";
const ReactP5Wrapper = dynamic(
  () => import("react-p5-wrapper").then((mod) => mod.ReactP5Wrapper),
  {
    ssr: false,
  }
);

function sketch(p) {
  let x = 0;
  p.setup = () => {
    p.createCanvas(window.innerWidth, 50, p.P2D);
    p.noStroke();
    p.angleMode(p.DEGREES);
    p.clear();

    // ground
  };

  p.draw = () => {
    x += 1;
    p.background(0);
    p.fill(0, 255, 96);
    p.rect(x, 0, 50, 50);
  };
}

export function NavBarSketch() {
  const boxRef = useRef();
  useEffect(() => {
    let canvas = boxRef.current;
    console.log(canvas, canvas?.childNodes);
  }, []);
  return (
    <Box ref={boxRef} pos="absolute" top={0} left={0} zIndex={-2}>
      <ReactP5Wrapper sketch={sketch} />
    </Box>
  );
}
