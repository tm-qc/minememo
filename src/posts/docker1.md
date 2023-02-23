---
title: '【Docker】#1 はじめに+Dockerとは+Docker Desktopインストール' #記事のタイトル
date: '2022-10-11' #作成日
update_at: '2022-10-19' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'docker1' #url ファイル名と合わせてください
hero_image: '../images/posts/docker_icon.jpg' #アイキャッチ画像
tags: ["Docker"] #タグ カテゴリとして使ってもOK
---

<div class="toc-title">目次</div>

```toc
```

はじめに
----

今回業務で開発環境を作る際に共有できるノウハウが存在しないチームだったので、展開できる方法を検討し、Dockerが最適だと判断し個人で勉強しチームに展開まで行いました。

この通りやれば環境を再現してローカルで使える！というところまで、まとめたので時間がある限りブログに残そうかと思っています。

作成する環境は以下の通りです。

- windows pc
- php 8.0.23
- composer 2.4.1
- nginx 1.22.0
- MySQL 8.0.30
- Laravel 6.20.44
- phpMyAdmin最新

参考にした教材は以下です。  
こちらがなかったらここまで実現できなかったと思います。

ありがとうございます。

<div class="boxparts ref">
  <div class="title"></div>
  
[駆け出しエンジニアのためのDocker入門](https://www.udemy.com/course/docker-startup/)

[DockerでPHP（Laravel）+ nginx + MySQLのLEMP環境を構築する](https://qiita.com/hinako_n/items/f15646ea548bcdc8ac6c)
</div>


なお、私自身はインフラ専門家ではないので、インフラの各種機能の設定値は深堀していません。  
本気で事業で使う場合はインフラの専門家の方にDockerファイルを作成+本番環境での運用を想定してもらい、それを作業者は起動、運用するだけ、という風にするのが理想だと思います。

Dockerとは
--------

環境構築を設定ファイルとコマンドで行えるツールです。  
設定ファイルとコマンドで成り立つため、個人個人で環境の統一がしやすいのがメリットです。

Dockerの設定ファイルになれればバージョンの変更も容易なので、最初の敷居は高めですが、なれるとDocker一択！というほどお手軽で便利でチームで使いやすいものだと感じました。

手順を体系的に書いてわたすのがすごく楽になります。

### 環境構築に必要なもの

<table class="cps-table03"><tbody><tr><th>Docker</th><td class="rankinginfo">今回のメインツール</td></tr><tr><th>プロジェクトフォルダ</th><td class="rankinginfo">ローカルPCの作業フォルダ。  
この構造に沿って、docker-compose.ymlで共有フォルダのパスなどを設定し環境を動かす基盤にする</td></tr><tr><th>phpやdbなどの設定ファイル</th><td class="rankinginfo">使う機能の設定ファイルは自分で用意する必要があります</td></tr><tr><th>Dockerfile</th><td class="rankinginfo">Dockerイメージをビルドする設定ファイル</td></tr><tr><th>docker-compose.yml</th><td class="rankinginfo">イメージからコンテナを一括で起動、管理するファイル</td></tr></tbody></table>

Docker Desktopインストール
--------------------

最初はDockerを使うためのアプリをインストールしましょう。  
このアプリを起動してDockerで仮想環境を起動します。

### 1.Dockerの公式サイトにアクセス

<https://www.docker.com/get-started/>

### 2. Download for Windowsをクリック

※ちょっと下のSee Docker Desktop for Windowsも同じです

### 3.Docker Desktop Installer.exeを実行しインストール

※結構時間かかりますが、いわれるがまま実行で大丈夫です。

<div class="boxparts caution">
  <div class="title"></div>
  
**DockerDesktop(Docker for Windows)とVirtualBoxについて**

VirtualBoxとDockerDesktopは共存できないみたいです。

もしこの問題がある場合は、現在非推奨のDocker tool boxであれば一応Dockerを使うことができます。

Docker tool boxはつかったことないので、今回は割愛します。
</div>

### 4.dockerHubアカウント作成

<https://hub.docker.com/>

※アカウント作成しないとdocker hub からイメージという主要ファイルをDL(pull)できなかったりするケースがあるそうです。

さいごに
----

これでDockerのインストールや登録などの事前準備は完了です。  
今後の流れとしては、大きく以下のようになります。

1. Docker Desktopインストール
2. ローカルに作業フォルダを作成
3. Dockerの設定ファイルを作成
4. Laravelをコマンドでインストール
5. dockerでコンテナ(機能)を起動+Laravel表示確認
6. LaravelのDB設定、確認
7. phpMyAdmin表示確認
8. 出来てる環境の確認


<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
今回はここでおわりです。<br>
Dockerはコンテナ？イメージ？Dockerfile?docker-compose.yml?などの役割が頭に入ってくると理解しやすくなりますが、  
そこも慣れなので、焦らずにやっていきましょう。
  </div>
</div>
