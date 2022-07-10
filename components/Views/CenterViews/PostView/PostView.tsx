import React, { useEffect, useState } from "react";
import viewStyles from "../../styles/view.module.scss";
import { Post } from "../../../Posts/Post";
import { useRouter } from "next/router";
import { getFirestore, doc, getDoc, onSnapshot } from "firebase/firestore";
import Router from "next/router";
import { PostDataType, DataOptions } from "../../../../types/post/post";

export const PostView = () => {
  const [data, setData] = useState<PostDataType | null>(null);
  const path = useRouter();
  useEffect(() => {
    if (path.query) {
      const db = getFirestore();
      onSnapshot(doc(db, `posts/${path.query.postId}`), (doc) => {
        if (doc.exists()) {
          const data = doc.data() as DataOptions;
          console.log(data, "test");
          setData({ data: data });
        } else {
          Router.push("/");
        }
      });
    }
  }, []);
  console.log(data);
  return (
    <>
      <div className={viewStyles.posts}>
        {data !== null && <Post data={data} type="long" avatar={true} />}
      </div>
    </>
  );
};
