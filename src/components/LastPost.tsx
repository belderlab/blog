import { Box, Heading, Image, Link, useColorModeValue } from "@chakra-ui/react";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link as RouterLink } from "gatsby";
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
  const link = `/${post.slug}` || "";

  return (
    <Box
      sx={{
        transition: "transform .2s ease",
        _hover: {
          transform: "translateY(-4px)",
        },
      }}
      cursor="pointer"
      position="relative"
    >
      <Link
        as={RouterLink}
        to={link}
        position="absolute"
        top="0"
        bottom="0"
        right="0"
        left="0"
        zIndex="1"
      />
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
      <Box
        bg={color}
        p={8}
        roundedBottom="xl"
        roundedTop={(!imgLink && !imgFile && "xl") || undefined}
      >
        <Heading as="h3" fontSize="3xl" mb="3">
          {post.frontmatter?.title}
        </Heading>
        <Box textDecoration="none">
          <PostInfo post={post} />
        </Box>
      </Box>
    </Box>
  );
}
