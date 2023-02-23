---
title: '【PHP】ディレクトリにあるファイルを削除する関数' #記事のタイトル
date: '2020-11-25' #作成日
update_at: '2020-11-26' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'php_func_del_file' #url ファイル名と合わせてください
hero_image: '../images/posts/file_icatch.jpg' #アイキャッチ画像
tags: ["PHP"] #タグ カテゴリとして使ってもOK
---

<div class="toc-title">目次</div>

```toc
```



はじめに
----

ファイルを削除する関数を書いたので載せておきます。

ファイル、ディレクトリを操作するメソッドはいろいろありますが、今回はis\_Dot()がつかえる、DirectoryIteratorクラスを使っています。

引数で以下の設定ができます。

- 削除対象のフォルダパス
- 削除対象の拡張子
- <div><div>〇日前のファイルを削除対象とするか</div></div>

パスがファイルの場合に条件を満たせば削除し、パスがフォルダなら再帰処理を行い配下のフォルダまですべて処理を行います。

なお、<span style="color: #ff0000;">**$pathに渡したフォルダのパスのファイルが削除対象**</span>になります。

<span style="color: #ff0000;">**ご利用の際は動作確認を行ったうえで、自己責任でお願いします。**</span>  
<span style="color: #ff0000;">**ファイルを消すものなので、テストして慎重に使ってください**</span>。


<div class="boxparts ref">
  <div class="title"></div>
  
DirectoryIterator クラス  
<https://www.php.net/manual/ja/class.directoryiterator.php>
</div>

コード
---

```php:title=php
<?php
/**
 * $day日前より古い+$exの拡張子のファイルを対象に$pathフォルダから削除する
 * 
 * @param {string} $path フォルダのパス
 * @param {array} $ex 配列に含まれる拡張子を削除対象とする
 * @param {int} $day $day日前より古いファイルを削除対象とする 
 *
 * ※$path = 'folderPath'に削除したいファイルがあるフォルダを指定してください。
*/
function fileDelete($path = 'folderPathを指定する' ,$ex = array('csv') ,$day = 7){
  //dirがある、$exが配列、$exの値がある、$dayが整数だったら処理開始
  if(is_dir($path) && is_array($ex) && count($ex) !== 0 && is_int($day)){
    $date = new DateTime();
    $dayAgo = $day->modify('-'.$day.'days')->getTimestamp();//確認するときは ->format(Y-m-d H:i:s) すると日時でみれます

    $dir = new DirectoryIterator($path);
    foreach ($dir as $file) {
      //. と .. は無視する
      if(!$file->isDot()){

        //ファイルの時の処理
        if($file->isFile()){
          //$dayAgoより古い & 対象の拡張子のファイルを削除
          if($file->getMTime() < $dayAgo  && in_array($file->getExtension(),$ex,true)){
            unlink($file->getPathname());
          }
        }

        //ディレクトリの時の処理
        if($file->isDir()){
          fileDelete($file->getPathname());//ディレクトリなら再帰処理
        }
      }
    }
  }
}
```