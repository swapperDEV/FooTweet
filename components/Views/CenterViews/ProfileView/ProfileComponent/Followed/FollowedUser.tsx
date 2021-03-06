import React, { useEffect, useState } from "react";
import { getUserData } from "../../../../../../functions/getUserData";
import { Avatar } from "../../../../../Avatar/Avatar";
import followedStyles from "./followed.module.scss";
import errorAvatar from "../../../../../../assets/standard.jpg";
import Image from "next/image";
import Router from "next/router";

interface IFollowedUserProps {
  user: String;
  unFollowUser: Function;
  check1: string;
  check2: string;
}
type UserData = {
  avatarID: string;
  username?: string;
  name?: string;
  uid?: string;
};

export const FollowedUser = ({
  user,
  unFollowUser,
  check1,
  check2,
}: IFollowedUserProps) => {
  const [data, setData] = useState<Array<UserData>>([{ avatarID: "standard" }]);
  const getFullUserData = async () => {
    getUserData(user).then((value) => {
      setData(value);
    });
  };
  const showProfile = () => {
    Router.push(`/profile/${data[0].username}`);
  };
  useEffect(() => {
    getFullUserData();
  }, [user]);
  return (
    <>
      <div className={followedStyles.followingUser}>
        <div className={followedStyles.avatar}>
          {data[0].avatarID !== "standard" ? (
            <Avatar userID={data[0].avatarID} />
          ) : (
            <Image
              src={errorAvatar}
              width="40"
              height="40"
              onClick={() => showProfile()}
            />
          )}
        </div>
        <div className={followedStyles.name}>
          <p>{data[0].name}</p>
          <p className={followedStyles.username}>@{data[0].username}</p>
        </div>
        <div className={followedStyles.buttons}>
          {check1 === check2 && (
            <button
              onClick={() => unFollowUser(data[0].username, data[0].uid)}
              className={followedStyles.btn}
            >
              Unfollow
            </button>
          )}
          <button onClick={() => showProfile()} className={followedStyles.btn}>
            Show profile
          </button>
        </div>
      </div>
    </>
  );
};
