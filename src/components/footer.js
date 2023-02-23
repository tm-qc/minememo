import * as React from 'react';
// useStaticQuery, graphqlも使うので読み込む
import { useStaticQuery, graphql } from 'gatsby';
// CSS読み込み(カレントディレクトリで解決すべきリクエストは、'./' で始める必要があるとのこと)
import * as style from './css/footer.module.css';

const Footer = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            startYear
          }
        }
      }
    `
  );
  return (
    <footer>
      <div>Copyright © {data.site.siteMetadata.startYear} - {new Date().getFullYear()} {data.site.siteMetadata.title} </div>
    </footer>
  );
};

export default Footer;