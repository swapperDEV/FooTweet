import React from "react";
import View from "../../components/Views/View";
import PrivateRoute from "../../routes/PrivateRoute";
import Head from "next/head";

export default function Search() {
  return (
    <>
      <Head>
        <title>FooTweet</title>
      </Head>
      <PrivateRoute>
        <View />
      </PrivateRoute>
    </>
  );
}
