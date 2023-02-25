---
title: '【Gatsby】Netlifyで一部CSSが反映しない'
date: '2023-02-25'
update_at: '2023-02-25' #無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'gatsby-css-not-reflection'
hero_image: '../images/gatsby-icon.png'
tags: ["Gatsby","Netlify"]
---

<div class="toc-title">目次</div>

```toc
```


## はじめに

GatsbyでbuildしてNetlifyでデプロイしたら一部CSSが反映しない！という事象が出ました。

状況は以下の通り

1. gatsby develop 反映してる ○
2. gatsby build → gatsby serve 反映してる　○
3. gatsby build → GitHub → Netlify 反映しない ×

## 解決方法

CSSはきちんと書こうってことでした。

```CSS:title=CSS

↓NGなパターン

body {
  font-family: "Helvetica Neue",
    Arial,
    Meiryo;
}
```

```CSS:title=CSS

↓OKなパターン

body {
  font-family: "Helvetica Neue",
  "Arial",
  "Meiryo";
}
```

インターネットで信頼している記事を参考に気軽にコピペで使ったのですが、
クォーテーションが合ったりなかったりしたら、Netlify側でうまく反映出来ない感じでした。

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
本当に凡ミスでした。<br>
ただ、3 のパターンだけ反映しないのと、Netlifyのデプロイの時だけ失敗する。<br>
という状況で、原因が判明したのも勘で偶然できただけ、かなり時間がとられました・・。
  </div>
</div>
