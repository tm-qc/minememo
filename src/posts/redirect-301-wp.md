---
title: '【WordPress】301リダイレクトの設定'
date: '2020-03-16'
update_at: '2020-04-28' #無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'redirect-301-wp'
hero_image: '../images/posts/word-press-logo02-768x804.jpg'
tags: ["WordPress"]
---

<div class="toc-title">目次</div>

```toc
```



はじめに
----

この設定方法は当ブログを構築する際に調べたものになります。  
人にとって必要なものが異なる場合もあると思いますが、あらかじめご了承をお願いいたします。

利用環境は以下の通りです。

- PC：Windows10
- レンタルサーバー：ロリポップ
- 利用テーマ：JIN(有料)

301リダイレクトとは
-----------

ドメイン変更などでURLが変わった際に、旧URLにアクセスした場合に、繋がらないので新ドメインへリダイレクト処理をします。

せっかくアクセスしてもらったのにも関わらず、正しいページにURLに繋がらなかったらとても、もったいないです。

SEO的にもマイナスになるので、URLに変更があった際はぜひ設定しましょう。

<div class="boxparts point">
  <div class="title"></div>
  
  **301とは**

クローラーに正規の移転(恒久的なリダイレクト)と認識させるためのSEO対策の1つです。

**クローラーとは**

検索対象となるWebコンテンツの情報を収集するロボットのことです。  
クローラーに収集されることで検索対象として認識され検索結果に表示されるようになります。
</div>


301リダイレクト設定方法
-------------

.htaccessというファイルの機能をつかってリダイレクトをおこないます。

個人的にいろんな記事をみましたが、どれをしてもうまく動かなかったので、  
結局 RewriteCond を理解して自分で作成しました( ｀ー´)ノ

<div class="boxparts ref">
  <div class="title"></div>
  
Apache RewriteCond の基礎知識  
<https://weblabo.oscasierra.net/apache-rewritecond-base/>

</div>

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
  それでは設定していきます！( ｀ー´)ノ
  </div>
</div>

### .htaccessに記載するコードを作成

まず.htaccessに記載するコードを作成しましょう。  
コードのテンプレはこちらです。

下のコードをコピーしてテキストエディタやメモ帳で編集してください。

```.htaccess:title=.htaccess
# 301 Redirect
<IfModule mod_rewrite.c>
# 以下いずれかの RewriteCond の条件にあたれば 新URL へ301 Redirectします
# 条件1 旧ドメインの場合
RewriteCond %{HTTP_HOST} ^旧ドメイン [OR]
# 条件2 ドメインにwwwがある場合
RewriteCond %{HTTP_HOST} ^www\.(.*) [OR]
# 条件3 httpでのアクセスの場合
RewriteCond %{HTTPS} off
RewriteEngine On
RewriteRule ^(.*) 新URL$1 [R=301,L]
</IfModule>
```

<div class="boxparts memo">
  <div class="title"></div>
  
  テキストエディタとは  
プログラムのコードを書くための多機能なメモ帳のようなものです。

最近はVisual Studio CodeことVS CODEが有名ですね。  
無料で試せるので、興味ある方は試してみてください。

<https://azure.microsoft.com/ja-jp/products/visual-studio-code/>
</div>

#### コードの作り方

コードの作り方は以下のとおりです。  
わからない場合はコードの作成例を参考にしてください。

1. 「新URL」に新しいサイトのURLを記載
2. 「旧ドメイン」に古いドメイン部分を記載
3. 完成

#### コードの作成例

URLが以下のように変更になった場合の例です。

旧：http://memo.chips.jp/wp  
↓  
新：https://minememo.work/

※ #部分はコメント(メモ)で無くても動きます

```.htaccess:title=.htaccess
# 301 Redirect
<IfModule mod_rewrite.c>
# 以下いずれかの RewriteCond の条件にあたれば 新URL へ301 Redirectします
# 条件1 旧ドメインの場合
RewriteCond %{HTTP_HOST} ^memo.chips.jp [OR]
# 条件2 ドメインにwwwがある場合
RewriteCond %{HTTP_HOST} ^www\.(.*) [OR]
# 条件3 httpでのアクセスの場合
RewriteCond %{HTTPS} off
RewriteEngine On
RewriteRule ^(.*) https://minememo.work/$1 [R=301,L]
</IfModule>
```

#### コードの機能要約

主な機能は以下になります。

- 旧ドメインを新URLへ301リダイレクト
- www付きのURLの場合はwwwなしへ統一するためwwwなしURLに301リダイレクト
- httpのURLの場合はhttpsへ301リダイレクト

### .htaccessというファイルを編集する

コードの作成が完了したら、.htaccessというファイルにコピペして保存します。

1. ロリポップ管理画面&gt;&gt;サーバーの管理・設定&gt;&gt;ロリポップ！FTPをクリック<br>※FTPのツールがある場合はそちらでもOKです。
2. WordPressがインストールされているフォルダの先頭にある .htaccess をひらく
3. 先ほど作成したコードをコピー
4. \# BEGIN WordPress の上に作成したコードを記載し貼り付け


<div class="boxparts caution">
  <div class="title"></div>
  
  万が一失敗した場合は、WordPressにアクセスできなくなったり、プラグインがおかしくなる可能性があります。  
<span style="color: #ff0000;">**必ずバックアップをとって**</span>いつでも戻せる状態で作業を行ってください。
</div>

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
  動作確認して問題なければ完了です( ｀ー´)ノ  
    お疲れ様です！
  </div>
</div>
