---
title: '【Git/GitHub】知ってたら便利系のコマンド' #記事のタイトル
date: '2023-07-17' #作成日
update_at: '2023-07-17' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'git_useful_cmd_01' #url ファイル名と合わせてください
hero_image: '../images/posts/Octocat.png' #アイキャッチ画像
tags: ["Git/GitHub"] #タグ カテゴリとして使ってもOK
---

<div class="toc-title">目次</div>

```toc
```

## はじめに

取り消したり、戻したり、確認したりなどの知ってたら便利なコマンドをざっと記載します。

## git管理addの状態確認

```GitHub:title=git_command

git status

```

※編集中でaddされてないファイルは赤文字で表示される  
※addされているファイルは緑色で表示される

## ファイルの変更内容を確認

```GitHub:title=git_command

#git addする前の変更分を表示(ワークツリーとステージ)
git diff

#git add した後の確認(ステージとリポジトリ)
#ネットでは git diff –cached のほうがよく出てくるが出力結果は同じでした
git diff --staged

```

## コミットメッセージの複数行

```GitHub:title=git_command

git commit -m "1行目" -m "2行目"

```


## コメント、変更履歴を確認

```GitHub:title=git_command

git log

```


## 直前のコミットを打ち消すコミット

```GitHub:title=git_command

git revert

```

※git revert HEADと同じで＝一個前(HEAD^)の状態に戻る  
※不用意な履歴が増えるのだけが懸念だが、成れないうちはこれが無難


## 誤pushをとりけしたい

```GitHub:title=git_command

git revert

↓

git push

```

怖い時は間違ってpushしたのですが、どうしたらいいか。とチームメンバーに相談するのが良さそうです。

<div class="boxparts ref">
  <div class="title"></div>
  
  https://www-creators.com/archives/2020
</div>



## ブランチ作成+切り替え

```GitHub:title=git_command

git swicth -c ブランチ名
#ブランチを新規作成して切り替える

```

## ブランチ確認

```GitHub:title=git_command

git branch
#ブランチ一覧と緑文字で今いるブランチが表示される

git branch -a 
#-a でリモート側も含めたブランチを表示する

git branch ブランチ名
#ブランチ名指定でブランチ作成ができる

```

## ローカルファイルを編集変更した後に、変更前の最終コミットの状態までローカルのファイルを戻したい

```GitHub:title=git_command

git reset --hard HEAD

```

※<span style="color:red">プッシュ前のコミットに対してのみつかわないと履歴が崩れるので危ない</span>らしい  
※HEAD^ はひとつ前のコミットまで戻すという意味。二つ前ならHEAD^^となる(~は^と同じ意味)  
※HEADなら現在作業中のHEADになる

- soft	コミットだけ取り消し
- mixed	コミットとaddを取り消し
- hard	コミット、add、フォルダのファイルも取り消し

## コミットしていない編集状態を消したり、戻したり

Ctrl+ZやCtrl+Shift+Zで直前の状態を消したり、戻したりする感覚で状態を操作できる。  
この操作で消したりした内容はメモリに確保される。  

例えば、違うブランチで作業してしまい、その内容を戻し、別のブランチのファイルにその内容を反映するみたいなことができる

```GitHub:title=git_command

git stash	
#内容をもとに戻す(消してメモリに確保)

git stash pop
#消した内容を反映する

```

## commitされる前に戻す

```GitHub:title=git_command

git restore -s HEAD^ ファイル名

```

## git pullされる前に戻す

```GitHub:title=git_command

##ログ確認
git reflog

##例）ログの二行目に戻す場合は{1}を指定する
git reset --hard HEAD@{1}

```

## git configのスコープ

```GitHub:title=git_command

$ git config --local ...   # 各リポジトリごとの設定 (.git/config)（優先度:高）

$ git config --global ...  # 現在のユーザの共通設定 (~/.gitconfig)

$ git config --system ...  # システム内の共通設定 (/etc/gitconfig など)（優先度:低）

```

## さいごに

<div class="balloon">
  <div class="icon"></div>
  <div class="talk">
  よく使うのだけしか結局覚えれないし、覚えなくてOK
  </div>
</div>
