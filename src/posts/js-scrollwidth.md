---
title: '【JavaScript】IE11で要素の幅を取得しても結果が0になり取得できない' #記事のタイトル
date: '2021-02-08' #作成日
update_at: '2021-02-08' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'js-scrollwidth' #url ファイル名と合わせてください
hero_image: '../images/posts/1294_ie_logo.png' #アイキャッチ画像
tags: ["JavaScript"] #タグ カテゴリとして使ってもOK
---

<div class="toc-title">目次</div>

```toc
```

はじめに
----

仕事でIE11のレイアウト調整をしていたときに、clientWidthやoffsetWidthで要素の幅を取得しようとしても結果が 0 になり取得できずに困ったので、記事に残しておきます😃

(clientHeightやoffsetHeightは反映していたのになんでwidthは0だったのか…)

しらべてもなかなか出てこなかったの参考になればうれしいです😃

<div class="boxparts ref">
  <div class="title"></div>
  
[Element.clientWidth](https://developer.mozilla.org/ja/docs/Web/API/Element/clientWidth)

[HTMLElement.offsetWidth](https://developer.mozilla.org/ja/docs/Web/API/HTMLElement/offsetWidth)
</div>

解決方法
----

Element.scrollWidthを使い取得する

<div class="boxparts ref">
  <div class="title"></div>
  
[Element.scrollWidth](https://developer.mozilla.org/ja/docs/Web/API/Element/scrollWidth)
</div>



<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
IE11でブラウザの幅を取る方法とか、offset、clientWidthのことはすぐ出てくるのですが、scrollWidthのことがなかなか出てこなかったので、参考になれば幸いです<br>
自分はIEのデバッガーでなんとか見つけ出しました😅
  </div>
</div>
