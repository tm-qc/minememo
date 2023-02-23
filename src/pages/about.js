import * as React from 'react';
import Layout from '../components/layout';
//タグコンポーネント
import Profile from './profile';
import SideTagList from './side_tag_list';
import TwitterTimeLine from './twitter_timeline';

// gatsby-config.jsでmeta情報のデフォルト値を利用する場合にseoコンポーネントを読み込む
import Seo from '../components/seo';

const AboutPage = ({ data }) => {
  // console.log(data,'About');
  return (
    <Layout>
      <div>
        <Profile />
        <SideTagList />
        <TwitterTimeLine />
      </div>
    </Layout>
  );
};


/**
 * meta情報はgatsby-config.jsでデフォルト値の設定もできる
 * ページ単位では以下のように Head を記載することで設定することができる
*/
// export const Head = () => {
//   return (
//     <>
//       <title>Aboutページ</title>
//       <meta
//         name="description"
//         content="Aboutページにはファイル一覧が表示されています"
//       />
//     </>
//   );
// };

// gatsby-config.jsでmeta情報のデフォルト値を利用する場合
export const Head = () => <Seo />;

export default AboutPage;