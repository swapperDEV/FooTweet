import React from "react";
import Head from "next/head";
import Help from "../../components/Help/Help";
export default function Home() {
  return (
    <>
      <Head>
        <title>FooTweet - Get a help.</title>
      </Head>
      <>
        <Help />
      </>
    </>
  );
}
