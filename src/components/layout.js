/**
 * すべてのページはLayoutコンポーネントを使ってコンテンツ以外を共通化する
*/

import * as React from 'react';
import Header from './header';
import Footer from './footer';
// CSS読み込み
import * as style from '../components/css/layout.module.css';

/**
 * CSSの読み込み方
 * 
 * 以下のどっちかだが、CSS Modulesが良いらしい。
 * 
 * 1.基本的なCSS利用方法
 * 
 * ・src¥componentsフォルダにglobal.cssを作成する
 * ・普通にCSS核
 * ・import './global.css';という風に対象のコンポーネントでインポートする
 * ・要素ならそのまま反映する
 * ・classはclassName="クラス名"と<h1 className="title">こんな感じで記載する
 * 
 * 2.CSS Modulesを使った方法
 * 
 * ・componentsフォルダにコンポーネント毎にファイルを作成
 * 　例）index.module.cssとかabout.module.cssとか
 * ・module.cssを各ファイルで読み込む
 * 
 * 　インポート例1）import { title } from '../components/index.module.css';
 * 　記載例1）<h1 className={title}>
 * 
 *   インポート例2）import IndexModule from '../components/index.module.css';
 * 　記載例2）<h1 className={IndexModule.title}>
 * 　記載例2-1）<h1 className={IndexModule["hifun-name"]}>
 *  ※ハイフンがあると角カッコがいる
 * 
 * ・F12でclass名を確認すると class="index-module–title–hfJuu" みたいにランダムの命名になってる
 * 　これにより、モジュールCSSファイル間でクラス名が被っても問題ないということになる
 * 
*/

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className={style.layoutFrame}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;