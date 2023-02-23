---
title: '【Docker】#6 LaravelのDB設定、確認' #記事のタイトル
date: '2022-10-22' #作成日
update_at: '2022-10-22' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'docker6' #url ファイル名と合わせてください
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

今回は第六回目です。  
前回Laravelの表示確認ができたので、次はLaravelのDB設定、確認を行います。

過去の手順は前回の記事を参考にしてみてください。

<div class="boxparts ref">
  <div class="title"></div>
  
[【Docker】#1 はじめに+Dockerとは+Docker Desktopインストール](https://minememo.work/docker1)  
[【Docker】#2 ローカル(ホスト)に作業フォルダを作成](https://minememo.work/docker2)  
[【Docker】#3 Dockerfile+docker-compose.yml+各設定ファイルの設置](https://minememo.work/docker3)  
[【Docker】#4 Laravelをコマンドでインストール](https://minememo.work/docker4)  
[【Docker】#5 dockerでコンテナ(機能)を起動+Laravel表示確認](https://minememo.work/docker5)
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

1.Laravelの設定ファイルでMySQLの設定値を変更する
-------------------------------

LaravelのTOPにある「.env」ファイルを開き以下の値を各変数に設定してください  
念のため例として1を書くと「DB\_HOST=mysql」という風になります。

### 1.DB\_HOST

mysql

※docker-compese.ymlのDBのサービス名。今回はmysqlになります。  
※dockerで立ち上げてるのでdocker-compese.ymlのDBのサービス名が自動でコンテナの内部IPに変換されてつながる仕組みです

### 2.DB\_DATABASE

database

※docker-compese.ymlのMYSQL\_DATABASEで設定した値です。

### 3.DB\_USERNAME

user

※docker-compese.ymlのMYSQL\_USERで設定した値です

### 4.DB\_PASSWORD

password

※docker-compese.ymlのMYSQL\_PASSWORDで設定した値です。

2.LaravelでDBに繋がるか確認
-------------------

Dockerのコマンドでコンテナの中に入り、その中でLaravelのコマンド実行し、DBが動いているか確認します。

### 1.コンテナ内のLaravelにコマンドではいる

```
docker exec -it php bash
```

※bashを起動します  
※ -it はインタラクティブモード(対話モード)で動かすオプションです

### 2.php artisan migrateが動くか確認

php artisan migrateはDB操作のLaravelのコマンドです。  
なので、これでエラーが出なければOKということになります。

#### 1.テーブル生成

```
php artisan migrate
```

#### 2. テーブル削除

```
php artisan migrate:rollback
```

さいごに
----

今回はこれで完了です。  
次回は7「phpMyAdmin表示確認」を行います。

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
今回はここでおわりです。 ようやく終わりが近づいてきましたね。  
作ってしまうときだけの手順なので、ぜひ最後まで頑張りましょう！  
一回作ってしまえば、運用が簡単にできます！

  </div>
</div>