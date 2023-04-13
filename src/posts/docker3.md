---
title: '【Docker】#3 Dockerfile+docker-compose.yml+各設定ファイルの設置' #記事のタイトル
date: '2022-10-13' #作成日
update_at: '2023-04-13' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'docker3' #url ファイル名と合わせてください
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

今回は第三回目です。  
Dockerで環境構築する際に必要な設定ファイルを作成します。

今回は記事的に長くなると思います。  
読んで理解できる方は必要なものだけ見てもらってもOKです。

Dockerのインストールやフォルダ作成が終わってない方は、前回の記事を参考にしてみてください。

<div class="boxparts ref">
  <div class="title"></div>
  
[【Docker】#1 はじめに+Dockerとは+Docker Desktopインストール](../docker1)  
[【Docker】#2 ローカル(ホスト)に作業フォルダを作成](../docker2)
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

各機能のDockerfile+設定ファイルを作成
------------------------

### 1.前準備

前回docker#2で作成した。  
以下のフォルダをベースに作成していきます。  
未作成の方は前回の記事を参照して作成してみてください。

前回フォルダを作成したので、今回は★のファイルを作成+設置を行います。

Dockerfileは拡張なしのファイル名「Dockerfile」でOKです。

設定ファイル内のコメントが基本説明になっているので、分からない場合は参考にしてください。  
私自身が分かっていない部分もありますが、よろしくお願いします。

```
nginx_mysql_laravel/	　　　　TOPフォルダ。名前はコンテナ起動前(環境構築前)なら自由に変更可能
├── laravel 		　　　　Laravelのソースコードが置かれるフォルダ=実作業フォルダ
├── docker		　　　　dockerの設定ファイルや環境設定ファイルを置くフォルダ。
│ 　　　　　　　　　　　　　　　　ここの配下のフォルダ名を変える場合、
│ 　　　　　　　　　　　　　　　　Dockerfileとかdocker-compose.ymlでパスの修正が必要です
│   ├── php		  　　　phpコンテナ(phpの環境構築設定ファイル)
│   │   ├── Dockerfile★		phpのDockerfile
│   │   └── php.ini★		php設定ファイル環境立ち上げるときにコンテナにコピーされます
│   ├── mysql 		MySQLコンテナ(MySQLの環境構築設定ファイル)
│   │   ├── Dockerfile★		MySQLのDockerfile
│   │   └── my.conf★		mysql 設定ファイル環境立ち上げるときにコンテナにコピーされます
│   └── nginx		　　　　nginxコンテナ(nginxの環境構築設定ファイル)
│   │   ├── Dockerfile★		nginxのDockerfile
│   │   └── default.conf★	nginx設定ファイル環境立ち上げるときにコンテナにコピーされます
│   └── phpmyadmin		phpMyAdminのデータが永続化される場所
└──  docker-compose.yml★		全コンテナの一括管理をするDockerの設定ファイル
```

### 2.nginxの設定ファイル

docker\\nginx配下に以下2ファイルを設置します。

#### 1.Dockerfile

```
#nginxのイメージを作成する自作ファイル

#Docker Hub公式からPHPのイメージファイルを使用します。
#nginxは1.18, 1.20などの偶数バージョンが安定バージョンであり、安定バージョンの使用を推奨されています。

#※Alpineでのbashについて
#　Alpineをベースとすると bash は使えず、 ash や sh は使えるようです。

#イメージ名:タグ(version指定)
FROM nginx:1.22-alpine

#サーバー内の環境変数
ENV TZ Asia/Tokyo

#nginxの設定ファイル（default.conf）をDockerの仮想環境内のコンテナ内にコピーします。
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
```

#### 2.default.conf

```
#nginx設定ファイル
#あまり詳しくないので以下の記事から引用させていただきコメント追加しています。
#https://qiita.com/hinako_n/items/f15646ea548bcdc8ac6c

server {
    listen 80;
    server_name example.com;

    #ドキュメントルート
    #localhost:8081でアクセスした場合に表示されるディレクトリ
    #dockerコンテナのルートに書き換え
    root /app/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        #FastCGIサーバーのアドレス
        #FastCGI：Webサーバ上で動くプログラムを一度起動したらしばらく待機させることによって、プログラムの開始と終了にかかる手間を減らし、動きを速くしたりWebサーバの負荷を軽減することができる仕組み
        #dockerコンテナのphpのポートに書き換え
        #コンテナ起動後にdocker psで確認したphpのサービスのPORTSが9000/tcpだったので9000になっているっぽい
        #通常は127.0.0.1:9000に設定されるが、docker-composeはサービス名(今回はphp)にipが自動で振られるのでサービス名にする
        #参考：https://www.membersedge.co.jp/blog/laravel-development-environment-with-docker-compose/

        fastcgi_pass php:9000;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### 3.phpの設定ファイル

docker\\php配下に以下2ファイルを設置します。

#### 1.Dockerfile

```
#PHPのイメージを作成する自作ファイル

#Docker Hub公式からPHPのイメージファイルを使用する
#Laravel 6はphp8.1対応してないみたいなので8.0で。
#この8.0の部分を変更するだけでバージョン変更できるので簡単！

#イメージ名:タグ(version指定)
# FROM php:8.1-fpm 
FROM php:8.0-fpm

#サーバー内の環境変数
ENV TZ Asia/Tokyo

#RUN:コンテナビルド時に実行するコマンド
#インストール可能なパッケージの「一覧」を更新
RUN apt-get update && \
    #パッケージをインストール(ここでコンテナにnpmやgitなども入ります)
    #インストール先の確認はdocker-compose exec php dpkg -L パッケージ名でできる
    #gitの場合 docker-compose exec php dpkg -L git
    #docker-compose execはdockerのコンテナ内でコマンドを実行するコマンドです。
	apt-get install -y git unzip libzip-dev libicu-dev libonig-dev nodejs npm && \
    #PHPの拡張ライブラリをインストール
	docker-php-ext-install intl pdo_mysql zip bcmath

#php.ini(PHPの設定ファイル)をDockerの仮想環境のコンテナにコピー
#php.iniは自分で用意する必要がある
COPY ./docker/php/php.ini /usr/local/etc/php/php.ini

#Laravelを使うためComposerをインストール
#本当はRUNでコマンドを実行しComposerをインストールしてもいいが、マルチステージビルドという方法でイメージの軽量化を図るための書き方です。
#この方法でやるのが最近見た感じ多そうでした。
COPY --from=composer:2.4.1 /usr/bin/composer /usr/bin/composer

#コンテナ起動中にdocker-compose exec コンテナ名 bash でコンテナ内でbashを動かせるのだが、その際のカレントディレクトリ(初期位置)になる
WORKDIR /app
```

#### 2.php.ini

```
#一般的な設定について、あまり詳しくないので以下から引用させてもらっています。
#https://qiita.com/hinako_n/items/f15646ea548bcdc8ac6c

zend.exception_ignore_args = off
expose_php = on
max_execution_time = 30
max_input_vars = 1000
upload_max_filesize = 64M
post_max_size = 128M
memory_limit = 256M
error_reporting = E_ALL
display_errors = on
display_startup_errors = on
log_errors = on
error_log = /var/log/php/php-error.log
default_charset = UTF-8

[Date]
date.timezone = Asia/Tokyo

[mysqlnd]
mysqlnd.collect_memory_statistics = on

[Assertion]
zend.assertions = 1

[mbstring]
mbstring.language = Japanese
```

### 4.mysqlの設定ファイル

#### 1.Dockerfile

```
#mysqlのイメージを作成する自作ファイル

#Docker Hub公式からイメージファイルを使用する
#イメージ名:タグ(version指定)
FROM mysql:8.0

#MySQLの設定ファイル（my.conf）Docker内の仮想環境のコンテナ内にコピー
COPY ./docker/mysql/my.conf /etc/my.conf
```

#### 2.my.conf

```
#あまり詳しくないので以下から引用させていただいてます。
#https://qiita.com/hinako_n/items/f15646ea548bcdc8ac6c

[mysqld]
# character
character_set_server = utf8mb4
collation_server = utf8mb4_0900_ai_ci

# timezone
default-time-zone = SYSTEM
log_timestamps = SYSTEM

# Error Log
log-error = mysql-error.log

# Slow Query Log
slow_query_log = 1
slow_query_log_file = mysql-slow.log
long_query_time = 1.0
log_queries_not_using_indexes = 0

# General Log
general_log = 1
general_log_file = mysql-general.log

[mysql]
default-character-set = utf8mb4

[client]
default-character-set = utf8mb4
```

### 5.Docker Composeの設定ファイルを作成

nginx\_mysql\_laravel フォルダ直下にdocker-compose.ymlを作成し設置してください。

docker-compose.ymlは上記1-4で作成したDockerfile+phpMyAdminを一括で起動、管理するために必要なファイルになります。

#### 1.docker-compose.ymlを作成

```
#参考
#https://qiita.com/hinako_n/items/f15646ea548bcdc8ac6c
#https://qiita.com/ucan-lab/items/56c9dc3cf2e6762672f4

#Docker Composeのバージョン
#https://docs.docker.jp/compose/compose-file/compose-versioning.html#compose-file-versioning
#※Compose 最新バージョンが3.9みたいなので、それで記載してます。
#※いまいち最新の推奨が何なのかはわかってないです。すみません。
version: "3.9"

#使うサービス(機能)を書いていく
services:
  #サービス名(任意で命名)
  #docker/nginx/default.confのfastcgi_passはサービス名：9000となっているので、こことあわせないといけない
  php:
    #自作のDockerfileからイメージ生成するための記載
    build:
      #ビルドを実行する場所
      context: .
      #Dockerfileまでのdocker-compose.ymlから見た相対パス
      dockerfile: ./docker/php/Dockerfile
    # コンテナを指定しやすくするための名前指定(任意)
    container_name: php
    #データの永続化(Dockerを切ってもデータが残るようにする)
    #Dockerはメモリ上で動くので、永続化しないと作業データが残らなくなります。
    volumes:
      #ホスト側の ./laravel/をコンテナ側の /app にマウントし永続化する
      #コンテナにappフォルダが、ローカルにlaravelフォルダが自動で作成され共有状態になる
      #※＝ローカルにデータが残り共有されるのでデータの永続化になります。
      - ./laravel/:/app

  #サービス名  
  nginx:
    build:
      context: .
      dockerfile: ./docker/nginx/Dockerfile
    # コンテナを指定しやすくするための名前指定(任意)
    container_name: nx
    #http://localhost:ポート番号でアクセスするためのポートフォワーディング設定
    #ローカルのポート:コンテナのポートと記載する
    #今回は8081で80(nginxのデフォルトのポート)にポートフォワーディングしてる
    ports:
      - 8081:80
    #サービスの起動順序を制御
    #php → web の順に起動するように指定
    #この辺わかってないですが、無くても動くみたいです。
    depends_on:
      - php
    volumes:
      - ./laravel/:/app

  #サービス名  
  #phpmyadminがある場合、下段の設定値のPMA_HOSTに設定されてます
  mysql:
    build:
      context: .
      dockerfile: ./docker/mysql/Dockerfile
    # コンテナを指定しやすくするための名前指定(任意)
    container_name: mysql
    #http://localhost:ポート番号でアクセスするためのポートフォワーディング設定
    #ローカルのポート:コンテナのポートと記載する
    ports:
      - 3306:3306
    #環境変数の設定。この内容をLaravelの設定ファイルにも書きます。
    #実際のプロジェクト管理では、環境変数は .env に書いて .gitignore にするなどして、重要な情報が公開されないようにします。
    environment:
      MYSQL_DATABASE: database
      MYSQL_USER: user
      MYSQL_PASSWORD: password
      MYSQL_ROOT_PASSWORD: password
      TZ: 'Asia/Tokyo'
    volumes:
      #名前付きボリュームでDBのデータを永続化
      #Docker内で保持される、一見するとどこに行ったかわからなくなる
      #確認方法はdocker volume ls、docker volume inspectのMountpointでコンテナ内のパスや名前が確認できる
      #名前付きボリュームは--volumeオプションで指定して消さないといけない。
      #しれっとたまるのでデスクトップアプリやdocker volume lsで確認するといい

      #重くなったら以下で整理
      #docker volume prune:未使用のものをディレクトリ関係なく全領域からもろとも削除
      #docker-compose down --volumes:今いるディレクトリに対してコンテナ停止、削除、ボリュームを削除する
      - mysql-volume:/var/lib/mysql

  # phpMyadminのコンテナ作成
  phpmyadmin:
    #nginxがあるのでfpm版でと思ったけど、ApacheWebサーバーが含まれてるphpmyadmin:latestにしてます。
    #※別のWebサーバーが既にある場合phpmyadmin:fpmって書いてあったけど、上手く動かせませんでした
    
    #よくphpmyadmin/phpmyadminが使われてるがこれはphpmyadminがdockerHubの公式になるまえのイメージなので、今後は公式のイメージが推奨されてる
    #https://hub.docker.com/_/phpmyadmin
    image: phpmyadmin:latest

    #サービスの起動順序を制御
    #mysql → phpmyadmin の順に起動するように指定
    #この辺わかってないですが、無くても動くみたいです。
    depends_on:
      - mysql
    container_name: phpmyadmin
    ports:
      - "8080:80"
    #phpMyAdmin設定値
    #https://hub.docker.com/_/phpmyadmin
    environment:
      #1に設定すると、任意のサーバーへの接続が許可される
      - PMA_ARBITRARY=1
      #サーバーのホスト名かIPアドレスをサービス名で指定
      #本ファイルの場合mysqlになる
      - PMA_HOSTS=mysql
      #サーバーに接続するユーザー名
      - PMA_USER=root
      #SQLサーバーに接続するユーザーのパスワード
      - PMA_PASSWORD=password
    volumes:
      - ./docker/phpmyadmin/sessions:/sessions
#名前付きボリュームの名前(一番下にかく)
volumes:
  mysql-volume:
```

<div class="boxparts ref">
  <div class="title"></div>
  

**Docker Composeで一括管理、起動する理由**

Dockerfileは一つのコンテナのイメージ情報しか持っていません。

そのため複数コンテナで構築される仮想環境の場合は、docker-compose.ymlで一括管理して起動することで、起動する手間や一個一個起動した際の予期せぬエラーを防ぐことができます。

例)  
Dockerfileをコンテナにする場合は以下2つのコマンドを使います。

1.docker build(イメージ化)  
2.docker run(イメージをコンテナ化)

今回はMySQL、php、nginx、phpMyAdminの四つのコンテナで構成されてるので、docker-compose.ymlを使わない場合、毎回起動時にこのセットを4回しないといけなくなります。
</div>

<div class="boxparts ref">
  <div class="title"></div>

  **■複数環境を立ち上げるときのportsの指定について**<br>

  mysqlなど複数立ち上げるときに port を分ける必要があります。<br>
  <br>
  単独で使うときは以下の短い構文でOK。<br>
  
```command:title=単独はこれでOK
    ports:
      - 3306:3306
```

  <br>複数環境を立ち上げるときは短い構文ではうまくいきません。

```command:title=複数の場合はNG
ports:
  - 3306:13306
```

  <br>複数環境の場合は以下のように長い構文で分けて書くとうまくいきます。

```command:title=複数環境立ち上げてポートを分ける場合はこれでOK
ports:
  - target: 3306 #ローカル側。Laravel の .env の DB_PORT にはこれを書く
    published: 13306 #コンテナ側
    protocol: tcp
    mode: host
```
    
  <br>参考サイト<br>
  [Compose ファイル version 3 リファレンス](https://docs.docker.jp/compose/compose-file/compose-file-v3.html#ports)<br>

</div>

さいごに
----

今回はこれで完了です。  
お疲れ様でした。

次回は4「Laravelをコマンドでインストール」を行います。  
その後5で実際にコンテナを起動していきます。

Dockerシリーズの全体の流れとしては、大きく以下のようになっています。

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
今回はここでおわりです。 Dockerはコンテナ？イメージ？Dockerfile?docker-compose.yml?などの役割が頭に入ってくると理解しやすくなりますが、  
そこも慣れなので、焦らずにやっていきましょう。
  </div>
</div>
