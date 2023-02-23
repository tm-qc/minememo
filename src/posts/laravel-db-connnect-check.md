---
title: '【Laravel】データベースに繋がらない時の確認方法' #記事のタイトル
date: '2020-06-28' #作成日
update_at: '2020-06-28' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'laravel-db-connnect-check' #url ファイル名と合わせてください
hero_image: '../images/posts/Laravel-icon.jpg' #アイキャッチ画像
tags: ["Laravel"] #タグ カテゴリとして使ってもOK
---

<div class="toc-title">目次</div>

```toc
```


はじめに
----

JavaScriptはVue.js、jQueryでの業務経験があるのですが、PHPはフレームワークを使ったことがなかったので、最近Laravelの勉強を始めています。

一旦たにぐちさんの動画で環境構築、軽くMVCを動かしてみるというところまでは詰まらずいけたのですが、その後自分で新たなに勉強していくなか、データベースに繋がらない時の確認方法が必要になったので、記事しておきます。

今回は以前使用した**sqliteと今回使ったMySQLで確認**をしたときの方法です
<div class="boxparts ref">
  <div class="title"></div>
  
[Laravel入門](https://www.youtube.com/playlist?list=PLh6V6_7fbbo8bb7eajaLdsQZ9fLhMJ-oc)
</div>

データベースに繋がらない時の確認方法
------------------

### まずLaravelで接続状態確認

以下の Laravelのコマンドで今の状況を確認できます。

```
php artisan migrate:status
```

<br><br>
何かしらのエラーがてて、繋がってなかったら以下「2」以降のいづれかを確認します。

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
  
  個人的に順番はつけていますが、目星がついてる場合は怪しい個所から調べても **<span style="color: #ff0077;">おけまる</span>** です
  </div>
</div>

### php.iniを確認する

phpの設定ファイルを確認し使いたいデータベースがコメントアウトされていないか確認する。  
php.iniにはたくさん記述があるので、Ctrl+Fで検索すると見つけやすいです。

```php.ini:title=php.ini
extension=pdo_sqlite
```

※sqliteならこれを確認力

```php.ini:title=php.ini
extension=mysqli
```

※MySQLならこれを確認

### .env のデータベース設定がきちんとなっているか

.envはLaravelの設定ファイルです。  
TOPにあるので中身を確認します。

.envにもたくさん記述があるので、Ctrl+Fで検索すると見つけやすいです。

```.env:title=.env
DB_CONNECTION=sqlite
```

※sqliteならこれだけ記載し他のはコメントアウトで非活性にしてOK

```.env:title=.env
DB_CONNECTION=mysql
DB_HOST=ホスト名
DB_PORT=ポート
DB_DATABASE=DB名
DB_USERNAME=ユーザネーム
DB_PASSWORD=パスワード
```

※MySQLは適宜今の状況にあったものを記載します

### database.phpの対象のDB設定がきちんとなっているか

Laravelの config/database.php は .env ファイルの設定を参照し、なければ第二引数の値が設定として参照されるファイルです。  
なので、MySQLの場合は .env ファイルの設定がされているものは特に変更しなくても基本は動くと思います。

ただし、sqliteの場合は初期設定のDBのファイル名が「database.sqlite」なのでファイル名を変更した場合は適宜記載します。

```php:title=php
'database' => env('DB_DATABASE', database_path('DBのファイル名のみ記載'))
```

※sqliteの場合

### 使ってるサーバーは起動してるか

これ本当に凡ミスでした😅  
当時XAMPPだったのですが、XAMPPを起動していなくてエラーになるということがありました笑

サーバーはちゃんと起動しましょう😅

### 設定ファイル変更後にキャッシュはのこってないか

いろいろと設定ファイルを変更した場合に、前回の設定値がキャッシュで残ることがあるそうです。  
見返しても間違いがない場合は以下のコマンドで設定ファイルのキャッシュをクリアしてみてください。

```
php artisan config:cache
```

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
以上です！  
いろいろと大変なこともありますが..お互い頑張りましょう！
  </div>
</div>
