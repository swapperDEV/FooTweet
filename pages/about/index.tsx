import React from "react";
import Head from "next/head";
import About from "../../components/About/About";
export default function Home() {
  return (
    <>
      <Head>
        <title>FooTweet - About us.</title>
      </Head>
      <>
        <About />
      </>
    </>
  );
}
