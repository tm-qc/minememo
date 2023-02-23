---
title: '【Git/GitHub】Gitでバージョン管理を始めるときに最初にするコマンド'
date: '2020-06-01'
update_at: '2020-06-06' #無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'git-manage01'
hero_image: '../images/posts/Octocat.png'
tags: ["Git/GitHub"]
---

<div class="toc-title">目次</div>

```toc
```


はじめに
----

個人でGit、GitHubを使ったことはあるのですが、現職ではGitが採用されていないためチームでGitを使って開発するときにどういう風に使うかを具体的に知りたくて勉強しました。

今回はGitでバージョン管理を始めるときに最初にするコマンドをまとめておこうと思います。  
※前提としてGitがインストール済でGitHubアカウントは既に持っている状態

※200606にolの番号リストで表示していた部分をh3に置き換えました。  
それでも微妙だけど、単純に使っていくため致し方なし😐

GitとGitHubとは
------------

ざっくりですが、簡単にいうと以下のようなものです。

### **Git**

ファイルをバージョン管理する仕組み

### **GitHub**

Web上でファイルの保管、共有する機能

既存のプロジェクトから作業を始める場合
-------------------

### PCの作業フォルダにコマンドで移動

```
cd ディレクトリ名
```

※Gitコマンドではありません。  
Windows/Macの共通のコマンドでフォルダ移動するためのコマンドです​

### ローカルリポジトリにリモートリポジトリの内容をコピー(CLONE)

```
git clone リポジトリ名​
```

※リポジトリ名はリポジトリのhttps~~.gitのURLでOK

<div class="boxparts ref">
  <div class="title"></div>
  
**リポジトリとは** 
バージョン管理においてファイルやディレクトリを保存する場所のことをリポジトリといいます。

ローカルリポジトリ：作業者のPC内のリポジトリ  
リモートリポジトリ：Web上のGitHubのリポジトリ
</div>

新規プロジェクトから作業を始める場合
------------------

### PCの作業フォルダにコマンドで移動

```
cd ディレクトリ名
```

※Gitコマンドではありません。  
Windows/Macの共通のコマンドでフォルダ移動するためのコマンドです

### 移動先のフォルダでローカルリポジトリを作成

```
git init​​
```

### GitHubでリモートリポジトリを新規作成

リモートリポジトリがない場合はWebでGitHubにログインし、リポジトリのページへアクセスし
<span style="background-color: #01dd01; color: #ffffff; font-weight: bold; border-radius: 4px; padding: 4px;">「New」</span>をクリックすると作成できます。

<div class="boxparts ref">
  <div class="title"></div>
  
リポジトリ新規作成時にReadmeファイルを同時に作成するチェックボックスがあります。

チェックせずに進むとローカルリポジトリに紐づけるために、以降必要なコマンドを表示してくれるので参考にしてみてください。

以降の git remote や git push の流れなどが書いてあります。
</div>

### originという名前にリモートリポジトリのURLを紐づける

```
git remote add origin リモートリポジトリのURL​
```

<div class="boxparts ref">
  <div class="title"></div>
  
git remote をしなかった場合は、毎回リモートリポジトリのURLを打たないといけなくなります。

またoriginとはGitの慣用句みたいなもので、アクセス先のリモートリポジトリのデフォルトの名前(リモート名)です。

例えば git push origin master というコマンドなら、リモートリポジトリのmasterブランチへpushするという意味になります。
</div>

### ローカルリポジトリにファイルを作成し、リモートに初回プッシュをしておく

```
git push -u origin master
```

<div class="boxparts ref">
  <div class="title"></div>
  
**-uについて**

今後pushするときに origin master を以後省略できるようにするためのpushコマンドのoptionです。

git pushのデフォルトが origin master なので省略できます。  
-uは**初回のみ**使います。
</div>

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
これでGitでバージョン管理を行う準備ができました。

このあとは add commit push など様々なGitコマンドを利用しバージョン管理を行いながら開発をすすめます
  </div>
</div>


今回参考にさせていただいた教材について
-------------------

教材はUdemyの有料の動画教材です。

<span data-offset-key="d1jf4-2-0">[ Git： もう怖くないGit！チーム開発で必要なGitを完全マスター](https://www.udemy.com/share/101WYWCEcfcFdWRnw=/) </span>

メンターのPCがMac、テキストエディターがAtomなので環境が違うと少し詰まりますが、個人的には学習を進める上では大きな障害にはなりませんでした。

※Windowsの場合はファイル操作などの簡単なコマンドを調べる必要はあります。  
※Git利用時にAtomを紐づけてるのですが、私はVS CODEを使っており紐づけがうまくいきませんでした。  
※テキストエディターがなくてもGitコマンドの -m というオプションを使えば問題なく進めます。

<span style="color: #ff0000;">**内容自体はとてもわかりやすいので、本などから入るよりおすすめ**</span>です。  
操作しながら学べて、メンターの経験からこうしてるという話もあるので理解がしやすいです。

メンターの山浦清透さんにはとても感謝しております。  
ありがとうございます。