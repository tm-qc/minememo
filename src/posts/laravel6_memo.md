---
title: '【Laravel】Laravel6の個人用のメモ' #記事のタイトル
date: '2023-07-18' #作成日
update_at: '2023-07-18' #更新日 無いとエラーになるので更新日ないときはdateと揃えてください。
slug: 'laravel6_memo' #url ファイル名と合わせてください
hero_image: '../images/posts/Laravel-icon.jpg' #アイキャッチ画像
tags: ["Laravel","個人用メモ"] #タグ カテゴリとして使ってもOK
---

<div class="toc-title">目次</div>

```toc
```


## はじめに

Laravel6の完全個人用のメモです。

## 主な初期設定

個人でとりあえず書き出すレベルの初回の設定なので、プロジェクトによってはもっと沢山あると思います。

### 1.DB設定

.envファイルで以下に各種設定値を記載する。

```php:title=Laravel

//MySQLの場合
DB_CONNECTION=mysql
DB_HOST=mysql
DB_DATABASE=db_name
DB_USERNAME=user_name
DB_PASSWORD=password

```

### 2.タイムゾーン

config/app.phpを書き換える

```php:title=Laravel

'timezone' => 'UTC',
↓
'timezone' => 'Asia/Tokyo',//日本時間に変更

```

### 3.バリデーションの日本語化

本ページの[バリデーションメッセージの日本語化について](#バリデーションメッセージの日本語化について)参照


## Laravelでいろいろ反映しないとき

以下のコマンドでキャッシュのクリアをします。  
※他にもあるけど、主に使うコマンド

```php:title=Laravel

php artisan config:clear //設定ファイル(.env や config/*.php )のキャッシュをクリア
php artisan cache:clear　//アプリケーションのキャッシュクリア

```


## DIとは
引数を渡すときにクラスをインスタンス化して、引数として渡すことが出来る機能。<br>
(Classの内部で別のClassをnewしないのがポイントだそうです。)  

DIを使い事前に依存関係の機能を記載しておくことで、呼び出し時の記載漏れによるエラーを予防できます。<br>

このことを依存関係の解決と良います。  
Class内部でインスタンス化しないことで、使いまわしが簡単になる。これがDIのメリットとのこと。

function Sample(ClassName 引数1){}と書くことで、ClassNameというクラスがインスタンス化されて、引数1で書いた変数で使えるようになる。

```php:title=Laravel_DI例

public $class_name;

public function Sample(ClassName $class_name){
  //ClassNameをインスタンス化したものを代入して、$this->class_nameというpublic変数で使えるようにしている。
  $this->class_name = $class_name;
}

```

## Bladeでのテンプレート参照について

### XSS対策
{{$変数名}}で参照ができ、自動でXSS対策のエスケープをしてくれます。  
また、あまり使うことはないが{{!!$変数名!!}}でXSSのエスケープをしないようにできます。  

### OR演算子
{{$変数名 or '値なし'}}のようにOR演算子も使えます。  
※値がない場合に「値なし」と表示する。  

### Vue.jsの変数参照について
Vue.jsは{{変数名}}で参照するが、この書き方はBladeの書き方と同じになる。  
そのため、Vue.jsの変数として参照する場合は@{{変数名}}と記載すると良い。

## サービスプロバイダーとは
サービスコンテナの結合(=登録)やイベントリスナー、フィルター、ルートなどを登録する場所のこと。  

場所は app/Providers でここにいろんなプロバイダーのファイルが入っている。

サービスコンテナはどこに記載してもいいが、一般的にサービスプロバイダーに結合(登録)の定義を記載しておけば、管理しやすくなります。  
またサービスプロバイダーはLaravel起動時に最初に実行される場所になっています。  

基本的なメソッドは以下の通りです。  

- register():サービスコンテナへの登録を行う
- boot():登録後に実行したい処理を記載する(Laravel起動時に実行されます)


## サービスコンテナとは
サービス(機能)を登録していつでも呼び出せる状態にして、使いまわししやすくする機能。  
基本的にはサービスプロバイダー(app/Providers)にbind関数で登録し、makeで呼び出して使う。

### 結合(登録)方法

```php:title=結合(登録)するメソッド

app()->bind('関数名',function());
//※$this->app->instance();も同じことみたいです。

```

<div class="boxparts memo">
  <div class="title"></div>
  
  - app()でサービスコンテナを呼び出してる
  - dd(app())でサービスコンテナの中身が確認できる

  ↓補足  
  dd(app())の中にbindingsというものがあり、紐づいているサービスの配列になっています。  
  bindingsではコンテナに登録しているコードが書いてある場所などの確認ができます。
</div>

### 結合した機能の呼び出し方法

```php:title=呼び出すメソッド

app()->make('登録した関数名');

```

<div class="boxparts memo">
  <div class="title"></div>
  以下のメソッドでも呼び出せるとのこと。
  
  - App:make('登録した関数名')
  - app('登録した関数名')
  - resolve('登録した関数名')

</div>

## デバッグ方法
ddd();がおすすめ  
※Dump Die Debug

## データ操作時のセレクトや削除の省略

データの指定→取得しなくてもそのデータに対して処理ができることを「暗黙のモデル結合」というみたいです。  
※この例でいうといきなりdeleteしてるように見える。

```php:title=Laravel_暗黙のモデル結合

/**
 * 暗黙のモデル結合
 * {book}でわたってきたidの本を指定→取得しなくても勝手にそのデータが消えてくれる。
 * 
 * ■原理
 * 簡単に言うと、URLにある{book}とモデルの$bookの変数名が一緒だから、
 * 勝手にURLの{book}のid情報をモデルインスタンスの$bookに渡しておきます。
 * という風に自動でしてくれるので、結果セレクトなどで指定しなくても、そのデータに対して処理ができている。ということ。
 * 
*/
Route::delete('/book/{book}',function(Book $book)){
  $book->delete();
  return redirect('/');
}

```

## formでGET、POSTを使いたい
Bladeで@method('DELETE')を使うと実現可能です。  

疑似Deleteフォームメソッドといい、POST、GETしか使えないのがformだが、DELETEが使えるような変換をして使えるようにしてくれるそうです。  
ルートではRoute::deleteで紐づけることができます。

## ファサードとは
Laravelが用意してくれてるClass。  
useで定義しておいて、CLASS名::関数名と書くことで呼び出せます。  
(staticメソッドのように使える機能とのこと)

定義する場所は以下  
illuminate\Support\Facades

```php:title=ファサード例

use illuminate\Support\Facades\View
return View::make('profile');

```

## ヘルパ関数 
ファサードVSヘルパ関数というページがあるくらい似た機能。  
こちらもLaravelが用意してくれてる機能で、どっちをつかってもいいそうです。

```php:title=ヘルパ関数例

return view('profile');

```

## クラス名::classとは？
クラスの完全修飾名(namespaceのパス)を取得できるもの。  
名前空間を使うときに役にたつ。

例)UserTableSeederクラスの絶対パスを取得  

```php:title=Laravel

UserTableSeeder::class

```

## ダミーデータを作成する

大きく三つの機能があります。  

- seeder:ダミーデータを登録
- faker:ダミーデータを生成
- factory:ダミーデータを大量に作成する

使い分けとしては、少量のデータであればseederでOK。  
大量のデータを作成する場合はfaker+factoryを使います。  

### seederの利用例

#### 1.モデルの$fillableで変更可能なカラムとして定義されてるか確認。

例）users tableの場合
app\User.php

```php:title=Laravel

// ここに定義されてるカラムが変更可能なカラムになる
protected $fillable = [
  'name','email','password'
]

```
　　

#### 2.seederクラスを生成

以下のコマンドで「database\seeds\テーブル名sTableSeeder.php」が生成されます。

```Laravel:title=artisan

php artisan make:seed テーブル名sTableSeeder

//例）users tableの場合
php artisan make:seed UsersTableSeeder

```
　　

#### 3.seederクラスのrunに登録したいデータをinsertで記載する。

例）users tableの場合のファイル  
database\seeds\UsersTableSeeder.php


```php:title=Laravel

//TOPでuseを記載
use Illuminate\Support\Facades\DB;

DB::table('users')->insert(
  [
    'name'=>'test',
    'email'=>'test@gmail.com',
    'password'=>Hash::make('test'),
  ],
  //下のようなランダム生成も可能
  [
    'name'=>Str::random(10),
    'email'=>Str::random(10).'@gameil.com',
    'password'=>Hash::make('password'),
  ],
);

```

※2行のデータををこの入れ方で手っ取り早く入れるなら以下のように出来るが、そもそも他のやり方もある。

```php:title=Laravel

//TOPでuseを記載
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

DB::table('users')->insert(
  [
    'name'=>'test',
    'email'=>'test@gmail.com',
    'password'=>Hash::make('test'),
  ],
);

DB::table('users')->insert(
  [
    'name'=>'test2',
    'email'=>'tes2@gmail.com',
    'password'=>Hash::make('test'),
  ],
);

```
　　

#### 4.seederクラスのトリガーを記載  


まとめて記載するために、database\seeds\DatabaseSeeder.phpに記載します。  

```php:title=Laravel

//配列で一気に渡せます
$this->call(
  [
    UsersTableSeeder::class,
    SampleTableSeeder::class,
  ]
)

```
　　

#### 5.実行前にオートローダを再生成します。  
※実行時に新しく作ったクラスが呼べないことがあるので、再読み込みします。

```php:title=composer

composer dump-autoload

```
　　

#### 6.seederを実行し、データを登録します。

以下のようなコマンドがあります。

```Laravel:title=artisan

php artisan db:seed //seederをすべて実行

php artisan db:seed --class=UsersTableSeeder //UserTableSeederのみ実行

php artisan migrate:fresh --seed //テーブル作成しなおし+seederをすべて実行

```

## 認証方法について(Laravel ui)

色々あると思いますが、Laravel6はLaravel uiしかないので、とりあえずその場合の走り書きです。  
ルートか、コントローラかで分かれますが、管理しやすいようにチームで決めておくのが良さそう。

ちなみにLaravel8以降はBreeze、Fortify、Jetstreamがあり、Breezeは後者二つが難しいので、簡単に使えるように追加されたもの見たいです。そしてuiはアップデートされないので今後非推奨になるとのこと。

### ルートの場合

Route::groupを使ったログイン認証方法

```php:title=Laravel

Route::group(['middleware'=>'auth'],function(){
  //ここにまとめて書ける
  Route::get('/',function(){return view('welcome');});
});

```

### コントローラの場合

コントローラクラスのコンストラクタに記載します。

```php:title=Laravel

public function __construct(){
  $this->middleware('auth');
}

```

### 認証情報の取得方法

```php:title=Laravel

//クラスで参照する場合の例
Auth::user();//複数カラムのデータを取得
Auth::user()->id;//idデータを取得

//テンプレートでの参照
{{Auth::user()->name}}さん

//コントローラでの参照
use Auth;
$authId = Auth::user()->id;

```

### コントローラの階層わけ

Exampleフォルダにコントローラを作成した場合


```php:title=Laravel

//作成コマンド
php artisan make:controller Example/ExampleController

/**
 * ルートで呼び出し
 * 
 * ※CRUD:Create（登録）、Read（読み出し）、Update（変更）、Delete（削除）
 * ※Route::resourceはCRUD操作用のアクションの叩き台が記述されたコントローラー
 * （リソースコントローラーと呼ぶ）を登録するためのメソッド
*/
Route::resource('/example','Example/ExampleController');

//名前空間つきの呼び出し
Route::namespace('Example')->group(function{
  Route::resource('/example','ExampleController');
});

```

## Eloquentでの主キーについて
基本的にはidカラムが主キーになります。  
変更する場合は、モデルクラスに以下のメンバを記載する。

```php:title=Laravel

//主キーをidカラムから別のカラムに変更
protected $primaryKey = 'id以外の主キーになるカラム名';

//補足：主キーで採番(AutoIncrement)しない場合は以下を記載
protected $incrementing = 'false';

```

## created_at、update_atの自動更新について

$table->timestampsで自動で「created_at、update_at」二つが生成され、これは自動更新となる。  
もし自動更新をしたくない場合は以下を記載する。

```php:title=Laravel

protected $timestamps = false;

```

## ビューの組み込みメソッドについて(ディレクティブ)  

### @extend

引数でビューファイル名(ブレード名)を指定することで、指定したファイルの中身をそのまま表示するディレクティブ。  

使用例)  
共通のHTMLのBladeを、子テンプレートで@extend('ビューファイル名');のように呼び出す

```php:title=Laravel

//bladeファイルが/resource/views/直下の場合
@extend('ビューファイル名');

//bladeファイルが/resource/views/ディレクトリ1/配下の場合
@extend('ディレクトリ1.ビューファイル名');


```

### @inclued
@extendと似てるが以下の違いがある。

1. ビューにデータを渡せる
2. @yieldは機能しない

```php:title=Laravel

@inclued('ビューファイル名',['変数名'=>'値']);

```

### @yield

@extendで呼び出すBladeファイルの中に記述します。  
第一引数に@sectionで指定したセクション名を指定します。 

使用例)  
親のHTMLのBladeの中で、子のHTML(セクション)を呼び出す

```php:title=Laravel

@yield('セクション名')

```

### @section
@extendで呼び出すBladeファイルの中で、子テンプレートを@yieldで呼ぶためのセクション名を設定するディレクティブ。

使用例)  
親の@yieldで呼び出したいHTMLを切り出して管理しやすくする

```php:title=Laravel

//使い方は以下の二種

//1.変数にデータを渡す
@section('セクション名','渡したいデータ')

//2.ブレード(HTML)のコードを渡す
@section('セクション名')

HTMLのコード

@endsection

```

## ビューでのCSRF保護

CSRF(Cross Site Request Forgery)はリクエストごとにサーバーとクライアントでトークンを発行、確認し、リクエストののっとりを防ぐ手段です。  
使い方はformに@csrfを組み込むだけです。

```php:title=Laravel

<form  method="POST" action="URL">
  @csrf
  <label>入力項目</label>
  <input name="item" type="text">
</form>

```
なお、Vue.js内ではLaravelのblade構文(ディレクティブなど)は組み込めないとのことで、別の方法でしないといけないみたいです。  
(便利な@csrfが使えず、色々書かないといけないので勿体ない感じ。)  

詳細は参考元にて。

<div class="boxparts ref">
  <div class="title"></div>
  
  https://tech.amefure.com/js-vue-laravel-csrf
</div>


## ビューでの$errorsについて
ビューファイルであればどこでも参照できるエラーの値が入っている変数

## withInput()について
コントローラでredirect()->withInput()と書くことで、リダイレクト先のテンプレートで入力値をSESSIONから参照できるようになる。  
参照方法は {{old('キー')}} のようにold変数とキーで参照します。  

なお、withError()もあり、これはエラー文が参照できます。

## Laravelでのページネーション
PHPで自作していた時より簡単でお手軽です。

1.モデルでの表示データ取得時にgetではなく、paginate(表示したい件数)を使う

```php:title=Laravel

$books = Book::orderBy('created_at','asc')->paginate(3);

```

2.Bladeでlinks()を使う

```php:title=Laravel

{{$books->links()}}

```


## Eloquent save()でのinsert updateの書き方

insertはnew Modelを取得し、それに対して新規登録でsaveします。

```php:title=Laravel

$books = new Book;
$books->item_name = $request->item_name;
$books->save();

```

updateは一個対象データを指定してsaveすると、updateになります。

```php:title=Laravel

$books = Book::where('user_id',Auth::user→id)→find($request→id);//update対象のデータはこれになる
$books->item_name = $request->item_name;
$books->save();

```

## cssやjsを読み込む際のパスの書き方

なお、主な読み込み方は以下の3パターン

### 1.Bladeにscriptタグで直接記載

普通にHTMLにscriptタグで書く方法だが、管理上、かなり小規模じゃない限りあまりお勧めできないかも。

### 2.jsファイルをpublicに作成してasset()で読み込み

public配下にファイルをおいて、テンプレートでasset()で読み込む。  
asset()はpublic配下を読み込みます。

ファイルも分割出来てお手軽なので、結構あるかも。

```php:title=LaravelのBlade

<script src="{{ asset('/js/hoge.js') }}"></script>

```

### 3. Laravel Mixで作成したjsファイルを読み込む

nodeのコマンドnpm run dev(開発期)やnpm run production(本番機)などでコンパイルが必要なので、このあたりの環境があれば出来る方法。  
できるならこの方法が一番いいかもしれない。

```php:title=Laravelのwebpack.mix.js

/**
 * resources/js/配下にjsを作成し、public/js配下にコンパイルされます。
*/
mix.js('resources/js/app.js', 'public/js')
   .js('resources/js/hoge.js', 'public/js') //←追加したjs。 出力名は元のが引き継がれます。
   .sass('resources/sass/app.scss', 'public/css');

```


## マイグレーションファイル作成時のテーブル名について

以下でマイグレーションファイルができるが、テーブル名は「s」をつけて複数形にすることで、自動でテーブルとモデルが紐づけられます。

```Laravel:title=artisan

php artisan make migration create_tableNames_table

//例)この場合モデル名は Book になる。
php artisan make migration create_books_table

```

## モデルクラスでの命名規則

「php artisan make:model モデルクラス名」でModelClassファイルができるが、モデル名はテーブル名を「頭文字大文字でsをなくす」という命名規則でつくる。  

これを守ると、上段の「マイグレーションファイル作成時のテーブル名について」を同じで、自動でテーブルとモデルが紐づけられます。

## 画像のアップロードフォルダについて

基本的にユーザがアップするのは2のフォルダでいいみたい。

1. public/:ロゴ画像やデザイン用のファイルなど、サービス側のリソースを配置する
2. storage/app/public:ユーザーが投稿した画像等のリソースを配置する(シンボリックリンク設定が必要)

ネットをみると 2 が多い。  
publicフォルダしか参照できないので、publicフォルダ意外はシンボリックリンクの設定が必要とのこと。  

画像表示する際は / から始めるとpublic配下という意味になるので、imagesフォルダを作成し /images/name.png などでimgタグで読み込んだんりする。  


※storage/app/publicディレクトリにはプロファイルのアバターなどのようなユーザーにより生成され、外部からアクセスされるファイルが保存されます。  
※シンボリックリンクは php artisan storage:linkコマンドを使い生成できます。  
※デフォルト設定で、Laravelのアプリのデータ保存先は"storage/app/public"になっているとのこと  

## 画像の受け取り方

流れとしては画像のパスをDBにいれて、ファイルはフォルダに入れる。  
そしてコントローラなどで受とるという流れ。  

※HTMLのフォームでは複数種類のデータを扱える enctype="multipart/form-data" を使う  

```php:title=Laravel画像受け取りサンプル

$file = $request->file('フォームでのname');//file取得

//空判定
if(!empty($file)){
 $filename = $file->getClientOriginalName();//ファイル名取得
 /**
  * プロジェクトによって違うと思うが、app/public/index.phpが起点になっている場合、
  * この指定でapp/public/uploadフォルダができてそこに画像が格納される
  *
  * なおmoveは$request->file(illuminate\Http\UploadFileクラス関連のメソッドっぽい)
  * これ以外のやり方もあるので、適宜確認はする
 */
 $move = $file->move('upload',$filename);
}else{
  $filename = '';
}

```

## localhostでjs cssが読み込めない

localhostの場合httpsは読めないので、httpにする必要がある。  
aseet()の第二引数をfalseにするとhttpになります。

なお、app/Provaiders/AppSeviceProvider.phpのURL::forceScheme('https'); は全体をhttpsにする機能なので、これをコメントアウトしていいかもしれません。


## バリデーションメッセージの日本語化について

主に以下の2つを行う。

1. バリデーションメッセージの日本語化
2. バリデーションメッセージの項目の日本語化

### 1.バリデーションメッセージの日本語化

#### 1.config/app.phpの書き換え

```php:title=Laravel

'locale' = 'ja';//enから変更

```

#### 2.以下のコマンドを一個ずつ実行 

```php:title=コマンド

//参考:https://readouble.com/laravel/6.x/ja/validation-php.html
php -r "copy('https://readouble.com/laravel/6.x/ja/install-ja-lang-files.php', 'install-ja-lang.php');"
php -f install-ja-lang.php
php -r "unlink('install-ja-lang.php');

```

#### 3.動作確認

- resources/lang に ja フォルダがあるか確認
- エラーメッセージが日本語になってるか確認

### 2.バリデーションメッセージの項目の日本語化

#### 1.resources/lang/ja/Validatin.php の配列 attributes にキー=>バリューで設定する

```php:title=Laravel_例

'attributes'=>[],

↓

//キーが変更元の英語表記、バリューが変更後の日本語表記になる
'attributes'=[
  'email'=>'メールアドレス',
],

```

## phpMyAdminのインストール
ローカルでXAMMPやDockerを使って入れたことしかないが、昔参考にした本では、public配下にコマンドでインストール→解凍→アクセスでもいけてたみたい。  

特に設定もしなくて、当時繋がったが、この辺りはプロジェクトでインフラ詳しい人に都度確認する。