---
title: '【インフラ】サーバー系の個人用のメモ' #記事のタイトル
date: '2023-07-15' #作成日
update_at: '2023-07-15' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'web_server_memo' #url ファイル名と合わせてください
hero_image: '../images/posts/pc-green.png' #アイキャッチ画像
tags: ["インフラ","個人用メモ"] #タグ カテゴリとして使ってもOK
---

<div class="toc-title">目次</div>

```toc
```


## はじめに

インフラはローカル環境をDockerなどで構築はできますが、詳しくないので、完全個人用のメモです。  
間違った情報もあるとおもうので、参考にする際はご注意ください。

## 用語

### OS
Linux、windows、iOS、Android、Unixなど。  

ちなみにカーネルとは、ハードウェアの管理、プログラムの実行管理、ファイルシステムなど、OSのコアとなる基本サービスをセットで提供するプログラム。  
※カーネル＝Linux=OSみたいな感じになってる

### Linuxディストリビューション

OSとカーネルだけでは動かないのでパック(Linuxディストリビューション)として配布されているもの。  
なので、結局Linuxを使うときはLinux環境に好きなディストリビューションをいれる。という形になるみたい。

※カーネル+アプリケーションという感じ

<table class="cps-table03" style="height: 258px;">
<tbody>
  <tr style="height: 19px;">
    <th style="height: 19px; width: 189.703px;">
      Red Hat系
    </th>
    <td class="rankinginfo" style="height: 19px; width: 461.297px;">
      Fedora（フェドーラ）<br>
      CentOS(セントオーエス)<br>
      Red Hat Enterprise Linux(RHEL)<br>
    </td>
  </tr>
  <tr style="height: 19px;">
    <th style="height: 19px; width: 189.703px;">
      Debian系
    </th>
    <td class="rankinginfo" style="height: 19px; width: 461.297px;">
      Ubuntu<br>
      ※今の主流
    </td>
  </tr>
  <tr style="height: 19px;">
    <th style="height: 19px; width: 189.703px;">
      Alpine系
    </th>
    <td class="rankinginfo" style="height: 19px; width: 461.297px;">
      軽量でシンプルなディストリビューションらしい
    </td>
  </tr>
</tbody>
</table>

※windowsサーバーにディストリビューションみたいなのはない  
※ApaceheやngnixはWEBソフトウェア。WEBページ使うときにディストリビューションに入ってるものという感じのようです。  
※ちなみにApacheのバージョン確認は httpd -v で出来る

## Linuxフォルダ構造

<table class="cps-table03" style="height: 258px;">
<tbody>
  <tr style="height: 19px;">
    <th style="height: 19px; width: 189.703px;">
      /bin
    </th>
    <td class="rankinginfo" style="height: 19px; width: 461.297px;">
      OSやコマンドが正常に動作するための実行ファイル。基本触らない
    </td>
  </tr>
  <tr style="height: 19px;">
    <th style="height: 19px; width: 189.703px;">
      /boot
    </th>
    <td class="rankinginfo" style="height: 19px; width: 461.297px;">
      システム起動時のファイル。そんなに触らない
    </td>
  </tr>
  <tr style="height: 19px;">
    <th style="height: 19px; width: 189.703px;">
      /dev
    </th>
    <td class="rankinginfo" style="height: 19px; width: 461.297px;">
      ハードウェア機器(キーボードとか)を表すファイル
    </td>
  </tr>
  <tr style="height: 19px;">
    <th style="height: 19px; width: 189.703px;">
      /etc
    </th>
    <td class="rankinginfo" style="height: 19px; width: 461.297px;">
      設定ファイル
    </td>
  </tr>
  <tr style="height: 19px;">
    <th style="height: 19px; width: 189.703px;">
      /home
    </th>
    <td class="rankinginfo" style="height: 19px; width: 461.297px;">
      ユーザのホームディレクトリ。ユーザごとのログインの始まりの場所
    </td>
  </tr>
  <tr style="height: 19px;">
    <th style="height: 19px; width: 189.703px;">
      /lib
    </th>
    <td class="rankinginfo" style="height: 19px; width: 461.297px;">
      OSに必要なライブラリ
    </td>
  </tr>
  <tr style="height: 19px;">
    <th style="height: 19px; width: 189.703px;">
      /media
    </th>
    <td class="rankinginfo" style="height: 19px; width: 461.297px;">
      USBなどの外部記憶媒体をシステムで「自動」マウントする。マウントしないと使えない。
    </td>
  </tr>
  <tr style="height: 19px;">
    <th style="height: 19px; width: 189.703px;">
      /mnt
    </th>
    <td class="rankinginfo" style="height: 19px; width: 461.297px;">
      USBなどの外部記憶媒体をシステムで「手動」マウントする。マウントしないと使えない。
    </td>
  </tr>
  <tr style="height: 19px;">
    <th style="height: 19px; width: 189.703px;">
      /opt
    </th>
    <td class="rankinginfo" style="height: 19px; width: 461.297px;">
      chromeなど追加アプリケーションがインストールされる
    </td>
  </tr>
  <tr style="height: 19px;">
    <th style="height: 19px; width: 189.703px;">
      /proc
    </th>
    <td class="rankinginfo" style="height: 19px; width: 461.297px;">
      OSのシステムコントロール
    </td>
  </tr>
  <tr style="height: 19px;">
    <th style="height: 19px; width: 189.703px;">
      /root
    </th>
    <td class="rankinginfo" style="height: 19px; width: 461.297px;">
      管理系rootアカウントのホームディレクトリ
    </td>
  </tr>
  <tr style="height: 19px;">
    <th style="height: 19px; width: 189.703px;">
      /sbin
    </th>
    <td class="rankinginfo" style="height: 19px; width: 461.297px;">
      管理系rootアカウントのみ実行できるプログラム  <br>(binの管理権限用)
    </td>
  </tr>
  <tr style="height: 19px;">
    <th style="height: 19px; width: 189.703px;">
      /sys
    </th>
    <td class="rankinginfo" style="height: 19px; width: 461.297px;">
      OSの現在の状況に関する情報
    </td>
  </tr>
  <tr style="height: 19px;">
    <th style="height: 19px; width: 189.703px;">
      /usr
    </th>
    <td class="rankinginfo" style="height: 19px; width: 461.297px;">
      全ユーザが共通して利用するプログラムのデータ。<br>
      TOPのbinとはべつにここにもbinがはいっていたりする。<br>
      ※PCでいうCドライブにツールインストールする。みたいな感じっぽい<br>
      ※/varとの違い：/varはホストごとの共有できない可変データを入れる場所
    </td>
  </tr>
  <tr style="height: 19px;">
    <th style="height: 19px; width: 189.703px;">
      /var
    </th>
    <td class="rankinginfo" style="height: 19px; width: 461.297px;">
      システム運用中に自動で生成されて、あとから削除されるデータ。ログなどが入る。<br>
      プログラムなどのコードもvar/www/source/などに入れたりする。<br>
    </td>
  </tr>

  </tbody>
</table>

## サーバーの見分け方

### Windows
ver とか systeminfo とかで情報が返ってくる。  
Linuxはコマンド自体使えずエラーになる。


### Linux
/etc/ に Linuxディストリビューションに応じて設定ファイルがあるのでそれで判断する。

#### /etc/ で何の設定ファイルがあるか見る

- CentOS：/etc/redhat-release
- Fedora：/etc/fedora-release
- Debian(ubuntu)：/etc/debian_version
- その他：/etc/issue

など

なおバージョンの確認は cat /etc/各ファイル名で中身を見てバージョンをみるとOK。  
※例)Debianなら「cat /etc/debian_version」

<div class="boxparts ref">
  <div class="title"></div>

  シェア率はUbuntuが強い
  
  [2月Webサイト向けLinuxシェア、Debianが微増](https://news.mynavi.jp/techplus/article/20230207-2582977/)
</div>

## 業務で実際に触っていたファイルについて

### /etc/httpd/conf.d/ssl.conf

ドキュメントルート、SSL化のファイルのパスとかログの書き出し場所を記載するファイル。

```ssl.conf:title=ssl.conf

#80はポート番号でhttpのこと
<VirtualHost *:80>	
	DocumentRoot 表示するフォルダのパス
	ServerName ドメイン名
	RewriteEngine On
	RewriteCond %{HTTPS} off
	ErrorLog /var/log/httpd/エラーログのフォルダ名
	CustomLog /var/log/httpd/アクセスログのフォルダ名 combined env=!nolog
	EnableMMAP Off
	EnableSendfile Off
</VirtualHost>	

#443はhttps
<VirtualHost *:443>	
	DocumentRoot 表示するフォルダのパス
	ServerName ドメイン名
	SSLEngine on
	SSLCertificateFile  /etc/httpd/conf/SSL証明書ファイル名.crt
	SSLCertificateKeyFile /etc/httpd/conf/鍵ファイル名.key
	SSLCertificateChainFile /etc/httpd/conf/中間証明書ファイル名.cer
	ErrorLog /var/log/httpd/エラーログのフォルダ名
	CustomLog /var/log/httpd/アクセスログのフォルダ名 combined env=!nolog
	EnableMMAP Off
	EnableSendfile Off
</VirtualHost>	

```
※vhost.confとssl.confで設定されてるものや、どちらかだけで設定されてるものもある  

## アクセスログの取り方の例

レンタルサーバーのツールもあるが、生でとる場合は参考先を参照

<div class="boxparts ref">
  <div class="title"></div>

  https://www.homepage-tukurikata.com/access/log.html
</div>

### 参考元より抜粋

一般的には、サーバーの管理画面でアクセスログの保存設定を有効にしたのち、保存期間なども指定することでデータが蓄積されていきます。
レンタルサーバーに「log」などのフォルダが作成されている場合、その場所にログが保存されていることが多いです。  

以下の内容が1固まりで書いてあるとのこと。

- IPアドレス
- 時間
- 取得したファイル
- リクエストしたサーバードメイン
- ステータス


次のページに行った場合にも同じようにアクセスログが追加されていくため、
その時間差からそのページでの滞在時間を調べることができます。  

また、最後にアクセスしたページから、どのページで離脱したのかも判断することができます。  

### 実際使うには？

ただし、以下のように情報が多すぎるため、ログとして利用するために、必要な情報だけに絞る仕組みが、結局必要になりそうです。

画像素材などのファイル（.pngや.jpg、.gifなど）、グーグルなどのクローラーによるアクセスもその都度ログに記載されることになります。  
そのため、このアクセスログを調べる際は、膨大なデータのなかから画像やクローラーなどのアクセスを取り除いて調べる必要があります。  

例えば、１ページ内で画像やCSSなどのファイルを10個使用していた場合、その１ページを閲覧する際にも各ファイルへのアクセスが10個発生してしまうため
実際のアクセスよりも10倍のヒット数が計測されてしまいます。

そのため、アクセスログで実際の訪問者のアクセス数を計測する場合、一般的には「.html」などのファイルのみをカウントして１ページビューとカウントすることになります。