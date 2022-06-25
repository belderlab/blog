import {
  Box,
  Heading,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link as RouterLink } from "@reach/router";
import React from "react";
import { PostInfo } from "./PostInfo";

type Props = {
  post: Queries.Mdx;
};

export function LastPost({ post }: Props) {
  const color = useColorModeValue("blackAlpha.50", "whiteAlpha.100");

  const imgFile =
    post.frontmatter?.heroImageFile?.childImageSharp?.gatsbyImageData;
  const imgLink = post.frontmatter?.heroImageLink;
  const link = post.slug || "";

  return (
    <>
      <Link as={RouterLink} to={link}>
        <Box roundedTop="xl" overflow="hidden">
          {imgLink && (
            <Image
              src={imgLink}
              alt={post.frontmatter?.heroImageAlt || ""}
              objectFit="cover"
              height="200px"
              w="100%"
            />
          )}
          {!imgLink && imgFile && (
            <GatsbyImage
              objectFit="cover"
              style={{ height: "200px", width: "100%" }}
              image={imgFile}
              alt={post.frontmatter?.heroImageAlt || ""}
            />
          )}
        </Box>
      </Link>
      <Box
        bg={color}
        p={8}
        roundedBottom="xl"
        roundedTop={(!imgLink && !imgFile && "xl") || undefined}
      >
        <Heading as="h3" fontSize="3xl" mb="1">
          <Link as={RouterLink} to={link}>
            {post.frontmatter?.title}
          </Link>
        </Heading>
        <PostInfo post={post} />
      </Box>
    </>
  );
}
// background-image: linear-gradient( 83.2deg,  rgba(150,93,233,1) 10.8%, rgba(99,88,238,1) 94.3% );
