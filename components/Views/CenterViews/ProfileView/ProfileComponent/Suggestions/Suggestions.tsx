import React, { useContext, useEffect, useState } from "react";
import { getDocs, getFirestore, collection } from "firebase/firestore";
import suggestionStyle from "./suggestion.module.scss";
import { Avatar } from "../../../../../Avatar/Avatar";
import { followUser as followUserFunction } from "../../../../../../functions/followUser";
import { UserDataContext } from "../../../../../../store/userData-context";
import { Loader } from "../../../../../Loader/Loader";

interface ISuggestionsProps {
  followedUsers: Array<string>;
  id: string;
  yourUsername: string;
}
type DataTypes = {
  username: string;
  name: string;
  uid: string;
};
type UsersSuggestion = {
  data: DataTypes;
  id?: string;
};
export const Suggestions = ({
  followedUsers,
  id,
  yourUsername,
}: ISuggestionsProps) => {
  const userCtx = useContext(UserDataContext);
  const [usersSuggestion, updateSuggestion] = useState<Array<UsersSuggestion>>(
    []
  );
  useEffect(() => {
    const db = getFirestore();
    getDocs(collection(db, `users`)).then((snapshot) => {
      const usersList: Array<UsersSuggestion> = [];
      snapshot.forEach((doc) => {
        const data: DataTypes = doc.data() as DataTypes;
        if (data.username && data.name && data.uid) {
          if (!followedUsers.includes(userCtx.data.username)) {
            usersList.push({ data: data, id: doc.id });
          }
        }
      });
      let max = usersList.length;
      let loop = 5;
      if (usersList.length < 5) {
        loop = usersList.length;
      }
      const numbers: Array<number> = [];
      for (let i = 0; i < loop; i++) {
        max = max - 1;
        let number = Math.floor(Math.random() * (max - 0) + 0);
        while (numbers.includes(number)) {
          number = Math.floor(Math.random() * (max - 0) + 0);
        }
        numbers.push(number);
      }
      const list: Array<UsersSuggestion> = [];
      numbers.map((id: number) => {
        list.push(usersList[id]);
      });
      updateSuggestion(list);
    });
  }, []);
  const followUser = async (username: String) => {
    followUserFunction(username, id, followedUsers, yourUsername);
  };
  return (
    <div className={suggestionStyle.wrapper}>
      <div>
        <p>You should check</p>
      </div>
      <div>
        {usersSuggestion.length > 0 &&
          usersSuggestion.map((user: UsersSuggestion, index: number) => {
            const render = !followedUsers.includes(user.data.username);
            const you = user.data.username === userCtx.data.username;
            return (
              <>
                {render ? (
                  <>
                    {!you ? (
                      <>
                        {user.data ? (
                          <>
                            <div
                              key={index}
                              className={suggestionStyle.userBaner}
                            >
                              <div>
                                <Avatar userID={user.data.uid} />
                              </div>
                              <div className={suggestionStyle.userBanerInfo}>
                                <p>{user.data.name}</p>
                                <p className={suggestionStyle.username}>
                                  @{user.data.username}
                                </p>
                              </div>
                              <div>
                                <div
                                  onClick={() => followUser(user.data.username)}
                                >
                                  {followedUsers.includes(
                                    user.data.username
                                  ) ? (
                                    <button>-</button>
                                  ) : (
                                    <button>Follow</button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <Loader />
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </>
            );
          })}
      </div>
    </div>
  );
};
