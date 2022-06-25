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

type Props = {
  article: Queries.Mdx;
};

export function TopArticle({ article }: Props) {
  const imgFile =
    article.frontmatter?.heroImageFile?.childImageSharp?.gatsbyImageData;
  const imgLink = article.frontmatter?.heroImageLink;
  const title = article.frontmatter?.title;
  const description = article.frontmatter?.description;
  const tag = article.frontmatter?.tag;
  const link = article.slug || "";

  return (
    <Grid templateColumns="1fr 1fr" gap="8" bg="">
      <Box>
        <Link as={RouterLink} to={link}>
          <Box rounded="xl">
            {imgLink && (
              <Image
                src={imgLink}
                alt={article.frontmatter?.heroImageAlt || ""}
              />
            )}
            {!imgLink && imgFile && (
              <GatsbyImage
                image={imgFile}
                alt={article.frontmatter?.heroImageAlt || ""}
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
        <Box>
          {tag && <Tag>{tag}</Tag>}
          {tag && " · "}
          25 Jun, 2022 · 6 min read
        </Box>
      </Flex>
    </Grid>
  );
}
