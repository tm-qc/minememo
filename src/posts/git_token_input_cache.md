---
title: '【Git/GitHub】ユーザ名、トークン(Pass)の入力を初回だけにする' #記事のタイトル
date: '2023-07-17' #作成日
update_at: '2023-07-17' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'git_token_input_cache' #url ファイル名と合わせてください
hero_image: '../images/posts/Octocat.png' #アイキャッチ画像
tags: ["Git/GitHub"] #タグ カテゴリとして使ってもOK
---

<div class="toc-title">目次</div>

```toc
```

はじめに
----

Gitコマンドを打つときに、毎回ユーザ名、トークン(パスワード)を求められる時があります。  
毎回打つのがめんどくさいが、GitのSSH設定を変えられないとか、一旦お手軽に済ませたいという場合、以下のコマンドを実行で一時的に回避できます。

## コマンド


```git_command:title=git_command

# 3600=60分間キャッシュを使い、入力不要にする
git config --global credential.helper 'cache --timeout=3600'

```

## さいごに

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
  とりあえずお手軽にしたいときはこれ。
  </div>
</div>
