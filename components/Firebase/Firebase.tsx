import React, { useEffect, useState } from "react";
import { firebaseConfig } from "./firebase-config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FirebaseContext } from "../../store/firebase-context";
import { signOut } from "firebase/auth";
import "firebase/firestore";
import ImageStyle from "./firebase.module.scss";
import { UserProvider } from "./UserProvider";
import { useFirebase } from "../../hooks/useFirebase";
import { User } from "@firebase/auth-types";

type FirebaseProps = {
  children: JSX.Element;
};
export const Firebase = ({ children }: FirebaseProps) => {
  const {
    currentUser,
    setCurrentUser,
    registerDataState,
    resetRegisterData,
    setData,
    canLogged,
    auth,
    app,
    signOutUser,
  } = useFirebase();
  return (
    <>
      <FirebaseContext.Provider
        value={{
          registerData: registerDataState,
          resetRegisterData: () => resetRegisterData(),
          setRegisterData: (x: string, y: string, z: string) =>
            setData(x, y, z),
          canLogged: canLogged,
          auth: auth,
          app: app,
          currentUser: currentUser,
          setCurrentUser: (x: User) => setCurrentUser(x),
          signOutUser: () => signOutUser(),
        }}
      >
        {canLogged ? (
          <UserProvider>{children}</UserProvider>
        ) : (
          <div className={ImageStyle.wrapper}></div>
        )}
      </FirebaseContext.Provider>
    </>
  );
};
