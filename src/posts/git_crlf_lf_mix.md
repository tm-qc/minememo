---
title: '【Git/GitHub】改行コードCRLFとLFの混在について' #記事のタイトル
date: '2023-05-23' #作成日
update_at: '2023-05-23' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'git_crlf_lf_mix' #url ファイル名と合わせてください
hero_image: '../images/posts/Octocat.png' #アイキャッチ画像
tags: ["Git/GitHub","コマンド"] #タグ カテゴリとして使ってもOK
---

<div class="toc-title">目次</div>

```toc
```

はじめに
----
仕事中にGitHubを使っていたらCRLFとLFの混在が発覚し、対応したのでメモ代わりに記事にしておきます。


## CRLFやLFが混在するとダメな理由。

- CRLFはwindows系の改行コード
- LFはLinux(GitHub推奨)の改行コード

となっています。<br>
<br>
これが混在することで、バッチなどでShellを使ったりする場合の動作に影響がでたり、Windowsアプリでおかしいことになったりと異なる作業環境で影響が出るそうです。<br>
<br>
個人的にVS CODEでプログラムを書いてるだけであれば、今まで大きなことは無かったですが、揃えておいた方が後々のトラブルを防げると思い対応しました。

## GitHubの改行コードの変換設定について

GitHubにはデフォルトで改行コードを自動で変換する仕組みがあり、基本的には何も起こらないそうですが、変換されないケースも稀にあるようです。<br><br>
改行コード変換機能「git config --global core.autocrlf」の種類は以下の通り。

- true:チェックアウト時に「LF→CRLF」、コミット時に「CRLF→LF」
- input:チェックアウト時に「変換しない」、コミット時に「CRLF→LF」
- false:チェックアウト時に「変換しない」、コミット時に「変換しない」

何にするかはプロジェクトの方針によって違うと思いますが、個人的にはCRLFへの変換を避けLFに統一という意味で input が無難かなと感じています。<br>
<br>
改行コード変換機能の設定を確認するコマンドは↓<br>

```
git config core.autocrlf
```

inputに変更するコマンドは↓<br>
```
git config --global core.autocrlf input
```

## リポジトリにCRLFとLFが混在した場合の解消方法

修正方法については以下の記事様様でしたので、是非ご確認ください。<br>
本当にありがとうございます。

<div class="boxparts ref">
  <div class="title"></div>
  
  修正方法についてはこちらの記事にすごく助けられました。感謝します。<br>
  https://coding-factory.com/news/methodology/cm139
</div>

修正コマンドだけ記載しておきます。<br>

```

1.フォルダ内でCRLFになっているファイルをコマンドで探す。

find . -type f | xargs file | grep CRLF

2.CRLFになっているファイルがあれば、LFに変換。

find . -type f | xargs file | grep CRLF | awk -F: '{print $1}' | xargs dos2unix

3.変換後1のコマンドで再検索し確認
※変換後に残存があれば再度2をしたら解消しました

```


## さいごに
一応乗り越えれて良かったと思います。<br>
いろんなケースがあると思いますが、今後のために備忘録でした。

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
  コマンドについてはChatGPTに聞いたら、すごく良い解説をしてくれますので、お試しあれ！
  </div>
</div>
