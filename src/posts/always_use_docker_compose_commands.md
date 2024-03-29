---
title: '【Docker】よく使うコマンド' #記事のタイトル
date: '2022-10-26' #作成日
update_at: '2023-05-17' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'always_use_docker_compose_commands' #url ファイル名と合わせてください
hero_image: '../images/posts/docker_icon.jpg' #アイキャッチ画像
tags: ["Docker"] #タグ カテゴリとして使ってもOK
---

<div class="toc-title">目次</div>

```toc
```


はじめに
----

Dockerで個人的によく使うコマンドを目的別に記載します。  
基本的にDockerのコマンドではなく、docker compose のコマンドを利用しています。

最初は**「コンテナ起動～停止」**だけ使えればいいと思います。  
自分でDocker構築したり、その他情報がしりたくなったら他のコマンドが必要になる感じです。

<span style="color: #ff0000;">どのコマンドも cd で docker-compose.yml があるフォルダに移動して、行うことは共通になります。</span>

別記事でDockerで以下の環境を作成するチュートリアル記事も書いてますので、よかったら見てみてください。

- windows pc
- php 8.0.23
- composer 2.4.1
- nginx 1.22.0
- MySQL 8.0.30
- Laravel 6.20.44
- phpMyAdmin最新

<div class="boxparts ref">
  <div class="title"></div>
  
[【Docker】#1 はじめに+Dockerとは+Docker Desktopインストール](../docker1)  
[【Docker】#2 ローカル(ホスト)に作業フォルダを作成](../docker2)  
[【Docker】#3 Dockerfile+docker-compose.yml+各設定ファイルの設置](../docker3)  
[【Docker】#4 Laravelをコマンドでインストール](../docker4)  
[【Docker】#5 dockerでコンテナ(機能)を起動+Laravel表示確認](../docker5)  
[【Docker】#6 LaravelのDB設定、確認](../docker6)  
[【Docker】#7 phpMyAdmin表示確認](../docker7)  
[【Docker】#8 できてる環境の確認](../docker8)
</div>

## 用語


先によく出てくる用語だけ記載しておきます。  
作業中にわからなくなったら見てください。

<table class="cps-table03" style="height: 258px;"><tbody><tr style="height: 19px;"><th style="height: 19px; width: 189.703px;">ホストOS</th><td class="rankinginfo" style="height: 19px; width: 461.297px;">作業側のパソコン。ローカルともいう</td></tr><tr style="height: 19px;"><th style="height: 19px; width: 189.703px;">Dockerfile</th><td class="rankinginfo" style="height: 19px; width: 461.297px;">イメージをビルドで作るためのDockerの設定ファイル</td></tr><tr style="height: 36px;"><th style="height: 36px; width: 189.703px;">イメージ</th><td class="rankinginfo" style="height: 36px; width: 461.297px;">コンテナを作成するためにDockerfileからビルドで作成されたもの。  
Dockerhubで配布されている公式のイメージもある。</td></tr><tr style="height: 19px;"><th style="height: 19px; width: 189.703px;">ビルド</th><td class="rankinginfo" style="height: 19px; width: 461.297px;">Dockerfileからイメージを作成する事</td></tr><tr style="height: 55px;"><th style="height: 55px; width: 189.703px;">コンテナ</th><td class="rankinginfo" style="height: 55px; width: 461.297px;">イメージから作成された各機能のこと。  
サービスとも呼ばれる。  
このコンテナの集まりで環境が構築される</td></tr><tr style="height: 36px;"><th style="height: 36px; width: 189.703px;">docker-compose</th><td class="rankinginfo" style="height: 36px; width: 461.297px;">複数のコンテナを一気に作成したりできる一元管理機能。  
Dockerを使う場合実質必須になります。</td></tr><tr style="height: 74px;"><th style="height: 74px; width: 189.703px;">docker-compose.yml</th><td class="rankinginfo" style="height: 74px; width: 461.297px;">複数のコンテナを一気に作成、起動したりできるdocker-composeの一元管理ファイル。  
docker-composeをインストールしてdocker-compose.ymlを作成してdocker composeコマンドで実行して利用します。</td></tr></tbody></table>

コンテナ起動～停止
---------

普段一番使うコマンドです。

Dockerの設定ファイルが出来たらあとは環境を起動、停止して開発をすすめるという流れになるので、基本的にこれしか使わなくなります。

※コマンドじゃなくても、Docker Desktopアプリでもスタート、停止できます。

### 1.コンテナ起動

以下のコマンドを実行するとコンテナが起動します。

```
docker-compose up -d
```

※このコマンドはビルド( docker-compose build )+スタート( docker-compose start )を行っています。  
※ -d はバックグラウンド実行になり、コマンドプロンプトの占有を防ぐためのオプションです

<div class="boxparts ref">
  <div class="title"></div>
  
  [docker-compose up](https://docs.docker.jp/compose/reference/up.html)
</div>

### 2.コンテナ停止

稼働中のコンテナを停止します。

```
docker-compose stop
```

※コンテナの削除はしません。  <br>
※docker-compose start または docker-compose up で再起動できます<br>

ちなみに筆者的には<span style="color:red;">stopより**down(コンテナ、イメージ削除+停止)が良い**と思っています</span>。<br>

```
docker-compose down
```
理由は下の「注意」を参考にしてください。<br>


<div class="boxparts caution">
  <div class="title"></div>

  **■「docker-compose stop」ではなく「docker-compose down」を使う理由**<br>
<br>
  複数の環境を切り替えて使う場合、サービス名やポートの重複、キャッシュなどで、**うまく起動しなくなる場合があります**。<br>
  その場合は「docker system prune」で全体のお掃除をして解消も出来ますが、別環境をup(起動)するたびに全てインストールしなおしなので、初回起動時に**めちゃくちゃ時間がかかります**。<br>
<br>
  また、別環境使うときに以前使ってた、もしくは影響してる環境を覚えてない場合は、それを探してdownしないといけなくなります。<br>
  なので、筆者としては基本的にstopするときは常に「docker-compose down」を使ったほうが良いと思っています。<br>


</div>

<div class="boxparts ref">
  <div class="title"></div>
  
[docker-compose stop(公式)](https://docs.docker.jp/compose/reference/stop.html)<br>
[docker-compose down(ページ内アンカー)](#1%E4%BB%8A%E3%81%84%E3%82%8B%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA%E3%81%AB%E5%AF%BE%E3%81%97%E3%81%A6%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8%E3%82%B3%E3%83%B3%E3%83%86%E3%83%8A%E3%81%AE%E5%89%8A%E9%99%A4)<br>
</div>

起動しているコンテナの一覧を確認
----------------

今起動しているコンテナを確認したい場合は以下のコマンドで確認できます。

```
docker-compose ps

```

※コマンドじゃなくても、Docker Desktopアプリでも確認できます。  
※起動していないコンテナも確認したい場合は -a オプションを使います。

<div class="boxparts ref">
  <div class="title"></div>
  
[docker-compose ps](https://docs.docker.jp/compose/reference/ps.html)
</div>

コンテナ内でコマンドを実行したい
----------------

```
docker-compose exec サービス名 実行したいコマンド
```

※このコマンドは docker exec と同じです  
※ -it オプションでコンテナの中の環境に入って、対話モードでコマンドできるようにできます。抜けるときはexitでOKです。

例）コンテナ内で bash (コマンドプロンプトの一種)を起動して、MySQLに接続するコマンド

```
$ docker-compose exec DBのサービス名 bash
[db]:/$ mysql -u ユーザ名 -p
// パスワードを求められるので入力

//データベース指定
[db] mysql> use database;

//テーブル表示
[db] mysql> show tables;
```

<div class="boxparts ref">
  <div class="title"></div>
  
  [docker-compose exec](https://docs.docker.jp/compose/reference/exec.html)
</div>


イメージからコンテナ(環境)を作り直したい
---------------------

### 1.今いるディレクトリに対してイメージ、コンテナの削除

Dockerの設定ファイルを書き直したり、イメージをつくりなおして再度コンテナを起動したい場合は、よく以下のコマンドを使い削除します。

  ```
  docker-compose down
  ↓
  docker-compose up -d --build
  ```
  ※ --build：コンテナを開始前にイメージを構築する<br>


<div class="boxparts ref">
  <div class="title"></div>
  
[docker-compose down](https://docs.docker.jp/compose/reference/down.html)

</div>

<div class="boxparts ref">
  <div class="title"></div>

  キャッシュ等でうまく更新できない場合は「docker-compose down --rmi all --remove-orphans」で綺麗にしてから「docker-compose up -d」をすると解決すると思います。<br>
  
```
docker-compose down --rmi all --remove-orphans
```

このコマンドを使うことで、Docker内のキャッシュなどの影響で起こるよくわからないエラーなども回避しつつ、再構築ができます。

要約すると以下のことを行います。  
<span style="color: #ff0000;">今いるディレクトリに対してコンテナ停止、削除、ネットワーク、イメージ、未定義のコンテナを削除してきれいにする</span>

各オプションなどについて↓

- docker-compose down は docker-compose up で作成したコンテナとネットワークを停止、削除
- –rmi all オプションで全イメージを削除
- –remove-orphans オプションでComposeファイルで定義していないサービス用のコンテナも削除

</div>

<div class="boxparts ref">
  <div class="title"></div>

**「docker system prune」との違いについて**<br>
<br>
このコマンドはディレクトリ関係なく、使われてないイメージ、コンテナ、ネットワークを削除（prune）するコマンドです。<br>
<br>
Docker全体に対するお掃除という感じです。

</div>



<div class="boxparts point">
  <div class="title"></div>
  
**■ボリュームについて**  
※いつか別記事移行するかも…

Dockerはメモリ上で動くため、コンテナを削除した時点で作業した内容が消えてしまいます。  
そのためボリュームという機能をつかってファイルやDBの情報を永続化し消えないようにします。

主に以下のような用語があります。それぞれ利用します。

**・バインドマウント**  
ローカルのファイルをコンテナ側を同期(マウント)します(=コンテナに変更を自動反映)  <br>
※作業ファイルはローカルに残ります<br>
<span style="color: #ff0000;">削除タイミングは自分でフォルダを消すときになります。</span>

**・名前付きボリューム**  
**DBのデータなどを残したいときに使います。**  
Docker内で保持されるので、一見するとどこに行ったかわからなくなりますが、Docker Desktop アプリや docker volume ls コマンドで確認できます。

<span style="color: #ff0000;">削除タイミングは docker-compose down や docker system prune で**ボリュームオプションを指定したタイミング**です。</span>

※匿名ボリュームというのもありますが、基本的に名前付きがつかわれます。

ボリュームの実際の書き方は以下のdocker-compose.ymlのコメントを参考にしてください。  
[docker-compose.ymlを作成](../docker3#1docker-composeyml)

ボリュームはしれっとたまっていくので定期的にお掃除する必要があります。  
作業データがいらなくなったときに、以下どちらを使い用途に応じて削除するといいと思います。

1\.

今いるディレクトリに対してコンテナ停止、削除、ネットワーク、イメージ、ボリューム、未定義のコンテナを削除する

```
docker-compose down --rmi all --volumes --remove-orphans
```

2\.  
ディレクトリ関係なく、起動していない、ボリューム、イメージ、コンテナ、ネットワークを削除（prune）する

```
docker system prune --volumes
または
docker volume prune
```
</div>


### 2.コンテナ再起動

```
docker-compose up -d
```

【おまけ】その他のコマンド
-------------

必要になったときに見てください。  
基本は上記の内容で事足りると思います。

### コンテナ停止

```
docker-compose stop
```

### コンテナ削除

```
docker-compose rm
```

※起動しているコンテナは削除できません

### コンテナ再起動

```
docker-compose restart
```

### 今あるイメージを確認

```
docker images
```

※docker compose ではなく docker のコマンド

### 対象のイメージを削除

```
docker rmi イメージ名 or イメージID
```

※docker compose ではなく docker のコマンド  
※コンテナがあるイメージは削除できません  
※強制削除もあるが今回はなし

### docker-compose.ymlで管理されているサービス1つを指定してコマンドを実行する

```
docker-compose run サービス名 コマンド
```

※ビルド前でも実行可能なコマンド。一時的にコンテナ作成してコマンドを実行できる

例）  
docker-composeのvolumeでフレームワークのフォルダが事前に必要な場合に  
先にフレームワークのインストールだけしておく際などに使える。  
フォルダが先にないとエラーが出たりする

この記事でLaravelをインストールするときに使ってます。  
[2.Laravelのインストールコマンドを実行](../docker4#2Laravel)

### Docker コンテナの詳細情報確認

```
docker inspect コンテナ指定
```

※docker compose ではなく docker のコマンド  
※よくみるのは  
mount ：どこのvolumeをマウントしてるか  
config：だれがもってるかとか、環境変数とか、Cmdとか  
network setting：コンテナのUPAddress(ホストからつなげるIP)の確認もできる  
※IPは docker-compose ps のコンテナ一覧でみることが多いです

### イメージの履歴を確認

```
docker history イメージ名:タグ
```

※docker compose ではなく docker のコマンド  
※他人が作ったイメージの更新履歴を知りたいときに使う

### Dockerコンテナのログを出力

```
docker logs コンテナ指定
```

※docker compose ではなく docker のコマンド  
※アクセスログ、不明な停止の原因を確認した時に使う  
※リアルタイム監視でログをだすにはオプション -f を使います。  
作業中をリアルタイムで追えるようになります

### Docker 全体のお掃除

```
docker system prune
```

※docker compose ではなく docker のコマンド

ディレクトリ関係なく、イメージ、コンテナ、ネットワークを削除（prune）する  
ボリュームはデフォルトでは削除されないため、–volumes フラグを使う必要があります。  
※使用中のものは消されないのでstopしないといけない  
※docker compose ではなく docker のコマンド

※オプション -a  
既存のコンテナ～使われていないイメージすべてを削除する  
なぜかイメージが消えない時はこれ。全部消えるので注意

<div class="boxparts point">
  <div class="title"></div>
  
[使用していない Docker オブジェクトの削除（prune）](https://docs.docker.jp/config/pruning.html)
</div>

さいごに
----

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
正直自分のためのメモでもある！おまけは覚えなくていいし、困ったら見てください。<br>
ちなみにdockerコマンドとdocker-composeコマンドは同じことができるコマンドがあったりするので、好きな方を使うでOKです。
  </div>
</div>