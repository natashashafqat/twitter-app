import React from 'react';
import NavBarComponent from '../src/components/NavBarComponent';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Tweet } from '../src/interfaces/Tweet.interface';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

export function Timeline({ tweet }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <NavBarComponent />
      <p>Single tweet: {JSON.stringify({tweet})}</p>
      <p>{tweet.includes.users[0].name}</p>
      <p>{tweet.includes.users[0].username}</p>
      <p>{tweet.data.text}</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const singleTweetUrl = "https://api.twitter.com/2/tweets/440322224407314432?expansions=author_id";
  const res = await fetch(singleTweetUrl, {
    headers: {
      'Authorization': `Bearer ${serverRuntimeConfig.TWITTER_BEARER_TOKEN}`
    }
  });
  const tweet: Tweet = await res.json();
  return {
    props: {
      tweet
    }
  };
}

export default Timeline;