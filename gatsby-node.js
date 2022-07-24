const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

function getOtherPost(posts, currentIndex) {
  let previous;
  let next;

  for (let i = currentIndex + 1; i < posts.length; i++) {
    if (!posts[i].frontmatter.hidden) {
      next = posts[i];
      break;
    }
  }

  for (let i = currentIndex - 1; i > 0; i--) {
    if (!posts[i].frontmatter.hidden) {
      previous = posts[i];
      break;
    }
  }

  return {
    previous,
    next,
  };
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/BlogPost.tsx`);

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            slug
            frontmatter {
              hidden
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const posts = result.data.allMdx.nodes;

  posts.forEach((post, index) => {
    const { previous, next } = getOtherPost(posts, index);

    createPage({
      path: post.slug,
      component: blogPost,
      context: {
        id: post.id,
        previousPostId: previous?.id || null,
        nextPostId: next?.id || null,
      },
    });
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
    }

    type Author {
      name: String
    }

    type MdxFrontmatter implements Node {
      title: String
      description: String
      date: Date @dateformat
      favorite: Boolean
      tag: String
      heroImageLink: String
      heroImageFile: File @fileByRelativePath
      heroImageAlt: String
      hidden: Boolean
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      favorite: Boolean
      tag: String
      heroImageLink: String
      heroImageFile: File
      heroImageAlt: String
      hidden: Boolean
    }

    type Fields {
      slug: String
    }
  `);
};
