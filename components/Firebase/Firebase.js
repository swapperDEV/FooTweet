import React, { useEffect, useState } from "react";
import { firebaseConfig } from "./firebase-config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FirebaseContext } from "../../store/firebase-context";
import { signOut } from "firebase/auth";
import "firebase/firestore";
import ImageStyle from "./firebase.module.scss";
import UserProvider from "./UserProvider";

const Firebase = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [registerDataState, setDataState] = useState();
  const [canLogged, setCanLogged] = useState(false);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const signOutUser = () => {
    return signOut(auth);
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setCanLogged(true);
    });
  });
  //TO CHANGE -> NAMES OF PARAMS.
  const setData = (data1, data2, data3) => {
    console.log(data1, data2, data3);
    setDataState({
      data1,
      data2,
      data3,
    });
  };
  const resetRegisterData = () => {
    setDataState();
  };

  return (
    <>
      <FirebaseContext.Provider
        value={{
          registerData: registerDataState,
          resetRegisterData: () => resetRegisterData(),
          setRegisterData: (x, y, z) => setData(x, y, z),
          canLogged: canLogged,
          auth: auth,
          app: app,
          currentUser: currentUser,
          setCurrentUser: (x) => setCurrentUser(x),
          signOutUser: () => signOutUser(),
        }}
      >
        {canLogged ? (
          <UserProvider>{props.children}</UserProvider>
        ) : (
          <div className={ImageStyle.wrapper}></div>
        )}
      </FirebaseContext.Provider>
    </>
  );
};

export default Firebase;
