---
title: '【Docker】#4 Laravelをコマンドでインストール' #記事のタイトル
date: '2022-10-19' #作成日
update_at: '2022-10-19' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'docker4' #url ファイル名と合わせてください
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

今回は第四回目です。  
Laravel 6 をコマンドでインストールします。

Dockerfileや各種設定ファイル、そもそもDockerのインストールが終わってない方は前回の記事を参考にしてみてください。

<div class="boxparts ref">
  <div class="title"></div>
  
[【Docker】#1 はじめに+Dockerとは+Docker Desktopインストール](https://minememo.work/docker1)  
[【Docker】#2 ローカル(ホスト)に作業フォルダを作成](https://minememo.work/docker2)  
[【Docker】#3 Dockerfile+docker-compose.yml+各設定ファイルの設置](https://minememo.work/docker3)
</div>

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

## 用語

先によく出てくる用語だけ記載しておきます。  
作業中にわからなくなったら見てください。

<table class="cps-table03" style="height: 258px;"><tbody><tr style="height: 19px;"><th style="height: 19px; width: 189.703px;">ホストOS</th><td class="rankinginfo" style="height: 19px; width: 461.297px;">作業側のパソコン。ローカルともいう</td></tr><tr style="height: 19px;"><th style="height: 19px; width: 189.703px;">Dockerfile</th><td class="rankinginfo" style="height: 19px; width: 461.297px;">イメージをビルドで作るためのDockerの設定ファイル</td></tr><tr style="height: 36px;"><th style="height: 36px; width: 189.703px;">イメージ</th><td class="rankinginfo" style="height: 36px; width: 461.297px;">コンテナを作成するためにDockerfileからビルドで作成されたもの。  
Dockerhubで配布されている公式のイメージもある。</td></tr><tr style="height: 19px;"><th style="height: 19px; width: 189.703px;">ビルド</th><td class="rankinginfo" style="height: 19px; width: 461.297px;">Dockerfileからイメージを作成する事</td></tr><tr style="height: 55px;"><th style="height: 55px; width: 189.703px;">コンテナ</th><td class="rankinginfo" style="height: 55px; width: 461.297px;">イメージから作成された各機能のこと。  
サービスとも呼ばれる。  
このコンテナの集まりで環境が構築される</td></tr><tr style="height: 36px;"><th style="height: 36px; width: 189.703px;">docker-compose</th><td class="rankinginfo" style="height: 36px; width: 461.297px;">複数のコンテナを一気に作成したりできる一元管理機能。  
Dockerを使う場合実質必須になります。</td></tr><tr style="height: 74px;"><th style="height: 74px; width: 189.703px;">docker-compose.yml</th><td class="rankinginfo" style="height: 74px; width: 461.297px;">複数のコンテナを一気に作成、起動したりできるdocker-composeの一元管理ファイル。  
docker-composeをインストールしてdocker-compose.ymlを作成してdocker composeコマンドで実行して利用します。</td></tr></tbody></table>

現在の作業フォルダ
---------

前回までに作成した以下のフォルダが作業ディレクトリになります。  
参考までに記載しておきます。

```
nginx_mysql_laravel/	　　　　TOPフォルダ。名前はコンテナ起動前(環境構築前)なら自由に変更可能
├── laravel		　　　　Laravelのソースコードが置かれるフォルダ=実作業フォルダ
├── docker		　　　　dockerの設定ファイルや環境設定ファイルを置くフォルダ。
│ 　　　　　　　　　　　　　　　　ここの配下のフォルダ名を変える場合、
│ 　　　　　　　　　　　　　　　　Dockerfileとかdocker-compose.ymlでパスの修正が必要です
│   ├── php		  　　　phpコンテナ(phpの環境構築設定ファイル)
│   │   ├── Dockerfile		phpのDockerfile
│   │   └── php.ini		php設定ファイル環境立ち上げるときにコンテナにコピーされます
│   ├── mysql 		　　　　MySQLコンテナ(MySQLの環境構築設定ファイル)
│   │   ├── Dockerfile		MySQLのDockerfile
│   │   └── my.conf		mysql 設定ファイル環境立ち上げるときにコンテナにコピーされます
│   └── nginx		　　　　nginxコンテナ(nginxの環境構築設定ファイル)
│   │   ├── Dockerfile		nginxのDockerfile
│   │   └── default.conf	nginx設定ファイル環境立ち上げるときにコンテナにコピーされます
│   └── phpmyadmin		phpMyAdminのデータが永続化される場所
└──  docker-compose.yml		全コンテナの一括管理をするDockerの設定ファイル
```

Laravelをコマンドでインストール
-------------------

### 1.作業ディレクトリに移動

docker-compose.ymlがあるフォルダにコマンドで移動します。

```
cd ローカルフォルダのパス
```

### 2.Laravelのインストールコマンドを実行

LaravelのComposerのcreate-projectコマンドを使いインストールします。

なお、dockerの機能を使って一時的にcomposerが使える状態にしてるので、docker-compose runというコマンドも使っています。  
※そのため先にDockerの設定ファイルは作っておく必要があります。

ちょっと時間かかるのでしばらく待ち、Application key set successfully.が表示されたらインストール完了です。

```
docker-compose run php composer create-project --prefer-dist laravel/laravel . "6.*"
```

<div class="boxparts memo">
  <div class="title"></div>
  
本当はDockerfileやdocker-compese.ymlで一括で入れたい気もするのですが、ソースがコンテナにしかないとかlocalhostからアクセスできないなどの事象がおこるので、別に入れるようにしています。

インストール先はdocker-compose.ymlのvolumesで設定されたパスになります。  
今回はサービス名phpのvolumesの./laravel/:/appになります。  
よくわからない時はdocker-compose.ymlを見てみてください。

※ローカル：./laravel 配下  
※コンテナ：/app 配下

流れとしてはコンテナのapp配下にインストールされたLaravelのファイルがローカルの./laravel 配下にバインド(同期みたいなこと)されるということになります。

</div>


<div class="boxparts caution">
  <div class="title"></div>
  
**■エラーについて**

1.Project directory “フォルダ名” is not empty.  
Laravelインストール先のフォルダ空じゃないのときに出るエラーです。

2.failed to solve: rpc error: code = Unknown desc  
Dockerfileなどのインストールにかかわるパスの指定が間違っていないかを確認してください。
</div>

さいごに
----

今回はこれで完了です。  
次回は5「dockerでコンテナ(機能)を起動+Laravel表示確認」を行います。

全体の流れとしては、大きく以下のようになっています。

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
今回はここでおわりです。<br>Dockerはコンテナ？イメージ？Dockerfile?docker-compose.yml?などの役割が頭に入ってくると理解しやすくなりますが、  
そこも慣れなので、焦らずにやっていきましょう。
  </div>
</div>
