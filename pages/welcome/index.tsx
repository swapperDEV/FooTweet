import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../store/firebase-context";
import { SignupComponent } from "../../components/Signup/Signup";
import Router from "next/router";
import WelcomeComponent from "../../components/Welcome/Welcome";
import UnAuthRoute from "../../routes/UnAuthRoute";
import Head from "next/head";

export default function Welcome() {
  const FirebaseCtx = useContext(FirebaseContext);
  const { currentUser } = FirebaseCtx;
  useEffect(() => {
    if (currentUser) {
      Router.push("/home");
    }
  });
  return (
    <>
      <Head>
        <meta name="color-scheme" content="light only" />
        <title>FooTweet</title>
      </Head>
      <UnAuthRoute>
        <WelcomeComponent />
      </UnAuthRoute>
    </>
  );
}
