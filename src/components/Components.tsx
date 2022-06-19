import * as React from "react";
import {
  Box,
  Button,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";

export const components = {
  Button,
  Box,
  h1: (props: any) => (
    <Heading mb="-6" mt="16" as="h1" size="xl" noOfLines={1} {...props} />
  ),
  h2: (props: any) => (
    <Heading mb="-6" mt="16" as="h2" size="lg" noOfLines={1} {...props} />
  ),
  h3: (props: any) => <Heading mb="2" mt="8" as="h3" size="md" {...props} />,
  h4: (props: any) => <Heading mb="2" mt="8" as="h4" size="sm" {...props} />,
  h5: (props: any) => <Heading mb="2" mt="8" as="h5" size="xs" {...props} />,
  h6: (props: any) => <Heading mb="2" mt="8" as="h6" size="xs" {...props} />,
  li: (props: any) => <ListItem {...props} />,
  ul: (props: any) => <UnorderedList ml="8" {...props} />,
  ol: (props: any) => <OrderedList ml="8" {...props} />,
  a: (props: any) => <Link {...props} color="blue.400" />,
  blockquote: (props: any) => {
    const color = useColorModeValue("blackAlpha.400", "whiteAlpha.400");
    return (
      <Box p="4" my="4" borderLeft="4px solid" borderLeftColor={color}>
        <Text {...props} />
      </Box>
    );
  },
  p: (props: any) => <Text mt="10" fontSize="lg" {...props} />,
};
