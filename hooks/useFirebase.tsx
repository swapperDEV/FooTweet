import React, { useEffect, useState } from "react";
import { firebaseConfig } from "../components/Firebase/firebase-config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import "firebase/firestore";
import { User } from "@firebase/auth-types";

type CurrentUser = User;
type RegisterData = {
  data1?: string;
  data2?: string;
  data3?: string;
};
export const useFirebase = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [registerDataState, setDataState] = useState<RegisterData | null>();
  const [canLogged, setCanLogged] = useState(false);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const signOutUser = () => {
    return signOut(auth);
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user as User);
      setCanLogged(true);
    });
  });
  const setData = (data1: string, data2: string, data3: string) => {
    setDataState({
      data1,
      data2,
      data3,
    });
  };
  const resetRegisterData = () => {
    setDataState(null);
  };
  return {
    currentUser,
    setCurrentUser,
    registerDataState,
    resetRegisterData,
    setData,
    canLogged,
    auth,
    app,
    signOutUser,
  };
};
