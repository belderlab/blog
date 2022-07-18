import * as React from "react";
import { graphql, PageProps } from "gatsby";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { components } from "../components/Components";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { LastPost } from "../components/LastPost";
import { Hidden } from "../components/Hidden";

const BlogPostTemplate = ({
  data,
  location,
}: PageProps<Queries.BlogPostBySlugQuery>) => {
  const post = data.mdx;
  const siteTitle = data.site?.siteMetadata?.title || `Title`;
  const previous = data.previous as Queries.Mdx;
  const next = data.next as Queries.Mdx;
  const hidden = data.hidden;
  const imgLink = post?.frontmatter?.heroImageLink;
  const imgFile =
    post?.frontmatter?.heroImageFile?.childImageSharp?.gatsbyImageData;

  if (hidden?.frontmatter?.hidden) {
    return (
      <Layout location={location} title={siteTitle}>
        <Container maxW="container.md">
          <Hidden />
          <Box mt="8" mb="8" as="hr" />
          <Grid as="nav" templateColumns="1fr 1fr" gap={12}>
            <Box>{next && <LastPost post={next} />}</Box>
            <Box>{previous && <LastPost post={previous} />}</Box>
          </Grid>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post?.frontmatter?.title}
        description={post?.frontmatter?.description || post?.excerpt}
      />
      <Container maxW="container.md">
        <article itemScope itemType="http://schema.org/Article">
          <Box as="header" mt="14" mb="8">
            <Flex mb="4">
              <Box mr="4">
                <StaticImage
                  src="../images/profile-pic.png"
                  alt=""
                  height={48}
                  style={{
                    borderRadius: "50%",
                  }}
                  role="none"
                />
              </Box>
              <Box>
                <Text fontSize="md">
                  {data.site?.siteMetadata?.author?.name}
                </Text>
                <Text>
                  {post?.frontmatter?.date} · {post?.timeToRead} min read
                </Text>
              </Box>
            </Flex>
            <Heading as="h1" size="2xl" itemProp="headline">
              {post?.frontmatter?.title}
            </Heading>
          </Box>
          <Box rounded="xl" overflow="hidden">
            {imgLink && (
              <Image
                src={imgLink}
                alt={post.frontmatter?.heroImageAlt || ""}
                objectFit="cover"
                w="100%"
              />
            )}
            {!imgLink && imgFile && (
              <GatsbyImage
                objectFit="cover"
                style={{ width: "100%" }}
                image={imgFile}
                alt={post.frontmatter?.heroImageAlt || ""}
              />
            )}
          </Box>
          <MDXProvider components={components}>
            <section itemProp="articleBody">
              {post?.body && <MDXRenderer>{post.body}</MDXRenderer>}
            </section>
          </MDXProvider>
          <Box mt="16" mb="8" as="hr" />
        </article>
        <Grid as="nav" templateColumns="1fr 1fr" gap={12}>
          <Box>{next && <LastPost post={next} />}</Box>
          <Box>{previous && <LastPost post={previous} />}</Box>
        </Grid>
      </Container>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    mdx(id: { eq: $id }, frontmatter: { hidden: { ne: true } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tag
        hidden
        heroImageLink
        heroImageFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        heroImageAlt
      }
      timeToRead
    }
    hidden: mdx(id: { eq: $id }) {
      frontmatter {
        hidden
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      id
      slug
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tag
        heroImageLink
        heroImageFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      timeToRead
    }
    next: mdx(id: { eq: $nextPostId }) {
      id
      slug
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tag
        heroImageLink
        heroImageFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      timeToRead
    }
  }
`;
