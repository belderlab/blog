import * as React from "react";
import { Link, graphql, PageProps } from "gatsby";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { Box, Button } from "@chakra-ui/react";

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
        <header>
          <h1 itemProp="headline">{post?.frontmatter?.title}</h1>
          <p>{post?.frontmatter?.date}</p>
        </header>
        <MDXProvider
          components={{
            Button: Button,
            Box: Box,
          }}
        >
          <section itemProp="articleBody">
            {post?.body && <MDXRenderer>{post.body}</MDXRenderer>}
          </section>
        </MDXProvider>
        <hr />
        <footer>Footer</footer>
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
