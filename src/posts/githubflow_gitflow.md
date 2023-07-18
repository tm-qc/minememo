---
title: '【Git/GitHub】GitHub FlowとGit Flow' #記事のタイトル
date: '2023-07-16' #作成日
update_at: '2023-07-16' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'githubflow_gitflow' #url ファイル名と合わせてください
hero_image: '../images/posts/Octocat.png' #アイキャッチ画像
tags: ["Git/GitHub"] #タグ カテゴリとして使ってもOK
---

<div class="toc-title">目次</div>

```toc
```

## はじめに

ブランチ名のつけ方の大きな二つの概念。  
GitHub FlowとGit Flowについての概要です。  

現場によってバラバラだったり、全くこれと違うこともあると思いますが、ベースとして知っておきたくて残してます。

## GitHub Flow

基本的にシンプルなこっちが多いみたいです。

### master
本番

### feature
新機能追加のブランチ

## Git Flow

複雑であまり使われないらしく、だいたいGitHub Flowでの運用が主になっていることが多いらしい  
※masterが一週間に一回しか更新できない。とか大人の事情がある場合につかわれることが多いらしい

### master
本番

### hotfix
軽い修正。masterの修正でmasterとdevelopmentに最終マージされる

### release
機能追加改修featureの内容をテストし、masterとdevelopmentにマージされる

### development
masterと同じ状態にしておく検証機

### feature
新機能追加のブランチ基本的にdevelopmentから派生しマージされる。


## さいごに

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
  GitHub Flowにhotfix足して～とかそんな感じでプロジェクトごとのケースが多そうです。
  </div>
</div>