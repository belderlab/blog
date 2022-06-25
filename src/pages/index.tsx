import * as React from "react";
import { Link, graphql, PageProps } from "gatsby";

// import Bio from "../components/Bio";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { Box, Heading } from "@chakra-ui/react";
import { TopArticle } from "../components/TopArticle";

const BlogIndex = ({ data, location }: PageProps<Queries.Query>) => {
  const siteTitle = data.site?.siteMetadata?.title;
  const posts = data.allMdx.nodes;

  console.log({ posts });
  const favoriteArticle = React.useMemo(
    () => posts.find((post) => post.frontmatter?.favorite === true),
    [posts]
  );

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <>
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        {favoriteArticle && <TopArticle article={favoriteArticle} />}
        <ol style={{ listStyle: `none` }}>
          {posts.map((post) => {
            const title = post?.frontmatter?.title || post?.slug;

            return (
              <li key={post?.slug}>
                <Box
                  as="article"
                  my="12"
                  itemScope
                  itemType="http://schema.org/Article"
                >
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
                        __html:
                          post?.frontmatter?.description || post.excerpt || "",
                      }}
                      itemProp="description"
                    />
                  </section>
                </Box>
              </li>
            );
          })}
        </ol>
      </Layout>
    </>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        slug
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          favorite
          tag
          heroImageFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          heroImageAlt
          heroImageLink
        }
      }
    }
  }
`;
