import React, { useEffect, useRef, useState } from "react";
import hashtagsStyles from "./hashtag.module.scss";
import { FaStream } from "@react-icons/all-files/fa/FaStream";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";
import Router from "next/router";
import { PostTypes, HashtagOptions } from "../../types/hashtags";
import { Loader } from "../Loader/Loader";

const Hashtags = () => {
  const hashtagSearchRef = useRef<HTMLInputElement>(null);
  const [allHashtag, setAllHashtag] = useState(false);
  const [mappedHashtagList, setMappedHashtagList] = useState([{}]);
  const calculateHashtags = async (postList: Array<PostTypes>) => {
    const hashtags: Array<String> = [];
    postList.forEach((post) => {
      let hashtagsInPost = post.data.content?.hashtag;
      if (hashtagsInPost) {
        hashtagsInPost.forEach((hashtag: String) => {
          hashtags.push(hashtag);
        });
      }
    });
    let sortedArr = hashtags.sort();
    let hashtagsArray = [];
    let count = 1;
    for (let i = 0; i < sortedArr.length; i = i + count) {
      count = 1;
      for (let j = i + 1; j < sortedArr.length; j++) {
        if (sortedArr[i] === sortedArr[j]) count++;
      }
      const obj = {
        name: sortedArr[i],
        count: count,
      };
      hashtagsArray.push(obj);
    }
    hashtagsArray.sort((hashA, hashB) => {
      return hashB.count - hashA.count;
    });
    setMappedHashtagList(hashtagsArray);
  };
  const searchByHashtag = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      Router.push(`/hashtag/${hashtagSearchRef.current!.value}`);
    }
  };
  const redirectToHashtag = (hashtag: string | undefined) => {
    if (typeof hashtag === "string") {
      Router.push(`/hashtag/${hashtag}`, undefined, { shallow: true });
    }
  };
  const seeAllHashtag = () => {
    setAllHashtag(!allHashtag);
  };
  useEffect(() => {
    const db = getFirestore();
    onSnapshot(collection(db, "posts"), (snapshot) => {
      let postList: Array<PostTypes> = [];
      snapshot.forEach((doc) => {
        postList.push({ data: doc.data(), id: doc.id });
      });
      calculateHashtags(postList);
    });
  }, []);

  return (
    <div className={hashtagsStyles.wrapper}>
      {mappedHashtagList.length > 1 ? (
        <>
          <div className={hashtagsStyles.search}>
            <input
              placeholder="# Search post"
              ref={hashtagSearchRef}
              onKeyDown={searchByHashtag}
            />
            <FaStream />
          </div>
          <div className={hashtagsStyles.popular}>
            <div
              className={
                allHashtag
                  ? hashtagsStyles.wrapperonce
                  : hashtagsStyles.popularWrap
              }
            >
              {mappedHashtagList.map(
                (hashtag: HashtagOptions, index: number) => {
                  return (
                    <div
                      key={index}
                      className={hashtagsStyles.divHashtag}
                      onClick={() => redirectToHashtag(hashtag.name)}
                    >
                      <p>{`#${hashtag.name}`}</p>
                      <p>{hashtag.count}</p>
                    </div>
                  );
                }
              )}
            </div>
            <p className={hashtagsStyles.more} onClick={() => seeAllHashtag()}>
              {allHashtag ? "HIDE" : "SEE MORE"}
            </p>
          </div>
        </>
      ) : (
        <div className={hashtagsStyles.loader}>
          <Loader />
        </div>
      )}
    </div>
  );
};
export default Hashtags;
