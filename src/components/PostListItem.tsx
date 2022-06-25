import { Box, Heading } from "@chakra-ui/react";
import { Link } from "gatsby";
import React from "react";

type Props = {
  post: Queries.Mdx;
};

export function PostListItem({ post }: Props) {
  const title = post?.frontmatter?.title || post?.slug;

  return (
    <li key={post?.slug}>
      <Box as="article" my="12" itemScope itemType="http://schema.org/Article">
        {post?.slug && (
          <header>
            <Heading as="h1" size="xl" mb="2">
              <Link to={post?.slug} itemProp="url">
                <span itemProp="headline">{title}</span>
              </Link>
            </Heading>
            <small>{post?.frontmatter?.date}</small>
          </header>
        )}
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: post?.frontmatter?.description || post.excerpt || "",
            }}
            itemProp="description"
          />
        </section>
      </Box>
    </li>
  );
}
