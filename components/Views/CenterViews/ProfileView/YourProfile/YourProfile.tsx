import React, { useContext, useState } from "react";
import { ProfileDescription } from "../ProfileComponent/YourProfileDescription/ProfileDescription";
import { Followed } from "../ProfileComponent/Followed/Followed";
import { UserPosts } from "../ProfileComponent/UserPosts/UserPosts";
import { EditProfile } from "../ProfileComponent/EditProfile/EditProfile";
import profileStyles from "./yourprofile.module.scss";
import { FirebaseContext } from "../../../../../store/firebase-context";
import { Loader } from "../../../../Loader/Loader";

type UserData = {
  following?: Array<string>;
  username?: string;
};

export const YourProfile = () => {
  const fbCtx = useContext(FirebaseContext);
  const [userData, setUserData] = useState<UserData>({
    following: [],
    username: "",
  });
  const [sectionType, changeSection] = useState("tweets");
  const updateUserData = (data: UserData) => {
    setUserData(data);
  };
  const updateSection = (section: string) => {
    changeSection(section);
  };
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
          <UserPosts userData={userData} id={fbCtx.currentUser.uid} />
        )}
        {sectionType === "editprofile" && <EditProfile />}
        {sectionType === "friends"}
        {sectionType === "followed" && (
          <>
            {userData.following ? (
              <>
                {userData.username && (
                  <>
                    <Followed
                      followedUsers={userData.following}
                      id={fbCtx.currentUser.uid}
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
