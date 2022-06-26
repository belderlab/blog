import * as React from "react";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import { WindowLocation } from "@reach/router";
import {
  Box,
  Button,
  Container,
  Heading,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

type Props = {
  location: WindowLocation<unknown>;
  title?: Queries.Maybe<string>;
  children?: React.ReactNode;
};

const Layout = ({ location, title, children }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const footerColor = useColorModeValue("blackAlpha.600", "whiteAlpha.500");
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  const data = useStaticQuery<Queries.Query>(graphql`
    query {
      site {
        siteMetadata {
          copyright
        }
      }
    }
  `);

  return (
    <Container maxW="container.xl" data-is-root-path={isRootPath}>
      <Box as="header" mb="12">
        <Heading as="h1" textAlign="center" size="4xl" my="12">
          <Link as={GatsbyLink} to="/">
            {title}
          </Link>
          <Button onClick={toggleColorMode} ml="4" variant="outline">
            {colorMode === "light" ? "🌙" : "💡"}
          </Button>
        </Heading>
      </Box>
      <Box as="main" my="12">
        {children}
      </Box>
      <Box as="footer" mt="12" mb="12" color={footerColor}>
        © {new Date().getFullYear()}, {data.site?.siteMetadata?.copyright}
        <br />
        <Link href="https://github.com/fastup-kit" textDecoration="underline">
          Built with OpenSource
        </Link>
      </Box>
    </Container>
  );
};

export default Layout;
