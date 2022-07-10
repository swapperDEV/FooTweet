import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../store/firebase-context";
import { SignupComponent } from "../../components/Signup/Signup";
import Router from "next/router";
import UnAuthRoute from "../../routes/UnAuthRoute";
import Head from "next/head";

export default function Signup() {
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
        <title>FooTweet SignUP</title>
      </Head>
      <UnAuthRoute>
        <SignupComponent />
      </UnAuthRoute>
    </>
  );
}
