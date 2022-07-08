import React, { useEffect, useState } from "react";
import profileStyles from "./userprofile.module.scss";
import { ProfileDescription } from "../ProfileComponent/YourProfileDescription/ProfileDescription";
import { UserPosts } from "../ProfileComponent/UserPosts/UserPosts";
import { Followed } from "../ProfileComponent/Followed/Followed";
import { Loader } from "../../../../Loader/Loader";
import { useRouter } from "next/router";

type UserData = {
  following: Array<string>;
  username: string;
  uid: string;
};

export const UserProfile = () => {
  const [userData, setUserData] = useState<UserData>({
    following: [],
    username: "",
    uid: "",
  });
  const [sectionType, changeSection] = useState("tweets");
  const path = useRouter();
  const updateUserData = (data: UserData) => {
    setUserData(data);
  };
  const updateSection = (section: string) => {
    changeSection(section);
  };
  useEffect(() => {
    changeSection("tweets");
  }, [path]);
  return (
    <div className={profileStyles.wrapper}>
      <div className={profileStyles.sectionFirst}>
        <ProfileDescription
          updateUserData={updateUserData}
          sectionType={sectionType}
          updateSection={updateSection}
        />
      </div>
      <div className={profileStyles.sectionSecond}>
        {sectionType === "tweets" && (
          <UserPosts userData={userData} id={userData.uid} />
        )}
        {sectionType === "followed" && (
          <>
            {userData.following ? (
              <>
                {userData.username && (
                  <>
                    <Followed
                      followedUsers={userData.following}
                      id={userData.uid}
                      yourUsername={userData.username}
                    />
                  </>
                )}
              </>
            ) : (
              <Loader />
            )}
          </>
        )}
      </div>
    </div>
  );
};
