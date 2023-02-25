/**
 * マークダウン記事を表示するための土台となっている共通コンポーネント。
 * このファイルをgatsby-node.jsで読み込んで、マークダウンからHTML形式の記事が作成され表示されます。
 * 
 * 記事に対するCSSなどはこのファイルにあてればいいので、article.module.cssを触って変更すると良いです。
*/

import { graphql } from 'gatsby';
import * as React from 'react';
import moment from 'moment';
import Layout from '../components/layout';
import Profile from '../pages/profile';
import SideTagList from '../pages/side_tag_list';
import TwitterTimeLine from '../pages/twitter_timeline';

import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import Seo from '../components/seo';

// CSS読み込み
import * as style from '../components/css/index.module.css';
import * as aStyle from '../components/css/article.module.css';



/**
 * GraphQLのdate(formatString: "MMMM DD, YYYY")はutc基準で時間がずれるらしいので関数自作で変換します
 * ※GraphQLのdate(formatString: "MMMM DD, YYYY")は利用しない
 */
const dateFormat = (dateStr) => moment(dateStr).format('YYYY-MM-DD');


// ブログの個別ページを開くときに動くページっぽい
export default function BlogPostTemplate({ data: { markdownRemark } }) {
  const { frontmatter, html } = markdownRemark;
  // console.log(frontmatter)
  const image = getImage(frontmatter.hero_image);
  return (
    <Layout>
      <div className={aStyle.articleFrame}>
        <h1>{frontmatter.title}</h1>
        <div className={aStyle.date}>&#x1f4dd; 更新日：{dateFormat(frontmatter.update_at)} / &#x1f4c4; 作成日：{dateFormat(frontmatter.date)}</div>
        <div className={aStyle.eyeCatch}>
          {/* Hero の意味わかってないけど、アイキャッチ画像っぽい*/}
          <div className={aStyle.eyeCatchWidth}>
            <GatsbyImage image={image} alt="Hero Image" />
          </div>
        </div>
        <div className={aStyle.articleBody}>
          <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
      {/* 右サイドバー */}
      <div className={style.sideFrame}>
        <Profile />
        <SideTagList />
        <TwitterTimeLine />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date
        update_at
        title
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;

export const Head = ({ data: { markdownRemark } }) => {
  const { frontmatter } = markdownRemark;
  return <Seo title={frontmatter.title} />;
};