---
title: '【C#】変数についてメモ' #記事のタイトル
date: '2024-11-28' #作成日
update_at: '2024-11-28' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'c_sharp_variable_memo' #url ファイル名と合わせてください
hero_image: '../images/posts/c_sharp_Icon.png' #アイキャッチ画像
tags: ["C#"] #タグ カテゴリとして使ってもOK
---

<div class="toc-title">目次</div>

```toc
```

## はじめに
C#はじめました。
個人的なメモです

## 無難に守っておいたほうがいい命名規則

- 最初はアンダースコアかアルファベット
- 二文字は一文字目で使える文字か数字
- 予約語使わない
- camelCaseが一般的
- 変数以外はPascalCaseが多い

なお、アルファベット大文字小文字は区別される

## コード例

```C#:C#

// 型指定 変数名 = "値";
string strValue = "文字列の値";

// varの場合
// 初期値必須で、初期値から型推論を行ってくれる
var strValue = "文字列の値"; 

```

## さいごに

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
  とりあえず久しぶりの更新。
  更新方法思い出し。

  まさかここにきてWEBプログラムしかしたことなかったのに、C#に踏み込むとは思いませんでした。
  </div>
</div>
