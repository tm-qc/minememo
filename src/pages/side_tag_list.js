import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Helmet } from "react-helmet"
import { useStaticQuery, Link, graphql } from "gatsby"

// CSS読み込み
import * as style from '../components/css/tags.module.css';

/**
 * なぜかPageQueryでは動かなかったので↓のStaticQueryに書き換え
*/
const TagsPage = () => {
  const data = useStaticQuery(graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: {frontmatter: {tags: SELECT}}) {
        fieldValue
        totalCount
      }
      totalCount
    }
  }
`)

// console.log(data,'Tags')
return(
  <div>
    <Helmet title={data.site.siteMetadata.title} />
    <div className={style.tagsBox}>
      <div className={style.title}>🏷️Tags<span className={style.aTotalCnt}> ({data.allMarkdownRemark.totalCount}) </span></div>
      <ul>
        {data.allMarkdownRemark.group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
)
}

// なぜかPageQueryでは動かなかった
// const TagsPage = ({
//   data: {
//     allMarkdownRemark: { group },
//     site: {
//       siteMetadata: { title },
//     },
//   },
// }) => (
//   <div>
//     <Helmet title={title} />
//     <div>
//       <h1>Tags</h1>
//       <ul>
//         {group.map(tag => (
//           <li key={tag.fieldValue}>
//             <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
//               {tag.fieldValue} ({tag.totalCount})
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   </div>
// )

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage