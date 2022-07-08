import React, { useEffect, useState } from "react";
import searchStyles from "./searchwords.module.scss";
import Posts from "../../../Posts/PostsMapper";
import { useRouter } from "next/router";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { FindedUser } from "./FindedUser";
import { UsersListType } from "../../../../types/views/searchByWords";

export const SearchByWords = () => {
  const path = useRouter();
  const [displayContent, changeContent] = useState("posts");
  const [usersList, updateUsersList] = useState<UsersListType>([]);
  const switchContent = (content: string) => {
    changeContent(content);
  };
  const getUsers = async () => {
    const db = getFirestore();
    const ref = doc(db, "app", "allusers");
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const list: Array<string> = data.usersList;
      const matchList: Array<string> = [];
      list.forEach((element: string) => {
        if (element.includes(`${path.query.search}`)) {
          matchList.push(element);
        }
      });
      updateUsersList(matchList);
    }
  };
  useEffect(() => {
    getUsers();
  });
  return (
    <div className={searchStyles.wrapper}>
      <div className={searchStyles.content}>
        <div>
          <button onClick={() => switchContent("posts")}>Posts</button>
          <button onClick={() => switchContent("users")}>Users</button>
        </div>
        {displayContent === "posts" && (
          <Posts requirements={path.query.search} requirementsType="words" />
        )}
        {displayContent === "users" && (
          <div>
            {usersList.length > 0 ? (
              <>
                {usersList.map((user: string) => {
                  return <FindedUser key={user} username={user} />;
                })}
              </>
            ) : (
              <p>Cant find users with name includes ${path.query.search}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
