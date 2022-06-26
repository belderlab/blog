import { Alert, AlertIcon, Box } from "@chakra-ui/react";
import React from "react";

export function Hidden() {
  return (
    <Box>
      <Alert status="info">
        <AlertIcon />
        Статья убрана в черновики...
      </Alert>
    </Box>
  );
}
