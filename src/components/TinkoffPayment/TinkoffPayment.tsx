import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  ListItem,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { FormEvent, useEffect } from "react";
import Reading from "./reading.jpg";

declare global {
  interface Window {
    pay: any;
  }
}

type Props = {
  amount: string;
};

export function TinkoffPayment({ amount }: Props) {
  const bg = useColorModeValue("blue.50", "blue.700");
  const color = useColorModeValue("blackAlpha.600", "whiteAlpha.400");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js";
    document.body.appendChild(script);
  }, []);

  function onSumbit(e: FormEvent<HTMLDivElement>) {
    window.pay(document.querySelector("#TinkoffPayForm"));
    e.preventDefault();
  }

  return (
    <>
      <Flex
        as="form"
        alignItems="center"
        justifyContent="center"
        name="TinkoffPayForm"
        id="TinkoffPayForm"
        onSubmit={onSumbit}
      >
        <input type="hidden" name="terminalkey" value="1637138475296DEMO" />
        <input type="hidden" name="frame" value="false" />
        <input type="hidden" name="language" value="ru" />
        <input type="hidden" name="amount" value={amount} />
        <Grid
          w="100%"
          templateColumns="1fr 1fr"
          rounded="3xl"
          overflow="hidden"
        >
          <GridItem
            h="100%"
            w="100%"
            bg={`url(${Reading})`}
            bgPosition="center"
            bgSize="cover"
          ></GridItem>
          <GridItem p="4" bg={bg}>
            <FormControl mb="4">
              <Text fontSize="3xl" fontWeight="bold">
                Subscription
              </Text>
              <Text fontSize="xl" color={color} mb="1">
                What You'll get
              </Text>
              <UnorderedList>
                <ListItem>Lifetime access</ListItem>
                <ListItem>30+ private notes</ListItem>
                <ListItem>Commenting</ListItem>
                <ListItem>Our love ╰(*°▽°*)╯</ListItem>
              </UnorderedList>
              <Box
                opacity={0.3}
                borderBottomColor={color}
                borderBottomStyle="dashed"
                borderBottomWidth="1px"
                minH="1px"
                w="100%"
                my="4"
              />
              <Text fontWeight="extrabold" fontSize="2xl" mb="16">
                120 RUB
              </Text>
              <FormLabel htmlFor="email">Email address for access</FormLabel>
              <Input colorScheme="teal" type="text" name="email" />
            </FormControl>
            <Button colorScheme="teal" type="submit" w="100%">
              Pay
            </Button>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
}
