---
title: '【WordPress】ロリポップ独自SSL（無料）設定'
date: '2020-03-15'
update_at: '2020-05-18' #無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'ssl_setting_wp'
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

独自SSLとは
-------

SSLとは通信時の情報を暗号化しセキュリティをたかめることです。  
URLの先頭の http が https でアクセス可能になり、URLバーの左に🔓マークがつきます。

独自SSL設定方法
---------

### 取得した独自ドメインに独自SSL（無料）を設定

当ブログのサーバーはロリポップのなので、ロリポップでの設定方法になります。

1. ロリポップの管理画面を開く
2. セキュリティ&gt;&gt;独自SSL証明書導入
3. 取得したドメインが記載されてるのでチェックボックスをつける
4. 「独自SSL（無料）を設定する」をクリック

<div class="boxparts caution">
  <div class="title"></div>
  
<span style="color: #ff0000;">**「SSL保護有効」が出るまではWordPressでの設定はしないでください。**</span>

有効化される前の「https」のURLをWordPressで設定した場合、WordPressの管理画面へアクセス不能になり、かなりめんどくさいことになります😅

※反映時間が正確にわからないので状況が分かりづらくなります
</div>

<div class="boxparts memo">
  <div class="title"></div>
  
**SSLが有効化してもURLのところに「保護されていない通信」と表示される場合**

<span style="color: #ff0000;">ソース内にhttp://の読み込みがある</span>のが原因です。  
当ブログでもこの事象が出たのですが、リンクをhttpsに書き直すと直りました。

なお独自SSLは独自ドメインにしか設定できません
</div>

### ワードプレスのWordPress アドレス (URL) と サイトアドレス (URL)を変更

この設定は間違えると怖いので下の注意点をよく読んで、設定を行ってください！

<div class="boxparts caution">
  <div class="title"></div>
  
  **<span style="color: #ff0000;">厳重注意</span>**  

  ここの設定がうまくいかないと<span style="color: #ff0000;">WordPressのブログや管理画面にアクセスできなくなったり
  </span>して、<span style="color: #ff0000;">**万が一戻せなくなる**</span>かもしれません。

  **前提として必ずアクセス可能なURL**で設定をしてください。

  例えば独自SSLを設定して「SSL保護有効」が出る前(=アクセス不可)にhttpsのURLで設定すると<span style="color: #ff0000;">WordPressの各画面にアクセス出来なくなる</span>可能性があります。
</div>

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
  厳重注意は確認できましたか？それでは設定開始です！( ｀ー´)ノ
  </div>
</div>

1. WordPressの管理画面を開く
2. 設定&gt;&gt;一般をクリック
3. サイトアドレス (URL)を取得したドメインのURLに書き換える
4. WordPress アドレス (URL) を取得したドメインのURLに書き換える<br>※念のため旧URLはメモっておくこと
5. 「変更を保存」をクリック

<div class="boxparts memo">
  <div class="title"></div>
  
- WordPressアドレス(URL) ：WordPressをインストールした場所  
- サイトアドレス (URL)：公開用のURL

※WordPressをインストールした場所とのことですが、ドメインまでの入力でOKです。  
インストールしたフォルダまで入力すると当ブログの場合は繋がらなくなりました…😅
</div>

<div class="boxparts caution">
  <div class="title"></div>
  
  **<span style="color:red;">万が一失敗してWordPressにアクセスできなくなったときの対処法のメモ</span>**

  当ブログもサイト構築中に失敗したときは、以下のいづれかを試しつつ、状況を確認し調整を行いました！  
**非常にデリケートな作業**なので、バックアップをするなど自己責任で落ち着いて状況の確認を行ってください。

一旦表示できる状態までもどったら、再度時間を置いて新URLに設定してみてください。  
（ちなみに当時はかなりイライラしながらしました😒笑）

**・キャッシュの可能性があるので、Ctrl+F5とかでスーパーリロードかけてみる**

**・ロリポップ！の場合は「ロリポップ！アクセラレータ」OFFにしてリロードしてみる**  
(高速表示対策でキャッシュが残りやすいらしい)

**・独自ドメインの取得がうまくできてるか。**  
※ドメイン取得元からWHOISとかメール認証とかの設定依頼メールがきてないか確認する

**・データベースを触らないで確認する場合**  
ロリポップ管理画面などからFTPにアクセスします。  

<span style="color: #ff0000;">wp-config.phpの以下のコメントより上</span>に

```javascript:title=javascript
/* 編集が必要なのはここまでです ! WordPress でブログをお楽しみください。 */
```


下のコードにの★の部分を書き換え保存し様子見、状態の確認をする

```php:title=php
define('WP_SITEURL', '★自分のWordPressアドレスに書き換える★'); // WordPressアドレス
define('WP_HOME', '★自分のサイトアドレスに書き換える★'); // サイトアドレス
```

<br><br>
 **・データベースで触って確認する場合**  
WordPressのデータベースへアクセスします。  
wp1\_optionsの「siteurl」、「home」を旧URLに書き換えて様子見、状態の確認をする

※home：WordPressアドレス(URL)  
※siteurl：サイトアドレス (URL)  
※wp1\_は初期の接頭辞なので個人個人で違うかもしれません。
</div>
 

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
  以上で設定完了です！うまくできましたか？<br>
  スムーズに更新が成功することを祈っております( ｀ー´)ノ
  </div>
</div>