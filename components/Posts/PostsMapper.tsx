/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import postsStyles from "./post.module.scss";
import {
  getDocs,
  collection,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { Post } from "./Post";
import {
  PostsProps,
  PostListType,
  PostData,
  PostType,
} from "../../types/post/postsmapper";

export const Posts = ({ requirements, requirementsType }: PostsProps) => {
  const [posts, setPosts] = useState<Array<PostListType>>([]);
  const [newPosts, setNewPosts] = useState<Array<PostListType>>([]);
  const mappedPostByHashtag = (postList: Array<PostListType>, type: string) => {
    const mappedList: Array<PostListType> = [];
    postList.map((post) => {
      post.data.content.hashtag.map((hashtag: string) => {
        if (hashtag === requirements) {
          return mappedList.push(post);
        }
      });
    });
    if (type === "new") {
      setNewPosts(mappedList);
    } else if (type === "all") {
      setPosts(mappedList);
    }
  };
  const mappedPostByWords = (postList: Array<PostListType>, type: string) => {
    const mappedList: Array<PostListType> = [];
    postList.map((post) => {
      let description = post.data.content.description.toLowerCase();
      if (description.includes(requirements!.toLowerCase())) {
        mappedList.push(post);
      }
    });
    if (type === "new") {
      setNewPosts(mappedList);
    } else if (type === "all") {
      setPosts(mappedList);
    }
  };
  const postListening = () => {
    const db = getFirestore();
    onSnapshot(collection(db, "posts"), (snapshot) => {
      let postList: Array<PostListType> = [];
      snapshot.forEach((doc) => {
        postList.push({ data: doc.data() as PostData, id: doc.id });
      });
      postList.sort((postA: PostListType, postB: PostListType) => {
        return postB.data.metaData.createDate - postA.data.metaData.createDate;
      });
      if (requirements !== "none") {
        if (requirementsType === "hashtag") {
          mappedPostByHashtag(postList, "new");
        } else if (requirementsType === "words") {
          mappedPostByWords(postList, "new");
        }
      } else {
        setNewPosts(postList);
      }
    });
  };
  useEffect(() => {
    postListening();
  }, []);
  useEffect(() => {
    postListening();
  }, [requirements]);
  const postSearch = () => {
    const db = getFirestore();
    getDocs(collection(db, `posts`)).then((snapshot) => {
      let postList: Array<PostListType> = [];
      snapshot.forEach((doc) => {
        postList.push({ data: doc.data() as PostData, id: doc.id });
      });
      postList.sort((postA: PostListType, postB: PostListType) => {
        return postB.data.metaData.createDate - postA.data.metaData.createDate;
      });
      if (requirements !== "none") {
        if (requirementsType === "hashtag") {
          mappedPostByHashtag(postList, "all");
        } else if (requirementsType === "words") {
          mappedPostByWords(postList, "all");
        }
      } else {
        setPosts(postList);
      }
    });
  };
  useEffect(() => {
    postSearch();
  }, []);
  useEffect(() => {
    postSearch();
  }, [requirements]);
  const downloadPosts = () => {
    setPosts(newPosts);
  };
  return (
    <div className={postsStyles.posts}>
      <div className={postsStyles.changes}>
        {newPosts.length > posts.length ? (
          <button onClick={downloadPosts}>
            See {newPosts.length - posts.length} new posts
          </button>
        ) : (
          <p></p>
        )}
      </div>
      {requirements !== "none" && (
        <p className={postsStyles.requirements}>
          Search by: {requirementsType === "hashtag" ? "#" : "word "}
          {requirements}
        </p>
      )}
      {posts.length >= 1 &&
        posts.map((post: PostType) => {
          return (
            <>
              <Post
                avatar={true}
                key={post.data.metaData.postId}
                type="short"
                data={post}
              />
            </>
          );
        })}
    </div>
  );
};
