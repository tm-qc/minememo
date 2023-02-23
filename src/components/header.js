// ヘッダー、フッターなどの共通パーツはcomponentsフォルダ配下に作る

import * as React from 'react';
// Gatsbyでページ間のリンクを貼る場合はLinkコンポーネントを利用します
// useStaticQuery, graphqlも使うので読み込む
import { Link, useStaticQuery, graphql } from 'gatsby';
// CSS読み込み(カレントディレクトリで解決すべきリクエストは、'./' で始める必要があるとのこと)
import * as style from './css/header.module.css';

const Header = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );
  return (
    <div>
    <header>
      <Link to="/"><div className={style.h1}>{data.site.siteMetadata.title}</div></Link>
    </header>
    <nav>
    <ul className={style.header}>
      <li>
        {
          /* 
            Linkコンポーネントは以下のように使う。

            外部のページへのリンクはaタグを利用して行います。
            aタグの場合、ページ全体が再読み込みされる。
          */
        }
        <Link to="/">HOME</Link>
      </li>
      <li><Link to="/about">ABOUT</Link></li>
    </ul>
  </nav>
  </div>
  );
};

export default Header;