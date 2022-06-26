import * as React from "react";
import { Link, graphql, PageProps } from "gatsby";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { components } from "../components/Components";
import { Box, Container, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import { LastPost } from "../components/LastPost";

const BlogPostTemplate = ({
  data,
  location,
}: PageProps<Queries.BlogPostBySlugQuery>) => {
  const post = data.mdx;
  const siteTitle = data.site?.siteMetadata?.title || `Title`;
  const previous = data.previous as Queries.Mdx;
  const next = data.next as Queries.Mdx;

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
          <MDXProvider components={components}>
            <section itemProp="articleBody">
              {post?.body && <MDXRenderer>{post.body}</MDXRenderer>}
            </section>
          </MDXProvider>
          <Box mt="16" mb="8" as="hr" />
        </article>
        <Grid as="nav" templateColumns="1fr 1fr" gap={12}>
          {previous && (
            <Box>
              <LastPost post={previous} />
            </Box>
          )}
          {next && (
            <Box>
              <LastPost post={next} />
            </Box>
          )}
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
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tag
      }
      timeToRead
    }
    previous: mdx(id: { eq: $previousPostId }) {
      slug
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tag
        heroImageFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      timeToRead
    }
    next: mdx(id: { eq: $nextPostId }) {
      slug
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tag
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