import React from 'react';
import { Timeline } from 'react-twitter-widgets';
import { useStaticQuery, graphql } from "gatsby"

// CSS読み込み
import * as style from '../components/css/twitter.module.css';

const TwitterTimeLine = () => {
  const data = useStaticQuery(graphql`
    query{
      site {
        siteMetadata {
          social {
            twitter
          }
        }
      }
    }
  `)
  // console.log(data,"TwitterTimeline")
  return (
      <main>
        <div className={style.twitterFrame}>
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: data.site.siteMetadata.social.twitter // アカウント名
          }}
          options={{
            height: '600'
          }}
        />
        </div>
      </main>
  )
}

export default TwitterTimeLine