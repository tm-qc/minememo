import * as React from 'react';
//GraphQL
import { Link } from 'gatsby';
import * as style from '../components/css/pagenate.module.css'

/**
 * ページャのボタン生成コンポーネント 
 * 
 * ※ページャの数が増えすぎたら調整用の改修が必要かも
 * 何記事単位とかの設定はgatsby-node.jsでしてる
 * 
 * @param {object} data gatsby-node.js > src\templates\index.jsの流れで渡されるページャのデータ(pageContext)
 */
const Pagenate = ({ pageContext }) => {
  console.log(pageContext,'Pagenate');
  return (
    <div className={style.pagenateFrame}>
      <Link to={pageContext.previousPagePath}><span className={style.allow}>← </span></Link>
        {/* ページ数分繰り返し */}
        {[...Array(pageContext.numberOfPages)].map((_,pageNumber) => (
          pageNumber !== 0 ? 
          <Link 
            key={pageNumber} 
            to={pageNumber === 0 || pageNumber === 1 ? '/' : '/page/'+pageNumber}
          >
            <span>{pageNumber}</span>
          </Link> : ''

          
        ))}
      <Link to={pageContext.nextPagePath} ><span className={style.allow}>→ </span></Link>
    </div>
  );
};

export default Pagenate