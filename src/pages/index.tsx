import { Login } from '@/components/Login';
import type { NextPage } from 'next';
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`ログイン`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content="Wedding Gateway" />
        <meta name="apple-mobile-web-app-title" content="Wedding Gateway" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta property="og:type" content={'website'} />
        <meta property="og:title" content={'Wedding Gateway｜結婚式招待サービス'} />
        <meta property="og:locale" content="ja_JP" />
        <meta name="twitter:card" content="summary" />
      </Head>
      <Login />
    </>
  );
};

export default Home;
