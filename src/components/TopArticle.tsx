import React from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Img,
  Link,
  Tag,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "@reach/router";

export function TopArticle() {
  return (
    <Grid templateColumns="1fr 1fr" gap="8" bg="">
      <Box>
        <Link as={RouterLink} to="/">
          <Img
            src="https://images.unsplash.com/photo-1655667995118-56d57c6f628e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1014&q=80"
            rounded="xl"
          />
        </Link>
      </Box>
      <Flex flexDir="column" justifyContent="space-around">
        <Link as={RouterLink} to="/">
          <Heading as="h2" size="4xl" lineHeight="1.24">
            Very super duper long Articale title
          </Heading>
        </Link>
        <Text fontSize="xl">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus
          tempora, accusantium minus dolorem corrupti, ea, non suscipit
          asperiores eum cumque dolore magni distinctio debitis vel at
          necessitatibus neque praesentium fugit.
        </Text>
        <Box>
          <Tag>My Tag</Tag> · 25 Jun, 2022 · 6 min read
        </Box>
      </Flex>
    </Grid>
  );
}
