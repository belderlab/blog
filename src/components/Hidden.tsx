import { Alert, AlertIcon, Box } from "@chakra-ui/react";
import React from "react";

export function Hidden() {
  return (
    <Box>
      <Alert status="info">
        <AlertIcon />
        Article hidden in draft...
      </Alert>
    </Box>
  );
}
