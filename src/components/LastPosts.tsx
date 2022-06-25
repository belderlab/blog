import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import { LastPost } from "./LastPost";

type Props = {
  posts: Queries.Mdx[];
};

export function LastPosts({ posts }: Props) {
  return (
    <Grid templateColumns={`repeat(${posts.length}, 1fr)`} gap="8">
      {posts.map((post) => (
        <Box
          sx={{
            transition: "transform .2s ease",
            _hover: {
              transform: "translateY(-4px)",
            },
          }}
        >
          <LastPost post={post} />
        </Box>
      ))}
    </Grid>
  );
}
