---
title: '【Docker】Laravel 9+Laravel Breezeで@viteのCSSが反映しない' #記事のタイトル
date: '2023-05-17' #作成日
update_at: '2023-05-18' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'laravel9-breeze-vite-css-not-update' #url ファイル名と合わせてください
hero_image: '../images/posts/docker_icon.jpg' #アイキャッチ画像
tags: ["Docker","Laravel"] #タグ カテゴリとして使ってもOK
---

<div class="toc-title">目次</div>

```toc
```

## はじめに
以下の組み合わせで、CSSが反映しない状態になりました。<br>
変更しないといけないことが多かったので、反映するまでに変更した部分だけ記載したいと思います。<br>
<br>
原因はLaravel 9からViteになったことが主な原因だそうで、そこに対しての調整になります。<br>

- Windows PC
- Docker
- php 8.1
- Laravel 9
- Laravel Breeze

<div class="boxparts ref">
  <div class="title"></div>
  
この記事がなかったらもっと時間がかかっていたと思います。<br>
本当に感謝です。

https://qiita.com/hitotch/items/aa319c49d625c2a9b65e

</div>


## 反映させるのに必要な変更

### docker-compose.yml の php 部分

以下追加<br>

```docker-compose.yml:title=docker-compose.yml

ports:
  - 5173:5173

```
※追加場所はVolumeの上にしました。

### PHPイメージを読み込む Dockerfile


以下追加<br>

```Dockerfile:title=Dockerfile

EXPOSE 5173

```
※追加場所はRUNの上にしました。

### Viteの設定ファイル vite.config.js


以下追加<br>

```vite.config.js:title=vite.config.js

    server: {
        host: true,

        // ホットリロード(自動更新)がならない場合追加
        hmr: {
            host: 'localhost',
        },
        // CSSの自動反映がならない場合追加(Dockerだと多少時差がでるかも)
        watch: {
          usePolling: true,
        },
    },

```
※追加場所はpluginsの下にしました。<br>
※vite.config.jsはLaravel9をインストールしたらLaravelプロジェクトの直下に自動でできるファイルです。

## Laravel Breezeインストールやnpm run dev時にnpmエラーが出る場合

### PHPイメージを読み込む Dockerfile

node.jsのバージョンが古いとダメみたいです。<br>
16.16.0なら大丈夫とのことで、バージョンアップする必要があります。<br>
<br>
Dockerfile内の RUN apt-get install の部分でnode.jsのバージョンを指定するようにします。<br>
<br>
以下追加<br>

```Dockerfile:title=Dockerfile

RUN apt-get install -y node.js npm && npm install n -g && n 16.16.0

```
※追加場所はRUNの最後にしました。<br>
※もし既存でnode.jsのインストールしてる場所があれば消してください。<br>


## 表示の高速化
viteの仕様上 node_modules フォルダや、 vendor フォルダのバインドを除外しないと、ページを表示するたびにロードに時間がかかるそうです。<br>
以下追加した後は、確かに早くなったので、表示が重たい方はぜひ試してみてください。<br>

### docker-compose.yml の php 部分

以下追加<br>

```docker-compose.yml:title=docker-compose.yml

#app(phpの部分)のvolumeにバインド除外用の設定を追加
#重たいものをバインドしないことによって表示が軽くなる
#portsの下に書きました。
#「名前付きボリューム:コンテナ内のパス」で書くようです。

volumes:
  - ignore_node_modules:/app/node_modules
  - ignore_vendor:/app/vendor

～～～～～省略～～～～～

#ファイルの一番下に除外するために使う、名前付きボリュームを定義
volumes:
  ignore_node_modules:
  ignore_vendor:

```


### PHPイメージを読み込む Dockerfile

以下追加<br>

```Dockerfile:title=Dockerfile

#バインドしないようにしたので、起動する度に npm と composer の install が必要なので、コマンドで自動でインストールさせるようです。
#これがあると、Docker起動後に毎回手動で composer install と npm install をしなくてよくなり npm run dev だけでよくなります。

ENTRYPOINT [ "bash", "-c", "composer install; npm install; exec php-fpm" ]

```

※追加場所はファイルの一番下にしました。<br>
※筆者の環境ではこれがなくても install なしで  npm run dev だけで動いてる気がしてますが、何かあったらまた更新します。<br>
※npmやcomposerのコマンドはコンテナ内でしてください。(「docker compose exec サービス名 コマンド」を使ってしたらOKです。)<br>


## さいごに

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
Docker出来てしまえば、共有が簡単なのですが、それまでの道のりが大変・・<br>
CSSの反映だけだったのですが、仕様上重たすぎる問題もあってかなり時間を使いました。
  </div>
</div>



