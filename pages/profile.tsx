import React from 'react';
import NavBarComponent from '../src/components/NavBarComponent';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
import { TimelineTweet } from '../src/interfaces/TimelineTweet.interface';

export function Profile({ timeline }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <NavBarComponent />
      {timeline.map((tweet: TimelineTweet) => {
        return (
          <ul>
            <li>{tweet.user.name}</li>
            <li>{tweet.text}</li>
            <li>Retweets: {tweet.retweet_count}</li>
            <li>Favourites: {tweet.favorite_count}</li>
          </ul>
        )
      })}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const timelineUrl = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=natashamulla93&count=10";
  const timelineResult = await fetch(timelineUrl, {
    headers: {
      'Authorization': `Bearer ${serverRuntimeConfig.TWITTER_BEARER_TOKEN}`
    }
  });
  const timeline: TimelineTweet[] = await timelineResult.json();
  return {
    props: {
      timeline
    }
  };
}

export default Profile;