import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../../../../../store/userData-context";
import { getUserData } from "../../../../../../functions/getUserData";
import pdescriptionStyles from "./profiledescription.module.scss";
import { FaLocationArrow } from "@react-icons/all-files/fa/FaLocationArrow";
import { FaEye } from "@react-icons/all-files/fa/FaEye";
import { FaRetweet } from "@react-icons/all-files/fa/FaRetweet";
import { FaUserFriends } from "@react-icons/all-files/fa/FaUserFriends";
import { FaEquals } from "@react-icons/all-files/fa/FaEquals";
import { unfollowUser } from "../../../../../../functions/unfollowUser";
import { followUser } from "../../../../../../functions/followUser";
import Router from "next/router";
import { Avatar } from "../../../../../Avatar/Avatar";

type ProfileProps = {
  updateUserData: Function;
  updateSection: Function;
  sectionType: string;
};
export const ProfileDescription = ({
  updateUserData,
  updateSection,
  sectionType,
}: ProfileProps) => {
  const path = useRouter();
  const UserCtx = useContext(UserDataContext);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    bio: "",
    location: "",
    following: [],
    followers: [],
    uid: "",
  });
  const searchData = async (searchingUser: string) => {
    await getUserData(searchingUser).then((value) => {
      setUserData(value[0]);
      updateUserData(value[0]);
    });
  };
  const messageUser = () => {
    const you = UserCtx.data.username;
    const he = userData.username;
    Router.push(`/messages/${you}+${he}`);
  };
  useEffect(() => {
    if (UserCtx.data.username) {
      let searchingUser;
      if (path.pathname === "/profile/[profile]") {
        searchingUser = path.query.profile;
      } else if (path.pathname === "/profile") {
        searchingUser = UserCtx.data.username;
      }
      searchData(searchingUser);
    }
  }, [UserCtx]);
  return (
    <div className={pdescriptionStyles.wrapper}>
      <div className={pdescriptionStyles.info}>
        {userData.uid !== "" && <Avatar userID={userData.uid} />}
        <p className={pdescriptionStyles.name}>{userData.name}</p>
        <p className={pdescriptionStyles.username}>@{userData.username}</p>
        <>
          {userData.username !== UserCtx.data.username && (
            <div className={pdescriptionStyles.followBtn}>
              {UserCtx.data.following !== undefined && (
                <>
                  {UserCtx.data.following.includes(userData.username) ? (
                    <button
                      onClick={() =>
                        unfollowUser(
                          userData.following,
                          userData.uid,
                          UserCtx.data.following,
                          UserCtx.data.uid,
                          UserCtx.data.username
                        )
                      }
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        followUser(
                          userData.username,
                          UserCtx.data.uid,
                          UserCtx.data.following,
                          UserCtx.data.username
                        )
                      }
                    >
                      Follow
                    </button>
                  )}
                </>
              )}
              {<button onClick={() => messageUser()}>Message</button>}
            </div>
          )}
        </>
        <p className={pdescriptionStyles.bio}>{userData.bio}</p>
        <p className={pdescriptionStyles.location}>
          <FaLocationArrow />
          {userData.location}
        </p>
        <div className={pdescriptionStyles.stats}>
          <div>
            <p className={pdescriptionStyles.statName}>FlexPoints</p>
            <p>0</p>
          </div>
          <div className={pdescriptionStyles.centerS}>
            <p className={pdescriptionStyles.statName}>Followers</p>
            <p>{userData && userData.followers.length}</p>
          </div>
          <div>
            <p className={pdescriptionStyles.statName}>Following</p>
            <p>{userData && userData.following.length}</p>
          </div>
        </div>
      </div>
      <div className={pdescriptionStyles.menu}>
        <div
          onClick={() => updateSection("tweets")}
          className={
            sectionType === "tweets" ? pdescriptionStyles.activeSection : ""
          }
        >
          <FaEye />
          <p>Tweets</p>
        </div>
        <div
          onClick={() => updateSection("followed")}
          className={
            sectionType === "followed" ? pdescriptionStyles.activeSection : ""
          }
        >
          <FaRetweet />
          <p>Followed</p>
        </div>
        <>
          {userData.username === UserCtx.data.username ? (
            <>
              <div
                onClick={() => updateSection("friends")}
                className={
                  sectionType === "friends"
                    ? pdescriptionStyles.activeSection
                    : ""
                }
              >
                <FaUserFriends />
                <p>-</p>
              </div>
              <div
                onClick={() => updateSection("editprofile")}
                className={
                  sectionType === "editprofile"
                    ? pdescriptionStyles.activeSection
                    : ""
                }
              >
                <FaEquals />
                <p>Edit profile</p>
              </div>
            </>
          ) : (
            ""
          )}
        </>
      </div>
    </div>
  );
};
