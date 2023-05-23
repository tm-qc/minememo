---
title: '【コマンド】圧縮解凍コマンド' #記事のタイトル
date: '2023-05-22' #作成日
update_at: '2023-05-22' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'cmd_tar' #url ファイル名と合わせてください
hero_image: '../images/posts/pc-green.png' #アイキャッチ画像
tags: ["コマンド"] #タグ カテゴリとして使ってもOK
---

<div class="toc-title">目次</div>

```toc
```


## はじめに

最近サーバーに入って、重いフォルダを圧縮することがそれなりにあるのでメモ。


## 圧縮コマンド

```
tar cvfz 圧縮後のフォルダ名.tar.gz 圧縮対象のフォルダ名
```

※tar：処理しやすいように一つにまとめる方法<br>
※gz：gzip形式の圧縮方法

## 解凍コマンド

```
tar xvfz 圧縮後のフォルダ名.tar.gz
```

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
  メモ～！
  </div>
</div>
