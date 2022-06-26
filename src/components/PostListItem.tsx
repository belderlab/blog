import { Box, Heading, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "gatsby";
import React from "react";
import { PostInfo } from "./PostInfo";

type Props = {
  post: Queries.Mdx;
};

export function PostListItem({ post }: Props) {
  const title = post?.frontmatter?.title || post?.slug;
  const description = post?.frontmatter?.description || post.excerpt;

  return (
    <li key={post?.slug}>
      <Box as="article" my="12" itemScope itemType="http://schema.org/Article">
        {post?.slug && (
          <Box as="header" mb="2">
            <Heading as="h3" size="xl" mb="2">
              <Link as={RouterLink} to={post?.slug} itemProp="url">
                <span itemProp="headline">{title}</span>
              </Link>
            </Heading>
            <PostInfo post={post} />
          </Box>
        )}
        <section>
          <Text itemProp="description">{description}</Text>
        </section>
      </Box>
    </li>
  );
}
