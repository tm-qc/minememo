---
title: '本ブログで記事作成時に使えるパーツについて' #記事のタイトル
date: '2023-02-15' #作成日
update_at: '2023-02-15' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'blog_parts_manual' #url ファイル名と合わせてください
hero_image: '../images/gatsby-icon.png' #アイキャッチ画像
tags: ["ブログのマニュアル"] #タグ カテゴリとして使ってもOK
---

<div class="toc-title">目次</div>

```toc
```

## はじめに

当ブログはGatsby.jsをカスタマイズしてつくられています。<br>
この記事ではこのブログで記事を書く時に使えるパーツを紹介します。 


## Front Matter(記事の設定値)
マークダウンファイルの**1行目**から記載します。  
一番上の「---」が1行目じゃないとエラーになります。

```FrontMatter:title=FrontMatter

---
title: 'ブログの書き方' #記事のタイトル
date: '2023-02-15' #作成日
update_at: '2023-02-15' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'read-me' #url ファイル名と合わせてください
hero_image: '../images/gatsby-icon.png' #アイキャッチ画像
tags: ["その他","マニュアル"] #タグ カテゴリとして使ってもOK
---

```

## 目次
h2~h4で書かれた項目を自動で目次として掲載します。  
※この記事のTOPの目次が作成されます。

```Markdown:title=HTML+Markdown
<div class="toc-title">目次</div>

\```toc
\```

※\はなくていいです

```

## ボックスパーツ

### 参考

<div class="boxparts ref">
  <div class="title"></div>
  
  本文
</div>

```HTML:title=HTML
<div class="boxparts ref">
  <div class="title"></div>
  
  本文
</div>

```

### POINT

<div class="boxparts point">
  <div class="title"></div>
  
  本文
</div>

```HTML:title=HTML
<div class="boxparts point">
  <div class="title"></div>
  
  本文
</div>

```

### MEMO

<div class="boxparts memo">
  <div class="title"></div>
  
  本文
</div>

```HTML:title=HTML
<div class="boxparts memo">
  <div class="title"></div>
  
  本文
</div>

```

### 注意

<div class="boxparts caution">
  <div class="title"></div>
  
  本文
</div>

```HTML:title=HTML
<div class="boxparts caution">
  <div class="title"></div>
  
  本文
</div>

```

## コードブロック

```javasctipt:title=javasctipt

  console.log('');

```

```

\```javasctipt:title=javasctipt

console.log('');

\```

※\はなくていいです

```

## マークダウンファイルでの画像読み込み

1. 「./src/images/posts」フォルダに画像格納
2. 以下のようにマークダウン形式で読み込み  

```MarkDown:title=MarkDown
![画像の説明文](../images/posts/ファイル名.png)

※HTMLのimgタグでもOK
```


## プロフィール画像+吹き出し

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
  ここにセリフを書く
  </div>
</div>

```HTML:title=HTML
<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
  ここにセリフを書く
  </div>
</div>

```

※このパーツの画像はプロフィール画像が反映します。