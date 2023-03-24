---
title: '【Git/GitHub】ファイルの状態をブランチ切り替えで変更できるようになるタイミング'
date: '2023-03-24'
update_at: '2023-03-24' #無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'git-manage03'
hero_image: '../images/posts/Octocat.png'
tags: ["Git/GitHub"]
---

<div class="toc-title">目次</div>

```toc
```


はじめに
----

GitHubで動作確認用のブランチを作ったときに、あれ？mainとブランチ切り替えてもローカルのソースの状態が変わらない。ってなったので、ファイルの状態をブランチ切り替えで変更できるようになるタイミングを調べました。

結論
----
ファイルの状態をブランチ切り替えで変更できるようになるタイミングは・・・


git commit したタイミング

です。

ブランチをつくっただけ、git add でインデックスに登録しただけでは、ローカルのソースをブランチ切り替えで変更出来ませんでした。

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
  はっきりわかっておけば安心なので、メモがてら残しておきます。
  </div>
</div>