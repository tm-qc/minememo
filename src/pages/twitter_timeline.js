import React from 'react';
import { Timeline } from 'react-twitter-widgets';
import { useStaticQuery, graphql } from "gatsby"

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
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: data.site.siteMetadata.social.twitter // アカウント名
          }}
          options={{
            height: '600'
          }}
        />
      </main>
  )
}

export default TwitterTimeLine