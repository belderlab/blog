import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export function Fade() {
  const bg = useColorModeValue("255,255,255", "26,32,44");
  return (
    <Box position="relative">
      <Box
        bgGradient={`linear(to-t, rgb(${bg}), rgba(${bg}, 0.9), rgba(${bg}, 0.6), rgba(${bg}, 0))`}
        height="16"
        position="absolute"
        transform="translate(0px, -88px)"
        width="100%"
      />
    </Box>
  );
}
