---
title: '【Docker】#7 phpMyAdmin表示確認' #記事のタイトル
date: '2022-10-24' #作成日
update_at: '2022-10-24' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'docker7' #url ファイル名と合わせてください
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

今回は第七回目です。  
前回はLaravelのDB設定、動作確認を行いました。

過去の手順は前回の記事を参考にしてみてください。

<div class="boxparts ref">
  <div class="title"></div>
  
[【Docker】#1 はじめに+Dockerとは+Docker Desktopインストール](../docker1)  
[【Docker】#2 ローカル(ホスト)に作業フォルダを作成](../docker2)  
[【Docker】#3 Dockerfile+docker-compose.yml+各設定ファイルの設置](../docker3)  
[【Docker】#4 Laravelをコマンドでインストール](../docker4)  
[【Docker】#5 dockerでコンテナ(機能)を起動+Laravel表示確認](../docker5)  
[【Docker】#6 LaravelのDB設定、確認](../docker6)

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

1.phpMyAdmin表示確認
----------------

今回は以下のURLにアクセスし、phpMyAdminが表示できればOKです。  
http://localhost:8080/

ログイン情報は以下の通りです。

- ユーザ名：root
- パスワード：password

この値は docker-compose.yml のサービス名 phpmyadminの PMA\_USER 、PMA\_PASSWORD に設定されてる値になります。

<div class="boxparts caution">
  <div class="title"></div>
  
**アクセスする前に…**  
前回同様 docker-compose up -d をしてコンテナを起動し環境を立ち上げておいてください。

分からない場合は前回の記事を参考にしてください。

[docker-compose.ymlからコンテナを起動](../docker5#1docker-composeyml)
</div>

<div class="boxparts caution">
  <div class="title"></div>
  
**「接続できません。設定が無効です。」みたいなエラーがでた場合**

キャッシュの影響などでうまくいかないことがあります。  
そういったときは以下のコマンドを実行する事で解決できます。

イメージの更新が反映しない時などもこちらで解決することが多いです。

1\.  
Docker内で現在起動してない、イメージ、コンテナ、ネットワーク、キャッシュを削除（prune）する

```
docker system prune
```

2\.  
再度環境を起動する

```
docker-compose up -d
```

</div>

<div class="boxparts point">
  <div class="title"></div>

**なぜ8080？**   
docker-compose.yml の サービス名 phpmyadmin の ports を 8080:80と記載しているからです。

コンテナの80番ポートをローカルの8080番ポートで表示するという意味になります。(ポートフォワーディング)

ちなみに8080の部分は使われていないポート番号であれば、なんでも大丈夫です。
</div>

さいごに
----

今回はこれで完了です。  
次回は8！いよいよ最後！「出来てる環境の確認」を行います。

本シリーズの全体の流れとしては、大きく以下のようになっています。

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
自分でなんとか勉強して、実践してまとめてきましたが、なかなか難しいですよね。 わからないときも焦らずにやるのが大事だと思います。  
無理せずに頑張っていきましょう
  </div>
</div>
