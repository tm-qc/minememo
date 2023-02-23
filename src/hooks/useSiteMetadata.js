// gatsby-config.jsのmeta情報のデフォルト値を取得する
// componentsフォルダ下にseo.jsを作成してseo.jsファイルの中で実行される

import { graphql, useStaticQuery } from 'gatsby';

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return data.site.siteMetadata;
};