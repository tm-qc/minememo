// TOPページになるページ


import * as React from 'react';
// 共通コンポーネント読み込み
import Layout from '../components/layout';
//タグコンポーネント
import Profile from '../pages/profile';
import SideTagList from '../pages/side_tag_list';
import TwitterTimeLine from '../pages/twitter_timeline';
import Paginate from '../pages/paginate';
//GraphQL
import { graphql, Link } from 'gatsby';
// CSS読み込み
import * as style from '../components/css/index.module.css';


/**
 * リストのサムネイルになるimgタグを返す
 * マークダウンにアイキャッチ画像の設定がないとエラーになるので、空タグを返すようにしてます。
 * 
 * ※記事リストの src\pages\index.js とタグの記事リスト src\templates\tags.js に機能としては同じ関数があります。
 * 　双方データを取得するチェーンメソッドの並びが違います。
 * 
 * @param {obj} edge graphqlのデータ
 * @return html
 */
const listImgSrc = (edge)=>{
  const hero_image = edge.node.frontmatter.hero_image;
  // console.log(hero_image);
  // debugger
  if(hero_image == null){
    return <></>;
  }else{
    const imgSrc = hero_image.childrenImageSharp[0].gatsbyImageData.images.fallback.src;
    // console.log(hero_image.childrenImageSharp[0].gatsbyImageData.images,'images')
    return <img src={imgSrc} alt=""></img>;
  }
}

/**
 * 記事一覧で記事の一部を表示するために、目次や装飾を削除する(htmlタグや目次、タブ、改行)
 * ※記事リストの src\pages\index.js とタグの記事リスト src\templates\tags.js に機能としては同じ関数があります。
 * 
 * @param {string} _html マークダウンファイルの記事データ
 * @return html 調整済みの記事データ
*/
const htmlClean = (_html)=>{
  const regexp_html = /<(".*?"|'.*?'|[^'"])*?>/g;//htmlタグを検知
  const regexp_toc = /<div .*目次.*<\/ol><\/div>/g;//目次のhtmlタグを検知

  let html = _html.replace(/\r\n|\n|\r|\t/g, '')//改行とタブ削除
  html = html.replace(regexp_toc, '')//目次削除
  html = html.replace(regexp_html, ' ')//HTMLタグを半角スペースに変換
  return html;
}

// pageContextはページャの情報
const IndexPage = ({ data, pageContext }) => {
  // console.log(data,"index")
  return (
    <Layout>
      {
        /**
         * Layoutタグの間にコンテンツを入れていましたが、コンテンツはpropsを使って受け取ることができます。
         * Reactでは親コンポーネントから子コンポーネントにデータを渡す際にpropsを利用します。
         * 
         * layout.jsで引数で以下の内容を受け取って以下のコンテンツとして表示します。
        */
      }
      <div className={style.indexFrame}>
        {/* 記事リスト生成 */}
        <div>
        {data.allMarkdownRemark.edges.map((edge) => (
          <div className={style.articleFrame} key={edge.node.id}>
              <Link className={style.articleBox} to={`/posts/${edge.node.frontmatter.slug}`}>
                {/* オリジナルで追加サムネ出力 */}
                {listImgSrc(edge)}
                <div className={style.articleData}>
                  {edge.node.frontmatter.title}
                  <p>{edge.node.frontmatter.date}</p>
                </div>
                <div className={style.articlePrev}  dangerouslySetInnerHTML={{ __html: htmlClean(edge.node.html) }} />
              </Link>
          </div>
        ))}
        <Paginate pageContext={pageContext} />
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
};

/**
 * Date(作成)順で記事を取得
 * 
 * これがポイント：sort: {frontmatter: {date: DESC}}
 * http://localhost:8000/___graphql
 * これで選択してわかった。
 * 
 * ↓ページャーで追加
 * 
*/
export const query = graphql`
query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: {frontmatter: {date: DESC}}, skip: $skip, limit: $limit
      ) {
      edges {
        node {
          id
          html
          timeToRead
          frontmatter {
            title
            date
            slug
            hero_image {
              childrenImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
    allSite {
      edges {
        node {
          siteMetadata {
            profile
            user {
              name,
              job,
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;