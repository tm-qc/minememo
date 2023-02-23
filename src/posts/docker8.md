---
title: '【Docker】#8 出来てる環境の確認' #記事のタイトル
date: '2022-10-25' #作成日
update_at: '2022-10-25' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'docker8' #url ファイル名と合わせてください
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

今回は第八回目です。  
前回はphpMyAdmin表示確認を行いました。

これだけの環境を構築できるものを作成したと思うと、自分よくやった！ってなりますね。  
しかもシェアしやすい！！  
確認するものは多いですが、やることは楽なので、コマンドになれるついでに確認してみてください。

過去の手順は前回の記事を参考にしてみてください。

<div class="boxparts ref">
  <div class="title"></div>
  
[【Docker】#1 はじめに+Dockerとは+Docker Desktopインストール](https://minememo.work/docker1)  
[【Docker】#2 ローカル(ホスト)に作業フォルダを作成](https://minememo.work/docker2)  
[【Docker】#3 Dockerfile+docker-compose.yml+各設定ファイルの設置](https://minememo.work/docker3)  
[【Docker】#4 Laravelをコマンドでインストール](https://minememo.work/docker4)  
[【Docker】#5 dockerでコンテナ(機能)を起動+Laravel表示確認](https://minememo.work/docker5)  
[【Docker】#6 LaravelのDB設定、確認](https://minememo.work/docker6)  
[【Docker】#7 phpMyAdmin表示確認](https://minememo.work/docker7)

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

1.コンテナを起動し環境を立ち上げる
------------------

各コマンドを実行してバージョンなどを確認していきます。  
作業前に、Docker Desktopアプリを起動し、「docker-compose up -d」でコンテナを起動し環境を立ち上げておいてください。

<div class="boxparts caution">
  <div class="title"></div>
分からない場合は前回の記事を参考にしてください。

[docker-compose.ymlからコンテナを起動](https://minememo.work/docker5#1docker-composeyml)

</div>

2.phpのバージョン確認
-------------

今回はPHP 8.0.23になっていると思います。  
以下を実行し、インストールしたバージョンが返ってきたらOKです。

```
docker-compose exec php php -v
```

<div class="boxparts point">
  <div class="title"></div>
  
**docker-compose exec <span style="color: #0000ff;">php</span> <span style="color: #ff6600;">php -v</span>について**

docker-compose execはDockerの仮想環境に対してコマンドを実行するコマンドです。

「docker-compose exec <span style="color: #0000ff;">サービス名</span> <span style="color: #ff6600;">実行したいコマンド</span>」

という風に記載して使います。  
サービス名は docker-compese.yml に記載されているサービス名です。
</div>


3.Composerのバージョン確認
------------------

今回はComposer version 2.4.1になっていると思います。  
以下を実行し、インストールしたバージョンが返ってきたらOKです。

```
docker-compose exec php composer -v
```

4.gitのバージョン確認
-------------

特にバージョン指定はしてないので、以下を実行し、バージョンが返ってきたらOKです。  
この記事を作成しているときは git version 2.30.2 が返ってきてました。

```
docker-compose exec php git --version
```

5.インストール済の拡張機能の一覧
-----------------

docker\\php\\Dockerfile の RUN で install しているパッケージ名が表示されます。

沢山表示されるので、完全には把握してませんが、install部分に記載されているパッケージ名があればいいかな。くらいで確認しています。

```
docker-compose exec php php -m
```

6.php.iniがコピー出来ているか確認
---------------------

phpの設定ファイルがコピーできているか確認します。  
ローカルからコピーされた、コンテナにあるphp.iniの内容が表示されればOKです。

### 1.phpのコンテナ内でbashを起動

phpのコンテナ内でコマンドを実行できるようにします。

```
docker-compose exec php bash
```

### 2.catコマンドでコンテナ内のphp.iniを表示

```
cat /usr/local/etc/php/php.ini
```

7.nginxのバージョン確認
---------------

今回はnginx/1.22.0になっていると思います。  
以下を実行し、インストールしたバージョンが返ってきたらOKです。

```
docker-compose exec nginx nginx -v
```

8.mysqlのバージョンを確認
----------------

今回はmysql Ver 8.0.30になっていると思います。  
以下を実行し、インストールしたバージョンが返ってきたらOKです。

```
docker compose exec mysql mysql -V
```

9.Laravelのバージョン確認
-----------------

今回はLaravel Framework 6.20.44(PHP 8.0.23 に対する Laravel6 の最新)になっていると思います。  
以下を実行し、インストールしたバージョンが返ってきたらOKです。

```
docker compose exec php php artisan -v
```

10.phpmyadminのバージョン確認
---------------------

phpMyAdminのTOPページ(HOME)でバージョン情報を確認できます。  
アクセス方法は「[【Docker】#7 phpMyAdmin表示確認](https://minememo.work/docker7)」を参考にしてください。

latestなので、最新が入るようになっています。

11.nodejsのバージョンを確認
------------------

docker\\php\\Dockerfile の apt-get installでインストールしてますが、バージョン指定していません。  
安定版の最新が入ると思いますが、詳細は個々で確認をお願いします。

記事作成時点では 7.5.2 になっていました。

```
docker compose exec php node -v
```

12.npmのバージョンを確認
---------------

docker\\php\\Dockerfile の apt-get installでインストールしてますが、バージョン指定していません。  
安定版の最新が入ると思いますが、詳細は個々で確認をお願いします。

記事作成時点では v12.22.12 になっていました。

```
docker compose exec php npm -v
```

さいごに
----

本シリーズはこれで完了です。  
本当にお疲れ様でした。

私自身もまだすべてを把握しているわけではないですが、特に問題なく使えています。  
いきなりすべて把握するのは難しいので、分かる範囲で動かして検証しながら、知識を深めるようにしています。

後日、よく使うDockerコマンドの記事を書けたらいいなと思っています。  
皆さまがうまくいくことを祈っています。


<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
ローカル環境つくって、シェアするだけでもこんなに大変なので、本当エンジニアの労働環境、待遇が日本全体で見直されますように…！( ;∀;)<br><br>
エンジニア問わず技術職の待遇を見直さないと日本は終わると思います・・・  
特にアニメやゲーム！エンタメ大事です( ;∀;)
  </div>
</div>
