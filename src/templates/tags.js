// Tagをクリック後に遷移するTagで絞った記事一覧を表示するページのコンポーネント

import React from "react"
import PropTypes from "prop-types"

// 共通コンポーネント読み込み
import Layout from '../components/layout';
//タグコンポーネント
import Profile from '../pages/profile';
import SideTagList from '../pages/side_tag_list';
import TwitterTimeLine from '../pages/twitter_timeline';

// Components
import { Link, graphql } from "gatsby"
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
 * @returns html
 */
const listImgSrc = (node)=>{
  // console.log(node);
  // debugger
  const hero_image = node.frontmatter.hero_image;
  if(hero_image == null){
    return <></>;
  }else{
    const imgSrc = hero_image.childImageSharp.gatsbyImageData.images.fallback.src;
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

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `「${tag} 」Tag 記事一覧(${totalCount} post${
    totalCount === 1 ? "" : "s"
  })`
  // const tagHeader = `${totalCount} post${
  //   totalCount === 1 ? "" : "s"
  // } tagged with "${tag}"`

  return (
    <Layout>
      <div>
        <div className={style.tagHeader}>🏷️{tagHeader}</div>
        {/* 記事リスト生成 */}

        {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          const { date } = node.frontmatter
            return (
              <div className={style.articleFrame} key={slug}>
                <Link className={style.articleBox} to={slug}>
                  {/* オリジナルで追加サムネ出力 */}
                  {listImgSrc(node)}
                  <div className={style.articleData}>
                    {title}
                    <p>{date}</p>
                  </div>
                  <div className={style.articlePrev}  dangerouslySetInnerHTML={{ __html: htmlClean(node.html) }} />
                </Link>
              </div>
            )
          })}
        {/*
          This links to a page that does not yet exist.
          You'll come back to it!
        */}
        {/* <Link to="/tags">All tags</Link> */}
      </div>
      <div className={style.sideFrame}>
        <Profile />
        <SideTagList />
        <TwitterTimeLine />
      </div>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
query ($tag: String) {
  allMarkdownRemark(
    limit: 2000
    sort: {frontmatter: {date: DESC}}
    filter: {frontmatter: {tags: {in: [$tag]}}}
  ) {
    totalCount
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          date
          hero_image {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        html
      }
    }
  }
}
`
// export const pageQuery = graphql`
//   query($tag: String) {
//     allMarkdownRemark(
//       limit: 2000
//       sort: { frontmatter: { date: DESC }}
//       filter: { frontmatter: { tags: { in: [$tag] } } }
//     ) {
//       totalCount
//       edges {
//         node {
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//           }
//         }
//       }
//     }
//   }
// `