import React, { useContext, useEffect, useState } from "react";
import { getDate } from "../functions/getDate";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { FirebaseContext } from "../store/firebase-context";
import { getStorage, ref as sRef, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type UserData = {
  email: string;
  notifications: Array<string>;
  uid: string;
};

export const useUser = () => {
  const FirebaseCtx = useContext(FirebaseContext);
  const { currentUser, auth } = FirebaseCtx;
  const [isLoaded, changeIsLoaded] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    email: "Error",
    notifications: [],
    uid: "error",
  });
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const getAvatar = async () => {
    let data;
    const storage = getStorage();
    const db = getFirestore();
    const userRef = doc(db, "users", userData.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      data = userSnap.data();
      getDownloadURL(sRef(storage, `avatars/${data.avatarID}.jpg`)).then(
        (url) => {
          setUserAvatar(url);
        }
      );
    }
  };
  useEffect(() => {
    if (FirebaseCtx.currentUser) {
      const db = getFirestore();
      onSnapshot(
        doc(db, `users/${FirebaseCtx.currentUser.uid}`),
        (snapshot) => {
          console.log("cahnge");
          if (snapshot.exists()) {
            const data = snapshot.data() as UserData;
            if (data.notifications.length > userData.notifications.length) {
              if (isLoaded) {
                toast.info("You get a notification!", {
                  position: "bottom-right",
                  theme: "dark",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            }

            setUserData(data);
          }
          changeIsLoaded(true);
        }
      );
    }
  }, [currentUser]);
  useEffect(() => {
    if (FirebaseCtx.currentUser) {
      const db = getFirestore();
      if (FirebaseCtx.registerData) {
        clearData();
        setDoc(doc(db, "users", `${FirebaseCtx.currentUser.uid}`), {
          username: FirebaseCtx.registerData.data2,
          email: FirebaseCtx.registerData.data1,
          name: FirebaseCtx.registerData.data3,
          createDate: getDate(),
          avatarID: "standard",
          location: "Football pitch",
          followers: [],
          following: [],
          retweets: [],
          messages: [],
          bio: "",
          uid: FirebaseCtx.currentUser.uid,
          notifications: [
            {
              type: "normal",
              content: "Welcome on FooTweet, have a good time with us.",
              from: "Admin",
              id: `${getDate()}${FirebaseCtx.currentUser.uid}`,
            },
          ],
        });
        FirebaseCtx.resetRegisterData();
      }
    }
  }, [FirebaseCtx.currentUser]);
  const clearData = () => {
    setUserData({
      email: "Error",
      notifications: [],
      uid: "error",
    });
    setUserAvatar(null);
  };
  useEffect(() => {
    console.log("test", userData.uid);
    if (userData.uid) {
      getAvatar();
    }
  }, [userData.uid]);
  return { getAvatar, userAvatar, userData, clearData };
};
