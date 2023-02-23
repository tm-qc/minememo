---
title: '【PHP】データの連番確認と、抜け番またはMAX+1を生成する関数'
date: '2020-06-04'
update_at: '2020-06-04' #無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'php-issue-no'
hero_image: '../images/posts/server01.jpg'
tags: ["PHP"]
---

<div class="toc-title">目次</div>

```toc
```


はじめに
----

データベースから持ってきた数字のデータをチェックし、「抜け番」または「MAX+1」を生成する関数を作成しました。

作成環境のPHPが5.3系だったので、コードは5.3系で動くものになっています。  
何か不整合があれば教えてください。

またご利用の際は、ご自身でしっかりチェックを行い、自己責任でご利用をお願いいたします。

コード
---

```PHP:title=PHP
/*
* サンプルデータ
* DBなどから取得したりする流れになると思いますが、処理中に最後の番号を参照するので、昇順できちんとソートしましょう。
*/
$numData = array(1,2,4,5); 

/**
* 新規番号を抜け番 or MAX+1で発行する
* @param {array} $numData DBや何かしら持ってきたNoのデータ配列
* @return {number} 抜け番 or MAX+1
*/
function issueNo($numData){
 $maxIdx = count($numData)-1;
 $range = range(1,$numData[$maxIdx]); //1~データの最後のNoで連番の配列を作成
 foreach($range as $idx => $rangeNo){
  if($rangeNo !== $numData[$idx]) return $rangeNo; //抜け番を返して終了
 }
 //MAX+1を返して終了
 return $numData[$maxIdx] + 1;
}

```

処理結果
----

### 抜け番があるデータを処理した場合

例えば array(1,2,4,5);  
をこの関数に渡し処理した場合は**抜け番の「3」がリターン**されます。

### 抜け番がないデータを処理した場合

例えば array(1,2,3,4,5);  
のようなデータを処理すると**MAX+1の「6」がリターン**されます。

解説
--

ポイントはrangeです。

```PHP:title=PHP
 $range = range(1,$numData[$maxIdx]); 
```

rangeで今回作成される配列は**1～取得データのMAX値の連番の配列**になります。

<span style="color: #ff0000;">**rangeで作成した連番の配列と取得したデータの数字の配列を比較する**</span>ことで、連番かどうかを確認しています。

以上です。

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
  慣れないうちは頭で処理を想像するのが大変かもしれませんが、作っていれば慣れていくので大丈夫です
  </div>
</div>


