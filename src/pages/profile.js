import React from "react"
import { useStaticQuery, graphql } from "gatsby"

// CSS読み込み
import * as style from '../components/css/profile.module.css';
// プロフィールアイコン(画像もインポートじゃないと読み込めない)
import profileIcon from '../images/profile_img.jpg';


/**
 * なぜかPageQueryでは動かなかったので↓のStaticQueryに書き換え
*/
const ProfilePage = () => {
  const data = useStaticQuery(graphql`
  query {
    allSite {
      edges {
        node {
          siteMetadata {
            user {
              email
              job
              name
            }
            profile
          }
        }
      }
    }
  }
`)

// console.log(data,'Profile')
return(
  <div>
    <div className={style.profileBox}>
      <div><img className={style.profileIcon} src={profileIcon} alt="profile_icon"/></div>
      <div className={style.userName} > {data.allSite.edges[0].node.siteMetadata.user.name}</div>
      <div className={style.userJob} > {data.allSite.edges[0].node.siteMetadata.user.job}</div>
      <div className={style.profileItem} > {data.allSite.edges[0].node.siteMetadata.profile}</div>
    </div>
  </div>

)
}

export default ProfilePage
