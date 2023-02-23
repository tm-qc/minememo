---
title: '【Vim】最低限の操作方法メモ' #記事のタイトル
date: '2022-10-14' #作成日
update_at: '2022-10-14' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'vim-operation-memo' #url ファイル名と合わせてください
hero_image: '../images/posts/vim_logo.png' #アイキャッチ画像
tags: ["Vim"] #タグ カテゴリとして使ってもOK
---

<div class="toc-title">目次</div>

```toc
```



基本操作
----

基本的な操作メモ。

<table class="cps-table03"><tbody><tr style="height: 19px;"><th style="height: 19px; width: 189.703px;">操作キー↓</th><td class="rankinginfo" style="height: 19px; width: 461.297px;">概要↓</td></tr><tr><th>右クリック</th><td class="rankinginfo">コピーしたものをペースト</td></tr><tr><th>i</th><td class="rankinginfo">インサートモードに切り替えて書きこめる状態にする</td></tr><tr><th>esc</th><td class="rankinginfo">インサートモード終了</td></tr><tr><th>:q</th><td class="rankinginfo">保存せずにvim終了</td></tr><tr><th>:wq</th><td class="rankinginfo">保存してvim終了</td></tr></tbody></table>

検索モード
-----

画面下部に/が出てるのでそこに検索文言入力しEnter  
※insertモードではできない

<table class="cps-table03" style="height: 95px;"><tbody><tr style="height: 19px;"><th style="height: 19px; width: 189.703px;">操作キー↓</th><td class="rankinginfo" style="height: 19px; width: 461.297px;">概要↓</td></tr><tr style="height: 19px;"><th style="height: 19px; width: 189.703px;">/</th><td class="rankinginfo" style="height: 19px; width: 461.297px;">上から順番に検索する</td></tr><tr style="height: 19px;"><th style="height: 19px; width: 189.703px;">?</th><td class="rankinginfo" style="height: 19px; width: 461.297px;">下から検索を行う</td></tr><tr style="height: 19px;"><th style="height: 19px; width: 189.703px;">n</th><td class="rankinginfo" style="height: 19px; width: 461.297px;">順方向に次の検索結果へジャンプする</td></tr><tr style="height: 19px;"><th style="height: 19px; width: 189.703px;">N</th><td class="rankinginfo" style="height: 19px; width: 461.297px;">逆方向に前の検索結果へジャンプする</td></tr></tbody></table>


<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
  Vimはなれないと不安になります笑 
  </div>
</div>
