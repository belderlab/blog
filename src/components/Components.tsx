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
import { TinkoffPayment } from "./TinkoffPayment/TinkoffPayment";
import { Fade } from "./TinkoffPayment/Fade";

export const components = {
  Button,
  Box,
  h1: (props: any) => (
    <Heading mt="10" mb="6" as="h1" size="xl" noOfLines={1} {...props} />
  ),
  h2: (props: any) => (
    <Heading mt="8" mb="4" as="h2" size="lg" noOfLines={1} {...props} />
  ),
  h3: (props: any) => <Heading mt="6" mb="3" as="h3" size="md" {...props} />,
  h4: (props: any) => <Heading mt="5" mb="3" as="h4" size="sm" {...props} />,
  h5: (props: any) => <Heading mt="5" mb="3" as="h5" size="sm" {...props} />,
  h6: (props: any) => <Heading mt="5" mb="3" as="h6" size="sm" {...props} />,
  li: (props: any) => <ListItem fontSize="lg" {...props} />,
  ul: (props: any) => <UnorderedList fontSize="lg" ml="8" {...props} />,
  ol: (props: any) => <OrderedList fontSize="lg" ml="8" {...props} />,
  a: (props: any) => <Link {...props} color="blue.400" />,
  blockquote: (props: any) => {
    const color = useColorModeValue("blackAlpha.400", "whiteAlpha.400");

    return (
      <Box
        p="4"
        my="4"
        borderLeft="4px solid"
        borderLeftColor={color}
        data-testid="quote"
      >
        <Box my="-4">{props.children}</Box>
      </Box>
    );
  },
  p: (props: any) => (
    <Text data-testid="text" my="4" fontSize="lg" {...props} />
  ),
  TinkoffPayment,
  Fade,
};
