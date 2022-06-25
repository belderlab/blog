import { Box, Tag, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

type Props = {
  post: Queries.Mdx;
};

export function PostInfo({ post }: Props) {
  const bg = useColorModeValue("gray.300", "whiteAlpha.200");
  const color = useColorModeValue("white", "white");
  const tag = post.frontmatter?.tag;
  const timeToRead = post?.timeToRead || 0;

  return (
    <Box>
      {tag && (
        <Text
          px="1.5"
          py="1"
          as="span"
          fontSize="sm"
          bg={bg}
          // color="white"
          rounded="md"
        >
          {tag}
        </Text>
      )}

      {tag && " · "}
      {post.frontmatter?.date}
      {timeToRead > 0 ? ` · ${timeToRead} min read` : ""}
    </Box>
  );
}
