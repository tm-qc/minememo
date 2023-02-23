---
title: '【PHP】空判定メモ' #記事のタイトル
date: '2022-10-17' #作成日
update_at: '2022-10-26' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'php_blank_value_check' #url ファイル名と合わせてください
hero_image: '../images/posts//new-php-logo.png' #アイキャッチ画像
tags: ["PHP"] #タグ カテゴリとして使ってもOK
---

<div class="toc-title">目次</div>

```toc
```


PHP()空判定メモ
----------

PHP Version 5.6.30の検証結果です。

### 結論

基本的には不要な値を把握して == はつかわずに === を使ったり明確に書く方がいいと思います。

ただ値が把握できない時などは == よりは empty() がわかりやすいし安全だと思いました。

### 実験メモ

#### empty()

<table class="cps-table03"><tbody><tr><th>empty(null)</th><td class="rankinginfo">true</td></tr><tr><th>empty(false)</th><td class="rankinginfo">true</td></tr><tr><th>empty(”)</th><td class="rankinginfo">true</td></tr><tr><th>empty(0)</th><td class="rankinginfo">true</td></tr><tr><th>empty(‘0’)</th><td class="rankinginfo">true</td></tr><tr><th>empty(‘12345’)</th><td class="rankinginfo">false</td></tr><tr><th>empty(12345)</th><td>false</td></tr><tr><th>empty(‘abcde’)</th><td class="rankinginfo">false</td></tr><tr><th><div><div>empty(array())</div></div></th><td><div><div>true</div></div></td></tr></tbody></table>

#### == ”

<table class="cps-table03"><tbody><tr><th>null</th><td class="rankinginfo">true</td></tr><tr><th>false</th><td class="rankinginfo">true</td></tr><tr><th>”</th><td class="rankinginfo">true</td></tr><tr><th>0</th><td class="rankinginfo">true</td></tr><tr><th>‘0’</th><td class="rankinginfo">false</td></tr><tr><th>‘12345’</th><td class="rankinginfo">false</td></tr><tr><th>12345</th><td>false</td></tr><tr><th>‘abcde’</th><td class="rankinginfo">false</td></tr><tr><th><div><div>array()</div></div></th><td><div><div>false</div></div></td></tr></tbody></table>

#### == 0

<table class="cps-table03" style="height: 133px;"><tbody><tr style="height: 19px;"><th style="height: 19px; width: 189.703px;">null</th><td class="rankinginfo" style="height: 19px; width: 461.297px;">true</td></tr><tr style="height: 19px;"><th style="height: 19px; width: 189.703px;">false</th><td class="rankinginfo" style="height: 19px; width: 461.297px;">true</td></tr><tr style="height: 19px;"><th style="height: 19px; width: 189.703px;">”</th><td class="rankinginfo" style="height: 19px; width: 461.297px;">true</td></tr><tr style="height: 19px;"><th style="height: 19px; width: 189.703px;">0</th><td class="rankinginfo" style="height: 19px; width: 461.297px;">true</td></tr><tr style="height: 19px;"><th style="height: 19px; width: 189.703px;">‘0’</th><td class="rankinginfo" style="height: 19px; width: 461.297px;">true</td></tr><tr style="height: 19px;"><th style="height: 19px; width: 189.703px;">‘12345’</th><td class="rankinginfo" style="height: 19px; width: 461.297px;">false</td></tr><tr><th style="width: 189.703px;">12345</th><td style="width: 461.297px;">false</td></tr><tr style="height: 19px;"><th style="height: 19px; width: 189.703px;">‘abcde’</th><td class="rankinginfo" style="height: 19px; width: 461.297px;">true</td></tr><tr><th style="width: 189.703px;"><div><div>array()</div></div></th><td style="width: 461.297px;"><div><div>false</div></div></td></tr></tbody></table>

#### == ‘0’

<table class="cps-table03"><tbody><tr><th>null</th><td class="rankinginfo">false</td></tr><tr><th>false</th><td class="rankinginfo">true</td></tr><tr><th>”</th><td class="rankinginfo">false</td></tr><tr><th>0</th><td class="rankinginfo">true</td></tr><tr><th>‘0’</th><td class="rankinginfo">true</td></tr><tr><th>‘12345’</th><td class="rankinginfo">false</td></tr><tr><th>12345</th><td>false</td></tr><tr><th>‘abcde’</th><td class="rankinginfo">false</td></tr><tr><th><div><div>array()</div></div></th><td><div><div>false</div></div></td></tr></tbody></table>

#### isset()

「変数が宣言されていること、そして null とは異なることを検査する」なので今回の検証からは除外

<div class="boxparts ref">
  <div class="title"></div>
  
  <https://www.php.net/manual/ja/function.isset.php>
</div>

#### is\_null()

「 変数が null かどうか調べる」なので今回の検証からは除外

<div class="boxparts ref">
  <div class="title"></div>
  
  <https://www.php.net/manual/ja/function.is-null.php>
</div>

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
  明確に把握してかけるのが一番です！
  </div>
</div>
