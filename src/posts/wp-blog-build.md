---
title: '【WordPress】ブログサイト構築の全行程まとめ'
date: '2020-04-29'
update_at: '2020-04-29' #無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'wp-blog-build'
hero_image: '../images/posts/word-press-logo02-768x804.jpg'
tags: ["WordPress"]
---

<div class="toc-title">目次</div>

```toc
```

## はじめに
WordPressのブログサイト構築の全行程を体系的に記載していきます。  
詳細が別に必要なものは別記事へのリンクにします。  
  
<span style="color:red;">**目次の項目を「一個一個落ち着いて」順番通りに設定**していけば、おそらく  
**インストール>>セキュリティ設定**</span>
まではできると思います。  
  
セキュリティ設定までやれば、あとはGoogleのツール(Adsense、Search Console、Analytics)を導入したり、
好きなテーマでブログを書き出すだけ！  
  
という感じなので大変ですが、これを見て出来たという人が増えてくれたらうれしいなと思います。  
（しかし..WEB系の仕事してても大変なので、本当に皆よくやるな～と思います😵）

利用環境は以下の通りです。

- PC：Windows10
- レンタルサーバー：ロリポップ
- 利用テーマ：JIN(有料)


なおこの設定方法は**当ブログを構築する際におこなったことで、人によって環境の相違、手順の違い、必要なものが異なる場合もある**と思います。  
レンタルサーバなど環境一致しない部分は、ご自身の環境に置き換えて参考にしていただければ幸いです。  

## レンタルサーバー契約

このブログではロリポップのスタンダードプランを契約しました。  
選んだ理由は以下の通りです。

- ブログが波に乗るかわからないので、一旦コストを抑えたい
- ライトだと安いがWordPressが重いらしい
- 周りの評判をみてとりあえずで始めるならロリポップのスタンダードプラン
- 低価格だが無料SSLがついている
- 本格的にアクセスが増えたらエックスサーバー1択
- ロリポップだとアクセスが増えたときにどうなるのか体験してみたい

というような感じですね

契約はロリポップ公式の「お申込み」ボタンからどうぞ。  
10日無料も何回でもできたので、気軽にやってみるといいかもしれません。

<a href="https://lolipop.jp/" target="_blank">ロリポップ</a>

WordPress簡単インストール
-----------------

まずはWordPressをインストールします。  
インストール方法はロリポップのマニュアルを確認してください。

<a href="https://lolipop.jp/manual/user/applications-wordpress/" target="_blank">WordPress（ワードプレス）簡単インストール</a>

<div class="boxparts ref">
  <div class="title"></div>
  
  - サイトURL：任意入力はインストール先のフォルダ名になります
  - サイトのタイトル：サイト名なので好きなものにしてください

</div>
 
WordPressセキュリティ設定
-----------------

インストールが完了したらセキュリティ設定を行っていきます。  
WordPressのプラグインをインストールして、プラグインごとに設定をしていきます。

### Akismet Anti-Spam (アンチスパム)

スパムコメント対策のプラグインです。  
大まかな流れは以下の通りでほかの設定は特に触っていません。

1. WordPressのプラグインでインストールし有効化
2. Akismetアカウントを設定
3. AkismetのAPI キーを取得(無料版でOK)
4. WordPressでAkismetの設定からAPI キーを登録

こちらのサイトを参考にさせていただきました。  
<a href="https://bazubu.com/akismet-23841.html" target="_blank">【スパム対策】Akismetの最新の設定方法を紹介</a>

<div class="boxparts ref">
    <div class="title"></div>
    スパムコメントとは<br>
    大量の広告などのメッセージを無差別に投稿すること
</div>

 ### WP Multibyte Patch

WordPressを日本語最適化（文字化け防止）するプラグインです。  
特に細かい設定は必要ありません。

1. WordPressの管理画面&gt;&gt;プラグイン&gt;&gt;新規追加
2. WP Multibyte Patchで検索しインストール
3. 有効化をクリック

<div class="boxparts ref">
  <div class="title"></div>
  日本語最適化を行う理由などの詳細はこちら<br>

  <a href="https://www.kagoya.jp/howto/wordpress/wp-multibyte-patch/" target="_blank">

  【再入門】WP Multibyte PatchをWordPressで有効化してみました！
  </a>
</div>



 ### SiteGuard WP Plugin

初期同梱のプラグイン。  
主に管理画面などを守るためのセキュリティプラグインです。  
以下の2項目のみ設定しました。

#### ログインページ変更

WordPressの管理画面のURLは基本構造が同じなっており、だれでもログイン画面にアクセスできる状態になっています。  
そのためURLを変更しアクセスできないようにします。

<div class="boxparts caution">
  <div class="title"></div>
  有効化にした時点で管理画面のURLが変わるので、URLはかならずして確認しメモてしておいてください。
</div>

1. ログインページ変更をクリック
2. 「ON」をクリック
3. 「変更後のログインページ名」をメモする
4. 「管理者ページからログインページへリダイレクトしない」をチェック
5. 「変更を保存」をクリック


<div class="boxparts caution">
  <div class="title"></div>

**「管理者ページからログインページへリダイレクトしない」とは**  
  
  未ログイン時に変更前URLにアクセスした場合に、404 Not Foundとなり変更されたログインページにリダイレクトしないようにします。
</div>

 当ブログの場合はURLは以下のようになります。

- 変更前  http://minememo.work/wp-admin/
- 変更後  https://minememo.work/初期値または設定した任意のパス

<div class="boxparts caution">
  <div class="title"></div>
  もし変更後のURLを忘れた場合でも確認できますが、あまりおすすめは出来ない方法なのでちゃんとメモしておきましょう<br><br>


   **変更後のURLを忘れた場合の確認方法**  
    ロリポップの管理画面へアクセス  
    ↓  
    サーバーの管理・設定  
    ↓  
    ロリポップ!FTPにアクセス  
    ↓  
    WordPressがインストールされてるフォルダのTOPにある.htaccess というファイルの中を確認  
    ↓  
    以下のような記載がある個所に「初期値または設定した任意のパス」が書いてあります。
    
    ```htaccess:title=htaccess
    RewriteRule ^初期値または設定した任意のパス(.*)$ wp-login.php$1 [L]
    ```
</div>




 #### 画像認証

ログイン画面などにひらがなの文字を入力したりする画像認証をつけます。  
一応つけていますが、個人的にはめんどくさくなったら外してもいいかなと感じています。

1. 画像認証をクリック
2. 「ON」をクリック
3. お好みのものを選択
4. 「変更を保存」をクリック

### All In One WP Security &amp; Firewall

SiteGuard WP Pluginにはない機能ももいっているセキュリティプラグインです。 SiteGuard WP Pluginで設定していないような機能をONにしました。   
  
※全編英語だけど、日本語翻訳しながら頑張りました笑  
  
以下のサイトを参考に一部機能をONにしました。  
<https://keiei.co/all-in-one-wp-security-firewall/>

#### WP Generator Meta Tag &amp; Version Info

WordPressのバージョンは脆弱性を判断する材料になるために、ソース内に表示されるバージョン情報を消します。

1. WP Security&gt;&gt;Settings&gt;&gt;WP Version Info
2. チェックボックスをONにして「Save Settings」をクリック

#### Force User Logout Options

設定した分数の間に何もしな買った場合に自動ログアウトするための機能です。

1. WP Security&gt;&gt;User Login&gt;&gt;Force Logoutをクリック
2. Enable Force WP User LogoutのチェックボックスをONにします。
3. Logout the WP User After XX Minutesに分で時間を入力  
  ※600なら10時間
4. 「Save Settings」をクリック

#### Registration Honeypot

悪質なロボットへの対策です。

ロボットは通常、登録フォームから各入力フィールドへ入力するので、特別な隠されたハニーポットというフィールドの値も送信します。  
その値が含まれていたら、ロボットがフォームを送信した可能性が高いとして処理されます。

1. WP Security&gt;&gt;User Registration&gt;&gt;Registration Honeypotをクリック
2. Enable Honeypot On Registration PageのチェックボックスをONにします
3. 「Save Settings」をクリック

#### Change Database Prefix

データベースのテーブル名の接頭辞(共通の先頭の文字)を変更します。  
  
初期は WP数値\_テーブル名 問というような形式になっているので「WP数値」をオリジナルのものに変えることでセキュリティを向上させます。  
  
<span style="color:red;">**注意点が多いため作業の際は十分に注意してください。**</spna>


<div class="boxparts caution">
    <div class="title"></div>

適用タイミングについて  
この機能を使う場合はWordPressをインストールしてすぐが好ましいです。  
  
データやプラグインが増えてる場合はどんな影響が出るかわからないので、管理画面の記載のある通り**BAKUPをとって自己責任**で行ってください🤖
</div>

<div class="boxparts ref">
    <div class="title"></div>

  **用語補足**

  - データベース：ブログなどのデータが登録されているサーバー上の大きな箱みたいなもの。  
    ロリポップなどのサーバーの管理画面からアクセスできます。
  - テーブル：データベースの中の各データの部屋みたいなもの
  - 接頭辞(プレフィックス)  ：
    単語の先頭につける文字。  
    プログラムでは名称の被りを避けるため、決まった単語を頭につけることがあります。
</div>

 
それでは設定にはいります。  
まずロリポップの管理画面に移動します。

1. ロリポップ管理画面&gt;&gt;サーバーの管理・設定&gt;&gt;ロリポップ！FTPをクリック
2. FTPが開くのを待ちます
3. WordPressのファイルがインストールされているフォルダのTOPにある  「wp-config.php」をクリック
4. 「現在の属性」の部分を600に変更
5. 「保存する」をクリック


<div class="boxparts caution">
    <div class="title"></div>
    <b>wp-config.phpのパーミッションについて(書き込み権限の設定) </b><br><br>
    この作業が終わったら、必ず <b style="color:red;">即時400に戻す</b> ようにしてください。
    <br><br>
    WordPressの設定ファイルなので、セキュリティ上書き込み不可の400にしておく必要があります。  
    （400=呼出のみ／600＝呼出、書込）
    <br><br>
    またこちらのファイルも重要なファイルなので、<b style="color:red;">作業前にBACKUP</b> を取っておくことをお勧めします。

</div>

 それではWordPressの管理画面にもどります(‘◇’)ゞ

1. WP Security&gt;&gt;Database Security&gt;&gt;DB Prefixをクリック
2. Generate New DB Table Prefixのテキストボックスに任意の文字を入力
3. 「Change DB Prefix」をクリック
4. 更新が完了した後はおかしなところがないか確認

<div class="boxparts point">
  <div class="title"></div>

  **任意の文字は半角英語**が良いです。  
  プログラムの特性上日本語は避けましょう。  
    
  経験上だいたい「小文字英数字とアンダースコア」で構成します。
</div>




 #### Prevent Access to Default WP Files

readme.html、license.txt、wp-config-sample.phpへのアクセスを禁止します。  
  
これらのファイルへのアクセスを防ぐことにより、潜在的なハッカーから重要な情報（WordPressバージョン情報など）を隠します。

1. WP Security&gt;&gt;Filesystem Security&gt;&gt;WP File Access
2. Prevent Access to WP Default Install FilesのチェックボックスをONにします。
3. 「Save Settings」をクリック

#### Firewall

この機能を使用すると、サイトのいくつかの基本的なファイアウォールセキュリティ保護ルールをアクティブにできます。  
  
Firewallは有名なのですが、細かい機能は把握していません。  
かけすぎて弊害がでてもいけないので、参考サイトを参照し以下2箇所を設定しました。



<div class="boxparts ref">
  <div class="title"></div>

  参考サイト

  <a href="https://keiei.co/all-in-one-wp-security-firewall/" target="_blank">All In One WP Security & Firewallの使い方とおすすめの設定方法</a>
  
</div>

1. WP Security&gt;&gt;Firewall&gt;&gt;Basic Firewall Rules。
2. Enable Basic Firewall ProtectionのチェックボックスをONにします。
3. Disable Pingback Functionality From XMLRPCのチェックボックスをONにします
4. 「Save Basic Firewall Settings」をクリック

※Brute Force対策やRename Login PageはSiteGuard WP Pluginで設定しており、不要なので設定はしませんでした。

### Edit Author Slug

「公開URL + ?author=1」でURLにアクセスされた際に登録されているユーザ名が表示されるのを防ぎます。  
ユーザ名はWorPressの管理画面のIDなので隠しておきたい情報になります。  
  
例えば本ブログに「公開URL+?author=1」でアクセスした場合URLがこのようになります。  
https://minememo.work/?author=1 でアクセス  
↓  
https://minememo.work/minememo/taka が表示  
※takaの部分に本来はWorPressのIDが表示されます  
※今表示されているtakaは自分で設定した表示用の文字になります

1. プラグイン&gt;&gt;新規追加&gt;「Edit Author Slug」をインストールし有効化
2. ユーザ一覧&gt;&gt;変更したいユーザ名をクリック
3. IDの代わりに表示するニックネームに好きな名前を入力<br>※ユーザ名がWordPressのIDです
4. 「ブログ上の表示名」は決めたニックネームにします
5. 「投稿者スラッグ」という欄が下のほうにあるので、表示してもいいものを選択<br>※投稿者スラッグ：?author=1 でアクセスした際にURLの末尾に表示される名前
6. プラグイン&gt;&gt;インストール済みのプラグイン&gt;&gt;Edit Author Slugの設定をクリック
7. 投稿者ベースに任意の文字を入力<br>※URLになるので半角小文字の英語やハイフンが良いと思います
8. 「変更を保存」をクリック

<div class="boxparts point">
  <div class="title"></div>

  「投稿者スラッグ」はEdit Author Slugが有効化されていないと表示されません。
</div>


 以上でセキュリティの設定が完了です。  
個人的に調べた範囲なので、何か他にしたほうがいいもの、しなくていいものあればぜひ教えてください！

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">長いですね..疲れたら無理せず休憩しましょう！</div>
</div>

パーマリンク設定
--------

パーマリンクとは記事を作成する際に生成される記事のURLになります。  
こちらはSEOの観点から**必須**に近い設定になります。  
  
記事が増えたりする前にぜひ設定しておきましょう。  
詳細は別記事に記載していますので、「参考」をご覧ください。

<div class="boxparts ref">
  <div class="title"></div>

  <a href="../permalink-setting" target="_blank">【WordPress】パーマリンク設定</a>
</div>

独自ドメイン設定
--------

独自ドメインを取得するメリットは「SEO的に強いから」というのがメインの目的になります。  
こちらもブログが動き出す前に設定しておいたほうが良い項目です。  
  
詳細は別記事に記載していますので、「参考」をご覧ください。

<div class="boxparts ref">
  <div class="title"></div>

  <a href="../original_domain_wp" target="_blank">【WordPress】独自ドメイン設定</a>
</div>

独自SSL（無料）
---------

取得したドメインに独自SSL（無料）を適用します。  
SSLとは通信時の情報を暗号化しセキュリティをたかめることです。  
  
Google的には必須的な項目になるため、設定しておいたほうが良いです。  
  
詳細は別記事に記載していますので、「参考」をご覧ください。

<div class="boxparts ref">
  <div class="title"></div>

  <a href="../ssl_setting_wp" target="_blank">【WordPress】ロリポップ独自SSL（無料）設定</a>
</div>

301リダイレクト
---------

旧ドメインにアクセスした場合に、繋がらないので新ドメインへリダイレクト処理を行います。  
301リダイレクトを行うことにより、クローラーに正規の移転(恒久的なリダイレクト)と認識させSEOに悪影響が出ないようにします。  

<div class="boxparts ref">
  <div class="title"></div>

  <a href="../redirect-301-wp" target="_blank">WordPress
【WordPress】301リダイレクトの設定</a>
</div>

Goolgle系(収益化、検索設定、サイト分析)のツール導入について
----------------------------------

以下の理由でうまくまとめれませんでした(m´・ω・｀)m ｺﾞﾒﾝ…

- 導入方法が利用しているWordPressのテーマごとに異なる
- ツールごとに登録し設定、またはSite Kit by Googleというプラグインを通して設定する方法など複数ある
- 私事で申し訳ないのですが、すでにツールごとに登録しており新規登録ではなく追加設定が必要だった

  
参考先は載せておきますので、参照の上登録、設定をしてみてください。

<div class="boxparts memo">
  <div class="title"></div>

  **Site Kitとは**

  Site KitはWordPress向けの無償のオープンソースのプラグインです。  
  WordPressの管理画面でAdsense、Serch Console、Analyticsをまとめて参照、アクセスできるようになる便利ツールです。

  <a href="https://support.google.com/adsense/answer/7527509" target="_blank">AdSense に接続し、WordPress サイトで広告を表示する</a>
</div>



 ### Goolgle Adsense(収益化)へのお申し込み

Goolgle Adsenseで収益化するためにはURLの登録、紐づけが必要です。

<div class="boxparts ref">
  <div class="title"></div>

  <a href="https://support.google.com/adsense/answer/10162?hl=ja" target="_blank">AdSense へのお申し込み</a>

  <a href="../ads-txt-set" target="_blank">【Google AdSence】アドセンス ads.txt 設置方法</a>
</div>


### Goolgle Serch Console(検索結果の監視、管理、改善)

Googleの検索結果にサイトを表示するためには、Googleの検索エンジンにサイトを通知し、インデックスというものにサイトを登録してもらう必要があります。   
  
またGoolgle Serch Consoleを使うことでサイトが更新された際に、Googleの検索エンジンに自動で再通知をしてくれるようになります。   
Google検索での検索結果に、サイトを表示したい場合はぜひ設定をしておきましょう💡

<div class="boxparts ref">
  <div class="title"></div>

  <a href="https://saruwakakun.com/html-css/wordpress/sitemap" target="_blank">【WordPress】サイトマップ作成からSearch Console登録までの全手順 </a>
</div>

<div class="boxparts memo">
  <div class="title"></div>
  Goolgle Serch ConsolはGoogleのマニュアルで「URL検査ツール」と記載されている場合があります。
</div>


 ### Google Analytics(サイト分析)

Googleが提供するアクセス解析ツールです。  
  
サイトの訪問者数や見られているページなどアクセス状況が確認できます。   
毎日どのくらい見られてるかがわかるとモチベになるので、ぜひ設定しておきましょう。

<div class="boxparts ref">
  <div class="title"></div>

  <a href="https://support.google.com/analytics/answer/1008015?hl=ja&ref_topic=3544906" target="_blank">アナリティクスのスタートガイド</a>
</div>


その他
---

### プライバシーポリシー

アナリティクスなどの分析ツールやAmazonアソシエイトを使っていたする時点で、プライバシーポリシーへの記載が必要になります。  
正直難しい内容ではありますが、参考になるサイトを参照し作成しておきましょう。

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
  当ブログでもAmazonアソシエイト使えるようになったら追記しないとです💡
  </div>
</div>

<div class="boxparts ref">
  <div class="title"></div>

  <a href="http://liberty-life-blog.com/wordpress/privacy-policy/#i-7" target="_blank"> 【コピペでOK】プライバシーポリシーの書き方|AdSense・Analytics対策</a>
</div>


### 最後に

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
    長～い本当に設定お疲れさまでした👍<br>
    あとは長くブログを続けていくだけですね。  
    お互い気軽に頑張りましょう～🐹
  </div>
</div>