---
title: '【Git/GitHub】GitHubにファイルを上げないようにする方法' #記事のタイトル
date: '2020-06-09' #作成日
update_at: '2020-06-09' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'gitignore' #url ファイル名と合わせてください
hero_image: '../images/posts/Octocat.png' #アイキャッチ画像
tags: ["Git/GitHub"] #タグ カテゴリとして使ってもOK
---

<div class="toc-title">目次</div>

```toc
```

はじめに
----

Gitでバージョン管理をしている場合に、GitHubにあげたくないファイルがあると思います。  
例えばパスワードなどが記載されていたりするファイルなどですね。

その時にGitのバージョン管理から外す＝上げないようにするための方法を記載します。

Gitのバージョン管理から外す方法
-----------------

1. .gitignoreという名前のファイルを作成する
2. バージョン管理から除外したいファイルやフォルダがある階層に.gitignoreを置く
3. .gitignoreに除外したいファイルのパスを記載する

 .gitignoreファイルの記載例
-------------------

```gitignore:title=gitignore
# #はコメントです。以下は一例なので、そのほかの記載はネットなど見てみてください。

# 指定したファイルを除外
#.gitignoreがおいてある階層のindex.htmlのみが除外される
/index.html

# 指定したファイルをすべて除外
#.gitignoreがおいてある階層配下でindex.htmlというファイル名を全部除外する
index.html

#指定したディレクトリをすべて除外
#.gitignoreがおいてある階層配下でdirというフォルダ配下を全部除外する
dir/
```

 .gitignoreの特徴の一例
-----------------

1. .gitignoreは複数のディレクトリに置くことができます
2. 深いフォルダの.gitignoreが優先されます

個人的に上記を踏まえ、ディレクトリごとに簡単な記載で.gitignoreファイルを作成してもよいのかなと思っています。

慣れてきたら、まとめて無駄なく書きたい気持ちはありますが。  
以下のサイトが参考になるので、もっと詳しい内容を知りたい場合はぜひ参考にしてみてください。

<div class="boxparts ref">
  <div class="title"></div>
  
[\[Git\] .gitignoreの仕様詳解](https://qiita.com/anqooqie/items/110957797b3d5280c44f)

[A collection of .gitignore templates](https://github.com/github/gitignore)  
※公式の .gitignore のテンプレート集です。

</div>