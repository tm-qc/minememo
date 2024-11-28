/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * このファイルは gatsby develop 時に一回だけ動き、
 * 色々なものを生成するファイルです。
 * 
 * 1.タグ機能で追加
 * // 1でソース内にコメントしてます。
 * 
 * 2.ページャーで追加
 * // 2
 */


const path = require(`path`)
const _ = require("lodash")// 1
const { createFilePath } = require(`gatsby-source-filesystem`)

// 2　import { paginate } from 'gatsby-awesome-pagination'; ではエラーになる
const { paginate } = require("gatsby-awesome-pagination");

// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.js`)


/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // const blogPostTemplate = path.resolve("src/templates/blog.js")//1 タグで追加しないといけないみたいだが関係なさそうなのでコメントアウト
  const tagTemplate = path.resolve("src/templates/tags.js")//1

  // Get all markdown blog posts sorted by date
  // 1タグ機能で書き換え
  const result = await graphql(`
  {
    postsRemark: allMarkdownRemark(
      sort: { frontmatter: { date: DESC }}
      limit: 2000
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            tags
          }
        }
      }
    }
    tagsGroup: allMarkdownRemark(limit: 2000) {
      group(field: { frontmatter: { tags: SELECT }}) {
        fieldValue
      }
    }
  }
`)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  // 1タグ機能で書き換え
  // const posts = result.data.allMarkdownRemark.nodes
  const posts = result.data.postsRemark.edges

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id
      createPage({
        /**
         * エラーっぽい Cannot read properties of undefined (reading 'slug')
         * 書き換え
         * 
         * 確認方法↓
         * 1.gatsby develop の起動時にエラーが無いか
         * 2.const result のクエリの結果の構造をGraphiQL(http://localhost:8000/___graphql)で確認
        */
        path: post.node.fields.slug,
        // path: post.fields.slug,
        component: blogPost,
        context: {
          // ここも上に習って書き換え
          id: post.node.id,
          // id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  // 1 タグ機能で追加
  const tags = result.data.tagsGroup.group

  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })

  // 2 ページャで追加
  const pager = result.data.postsRemark.edges
  paginate({
    createPage,
    items:pager,
    itemsPerPage: 10,
    component: path.resolve("src/templates/index.js"),
    pathPrefix: ({ pageNumber }) => (
        pageNumber === 0 ? "/" : "/page"
    )
})
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}

// <w> [webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: Unable to snapshot resolve dependencies
// 241128 このエラーによりコメントアウト
exports.onCreateWebpackConfig = ({ actions }) => {
  a24112411ns.setWebpackConfig({
    cache: false,
  });
};
