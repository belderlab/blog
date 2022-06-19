import * as React from "react";
import { Link, graphql, PageProps } from "gatsby";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { components } from "../components/Components";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";

const BlogPostTemplate = ({
  data,
  location,
}: PageProps<Queries.BlogPostBySlugQuery>) => {
  const post = data.mdx;
  const siteTitle = data.site?.siteMetadata?.title || `Title`;
  const { previous, next } = data;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post?.frontmatter?.title}
        description={post?.frontmatter?.description || post?.excerpt}
      />
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
              <Text fontSize="md">{data.site?.siteMetadata?.author?.name}</Text>
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
        <Box mt="16" mb="8" as="hr" color="red.500" />
        {/* <footer>Footer</footer> */}
      </article>
      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && previous?.slug && (
              <Link to={`/${previous?.slug}`} rel="prev">
                ← {previous?.frontmatter?.title}
              </Link>
            )}
          </li>
          <li>
            {next && next?.slug && (
              <Link to={`/${next?.slug}`} rel="next">
                {next?.frontmatter?.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
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
      }
      timeToRead
    }
    previous: mdx(id: { eq: $previousPostId }) {
      slug
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      slug
      frontmatter {
        title
      }
    }
  }
`;
