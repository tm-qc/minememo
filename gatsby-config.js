/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  // meta情報のデフォルト値
  siteMetadata: {
    // ブログのタイトル
    title: 'MinEMemO',
    // authorはオブジェクト形式でnameとsummaryの記載は必須かも。GraphiQLでnameとsummaryありきになる
    author: 
    {
      name: `tm`,
      summary: `サマリー`,
    },
    //ブログの開始年 footerに表示されます
    startYear:'2020',
    //ブログの説明文
    description: `個人用の開発ブログ。ReactベースのGatsby.jsで自作しています。`,
    user: { name: 'taka', job:'プログラマー',email: 'web.tm.mail@gmail.com' },
    //profile本文
    profile:`
    いつでも転職希望の業務経験7年目(2023時点)のエンジニアです。
    
    仕事の合間にすこしずつ転職活動はしていますが、条件が合う場合ぜひTwitterなどでご連絡頂けると嬉しいです。

希望条件は基本的に残業は1日x1h程度。収入は一旦現状維持。
ある程度で構わないので、保守運用が管理されていて、精神的に安心して働ける環境が良いです。

経験言語はHTML、CSS、javascript、PHP、MySQL、Docker、Vuejs、Laravel

このブログは完全に自作で静的ジェネレータで作りました。
この範囲で言えば React.js Gatsby.js GraphQLも経験があります。

最近はAIがどう社会に受け入れられ、日常になっていくのかの行く末が気になっています。
今までの人生で一番変化を感じて不思議な感覚です。
    `,
    siteUrl: `https://minememo.work/`,
    social: {
      twitter: `tm_web_jc`,
    },
  },
  plugins: [
    // マークダウンプラグイン(マークダウンのデータをGraphQLで参照できるようにする)
    // https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/?=gatsby-transfermer-remark
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // マークダウンファイルで画像表示するために必要なプラグイン
          {
            resolve: `gatsby-remark-images`,
            options: {
              // 画像のMaxSize
              maxWidth: 700,
              showCaptions: true,
            },
          },
          // 記事の見出し（hタグ）にidを付与
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `toc-icon`,//アンカーアイコンに独自クラスを設定
              elements: [`h2`,`h3`,`h4`,`h5`],//idやアンカーアイコンを設定するhタグを指定
            },
          },

          //Markdown記事の中に目次を作成
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              ordered:true,//番号付きリストを作成します。
              exclude: ["Table of Contents", "TOC", "目次"],//指定した文字列に一致するタイトルを目次から除外
              fromHeading: 2,//目次を生成する最小のhタグ（デフォルトは<h2>）
              toHeading: 4,//目次を生成する最大のhタグ（デフォルトは<h6>）
              className: "toc-block"//生成された目次要素のクラス名を設定（デフォルトはtoc）
            },
          },

          //prismjs
          {
            resolve: 'gatsby-remark-prismjs-title',
            options: {
              className: 'your-custom-class-name'
            }
          }, // 重要: コードブロックを使用する他のプラグインより前に定義する必要があります。
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (e.g. <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (e.g. for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: "language-",
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in gatsby-browser.js
              // right after importing the prism color scheme:
              //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
              // This adds a new language definition to Prism or extend an already
              // existing language definition. More details on this option can be
              // found under the header "Add new language definition or extend an
              // existing language" below.
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
              // By default the HTML entities <>&'" are escaped.
              // Add additional HTML escapes by providing a mapping
              // of HTML entities and their escape value IE: { '}': '&#123;' }
              escapeEntities: {},
            },
          },
        ],
      },
    },

    // アイキャッチ画像表示に必要な3つのプラグイン
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    // ファイルシステムの情報取得プラグイン
    // allFile > totalCount(記事数？)などをとるために追記
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,//src配下のファイルを見る
      },
    },

    // なんかつかえなくなってたのでコメントアウト 241128
    //Google AdSenseのコードをheadに挿入するためのプラグイン
    // {
    //   resolve: `@isamrish/gatsby-plugin-google-adsense`,
    //   options: {
    //     googleAdClientId: "ca-pub-5030891386703426",
    //     head: false // Optional
    //   }
    // }
  ],
}
