/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

type Meta = React.DetailedHTMLProps<
  React.MetaHTMLAttributes<HTMLMetaElement>,
  HTMLMetaElement
>[];

type Props = {
  description?: Queries.Maybe<string>;
  lang?: Queries.Maybe<string>;
  meta?: Meta;
  title?: Queries.Maybe<string>;
};

const Seo = ({
  description = "",
  lang,
  meta = [],
  title = "DatPayments Blog",
}: Props) => {
  const { site } = useStaticQuery<Queries.Query>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site?.siteMetadata?.description;
  const defaultTitle = site?.siteMetadata?.title;
  const resultMeta: Meta = [
    {
      name: `description`,
      content: metaDescription || undefined,
    },
    {
      property: `og:title`,
      content: title || undefined,
    },
    {
      property: `og:description`,
      content: metaDescription || undefined,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site?.siteMetadata?.social?.twitter || ``,
    },
    {
      name: `twitter:title`,
      content: title || undefined,
    },
    {
      name: `twitter:description`,
      content: metaDescription || undefined,
    },
  ];

  return (
    <Helmet
      htmlAttributes={{
        lang: lang || "en",
      }}
      title={title || undefined}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={resultMeta.concat(meta || [])}
    />
  );
};

export default Seo;
