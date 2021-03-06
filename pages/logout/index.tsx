import React, { useContext, useEffect } from "react";
import { FirebaseContext } from "../../store/firebase-context";
import Router from "next/router";
import { UserDataContext } from "../../store/userData-context";

export default function Logout() {
  const FirebaseCtx = useContext(FirebaseContext);
  useEffect(() => {
    FirebaseCtx.signOutUser();
    Router.push("/");
  });
}
