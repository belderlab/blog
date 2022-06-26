import * as React from "react";
import { graphql, Link as RouterLink } from "gatsby";

import Seo from "../components/Seo";
import { Box, Button, Flex, Heading, Link, Text } from "@chakra-ui/react";
import NotFoundGif from "../images/404.gif";
import styled from "@emotion/styled";

const NotFound = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
`;

const NotFoundPage = () => {
  return (
    <>
      <Seo title="404: Not Found" />
      <Flex height="100vh">
        <Flex
          flexDir="column"
          mt={["10", "10", ""]}
          justifyContent={["", "", "center"]}
          alignItems="center"
          w="100%"
        >
          <Box>
            <Heading mb="4">404: Not Found</Heading>
            <Text mb="4">
              You just hit a page that doesn&#39;t exist... the sadness.
            </Text>
            <Link as={RouterLink} to="/">
              <Button>Go Back to Home</Button>
            </Link>
          </Box>
        </Flex>
        <NotFound src={NotFoundGif} width="300px" />
      </Flex>
    </>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
