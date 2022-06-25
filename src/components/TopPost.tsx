import React from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Img,
  Link,
  Tag,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "@reach/router";
import { GatsbyImage } from "gatsby-plugin-image";
import { PostInfo } from "./PostInfo";

type Props = {
  post: Queries.Mdx;
};

export function TopPost({ post }: Props) {
  const imgFile =
    post.frontmatter?.heroImageFile?.childImageSharp?.gatsbyImageData;
  const imgLink = post.frontmatter?.heroImageLink;
  const title = post.frontmatter?.title;
  const description = post.frontmatter?.description;
  const link = post.slug || "";

  return (
    <Grid templateColumns="1fr 1fr" gap="8" bg="">
      <Box>
        <Link as={RouterLink} to={link}>
          <Box rounded="xl" overflow="hidden">
            {imgLink && (
              <Image src={imgLink} alt={post.frontmatter?.heroImageAlt || ""} />
            )}
            {!imgLink && imgFile && (
              <GatsbyImage
                image={imgFile}
                alt={post.frontmatter?.heroImageAlt || ""}
              />
            )}
          </Box>
        </Link>
      </Box>
      <Flex flexDir="column" justifyContent="space-around">
        <Link as={RouterLink} to={link}>
          <Heading as="h2" size="4xl" lineHeight="1.24">
            {title}
          </Heading>
        </Link>
        {description && <Text fontSize="xl">{description}</Text>}
        <PostInfo post={post} />
      </Flex>
    </Grid>
  );
}
