import React, { useEffect, useState } from "react";
import { getUsername } from "../../functions/getUsername";
import { getStorage, getDownloadURL, ref } from "firebase/storage";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import avatarStyles from "./avatar.module.scss";
import Router from "next/router";
import { IAvatarProps } from "../../types/avatar";

export const Avatar = ({ userID }: IAvatarProps) => {
  const storage = getStorage();
  const db = getFirestore();
  const [image, setImage] = useState("");
  const getAvatar = async () => {
    if (typeof userID === "string") {
      let data;
      const userRef = doc(db, "users", userID);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        data = userSnap.data();
        getDownloadURL(ref(storage, `avatars/${data.avatarID}.jpg`)).then(
          (url) => {
            setImage(url);
          }
        );
      }
    }
  };
  const redirectToProfile = () => {
    getUsername(userID).then((value) => {
      Router.push(`/profile/${value}`);
    });
  };
  useEffect(() => {
    getAvatar();
  }, [userID]);
  return (
    <>
      <img
        src={image}
        alt=""
        width="50px"
        height="50px"
        className={avatarStyles.img}
        onClick={redirectToProfile}
      />
    </>
  );
};
